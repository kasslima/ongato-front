import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthCookieName, verifySessionCookieValue } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const sessionCookie = request.cookies.get(getAuthCookieName())?.value;
  const session = sessionCookie ? await verifySessionCookieValue(sessionCookie) : null;
  const isAuthenticated = Boolean(session);

  if (pathname.startsWith("/admin") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (pathname.startsWith("/auth/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/login"],
};
