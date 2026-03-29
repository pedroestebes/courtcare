import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "./client.js";

async function runMigrations() {
  console.log("Running migrations...");

  migrate(db, { migrationsFolder: "./drizzle" });

  console.log("Migrations complete.");
}

runMigrations().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
