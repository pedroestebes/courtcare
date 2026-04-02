import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { loginSchema, registerSchema } from "@courtcare/shared";
import { createDb } from "../db/client.js";
import { users } from "../db/schema.js";
import { signToken } from "../lib/jwt.js";
import { hashPassword, verifyPassword } from "../lib/password.js";
import { authMiddleware } from "../middleware/auth.js";
import type { Env, Variables } from "../types.js";

const auth = new Hono<{ Bindings: Env; Variables: Variables }>();

auth.post("/register", async (c) => {
  const body = await c.req.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      400
    );
  }

  const { displayName, email, password } = parsed.data;
  const db = createDb(c.env.DB);

  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .get();

  if (existing) {
    return c.json({ error: "An account with this email already exists" }, 409);
  }

  const passwordHash = await hashPassword(password);
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await db.insert(users).values({
    id,
    email: email.toLowerCase(),
    passwordHash,
    displayName,
    createdAt: now,
  });

  const token = await signToken(id, c.env.JWT_SECRET);

  return c.json(
    {
      token,
      user: {
        id,
        email: email.toLowerCase(),
        displayName,
        createdAt: now,
      },
    },
    201
  );
});

auth.post("/login", async (c) => {
  const body = await c.req.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      400
    );
  }

  const { email, password } = parsed.data;
  const db = createDb(c.env.DB);

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .get();

  if (!user) {
    return c.json({ error: "Invalid email or password" }, 401);
  }

  const valid = await verifyPassword(user.passwordHash, password);

  if (!valid) {
    return c.json({ error: "Invalid email or password" }, 401);
  }

  const token = await signToken(user.id, c.env.JWT_SECRET);

  return c.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      createdAt: user.createdAt,
    },
  });
});

auth.get("/me", authMiddleware, async (c) => {
  const userId = c.get("userId");
  const db = createDb(c.env.DB);

  const user = await db
    .select({
      id: users.id,
      email: users.email,
      displayName: users.displayName,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userId))
    .get();

  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json({ user });
});

export default auth;
