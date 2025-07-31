'use client';

import SkeletonBookingInterface from './Skeletons/BookingInterfaceSkeleton';
import useUserStore from '@/stores/authStore';

export default function ActivityDetailSkeleton({ userId }: { userId: number }) {
  const currentUserId = useUserStore((state) => state.user?.id);
  const isOwner = currentUserId && userId && currentUserId === userId;

  console.log(isOwner);
  return (
    <div className='mx-auto max-w-1200 animate-pulse p-4 sm:px-20 lg:p-8'>
      {/* 타이틀부분 */}

      <div className='mb-6 flex items-start justify-between'>
        <div className='flex w-full flex-col gap-10'>
          <div className='h-16 w-24 rounded bg-gray-300' />
          <div className='h-42 w-3/4 rounded bg-gray-300' />
          <div className='flex gap-10'>
            <div className='h-20 w-50 rounded bg-gray-300' />
            <div className='h-20 w-170 rounded bg-gray-300' />
          </div>
        </div>
        {isOwner && <div className='h-8 w-8 rounded-full bg-gray-300' />}
      </div>

      {/* 이미지그리드 */}
      <div className='relative block aspect-square h-[300px] w-full overflow-hidden rounded-lg bg-gray-300 md:hidden' />
      <div className='hidden h-[500px] grid-cols-4 grid-rows-4 gap-6 md:grid'>
        <div className='col-span-2 row-span-4 rounded-lg bg-gray-300' />
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className='col-span-1 row-span-2 rounded-lg bg-gray-300'
          />
        ))}
      </div>

      {/* 설명/예약인터페이스/장소 */}
      <div
        className={`mt-86 grid gap-10 ${
          isOwner ? 'md:grid-cols-2' : 'md:grid-cols-3'
        } grid-cols-1`}
      >
        {/* 설명 */}
        <div className='md:col-span-2'>
          <div className='mb-10 h-34 w-90 rounded bg-gray-300' />
          <div className='mb-4 h-180 w-full rounded bg-gray-300' />
        </div>

        {/* 예약인터페이스 */}
        {!isOwner && (
          <div className='md:row-span-2'>
            <SkeletonBookingInterface />
          </div>
        )}

        {/* 체험 장소/리뷰 */}
        <div
          className={`${isOwner ? 'md:col-span-4' : 'md:col-span-2'} space-y-8`}
        >
          {/* 장소 */}
          <div>
            <div className='mb-10 h-34 w-90 rounded bg-gray-300' />
            <div className='h-[480px] w-full rounded-lg bg-gray-400 shadow-md' />
            <div className='mt-8 flex items-center space-x-3'>
              <div className='h-6 w-6 rounded-full bg-gray-300' />
              <div className='h-5 w-1/2 rounded bg-gray-300' />
            </div>
          </div>

          {/* 리뷰 */}
          <div>
            <div className='mb-2 h-6 w-24 rounded bg-gray-300' />
            <div className='mb-4 h-8 w-20 rounded bg-gray-200' />
            {[...Array(3)].map((_, i) => (
              <div key={i} className='mb-4 flex gap-4'>
                <div className='h-10 w-10 rounded-full bg-gray-300' />
                <div className='flex-1 space-y-2'>
                  <div className='h-4 w-24 rounded bg-gray-200' />
                  <div className='h-4 w-full rounded bg-gray-200' />
                  <div className='h-4 w-3/4 rounded bg-gray-200' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
