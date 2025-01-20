// src/middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define which routes should be protected
const protectedRoutes = ["/image", "/dashboard"]
const authRoutes = ["/login", "/register"]

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value
  const { pathname } = request.nextUrl

  // If trying to access protected routes without token
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // If trying to access auth routes (login/register) with valid token
  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}
