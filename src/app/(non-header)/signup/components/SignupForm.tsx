'use client';

import useUserStore from '@/stores/authStore';
import { User } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import Signup from '../action';
import Popup from '@/components/Popup';
import IconKakao from '@assets/svg/kakao';
import Link from 'next/link';
import Button from '@/components/Button';
import Input from '@/components/Input';
import BrandMark from '@assets/svg/brand-mark';
import {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordConfirmation,
} from '@/utils/validateInput';

interface SignupState {
  error?: string;
  user?: User;
}

/**
 * 사용자 회원가입 폼 컴포넌트입니다.
 *
 * 이메일, 닉네임, 비밀번호, 비밀번호 확인을 입력받아 서버 액션(Signup)을 통해 회원가입을 처리합니다.
 * 입력값에 대한 유효성 검사(포커스 아웃 시)가 수행되며, 모든 필드가 유효하고 입력되었을 때만 가입 버튼이 활성화됩니다.
 * 가입 성공 시 Zustand를 통해 사용자 정보를 저장하고 성공 팝업을 띄운 뒤 로그인 페이지로 이동합니다.
 * 실패 시 에러 메시지를 팝업으로 표시합니다.
 *
 * 또한 카카오 회원가입 버튼을 통해 소셜 가입도 지원합니다.
 *
 * 사용된 주요 로직 및 기능:
 * - `useActionState`: 서버 액션(Signup)과 상호작용
 * - Zustand (`useUserStore`): 사용자 정보 전역 저장
 * - 입력값 상태 및 에러 상태 관리
 * - 이메일/닉네임/비밀번호 유효성 검사
 * - 가입 성공/실패 팝업 처리
 * - 카카오 소셜 회원가입 리디렉션 처리
 *
 * @component
 * @returns {JSX.Element} 사용자 회원가입 UI를 렌더링하는 JSX
 */
export default function SignupForm() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirmation: '',
  });

  const hasErrors = Object.values(errors).some((msg) => msg !== '');
  const isAllFilled = email && nickname && password && passwordConfirmation;
  const isDisabled = !isAllFilled || hasErrors;

  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [successPopupOpen, setSuccessPopupOpen] = useState(false);

  const [state, formAction] = useActionState<SignupState, FormData>(Signup, {
    user: undefined,
    error: undefined,
  });

  useEffect(() => {
    if (state.user) {
      setUser(state.user);
      setSuccessPopupOpen(true);
    }
    if (state.error) {
      setErrorMessage(state.error);
      setErrorPopupOpen(true);
    }
  }, [state, setUser]);

  /**
   * 카카오 회원가입 버튼 클릭 시 실행되는 함수입니다.
   * 환경변수에서 리디렉션 URI와 클라이언트 ID를 읽어,
   * 카카오 OAuth 인증 페이지로 리다이렉션합니다.
   */
  const handleKakaoSignup = () => {
    const redirectUrl = process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URL ?? '';
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  /**
   * 회원가입 성공 팝업의 확인 버튼 클릭 시 호출되는 함수입니다.
   * 팝업을 닫고 로그인 페이지로 이동합니다.
   */
  const handleSuccessConfirm = () => {
    setSuccessPopupOpen(false);
    router.push('/login');
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
              name='nickname'
              error={errors.nickname}
              label='닉네임'
              placeholder='닉네임을 입력해 주세요'
              type='text'
              value={nickname}
              onBlur={() =>
                setErrors({ ...errors, nickname: validateNickname(nickname) })
              }
              onChange={(e) => setNickname(e.target.value)}
              className='mb-8'
            />
            <Input
              required
              name='password'
              error={errors.password}
              label='비밀번호'
              placeholder='8자 이상 입력해 주세요'
              type='password'
              value={password}
              onBlur={() =>
                setErrors({ ...errors, password: validatePassword(password) })
              }
              onChange={(e) => setPassword(e.target.value)}
              className='mb-8'
            />
            <Input
              required
              name='passwordConfirmation'
              error={errors.passwordConfirmation}
              label='비밀번호 확인'
              placeholder='비밀번호를 한번 더 입력해 주세요'
              type='password'
              value={passwordConfirmation}
              onBlur={() =>
                setErrors({
                  ...errors,
                  passwordConfirmation: validatePasswordConfirmation(
                    passwordConfirmation,
                    password,
                  ),
                })
              }
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className='mb-8'
            />
            <Button
              variant='primary'
              className='h-48 rounded-md'
              disabled={isDisabled}
              type='submit'
            >
              회원가입 하기
            </Button>
          </div>

          <p className='font-regular mt-24 text-center text-lg/19 text-gray-900 md:mt-32'>
            회원이신가요?{' '}
            <Link href='/login' className='text-green-300 underline'>
              로그인하기
            </Link>
          </p>

          <div className='mt-40 flex flex-col items-center gap-24 md:mt-48 md:gap-40'>
            <div className='flex items-center gap-17 md:gap-29'>
              <hr className='w-80 border-t border-gray-300 md:w-180' />
              <span className='text-md font-regular text-gray-800 md:w-222 md:text-xl'>
                SNS 계정으로 회원가입하기
              </span>
              <hr className='w-80 border-t border-gray-300 md:w-180' />
            </div>

            <button onClick={handleKakaoSignup}>
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

      <Popup
        isOpen={successPopupOpen}
        type='alert'
        onClose={handleSuccessConfirm}
      >
        가입이 완료되었습니다!
      </Popup>
    </div>
  );
}
