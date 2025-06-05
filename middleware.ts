import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { AUTH_LINKS, PRIVATE_LINKS, REDIRECT_LINKS } from "./constants/links";
import type { UserRole } from "./constants/roles";

export default async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // @ts-expect-error
  const userRole = session?.user.role as UserRole;

  const url = new URL(request.url);
  const currentUrl = new URL(request.url).pathname;

  if (session && AUTH_LINKS.includes(currentUrl)) {
    return NextResponse.redirect(new URL(REDIRECT_LINKS[userRole], url));
  }

  if (
    !session &&
    PRIVATE_LINKS[userRole]?.some((link) => currentUrl.startsWith(link))
  ) {
    return NextResponse.redirect(new URL("/login", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
