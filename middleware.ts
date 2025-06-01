import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { PRIVATE_LINKS } from "./constants/links";
import type { UserRole } from "./constants/roles";

async function middleware(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session);

  // @ts-expect-error
  const userRole = session?.user.role as UserRole;

  const currentUrl = new URL(request.url).pathname;

  if (
    !session &&
    PRIVATE_LINKS[userRole]?.some((link) => currentUrl.startsWith(link))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export default middleware;

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
