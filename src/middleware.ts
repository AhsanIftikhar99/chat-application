import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt"); // Assuming 'jwt' is the cookie name for your token
  console.log("token", token);

  // Define whether the request is for the root route
  const isRootRoute = request.nextUrl.pathname === "/";
  console.log("isRootRoute", isRootRoute);

  // Allow access to the root route ("/") without a token
  if (isRootRoute && !token) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from the root ("/") to "/home"
  if (isRootRoute && token) {
    const url = request.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users away from protected routes to the login page ("/")
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed for authenticated users on other routes
  return NextResponse.next();
}

// Set the middleware to run on all relevant routes
export const config = {
  matcher: ["/", "/home", "/directmessage", "/directmessage/:path*"],
};
