import { defineConfig } from "drizzle-kit";

import { serverEnv } from "@/env/server";

export default defineConfig({
  dialect: "postgresql",
  schema: "./database/schemas",
  out: "./drizzle",
  casing: "snake_case",
  dbCredentials: {
    url: serverEnv.DATABASE_URL,
  },
});
