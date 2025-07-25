// 'use client';

// export const dynamic = 'force-dynamic';

// import useUserStore from '@/stores/authStore';
// import axios from 'axios';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useEffect } from 'react';

// /**
//  * 카카오 로그인 콜백 처리 페이지 컴포넌트입니다.
//  *
//  * 카카오 인증 서버에서 리디렉션된 `code` 쿼리 파라미터를 받아
//  * 백엔드(`/api/auth/kakao/sign-in`)에 로그인 요청을 보냅니다.
//  * 응답에 포함된 사용자 정보를 Zustand 스토어에 저장하고,
//  * 로그인 성공 시 메인 페이지(`/`)로 이동합니다.
//  *
//  * 오류 발생 시 상태 코드에 따라 다른 알림 메시지를 출력하고
//  * 적절한 페이지(`/signup` 또는 `/login`)로 이동합니다.
//  *
//  * 주요 흐름:
//  * 1. `code` 파라미터 확인
//  * 2. POST 요청으로 로그인 시도
//  * 3. 사용자 존재 시 상태 저장 및 리다이렉트
//  * 4. 오류 상황에 따라 알림 및 경로 분기
//  *
//  * @component
//  * @returns {JSX.Element} "카카오 로그인 처리 중입니다..."라는 텍스트를 포함한 JSX
//  */
export default function KakaoSigninCallbackPage() {
  return <div>카카오 로그인 처리 예정</div>;
}
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const setUser = useUserStore((state) => state.setUser);

//   useEffect(() => {
//     const code = searchParams.get('code');
//     if (!code) return;

//     /**
//      * 카카오 로그인 처리를 위한 비동기 함수입니다.
//      * - 백엔드에 인증 코드 전송
//      * - 사용자 정보 저장
//      * - 오류 처리 및 알림
//      */
//     const handleKakaoLogin = async () => {
//       try {
//         const res = await axios.post('/api/auth/kakao/sign-in', { code });
//         const data = res.data;

//         if (data.user) {
//           setUser(data.user);
//           router.push('/');
//         }
//       } catch (err: unknown) {
//         if (axios.isAxiosError(err)) {
//           const status = err.response?.status;
//           const message = err.response?.data?.error;

//           switch (status) {
//             case 404:
//               alert('가입된 회원이 아닙니다. 회원가입을 진행해주세요.');
//               router.push('/signup');
//               break;
//             case 500:
//               alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
//               router.push('/login');
//               break;
//             default:
//               alert(message || '카카오 로그인 실패');
//               router.push('/login');
//               break;
//           }
//         } else {
//           alert('사용자 정보가 없습니다. 다시 시도해주세요.');
//           router.push('/login');
//         }
//       }
//     };

//     handleKakaoLogin();
//   }, [searchParams, router]);

//   return <div>카카오 로그인 처리 중입니다...</div>;
// }
