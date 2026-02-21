'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import useUserStore from '@/stores/authStore';
import BookingInterface from '@/components/FloatingBox/BookingInterface';
import { privateInstance } from '@/apis/privateInstance';
import { GroupedSchedule } from '@/types/activityDetailType';
import { padMonth } from '../utils/MonthFormatChange';

export default function BookingSection({
  activityId,
  userId,
  price,
}: {
  activityId: string;
  userId: number;
  price: number;
}) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const currentUserId = useUserStore((state) =>
    state.user ? state.user.id : null,
  );
  const isOwner = currentUserId != null && userId != null && currentUserId === userId;

  const { data: schedulesData } = useQuery({
    queryKey: ['available-schedule', activityId, year, month],
    queryFn: async () => {
      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;
      const nextMonth = month === 12 ? 1 : month + 1;
      const nextYear = month === 12 ? year + 1 : year;

    
      const currentResponse = await privateInstance.get<GroupedSchedule[]>(
        `/activities/${activityId}/available-schedule?year=${year}&month=${padMonth(month)}`,
      );

     
      const sideResults = await Promise.allSettled([
        privateInstance.get<GroupedSchedule[]>(
          `/activities/${activityId}/available-schedule?year=${prevYear}&month=${padMonth(prevMonth)}`,
        ),
        privateInstance.get<GroupedSchedule[]>(
          `/activities/${activityId}/available-schedule?year=${nextYear}&month=${padMonth(nextMonth)}`,
        ),
      ]);

      const sideData = sideResults
        .filter(
          (r): r is PromiseFulfilledResult<AxiosResponse<GroupedSchedule[]>> => r.status === 'fulfilled',
        )
        .flatMap((r) => r.value.data);

      return [...sideData, ...currentResponse.data];
    },
    enabled: !!activityId && !!year && !!month && !isOwner,
  });

  const handleMonthChange = useCallback((year: number, month: number) => {
    setTimeout(() => {
      setYear(year);
      setMonth(month);
    });
  }, []);

  if (isOwner) return null;

  return (
    <div className='md:row-span-2'>
      <BookingInterface
        schedules={schedulesData ?? []}
        onMonthChange={handleMonthChange}
        isOwner={isOwner}
        price={price}
      />
    </div>
  );
}
