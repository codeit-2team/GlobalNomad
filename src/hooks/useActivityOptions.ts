'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { MyActivitiesResponse } from '@/types/dashboardTypes';

interface ActivityOption {
  value: string;
  label: string;
}

export const useActivityOptions = (
  activitiesData: MyActivitiesResponse | undefined,
  onActivityChange?: (activityId: number) => void,
) => {
  const queryClient = useQueryClient();

  const activityOptions = useMemo(() => {
    if (!activitiesData?.activities) {
      return [] as ActivityOption[];
    }

    return activitiesData.activities.map(
      (activity: { id: number; title: string }) => ({
        value: activity.id.toString(),
        label: activity.title,
      }),
    );
  }, [activitiesData]);

  // 체험 변경 시 쿼리 무효화 함수
  const handleActivityChange = (selectedValue: string): void => {
    const activityId = parseInt(selectedValue);

    // 관련 쿼리들 무효화
    queryClient.invalidateQueries({
      queryKey: ['reservedSchedules'],
      exact: false,
    });
    queryClient.invalidateQueries({
      queryKey: ['activityReservations'],
      exact: false,
    });
    queryClient.invalidateQueries({
      queryKey: ['monthlyReservationDashboard'],
      exact: false,
    });

    // 콜백 호출
    onActivityChange?.(activityId);
  };

  return {
    activityOptions,
    handleActivityChange,
  };
};
