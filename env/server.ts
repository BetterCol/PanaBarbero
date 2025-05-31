import { createEnv } from "@t3-oss/env-nextjs";
import { upstashRedis, vercel } from "@t3-oss/env-nextjs/presets-zod";
import { url, string } from "zod/v4";

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: url().startsWith("postgresql://"),
    BETTER_AUTH_URL: url(),
    BETTER_AUTH_SECRET: string(),
    GOOGLE_CLIENT_SECRET: string(),
    HCAPTCHA_SECRET_KEY: string(),
  },
  experimental__runtimeEnv: process.env,
  extends: [upstashRedis(), vercel()],
});
