import { Hono } from "hono";
import { randomUUID } from "node:crypto";
import { eq, desc, and } from "drizzle-orm";
import { createSessionSchema, completeSessionSchema } from "@courtcare/shared";
import { db } from "../db/client.js";
import { sessions, sessionFrames, drills } from "../db/schema.js";
import { authMiddleware } from "../middleware/auth.js";

const sessionsRouter = new Hono();

// All session routes require authentication
sessionsRouter.use("*", authMiddleware);

// POST /sessions — create a new session
sessionsRouter.post("/", async (c) => {
  const userId = c.get("userId") as string;
  const body = await c.req.json();
  const parsed = createSessionSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      400
    );
  }

  const { drillId } = parsed.data;

  const drill = db
    .select({ id: drills.id, name: drills.name })
    .from(drills)
    .where(eq(drills.id, drillId))
    .get();

  if (!drill) {
    return c.json({ error: "Drill not found" }, 404);
  }

  const id = randomUUID();
  const now = new Date().toISOString();

  db.insert(sessions)
    .values({
      id,
      userId,
      drillId,
      startedAt: now,
    })
    .run();

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
  const userId = c.get("userId") as string;

  const results = db
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
  const userId = c.get("userId") as string;
  const sessionId = c.req.param("id");

  const session = db
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

  const frames = db
    .select()
    .from(sessionFrames)
    .where(eq(sessionFrames.sessionId, sessionId))
    .all();

  return c.json({ session, frames });
});

// PATCH /sessions/:id/complete — complete a session
sessionsRouter.patch("/:id/complete", async (c) => {
  const userId = c.get("userId") as string;
  const sessionId = c.req.param("id");

  const session = db
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
  db.update(sessions)
    .set({
      endedAt: now,
      overallScore,
      durationSeconds,
    })
    .where(eq(sessions.id, sessionId))
    .run();

  // Insert frames
  if (frames.length > 0) {
    for (const frame of frames) {
      db.insert(sessionFrames)
        .values({
          id: randomUUID(),
          sessionId,
          timestampMs: frame.timestampMs,
          landmarks: frame.landmarks,
          scores: frame.scores,
          feedback: frame.feedback,
        })
        .run();
    }
  }

  // Fetch the updated session with drill name
  const updated = db
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
      id: randomUUID(),
      sessionId,
      avgScore: summary.avgScore,
      bestScore: summary.bestScore,
      weakAreas: summary.weakAreas,
      tips: summary.tips,
    },
  });
});

export default sessionsRouter;
