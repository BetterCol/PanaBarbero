import { NextResponse } from "next/server";

import { AUTH_LINKS, PRIVATE_LINKS, REDIRECT_LINKS } from "@/constants/links";
import { getCurrentUser } from "@/lib/session";

async function middleware(request: Request) {
  const user = await getCurrentUser();

  const userRole = user?.role!;

  const url = new URL(request.url);
  const currentUrl = new URL(request.url).pathname;

  if (user && AUTH_LINKS.includes(currentUrl)) {
    return NextResponse.redirect(new URL(REDIRECT_LINKS[userRole], url));
  }

  if (
    !user &&
    PRIVATE_LINKS[userRole]?.some((link) => currentUrl.startsWith(link))
  ) {
    return NextResponse.redirect(new URL("/login", url));
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
