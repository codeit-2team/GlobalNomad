'use server';

import {
  DuplicateEmailError,
  InternalServerError,
  PasswordMismatchError,
  PasswordValidateError,
} from '@/lib/errors/authErrors';
import { User } from '@/types/user';
import axios, { AxiosError } from 'axios';

type ServerErrorResponse = {
  message: string;
};

interface SignupResponse {
  user?: User;
  error?: string;
}

/**
 * 사용자 회원가입을 처리하는 서버 액션 함수입니다.
 *
 * 클라이언트에서 전달된 `FormData`에서 이메일, 닉네임, 비밀번호를 추출하여
 * 백엔드 API(`/users`)로 회원가입 요청을 전송합니다.
 *
 * 회원가입 성공 시 사용자 정보를 반환하고,
 * 실패 시 서버 응답 메시지에 따라 적절한 에러 메시지를 반환합니다.
 *
 * 처리하는 주요 에러:
 * - 비밀번호 불일치
 * - 비밀번호 유효성 실패
 * - 중복 이메일
 * - 그 외 서버 내부 오류
 *
 * @param {unknown} prevState - 이전 상태 값 (useActionState 등에서 전달됨)
 * @param {FormData} formData - 폼 입력 데이터 (email, nickname, password 포함)
 * @returns {Promise<SignupResponse>} 회원가입 결과 객체 (성공 시 user, 실패 시 error 포함)
 */
export default async function Signup(
  prevState: unknown,
  formData: FormData,
): Promise<SignupResponse> {
  const email = formData.get('email');
  const nickname = formData.get('nickname');
  const password = formData.get('password');

  if (
    typeof email !== 'string' ||
    typeof nickname !== 'string' ||
    typeof password !== 'string'
  ) {
    return { error: '잘못된 입력 형식입니다.' };
  }

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/users`,
      { email, nickname, password },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const user = res.data;
    if (!user) return { error: '유저 정보가 없습니다.' };

    return { user };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError<ServerErrorResponse>;
      const serverMsg = axiosError.response?.data?.message;

      switch (serverMsg) {
        case '비밀번호가 일치하지 않습니다.':
          return { error: new PasswordMismatchError().message };
        case 'Validation Failed':
          return { error: new PasswordValidateError().message };
        case '중복된 이메일입니다.':
          return { error: new DuplicateEmailError().message };
        default:
          return { error: serverMsg || '회원가입 실패' };
      }
    }

    return { error: new InternalServerError().message };
  }
}
