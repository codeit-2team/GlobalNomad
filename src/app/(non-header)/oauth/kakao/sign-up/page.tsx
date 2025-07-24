'use client';

import useUserStore from '@/stores/authStore';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const adjectives = [
  '상냥한',
  '용감한',
  '조용한',
  '귀여운',
  '멋진',
  '차분한',
  '빠른',
  '신비한',
];
const animals = [
  '고양이',
  '호랑이',
  '강아지',
  '여우',
  '곰',
  '사자',
  '토끼',
  '다람쥐',
];

/**
 * 카카오 회원가입 콜백 처리 페이지 컴포넌트입니다.
 *
 * 카카오 인증 서버에서 전달된 `code` 쿼리 파라미터를 바탕으로
 * 백엔드(`/api/auth/kakao/sign-up`)에 회원가입 요청을 보내고,
 * 성공적으로 가입된 사용자 정보를 Zustand 스토어에 저장한 후
 * 로그인 페이지(`/login`)로 이동합니다.
 *
 * 요청 시 랜덤한 형용사 + 동물 조합으로 닉네임을 생성하여 함께 전송합니다.
 *
 * 주요 흐름:
 * 1. `code` 쿼리 파라미터 존재 여부 확인
 * 2. 랜덤 닉네임 생성
 * 3. 서버에 회원가입 요청 전송
 * 4. 성공 시 사용자 정보 저장 및 리다이렉션
 * 5. 실패 시 알림 후 회원가입 페이지로 이동
 *
 * @component
 * @returns {JSX.Element} "카카오 회원가입 처리 중입니다..."라는 텍스트를 포함한 JSX
 */
export default function KakaoSignupCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useUserStore((state) => state.setUser);

  const nickname = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${animals[Math.floor(Math.random() * animals.length)]}`;

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) return;

    /**
     * 카카오 회원가입 처리를 위한 비동기 함수입니다.
     * - 인증 코드와 랜덤 닉네임을 포함하여 서버에 POST 요청
     * - 응답으로 받은 사용자 정보를 상태에 저장
     * - 성공 시 로그인 페이지로, 실패 시 회원가입 페이지로 이동
     */
    const handleKakaoSignup = async () => {
      try {
        const res = await axios.post('/api/auth/kakao/sign-up', {
          code,
          nickname,
        });
        const data = res.data;

        if (data.user) {
          setUser(data.user);
          router.push('/login');
        }
      } catch {
        alert('카카오 회원가입 실패');
        router.push('/signup');
      }
    };

    handleKakaoSignup();
  }, [searchParams, router]);

  return <div>카카오 회원가입 처리 중입니다...</div>;
}
