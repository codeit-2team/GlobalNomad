'use client';

import { useParams } from 'next/navigation';
import Title from './Title';
import ImageGrid from './ImageGrid';
import BookingInterface from '@/components/FloatingBox/BookingInterface';
import LocationMap from '@/components/LocationMap';
import ReviewTitle from './ReviewTitle';
import { useQuery } from '@tanstack/react-query';
import { privateInstance } from '@/apis/privateInstance';
import { useState, useEffect } from 'react';

export default function ActivityDetailForm() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(12);

  const { id } = useParams();

  const { data: activityData, isLoading } = useQuery({
    queryKey: ['activity', id],
    queryFn: async () => {
      return privateInstance.get(`/activities/${id}`);
    },
    select: (response) => response.data,
    enabled: !!id,
    staleTime: 0,
  });

  const { data: schedulesData } = useQuery({
    queryKey: ['available-schedule', id, year, month],
    queryFn: async () => {
      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;
      const nextMonth = month === 12 ? 1 : month + 1;
      const nextYear = month === 12 ? year + 1 : year;

      const results = await Promise.allSettled([
        privateInstance.get(
          `/activities/${id}/available-schedule?year=${prevYear}&month=${prevMonth}`,
        ),
        privateInstance.get(
          `/activities/${id}/available-schedule?year=${year}&month=${month}`,
        ),
        privateInstance.get(
          `/activities/${id}/available-schedule?year=${nextYear}&month=${nextMonth}`,
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
      <Title {...activityData} />
      <ImageGrid
        mainImage={activityData.bannerImageUrl}
        subImages={subImageUrls}
      />

      <div className='mt-86 grid grid-cols-1 gap-15 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <h2 className='mb-4 pb-2 text-2xl font-bold'>체험 설명</h2>
          <p className='whitespace-pre-line'>{activityData.description}</p>
        </div>
        <div className='md:row-span-2'>
          <BookingInterface
            schedules={schedulesData ?? []}
            onMonthChange={(year, month) => {
              setTimeout(() => {
                setYear(year);
                setMonth(month);
              }, 0);
            }}
          />
        </div>

        <div className='md:col-span-2'>
          <h2 className='mb-4 pb-2 text-2xl font-bold'>체험 장소</h2>
          <LocationMap address={activityData.address} />
          <ReviewTitle />
        </div>
      </div>
    </div>
  );
}
