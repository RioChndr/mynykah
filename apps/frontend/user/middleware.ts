import { NextRequest, NextResponse } from "next/server";
import { configUseAuth } from "./lib/auth/config";

export function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname)
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('request to dashboard')
    const cookieToken = request.cookies.get(configUseAuth.storage.localToken)

    if (!cookieToken || cookieToken === 'null') {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard',
};