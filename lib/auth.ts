import { checkout, polar, portal, webhooks } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { captcha, oAuthProxy, oneTap, twoFactor } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";

import { deleteCache, getCache, setCache } from "@/cache/utils";
import type { UserRole } from "@/constants/roles";
import { ROLES } from "@/constants/roles";
import { db } from "@/database/config";
import * as schema from "@/database/schemas";
import { clientEnv } from "@/env/client";
import { serverEnv } from "@/env/server";
import { client, getAppProducts, subscribeCustomer } from "./polar";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      passkey: schema.passkey,
      account: schema.account,
      verification: schema.verification,
      twoFactor: schema.twoFactor,
      session: schema.session,
    },
  }),
  socialProviders: {
    google: {
      clientId: clientEnv.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
      redirectURI: `${serverEnv.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  secondaryStorage: {
    delete: deleteCache,
    get: getCache,
    set: setCache,
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
  secret: serverEnv.BETTER_AUTH_SECRET,
  emailVerification: {
    sendOnSignUp: false,
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  trustedOrigins: [
    serverEnv.BETTER_AUTH_URL,
    `https://${serverEnv.VERCEL_URL}`,
    `https://${serverEnv.VERCEL_PROJECT_PRODUCTION_URL}`,
    "http://localhost:3000",
  ],
  appName: "PanaBarbero",
  plugins: [
    twoFactor(),
    passkey(),
    oneTap(),
    captcha({
      provider: "hcaptcha",
      secretKey: serverEnv.HCAPTCHA_SECRET_KEY,
      siteKey: clientEnv.NEXT_PUBLIC_HCAPTCHA_SITE_KEY,
    }),
    oAuthProxy(),
    polar({
      client,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: await getAppProducts(),
          authenticatedUsersOnly: true,
          successUrl: "/success?checkout_id={CHECKOUT_ID}",
        }),
        portal(),
        webhooks({
          secret: serverEnv.POLAR_SECRET,
          onSubscriptionCreated: async ({ data: payload }) => {
            await subscribeCustomer(
              payload.customerId,
              payload.productId,
              payload,
            );
          },
        }),
      ],
    }),
    nextCookies(),
  ],
});

export type User = (typeof auth.$Infer.Session)["user"] & {
  role: UserRole;
};
