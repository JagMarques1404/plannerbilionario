import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const pathname = req.nextUrl.pathname

  // Allow access to public routes without authentication
  const publicRoutes = ["/login", "/admin", "/api/health"]
  if (publicRoutes.includes(pathname)) {
    return res
  }

  // Allow access to API routes (they handle their own auth)
  if (pathname.startsWith("/api/")) {
    return res
  }

  // Allow access to static files
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/icons/")
  ) {
    return res
  }

  // For the main dashboard, we'll check authentication on the client side
  // This is simpler for our sandbox environment
  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}
