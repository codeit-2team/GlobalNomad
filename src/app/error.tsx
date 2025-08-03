'use client';

import Button from '@/components/Button';

export default function errorPage() {
  return (
    <main
      className="relative flex h-screen w-screen items-center justify-center px-10 md:justify-end bg-none md:bg-[url('/assets/img/404-image.png')] bg-no-repeat bg-cover md:bg-center"
    >
      <div className="relative z-10 w-full max-w-1200 mx-auto px-6 md:px-12 flex justify-center md:justify-end">
        <div className="flex flex-col items-center md:items-start gap-8 md:gap-20 text-center md:text-left max-w-xl">
          <h1 className="text-5xl md:text-8xl font-extrabold text-nomad">OPPS!</h1>
          <p className="text-base md:text-xl text-nomad mb-6 leading-relaxed">
            서비스 이용에 불편을 드려 죄송합니다.<br />
            잠시 후 다시 시도해 주세요.
          </p>
          <Button
            className="w-full max-w-200 px-30 py-16 rounded-[10px] shadow-lg hover:opacity-80 transition-colors duration-300 bg-nomad text-white text-base"
            variant="primary"
            onClick={() => (window.location.href = '/')}
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </main>
  );
}
