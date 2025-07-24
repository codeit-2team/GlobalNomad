'use client';

import useUserStore from '@/stores/authStore';
import { User } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import Login from '../action';
import Link from 'next/link';
import BrandMark from '@assets/svg/brand-mark';
import Input from '@/components/Input';
import Popup from '@/components/Popup';
import { validateEmail, validatePassword } from '@/utils/validateInput';
import Button from '@/components/Button';
import IconKakao from '@assets/svg/kakao';

interface LoginState {
  error?: string;
  user?: User;
}

/**
 * 로그인 폼 컴포넌트입니다.
 *
 * 이메일과 비밀번호를 입력받아 서버 액션(Login)을 통해 로그인 요청을 보내고,
 * 성공 시 유저 정보를 전역 상태에 저장한 후 메인 페이지로 이동합니다.
 * 실패 시 에러 메시지를 팝업으로 표시합니다.
 * 또한 카카오 소셜 로그인을 위한 버튼도 포함되어 있습니다.
 *
 * 주요 기능:
 * - 이메일/비밀번호 유효성 검사
 * - useActionState를 통한 서버 액션 기반 로그인 처리
 * - 로그인 성공 시 Zustand를 통한 사용자 정보 저장
 * - 로그인 실패 시 팝업으로 에러 메시지 출력
 * - 카카오 로그인 버튼 클릭 시 OAuth 인증 URL로 리디렉션
 *
 * 사용 컴포넌트:
 * - Input: 사용자 입력 필드
 * - Button: 제출 버튼
 * - Popup: 에러 메시지 알림
 * - BrandMark, IconKakao: SVG 아이콘
 *
 * 상태:
 * - email, password: 입력값 상태
 * - errors: 입력값에 대한 유효성 에러 메시지
 * - state: 서버 액션의 반환 값 (user 또는 error)
 * - errorPopupOpen, errorMessage: 에러 팝업 제어 상태
 *
 * @component
 * @returns {JSX.Element} 로그인 UI를 렌더링하는 JSX 요소
 */
export default function LoginForm() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({ email: '', password: '' });

  const hasErrors = Object.values(errors).some((msg) => msg !== '');
  const isAllFilled = email && password;
  const isDisabled = !isAllFilled || hasErrors;

  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [state, formAction] = useActionState<LoginState, FormData>(Login, {
    user: undefined,
    error: undefined,
  });

  useEffect(() => {
    if (state.user) {
      setUser(state.user);

      router.push('/');
    }
    if (state.error) {
      setErrorMessage(state.error);
      setErrorPopupOpen(true);
    }
  }, [state, setUser, router]);

  const handleKakaoLogin = () => {
    const redirectUrl = process.env.NEXT_PUBLIC_KAKAO_SIGNIN_REDIRECT_URL;

    if (!redirectUrl) {
      setErrorMessage('카카오 로그인 설정이 올바르지 않습니다.');
      setErrorPopupOpen(true);
      return;
    }

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className='flex justify-center bg-white'>
      <div className='mx-13 mt-110 mb-57 flex w-full min-w-350 flex-col gap-24 md:mx-0 md:mt-180 md:max-w-640 md:gap-56'>
        <div className='flex justify-center'>
          <Link href='/'>
            <BrandMark className='h-154 w-270 md:h-192 md:w-340' />
          </Link>
        </div>

        <form action={formAction}>
          <div className='flex flex-col gap-28'>
            <Input
              required
              name='email'
              error={errors.email}
              label='이메일'
              placeholder='이메일을 입력해 주세요'
              type='email'
              value={email}
              onBlur={() =>
                setErrors({ ...errors, email: validateEmail(email) })
              }
              onChange={(e) => setEmail(e.target.value)}
              className='mb-8'
            />
            <Input
              required
              name='password'
              error={errors.password}
              label='비밀번호'
              placeholder='비밀번호를 입력해주세요'
              type='password'
              value={password}
              onBlur={() =>
                setErrors({ ...errors, password: validatePassword(password) })
              }
              onChange={(e) => setPassword(e.target.value)}
              className='mb-8'
            />
            <Button
              variant='primary'
              className='h-48 rounded-md'
              disabled={isDisabled}
              type='submit'
            >
              로그인 하기
            </Button>
          </div>

          <p className='font-regular mt-24 text-center text-lg/19 text-gray-900 md:mt-32'>
            회원이 아니신가요?{' '}
            <Link href='/signup' className='text-green-300 underline'>
              회원가입하기
            </Link>
          </p>

          <div className='mt-40 flex flex-col items-center gap-24 md:mt-48 md:gap-40'>
            <div className='flex items-center gap-23.5 md:gap-37.5'>
              <hr className='w-80 border-t border-gray-300 md:w-180' />
              <span className='text-md font-regular text-gray-800 md:w-205 md:text-xl'>
                SNS 계정으로 로그인하기
              </span>
              <hr className='w-80 border-t border-gray-300 md:w-180' />
            </div>

            <button onClick={handleKakaoLogin}>
              <IconKakao className={'size-48 md:size-72'} />
            </button>
          </div>
        </form>
      </div>
      <Popup
        isOpen={errorPopupOpen}
        type='alert'
        onClose={() => setErrorPopupOpen(false)}
      >
        {errorMessage}
      </Popup>
    </div>
  );
}
