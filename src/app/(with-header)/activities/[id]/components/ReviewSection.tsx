'use client';

import { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import Pagination from '@/components/Pagination';
import { useQuery } from '@tanstack/react-query';
import { privateInstance } from '@/apis/privateInstance';
import ReviewTitle from './ReviewTitle';

interface ReviewSectionProps {
  activityId: number;
  reviewCount: number;
  rating: number;
}

export default function ReviewSection({
  activityId,
  reviewCount,
  rating,
}: ReviewSectionProps) {
  const [page, setPage] = useState(1);
  const size = 3;

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

  if (isLoading) {
    return <p className='mt-4 text-gray-500'>리뷰를 불러오는 중입니다...</p>;
  }

  if (!reviewData || reviewData.reviews.length === 0) {
    return <p className='mt-4 text-gray-500'>작성된 리뷰가 없습니다.</p>;
  }

  if (isError) {
    throw new Error('에러발생');
  }

  return (
    <div className='mt-10 flex flex-col space-y-8'>
      <ReviewTitle reviewCount={reviewCount} rating={rating} />
      <div className='min-h-350'>
        {reviewData.reviews.map((review: any) => (
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
        ))}
      </div>

      <div>
        <Pagination
          currentPage={page}
          totalPage={Math.ceil(reviewData.totalCount / size)}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}
