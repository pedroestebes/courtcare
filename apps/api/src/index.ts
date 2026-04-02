import { Hono } from "hono";
import { corsMiddleware } from "./middleware/cors.js";
import authRoutes from "./routes/auth.js";
import drillsRoutes from "./routes/drills.js";
import sessionsRoutes from "./routes/sessions.js";
import aiRoutes from "./routes/ai.js";
import type { Env, Variables } from "./types.js";

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// Global middleware
app.use("*", corsMiddleware);

// Health check
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    service: "courtcare-api",
    environment: c.env.ENVIRONMENT,
  });
});

// Mount routes
app.route("/auth", authRoutes);
app.route("/drills", drillsRoutes);
app.route("/sessions", sessionsRoutes);
app.route("/ai", aiRoutes);

// 404 fallback
app.notFound((c) => {
  return c.json({ error: "Not found" }, 404);
});

// Global error handler
app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json({ error: "Internal server error" }, 500);
});

// Export for Cloudflare Workers
export default app;
