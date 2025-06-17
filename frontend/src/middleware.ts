import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
   const token = request.cookies.get("accessToken")?.value;
   const pathname = request.nextUrl.pathname;

   // Protect dashboard routes
   if (!token && pathname.startsWith("/dashboard")) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.search = "";
      return NextResponse.redirect(loginUrl);
   }

   // Prevent logged-in users from accessing auth pages
   const isAuthRoute = pathname === "/login" || pathname === "/signup";
   if (token && isAuthRoute) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/dashboard";
      redirectUrl.search = "";
      return NextResponse.redirect(redirectUrl);
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/dashboard/:path*", "/login", "/signup"],
};
