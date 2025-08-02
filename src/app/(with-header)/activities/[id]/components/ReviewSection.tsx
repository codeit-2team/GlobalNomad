'use client';

import React from 'react';
import { useState, useCallback } from 'react';
import ReviewCard from './ReviewCard';
import Pagination from '@/components/Pagination';
import { useQuery } from '@tanstack/react-query';
import { privateInstance } from '@/apis/privateInstance';
import ReviewTitle from './ReviewTitle';
import useUserStore from '@/stores/authStore';
import Loading from '@/components/Loading';

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
        date={new Date(review.createdAt).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
        reviewText={review.content}
      />
    ));
  }, [reviewData?.reviews]);

  if (isLoading) {
    return (
      <div className='relative flex min-h-350'>
        <div className='flex items-center justify-center'>
          <Loading />
        </div>
      </div>
    );
  }

  if (!reviewData || reviewData.reviews.length === 0) {
    return (
      <div className='relative min-h-350'>
        <ReviewTitle reviewCount={reviewCount} rating={rating} />

        <div className='pointer-events-none absolute inset-0 z-10 flex items-center justify-center'>
          <div className='flex items-center justify-center font-bold'>
            <p>작성된 리뷰가 없습니다</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    throw new Error('에러발생');
  }

  return (
    <div className='mt-10 flex flex-col space-y-8'>
      <ReviewTitle reviewCount={reviewCount} rating={rating} />

      <div className='relative min-h-350'>
        <div className={user ? '' : 'blur-sm'}>{ReviewComponent()}</div>

        {!user && (
          <div className='pointer-events-none absolute inset-0 z-10 flex items-center justify-center'>
            <div className='rounded-md bg-white/70 px-4 py-2 shadow-md'>
              <p className='text-sm font-semibold text-gray-700'>
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
