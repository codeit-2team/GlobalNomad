import { Suspense } from 'react';
import KakaoSigninCallbackPage from './kakaoSigninCallbackPage';
import Loading from '@/components/Loading';

export default function KakaoSigninPage() {
  return (
    <Suspense fallback={<Loading />}>
      <KakaoSigninCallbackPage />
    </Suspense>
  );
}
