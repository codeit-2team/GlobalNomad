'use server';

import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';

import {
  EmailNotFoundError,
  InternalServerError,
  PasswordMismatchError,
  PasswordValidateError,
  UserNotFoundError,
} from '@/lib/errors/authErrors';
import { User } from '@/types/user';

type ServerErrorResponse = {
  message: string;
};

interface LoginResponse {
  user?: User;
  error?: string;
}

/**
 * 사용자 로그인 요청을 처리하는 서버 액션 함수입니다.
 *
 * 클라이언트로부터 전달된 이메일과 비밀번호를 사용해 백엔드 인증 API (`/auth/login`)에 요청을 보내고,
 * 응답으로 받은 사용자 정보와 토큰(accessToken, refreshToken)을 쿠키에 저장합니다.
 * 에러 상황에 따라 명확한 에러 메시지를 반환합니다.
 *
 * @param {unknown} prevState - 이전 상태 값 (React useActionState와 호환)
 * @param {FormData} formData - 클라이언트에서 전송된 로그인 정보 (email, password 포함)
 * @returns {Promise<LoginResponse>} 로그인 성공 시 사용자 정보, 실패 시 에러 메시지를 포함한 응답 객체
 *
 * @throws {UserNotFoundError} 응답에 사용자 정보가 포함되어 있지 않은 경우
 * @throws {PasswordValidateError} 유효성 검사 실패 (`Validation Failed`)
 * @throws {PasswordMismatchError} 비밀번호 불일치
 * @throws {EmailNotFoundError} 존재하지 않는 이메일
 * @throws {InternalServerError} 위 케이스 외의 서버 내부 오류
 */
export default async function Login(
  prevState: unknown,
  formData: FormData,
): Promise<LoginResponse> {
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return { error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
  }

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/login`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const { user, accessToken, refreshToken } = res.data;

    if (!user) throw new UserNotFoundError();

    const cookieStore = await cookies();
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 30,
    });
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return { user };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError<ServerErrorResponse>;
      const serverMsg = axiosError.response?.data?.message;

      switch (serverMsg) {
        case 'Validation Failed':
          return { error: new PasswordValidateError().message };
        case '비밀번호가 일치하지 않습니다.':
          return { error: new PasswordMismatchError().message };
        case '존재하지 않는 유저입니다.':
          return { error: new EmailNotFoundError().message };
        default:
          break;
      }
    }

    return { error: new InternalServerError().message };
  }
}
