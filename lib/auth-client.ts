import { polarClient } from "@polar-sh/better-auth";
import {
  inferAdditionalFields,
  oneTapClient,
  passkeyClient,
  twoFactorClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

import { clientEnv } from "@/env/client";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [
    oneTapClient({
      clientId: clientEnv.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    }),
    passkeyClient(),
    twoFactorClient(),
    polarClient(),
    inferAdditionalFields<typeof auth>(),
  ],
  fetchOptions: {
    onError: async (ctx) => {
      switch (ctx.response.status) {
        case 429:
          const retry = ctx.response.headers.get("X-Retry-After");

          toast.info(
            `Has excedido el límite de peticiones. Intenta nuevamente en ${retry} segundos.`,
          );
          break;

        case 500:
          console.log(ctx.error);
          toast.error("Ocurrió un error. Intenta nuevamente más tarde.");
          break;
      }
    },
  },
});

export const { signIn, signUp, signOut, useSession, getSession, oneTap } =
  authClient;
