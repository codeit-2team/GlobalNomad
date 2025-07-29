import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js Middleware 함수로, 인증 상태에 따라 사용자의 접근을 제어합니다.
 *
 * - 로그인/회원가입 페이지에 접근 시 이미 accessToken 또는 refreshToken이 존재하면 메인 페이지로 리디렉트
 * - 보호된 페이지(`/mypage` 하위) 접근 시 토큰이 모두 없으면 로그인 페이지로 리디렉트
 * - 그 외에는 요청을 그대로 통과시킴
 *
 * @param {NextRequest} request - 요청 객체로, 쿠키와 URL 경로 정보가 포함됨
 * @returns {NextResponse} - 조건에 따른 리디렉트 응답 또는 요청 통과 응답
 */
export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const { pathname } = request.nextUrl;

  // 로그인/회원가입 페이지 접근 시 이미 로그인 상태면 메인으로 리디렉트
  if (
    (pathname === '/login' || pathname === '/signup') &&
    (accessToken || refreshToken)
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 보호 경로 설정 및 검사
  const protectedPaths = ['/mypage'];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // 보호 경로 접근 시 두 토큰 모두 없으면 로그인으로 리디렉트
  if (isProtected && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 조건에 해당하지 않으면 다음 응답으로 진행
  return NextResponse.next();
}

/**
 * 미들웨어가 적용될 경로를 지정하는 설정 객체입니다.
 * - '/login', '/signup' 경로
 * - '/mypage'와 그 하위 경로들 ('/mypage/profile', '/mypage/dashboard' 등)
 */
export const config = {
  matcher: ['/login', '/signup', '/mypage/:path*'],
};
