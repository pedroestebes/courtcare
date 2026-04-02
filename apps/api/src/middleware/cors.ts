import { cors } from "hono/cors";
import type { Context } from "hono";
import type { Env } from "../types.js";

export const corsMiddleware = cors({
  origin: (origin: string, c: Context<{ Bindings: Env }>) => {
    const allowedOrigin =
      c.env.CORS_ORIGIN || "http://localhost:5173";
    const origins = allowedOrigin.split(",").map((o) => o.trim());
    if (origins.includes(origin) || origins.includes("*")) {
      return origin;
    }
    return origins[0];
  },
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  exposeHeaders: ["Content-Length"],
  maxAge: 3600,
  credentials: true,
});
