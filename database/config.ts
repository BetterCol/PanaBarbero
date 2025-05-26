import "dotenv/config";

import { drizzle } from "drizzle-orm/bun-sql";

import * as schema from "./schemas";

export const db = drizzle(process.env.DATABASE_URL ?? "", {
  casing: "snake_case",
  schema,
  logger: true,
});
