'use client';

import { useParams } from 'next/navigation';
import Title from './Title';
import ImageGrid from './ImageGrid';
import BookingInterface from '@/components/FloatingBox/BookingInterface';
import LocationMap from '@/components/LocationMap';
import { useQuery } from '@tanstack/react-query';
import { privateInstance } from '@/apis/privateInstance';
import { useState, useEffect } from 'react';
import useUserStore from '@/stores/authStore';
import { padMonth } from '../utils/MonthFormatChange';
import ReviewSection from './ReviewSection';

export default function ActivityDetailForm() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(7);
  const [isOwner, setIsOwner] = useState(false);

  const { id } = useParams();

  const { data: activityData, isLoading } = useQuery({
    queryKey: ['activity', id],
    queryFn: async () => {
      return privateInstance.get(`/activities/${id}`);
    },
    select: (response) => response.data,
    enabled: !!id,
  });

  const userId = activityData?.userId;

  const currentUserId = useUserStore((state) =>
    state.user ? state.user.id : null,
  );

  useEffect(() => {
    if (currentUserId && currentUserId === userId) {
      setIsOwner(true);
      console.log('니가 작성한 체험임');
    } else {
      setIsOwner(false);
    }
  }, [currentUserId, userId]);

  const { data: schedulesData } = useQuery({
    queryKey: ['available-schedule', id, year, month],
    queryFn: async () => {
      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;
      const nextMonth = month === 12 ? 1 : month + 1;
      const nextYear = month === 12 ? year + 1 : year;

      const results = await Promise.allSettled([
        privateInstance.get(
          `/activities/${id}/available-schedule?year=${prevYear}&month=${padMonth(prevMonth)}`,
        ),
        privateInstance.get(
          `/activities/${id}/available-schedule?year=${year}&month=${padMonth(month)}`,
        ),
        privateInstance.get(
          `/activities/${id}/available-schedule?year=${nextYear}&month=${padMonth(nextMonth)}`,
        ),
      ]);
      // 성공한 것만 합치기
      const data = results
        .filter((r) => r.status === 'fulfilled')
        .flatMap((r) => (r.status === 'fulfilled' ? r.value.data : []));
      return data;
    },
    enabled: !!id && !!year && !!month,
  });

  if (isLoading || !activityData) {
    return <div>로딩 중...</div>;
  }

  const subImageUrls = activityData.subImages.map(
    (image: { imageUrl: string }) => image.imageUrl,
  );

  return (
    <div className='mx-auto max-w-1200 p-4 sm:px-20 lg:p-8'>
      <Title {...activityData} isOwner={isOwner} />
      <ImageGrid
        mainImage={activityData.bannerImageUrl}
        subImages={subImageUrls}
      />

      <div
        className={`mt-86 grid gap-15 ${
          isOwner ? 'md:grid-cols-2' : 'md:grid-cols-3'
        } grid-cols-1`}
      >
        <div className={`${isOwner ? 'md:col-span-2' : 'md:col-span-2'}`}>
          <h2 className='mb-4 pb-2 text-2xl font-bold'>체험 설명</h2>
          <p className='leading-relaxed whitespace-pre-line'>
            {activityData.description}
          </p>
        </div>

        {!isOwner && (
          <div className='md:row-span-2'>
            <BookingInterface
              schedules={schedulesData ?? []}
              onMonthChange={(year, month) => {
                setTimeout(() => {
                  setYear(year);
                  setMonth(month);
                }, 0);
              }}
              isOwner={isOwner}
              price={activityData.price}
            />
          </div>
        )}

        <div className={`${isOwner ? 'md:col-span-4' : 'md:col-span-2'}`}>
          <h2 className='mb-4 pb-2 text-2xl font-bold'>체험 장소</h2>
          <LocationMap address={activityData.address} />

          <ReviewSection activityId={id as string} {...activityData} />
        </div>
      </div>
    </div>
  );
}
