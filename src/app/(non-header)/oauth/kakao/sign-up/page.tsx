import { Suspense } from 'react';
import KakaoSigninCallbackPage from './kakaoSignupCallbackPage';
import Loading from '@/components/Loading';

export default function KakaoSignupPage() {
  return (
    <Suspense fallback={<Loading />}>
      <KakaoSigninCallbackPage />
    </Suspense>
  );
}
