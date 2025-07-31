'use client';

export default function SkeletonBookingInterface() {
  return (
    <div className='w-full max-w-sm'>
      {/* PC */}
      <div className='hidden rounded-lg border border-gray-800 bg-white p-6 lg:block'>
        <div className='flex flex-col gap-10 px-20'>
          <div className='h-30 w-120 animate-pulse rounded bg-gray-300' />
          <div className='flex justify-center'>
            <div className='h-[300px] w-[280px] animate-pulse rounded-lg bg-gray-300' />
          </div>
          <div className='h-30 w-180 animate-pulse rounded bg-gray-300' />
          <div className='h-30 w-80 animate-pulse rounded bg-gray-300' />
          <div className='h-50 w-full animate-pulse rounded bg-gray-300' />
          <div className='h-30 w-full animate-pulse rounded bg-gray-300' />
        </div>
      </div>

      {/* 태블릿 */}
      <div className='relative hidden w-full max-w-sm rounded-lg border border-gray-800 bg-white p-6 md:block lg:hidden'>
        <div className='flex flex-col gap-20 px-18'>
          <div className='mb-6'>
            <div className='mb-4 h-6 w-24 animate-pulse rounded bg-gray-200' />
            <div className='h-12 w-full animate-pulse rounded-lg bg-gray-200' />
          </div>
          <div className='flex flex-col items-center justify-center gap-20 px-10'>
            <div className='h-10 w-28 animate-pulse rounded bg-gray-200' />
            <div className='h-[300px] w-[280px] animate-pulse rounded-lg bg-gray-200' />
            <div className='h-12 w-full animate-pulse rounded bg-gray-300' />
            <div className='h-6 w-24 animate-pulse rounded bg-gray-200' />
          </div>
        </div>
      </div>

      {/* 모바일 */}
      <div className='fixed right-0 bottom-0 left-0 z-50 block border border-gray-200 bg-white p-6 md:hidden'>
        <div className='mb-6 flex items-start justify-between'>
          <div className='flex-1'>
            <div className='mb-2 h-32 w-60 animate-pulse rounded bg-gray-300' />
            <div className='mb-4 h-20 w-24 animate-pulse rounded bg-gray-300' />
            <div className='h-[30px] w-full animate-pulse rounded-lg bg-gray-300' />
            <div className='mt-4 h-12 w-full animate-pulse rounded bg-gray-300' />
          </div>
        </div>
      </div>
    </div>
  );
}
