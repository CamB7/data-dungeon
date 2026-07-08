import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../../db/schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

let cached: Db | null = null;

/** Shared Drizzle client for Neon (HTTP). Lazy so builds work without env when unused. */
export function getDb(): Db {
  if (cached) {
    return cached;
  }

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set. Add it to .env.local.");
  }

  cached = drizzle(neon(url), { schema });
  return cached;
}
