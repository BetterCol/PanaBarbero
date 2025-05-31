import "dotenv/config";

import { upstashCache } from "drizzle-orm/cache/upstash";
import { drizzle } from "drizzle-orm/neon-serverless";

import { serverEnv } from "@/env/server";
import * as schema from "./schemas";

export const db = drizzle(serverEnv.DATABASE_URL, {
  casing: "snake_case",
  schema,
  logger: true,
  cache: upstashCache({
    url: serverEnv.UPSTASH_REDIS_REST_URL,
    token: serverEnv.UPSTASH_REDIS_REST_TOKEN,
    global: true,
  }),
});
