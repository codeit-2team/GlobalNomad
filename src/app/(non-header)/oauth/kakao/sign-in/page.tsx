import { Suspense } from 'react';
import KakaoSigninCallbackPage from './kakaoSigninCallbackPage';

export default function KakaoSigninPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KakaoSigninCallbackPage />
    </Suspense>
  );
}
