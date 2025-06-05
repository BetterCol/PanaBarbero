import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { betterFetch } from "@better-fetch/fetch";

import { AUTH_LINKS, PRIVATE_LINKS, REDIRECT_LINKS } from "@/constants/links";
import type { UserRole } from "@/constants/roles";
import type { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

export default async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  // @ts-expect-error
  const userRole = session?.user?.role as UserRole;

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
  ],
};
