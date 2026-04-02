// Cloudflare Worker Bindings
export interface Env {
  // D1 Database
  DB: D1Database;

  // Environment Variables
  ENVIRONMENT: string;
  CORS_ORIGIN: string;

  // Secrets (set via wrangler secret)
  JWT_SECRET: string;
}

// Context variables set by middleware
export interface Variables {
  userId: string;
}
