import { cache } from "react";

import { headers } from "next/headers";

import type { User } from "./auth";
import { auth } from "./auth";

export const getCurrentUser = cache(async () => {
  const sessionObj = await auth.api.getSession({
    headers: await headers(),
  });

  return sessionObj?.user as User | undefined;
});
