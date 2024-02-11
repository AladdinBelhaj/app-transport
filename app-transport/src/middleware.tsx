// middleware.tsx

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "../utils/auth";

// Middleware function to check if the user is authenticated
export async function middleware(request: NextRequest) {
  // Check if token exists in local storage
  const token = getToken();

  // If the route is protected and the token doesn't exist, redirect to signin page
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
