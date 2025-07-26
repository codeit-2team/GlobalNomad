import { Suspense } from 'react';
import KakaoSigninCallbackPage from './kakaoSignupCallbackPage';

export default function KakaoSignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KakaoSigninCallbackPage />
    </Suspense>
  );
}
