import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @function POST
 * @description
 * 카카오 소셜 로그인 처리 API 라우트.
 * 클라이언트로부터 전달받은 인가 코드(code)를 사용해 백엔드에 로그인 요청을 보내고,
 * 응답으로 받은 accessToken과 refreshToken을 쿠키로 저장한 뒤 사용자 정보를 반환한다.
 *
 * @param {NextRequest} req - Next.js의 요청 객체. body에 카카오에서 전달받은 인가 코드가 포함되어야 한다.
 * @returns {Promise<NextResponse>} 사용자 정보와 함께 accessToken, refreshToken을 쿠키에 담아 응답
 *
 * @example
 * POST /api/auth/kakao/sign-in
 * Body: { "code": "kakao-authorization-code" }
 *
 * 성공 시:
 *  - user 객체 반환
 *  - accessToken: 쿠키에 저장 (30분)
 *  - refreshToken: 쿠키에 저장 (7일)
 *
 * 실패 시:
 *  - 에러 메시지와 상태 코드 반환
 */
export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const provider = 'kakao';
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_SIGNIN_REDIRECT_URL;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/oauth/sign-in/${provider}`,
      { redirectUri, token: code },
    );

    const { accessToken, refreshToken, user } = response.data;

    const res = NextResponse.json({ user });

    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 30,
    });
    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    return res;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        '카카오 로그인 실패:',
        error.response?.data || error.message,
      );
      return NextResponse.json(
        { error: error.response?.data?.message || '카카오 로그인 실패' },
        { status: error.response?.status || 500 },
      );
    } else if (error instanceof Error) {
      console.error('카카오 로그인 실패:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('카카오 로그인 실패: 알 수 없는 오류');
      return NextResponse.json(
        { error: '카카오 로그인 실패' },
        { status: 500 },
      );
    }
  }
}
