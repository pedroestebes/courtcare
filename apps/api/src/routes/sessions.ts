import { Hono } from "hono";
import { eq, desc, and } from "drizzle-orm";
import { createSessionSchema, completeSessionSchema } from "@courtcare/shared";
import { createDb } from "../db/client.js";
import { sessions, sessionFrames, drills } from "../db/schema.js";
import { authMiddleware } from "../middleware/auth.js";
import type { Env, Variables } from "../types.js";

const sessionsRouter = new Hono<{ Bindings: Env; Variables: Variables }>();

// All session routes require authentication
sessionsRouter.use("*", authMiddleware);

// POST /sessions — create a new session
sessionsRouter.post("/", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const parsed = createSessionSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      400
    );
  }

  const { drillId } = parsed.data;
  const db = createDb(c.env.DB);

  const drill = await db
    .select({ id: drills.id, name: drills.name })
    .from(drills)
    .where(eq(drills.id, drillId))
    .get();

  if (!drill) {
    return c.json({ error: "Drill not found" }, 404);
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await db.insert(sessions).values({
    id,
    userId,
    drillId,
    startedAt: now,
  });

  return c.json(
    {
      session: {
        id,
        userId,
        drillId,
        drillName: drill.name,
        startedAt: now,
        endedAt: null,
        overallScore: null,
        durationSeconds: null,
      },
    },
    201
  );
});

// GET /sessions — list user's sessions, ordered by date desc
sessionsRouter.get("/", async (c) => {
  const userId = c.get("userId");
  const db = createDb(c.env.DB);

  const results = await db
    .select({
      id: sessions.id,
      userId: sessions.userId,
      drillId: sessions.drillId,
      drillName: drills.name,
      startedAt: sessions.startedAt,
      endedAt: sessions.endedAt,
      overallScore: sessions.overallScore,
      durationSeconds: sessions.durationSeconds,
    })
    .from(sessions)
    .innerJoin(drills, eq(sessions.drillId, drills.id))
    .where(eq(sessions.userId, userId))
    .orderBy(desc(sessions.startedAt))
    .all();

  return c.json({ sessions: results });
});

// GET /sessions/:id — get session detail with frames
sessionsRouter.get("/:id", async (c) => {
  const userId = c.get("userId");
  const sessionId = c.req.param("id");
  const db = createDb(c.env.DB);

  const session = await db
    .select({
      id: sessions.id,
      userId: sessions.userId,
      drillId: sessions.drillId,
      drillName: drills.name,
      startedAt: sessions.startedAt,
      endedAt: sessions.endedAt,
      overallScore: sessions.overallScore,
      durationSeconds: sessions.durationSeconds,
    })
    .from(sessions)
    .innerJoin(drills, eq(sessions.drillId, drills.id))
    .where(and(eq(sessions.id, sessionId), eq(sessions.userId, userId)))
    .get();

  if (!session) {
    return c.json({ error: "Session not found" }, 404);
  }

  const frames = await db
    .select()
    .from(sessionFrames)
    .where(eq(sessionFrames.sessionId, sessionId))
    .all();

  return c.json({ session, frames });
});

// PATCH /sessions/:id/complete — complete a session
sessionsRouter.patch("/:id/complete", async (c) => {
  const userId = c.get("userId");
  const sessionId = c.req.param("id");
  const db = createDb(c.env.DB);

  const session = await db
    .select()
    .from(sessions)
    .where(and(eq(sessions.id, sessionId), eq(sessions.userId, userId)))
    .get();

  if (!session) {
    return c.json({ error: "Session not found" }, 404);
  }

  if (session.endedAt) {
    return c.json({ error: "Session is already completed" }, 400);
  }

  const body = await c.req.json();
  const parsed = completeSessionSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      400
    );
  }

  const { overallScore, durationSeconds, frames, summary } = parsed.data;
  const now = new Date().toISOString();

  // Update the session
  await db
    .update(sessions)
    .set({
      endedAt: now,
      overallScore,
      durationSeconds,
    })
    .where(eq(sessions.id, sessionId));

  // Insert frames
  if (frames.length > 0) {
    for (const frame of frames) {
      await db.insert(sessionFrames).values({
        id: crypto.randomUUID(),
        sessionId,
        timestampMs: frame.timestampMs,
        landmarks: frame.landmarks,
        scores: frame.scores,
        feedback: frame.feedback,
      });
    }
  }

  // Fetch the updated session with drill name
  const updated = await db
    .select({
      id: sessions.id,
      userId: sessions.userId,
      drillId: sessions.drillId,
      drillName: drills.name,
      startedAt: sessions.startedAt,
      endedAt: sessions.endedAt,
      overallScore: sessions.overallScore,
      durationSeconds: sessions.durationSeconds,
    })
    .from(sessions)
    .innerJoin(drills, eq(sessions.drillId, drills.id))
    .where(eq(sessions.id, sessionId))
    .get();

  return c.json({
    session: updated,
    summary: {
      id: crypto.randomUUID(),
      sessionId,
      avgScore: summary.avgScore,
      bestScore: summary.bestScore,
      weakAreas: summary.weakAreas,
      tips: summary.tips,
    },
  });
});

export default sessionsRouter;
