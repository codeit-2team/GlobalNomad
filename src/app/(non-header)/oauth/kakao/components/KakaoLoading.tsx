'use client';

interface KakaoLoadingProps {
  message: string;
}

export default function KakaoLoading({ message }: KakaoLoadingProps) {
  return (
    <div className='flex min-h-screen items-center justify-center bg-white'>
      <div className='flex flex-col items-center'>
        <div className='mb-6 h-30 w-30 animate-spin rounded-full border-4 border-yellow-100 border-t-transparent' />
        <p className='mt-4 text-lg font-semibold text-black'>{message}</p>
      </div>
    </div>
  );
}
