import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from "next/server";

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales: ['en', 'id'],
  defaultLocale: 'en',
  // You can keep the cookie logic here
  localeDetection: true
});

export default function middleware(request: NextRequest) {
  // Skip middleware for static files and API routes
  const { pathname } = request.nextUrl;
  
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/uploads") ||
    pathname.startsWith("/videos") ||
    pathname.startsWith("/login-admin-optima") ||
    pathname.startsWith("/register-just-admin") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }
  
  // Use the intl middleware for everything else
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/|static/|images/|favicon.ico).*)'
  ]
};
