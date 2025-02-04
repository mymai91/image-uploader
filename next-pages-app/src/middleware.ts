import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("image_uploader-accessToken")
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")
  const isProtectedPage = request.nextUrl.pathname.startsWith("/product-images")

  if (isProtectedPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/product-images", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/register", "/product-images/:path*"],
}
