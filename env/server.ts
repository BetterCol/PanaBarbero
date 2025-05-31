import { createEnv } from "@t3-oss/env-nextjs";
import { url, string } from "zod/v4";

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: url().startsWith("postgresql://"),
    BETTER_AUTH_URL: url(),
    BETTER_AUTH_SECRET: string(),
    GOOGLE_CLIENT_SECRET: string(),
    UPSTASH_REDIS_REST_URL: url(),
    UPSTASH_REDIS_REST_TOKEN: string(),
    HCAPTCHA_SECRET_KEY: string(),
  },
  experimental__runtimeEnv: process.env,
});
