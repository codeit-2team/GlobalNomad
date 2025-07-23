import { NextResponse } from 'next/server';

/**
 * @function POST
 * @description 로그아웃 처리 API 핸들러입니다.
 *
 * 클라이언트로부터 POST 요청이 들어오면 accessToken 및 refreshToken 쿠키를 제거하여
 * 인증 상태를 해제합니다. 쿠키는 빈 값과 함께 maxAge 0으로 설정되어 즉시 만료됩니다.
 * `secure`, `httpOnly`, `sameSite`, `path` 등의 속성은 보안을 고려하여 설정됩니다.
 *
 * @returns {NextResponse} 로그아웃 완료 메시지와 함께 쿠키 삭제를 포함한 응답 객체
 *
 * @example
 * // 클라이언트에서 axios를 사용하는 예시:
 * await axios.post('/api/auth/logout');
 */
export async function POST() {
  const res = NextResponse.json({ message: '로그아웃' });

  res.cookies.set('accessToken', '', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
  });

  res.cookies.set('refreshToken', '', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
  });

  return res;
}
