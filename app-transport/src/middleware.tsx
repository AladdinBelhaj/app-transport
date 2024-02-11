// middleware.tsx

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Getting token from the request cookies
  const token = request.cookies.get("authToken")?.value;
  console.log(`here is the token:${token}`);
  // If the token doesn't exist in cookies, redirect to signin page
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Allow entry to all routes
  return NextResponse.next();
}

// Config object to specify which routes are protected
export const config = {
  // Define protected routes here
  matcher: ["/", "/profile"],
};
