import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  displayName: text("display_name").notNull(),
  createdAt: text("created_at").notNull(),
});

export const drills = sqliteTable("drills", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  sport: text("sport").notNull().default("padel"),
  category: text("category").notNull(),
  difficulty: text("difficulty", {
    enum: ["beginner", "intermediate", "advanced"],
  }).notNull(),
  description: text("description").notNull(),
  instructions: text("instructions", { mode: "json" })
    .notNull()
    .$type<string[]>(),
  referenceAngles: text("reference_angles", { mode: "json" })
    .notNull()
    .$type<Record<string, number>>(),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  drillId: text("drill_id")
    .notNull()
    .references(() => drills.id),
  startedAt: text("started_at").notNull(),
  endedAt: text("ended_at"),
  overallScore: integer("overall_score"),
  durationSeconds: integer("duration_seconds"),
});

export const sessionFrames = sqliteTable("session_frames", {
  id: text("id").primaryKey(),
  sessionId: text("session_id")
    .notNull()
    .references(() => sessions.id),
  timestampMs: integer("timestamp_ms").notNull(),
  landmarks: text("landmarks", { mode: "json" })
    .notNull()
    .$type<Record<string, { x: number; y: number; z: number }>>(),
  scores: text("scores", { mode: "json" })
    .notNull()
    .$type<Record<string, number>>(),
  feedback: text("feedback", { mode: "json" }).notNull().$type<string[]>(),
});
