import "dotenv/config";

import { upstashCache } from "drizzle-orm/cache/upstash";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schemas";

export const db = drizzle(process.env.DATABASE_URL ?? "", {
  casing: "snake_case",
  schema,
  logger: true,
  cache: upstashCache({
    url: process.env.UPSTASH_CACHE_URL ?? "",
    token: process.env.UPSTASH_CACHE_TOKEN ?? "",
    global: true,
  }),
});
