import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl;
   const token = request.cookies.get("accessToken")?.value;

   // Auth-related routes (redirect if already logged in)
   const redirectIfAuthRoutes = [
      "/login",
      "/signup",
      "/forgot-password",
      "/reset-password",
   ];
   const isRedirectIfAuthRoute = redirectIfAuthRoutes.some((route) =>
      pathname.startsWith(route)
   );

   // Protected routes that require authentication
   const protectedRoutes = ["/dashboard"];
   const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
   );

   // If user is not authenticated and tries to access protected route
   if (!token && isProtectedRoute) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
   }

   // If user is authenticated and tries to access auth pages
   if (token && isRedirectIfAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      "/dashboard/:path*",
      "/login",
      "/signup",
      "/forgot-password",
      "/reset-password",
   ],
};

/**
 * Public routes (no authentication required):
 * - /
 * - /hotels
 * - /hotels/:id
 * 
 * Protected routes (authentication required):
 * - /dashboard/*
 * 
 * Auth routes (redirect if already logged in):
 * - /login
 * - /signup
 * - /forgot-password
 * - /reset-password
 */
