/**
 * @function POST
 * @description
 * 클라이언트의 쿠키에서 refreshToken을 추출하여 서버에 전달하고,
 * 새로운 accessToken을 받아 응답 쿠키에 저장합니다.
 *
 * 실패 시 적절한 에러 메시지와 상태 코드를 반환합니다.
 *
 * @returns {Promise<NextResponse>}
 * - 성공: 새로운 accessToken을 JSON 형식으로 반환하며, 쿠키에 저장됨
 * - 실패: 401 에러와 함께 실패 메시지를 포함한 JSON 응답 반환
 *
 * @example
 * // 클라이언트에서 호출
 * fetch('/api/auth/refresh', { method: 'POST' });
 *
 * // 응답 쿠키로 accessToken이 재설정됨
 */

import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: '리프레시 토큰 없음' },
      { status: 401 },
    );
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/tokens`,
      { refreshToken },
    );

    const { accessToken } = response.data;

    const res = NextResponse.json({ accessToken, ok: true });

    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 30, // 30분 accessToken 설정 30분으로 되어있음
    });

    console.log('액세스 토큰 갱신 성공');

    return res;
  } catch (error) {
    console.error('액세스 토큰 갱신 실패', error);
    return NextResponse.json(
      { message: '액세스 토큰 갱신 실패' },
      { status: 401 },
    );
  }
}
