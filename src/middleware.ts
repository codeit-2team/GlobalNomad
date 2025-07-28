import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const { pathname } = request.nextUrl;

  if (
    (pathname === '/login' || pathname === '/signup') &&
    (accessToken || refreshToken)
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const protectedPaths = ['/mypage'];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/signup', '/mypage/:path*'],
};
