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

  const { activityOptions, uniqueTitles } = useMemo(() => {
    if (!activitiesData?.activities) {
      return {
        activityOptions: [] as ActivityOption[],
        uniqueTitles: [] as string[],
      };
    }

    const options: ActivityOption[] = activitiesData.activities.map(
      (activity: { id: number; title: string }) => ({
        value: activity.id.toString(),
        label: activity.title,
      }),
    );

    const uniqueTitles = options.map((option) => option.label);

    return { activityOptions: options, uniqueTitles };
  }, [activitiesData]);

  // 체험 변경 시 쿼리 무효화 함수
  const handleActivityChange = (selectedTitle: string): void => {
    const selectedOption = activityOptions.find(
      (option: ActivityOption) => option.label === selectedTitle,
    );

    if (selectedOption) {
      const activityId = parseInt(selectedOption.value);

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
    }
  };

  return {
    activityOptions,
    uniqueTitles,
    handleActivityChange,
  };
};
