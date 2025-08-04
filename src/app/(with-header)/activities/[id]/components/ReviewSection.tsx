'use client';

import React from 'react';
import { useState, useCallback } from 'react';
import ReviewCard from './ReviewCard';
import Pagination from '@/components/Pagination';
import { useQuery } from '@tanstack/react-query';
import { privateInstance } from '@/apis/privateInstance';
import ReviewTitle from './ReviewTitle';
import useUserStore from '@/stores/authStore';
import cn from '@/lib/cn';

import ReviewCardSkeleton from './Skeletons/ReviewCardSkeleton';

interface ReviewSectionProps {
  activityId: string;
  reviewCount: number;
  rating: number;
}

interface ReviewProps {
  id: string;
  user: {
    nickname: string;
    profileImageUrl: string;
  };
  createdAt: string;
  content: string;
}

function ReviewSection({
  activityId,
  reviewCount,
  rating,
}: ReviewSectionProps) {
  const [page, setPage] = useState(1);
  const size = 3;

  const { user } = useUserStore();

  const {
    data: reviewData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['reviews', activityId, page],
    queryFn: async () => {
      const res = await privateInstance.get(
        `/activities/${activityId}/review?page=${page}&size=${size}`,
      );
      return res.data;
    },
    enabled: !!activityId,
  });

  const ReviewComponent = useCallback(() => {
    return reviewData?.reviews.map((review: ReviewProps) => (
      <ReviewCard
        key={review.id}
        userName={review.user.nickname}
        avatarSrc={review.user.profileImageUrl}
        date={review.createdAt.slice(0, 10).replace(/-/g, '.')}
        reviewText={review.content}
      />
    ));
  }, [reviewData?.reviews]);

  if (isLoading) {
    return (
      <div className='mt-10 flex flex-col space-y-8'>
        <div className='relative min-h-300 flex-col'>
          <ReviewTitle reviewCount={reviewCount} rating={rating} />
          {[...Array(3)].map((_, index) => (
            <ReviewCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!reviewData || reviewData.reviews.length === 0) {
    return (
      <div className='mt-10 flex flex-col space-y-8'>
        <div className='relative min-h-300'>
          <ReviewTitle reviewCount={reviewCount} rating={rating} />

          <div className='pointer-events-none absolute inset-0 z-10 flex h-full items-center justify-center select-none'>
            <div className='flex max-w-md items-center justify-center rounded-md bg-white px-20 py-20 shadow-2xl ring-1 ring-gray-200 select-none'>
              <p className='text-md text-center font-bold text-gray-800'>
                작성된 후기가 없습니다
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    throw new Error('리뷰섹션에서 에러가 발생했습니다.');
  }

  return (
    <div className='mt-10 flex flex-col space-y-8'>
      <ReviewTitle reviewCount={reviewCount} rating={rating} />

      <div className='pointer-events-none relative min-h-300 select-none'>
        <div className={cn(user ? '' : 'blur-sm', 'mt-10')}>
          {ReviewComponent()}
        </div>

        {!user && (
          <div className='pointer-events-none absolute inset-0 z-10 flex h-full items-center justify-center select-none'>
            <div className='flex max-w-md items-center justify-center rounded-md bg-white px-20 py-20 shadow-2xl ring-1 ring-gray-200 select-none'>
              <p className='text-md text-center font-bold text-gray-800'>
                로그인 후 리뷰 전체 내용을 확인할 수 있어요
              </p>
            </div>
          </div>
        )}
      </div>

      <Pagination
        currentPage={page}
        totalPage={Math.ceil(reviewData.totalCount / size)}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}

export default React.memo(ReviewSection);
