import { NextRequest, NextResponse } from "next/server";

import middlewareAuth from "./utils/middlewareAuth";

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const { user } = await middlewareAuth(request);
    if (!user) return NextResponse.redirect(new URL("/auth", request.url));
    if (user && user.role !== "ADMIN")
      return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/profile")) {
    const { user } = await middlewareAuth(request);
    if (!user) return NextResponse.redirect(new URL("/auth", request.url));
    console.log("/profile");
  }

  if (request.nextUrl.pathname.startsWith("/auth")) {
    const { user } = await middlewareAuth(request);
    if (user) return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/auth/:path*"],
};
