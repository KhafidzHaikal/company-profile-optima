import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Exclude API routes & static files (CSS, JS, images)
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  const locale = req.cookies.get("NEXT_LOCALE")?.value || "en";

  // ✅ Only redirect if not already on a locale path
  if (!pathname.startsWith("/en") && !pathname.startsWith("/id")) {
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
  }

  return NextResponse.next();
}
