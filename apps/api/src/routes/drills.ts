import { Hono } from "hono";
import { eq, and, type SQLWrapper } from "drizzle-orm";
import { createDb } from "../db/client.js";
import { drills } from "../db/schema.js";
import type { Env, Variables } from "../types.js";

const drillsRouter = new Hono<{ Bindings: Env; Variables: Variables }>();

drillsRouter.get("/", async (c) => {
  const sport = c.req.query("sport");
  const category = c.req.query("category");
  const difficulty = c.req.query("difficulty");
  const db = createDb(c.env.DB);

  const conditions: SQLWrapper[] = [];

  if (sport) {
    conditions.push(eq(drills.sport, sport));
  }
  if (category) {
    conditions.push(eq(drills.category, category));
  }
  if (difficulty) {
    conditions.push(
      eq(
        drills.difficulty,
        difficulty as "beginner" | "intermediate" | "advanced"
      )
    );
  }

  const query = db.select().from(drills);

  const results =
    conditions.length > 0
      ? await query.where(and(...conditions)).all()
      : await query.all();

  return c.json({ drills: results });
});

drillsRouter.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const db = createDb(c.env.DB);

  const drill = await db
    .select()
    .from(drills)
    .where(eq(drills.slug, slug))
    .get();

  if (!drill) {
    return c.json({ error: "Drill not found" }, 404);
  }

  return c.json({ drill });
});

export default drillsRouter;
