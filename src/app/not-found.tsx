'use client';

import Button from '@/components/Button';

export default function NotFoundPage() {
  return (
    <div className='fixed inset-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gray-300 text-center'>
      <div className='z-10 w-full max-w-xl items-center justify-center space-y-6'>
        <div className='mb-2 flex w-full items-center justify-center'></div>
        <div className='space-y-6'>
          <h1 className='text-primary-100 text-3xl font-bold'>
            존재하지 않는 페이지입니다
          </h1>
        </div>
        <div className='mt-12 flex w-full items-center justify-center'>
          <Button
            className='cursor-pointer rounded-lg border border-gray-300 bg-gray-700 py-4 text-xl font-bold text-gray-100 transition-colors hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none'
            variant='primary'
            onClick={() => (window.location.href = '/')}
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}
