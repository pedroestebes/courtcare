import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { corsMiddleware } from "./middleware/cors.js";
import authRoutes from "./routes/auth.js";
import drillsRoutes from "./routes/drills.js";
import sessionsRoutes from "./routes/sessions.js";

const app = new Hono();

// Global middleware
app.use("*", corsMiddleware);

// Health check
app.get("/health", (c) => {
  return c.json({ status: "ok", service: "courtcare-api" });
});

// Mount routes
app.route("/auth", authRoutes);
app.route("/drills", drillsRoutes);
app.route("/sessions", sessionsRoutes);

// 404 fallback
app.notFound((c) => {
  return c.json({ error: "Not found" }, 404);
});

// Global error handler
app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json({ error: "Internal server error" }, 500);
});

const port = Number(process.env.PORT ?? 3001);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`CourtCare API running on http://localhost:${info.port}`);
});
