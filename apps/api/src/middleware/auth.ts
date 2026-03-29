import type { Context, Next } from "hono";
import { verifyToken } from "../lib/jwt.js";

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Missing or invalid Authorization header" }, 401);
  }

  const token = authHeader.slice(7);
  const result = await verifyToken(token);

  if (!result) {
    return c.json({ error: "Invalid or expired token" }, 401);
  }

  c.set("userId", result.userId);
  await next();
}
