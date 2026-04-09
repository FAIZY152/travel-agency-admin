import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";

const LOGIN_PATH = "/login";

const ALLOWED_NEXT_PATTERN = /^\/[a-zA-Z0-9\-._~:@!$&'()*+,;=%/?#\[\]]*$/;

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL(LOGIN_PATH, request.url);
  const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  // Only set `next` if it is a safe relative internal path — prevents open redirect / XSS
  if (
    nextPath !== LOGIN_PATH &&
    nextPath.startsWith("/") &&
    !nextPath.startsWith("//") &&
    ALLOWED_NEXT_PATTERN.test(nextPath)
  ) {
    loginUrl.searchParams.set("next", nextPath);
  }
  return NextResponse.redirect(loginUrl);
}

function isPublicPath(pathname: string) {
  return (
    pathname === "/" ||
    pathname === LOGIN_PATH ||
    pathname.startsWith("/verify") ||
    pathname.startsWith("/Eservices") ||
    pathname.startsWith("/health/issue") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/uploads")
  );
}

function isProtectedPath(pathname: string) {
  return (
    pathname.startsWith("/dashboard")
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip all processing for public paths immediately — no JWT needed
  if (isPublicPath(pathname)) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (pathname === LOGIN_PATH && token) {
      try {
        await verifyAdminToken(token);
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // Only verify JWT for protected paths
  if (isProtectedPath(pathname)) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return redirectToLogin(request);
    try {
      await verifyAdminToken(token);
    } catch {
      return redirectToLogin(request);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
