import { createEnv } from "@t3-oss/env-nextjs";
import { string } from "zod/v4";

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_HCAPTCHA_SITE_KEY: string().min(1),
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_HCAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  },
});
