import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { captcha, oAuthProxy, oneTap, twoFactor } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";

import { deleteCache, getCache, setCache } from "@/cache/utils";
import { ROLES } from "@/constants/roles";
import { db } from "@/database/config";
import * as schema from "@/database/schemas";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      passkey: schema.passkey,
      account: schema.account,
      verification: schema.verification,
      twoFactor: schema.twoFactor,
    },
  }),
  socialProviders: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    password: {
      hash: Bun.password.hash,
      verify: ({ hash, password }) => Bun.password.verify(password, hash),
    },
  },
  secondaryStorage: {
    delete: deleteCache,
    get: getCache,
    set: (key, value, ttl) => setCache(key, value, ttl ?? 3600),
  },
  rateLimit: {
    storage: "secondary-storage",
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: ROLES.USER,
        required: false,
      },
    },
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  emailVerification: {
    sendOnSignUp: false,
    autoSignInAfterVerification: true,
  },
  trustedOrigins: [process.env.BETTER_AUTH_URL!, "http://localhost:3000"],
  appName: "PanaBarbero",
  plugins: [
    twoFactor(),
    passkey(),
    oneTap(),
    // captcha({
    //   provider: "hcaptcha",
    //   secretKey: process.env.HCAPTCHA_SECRET_KEY!,
    // }),
    oAuthProxy(),
    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
