import { Suspense } from 'react';
import Loading from '@/components/Loading';
import KakaoSignupCallbackPage from './kakaoSignupCallbackPage';

export default function KakaoSignupPage() {
  return (
    <Suspense fallback={<Loading />}>
      <KakaoSignupCallbackPage />
    </Suspense>
  );
}
