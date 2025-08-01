'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import {
  getMyActivities,
  getMonthlyReservationDashboard,
  getReservedSchedules,
  getActivityReservations,
  updateActivityReservationStatus,
} from '@/apis/dashboard';
import { UpdateActivityReservationRequest } from '@/types/dashboardTypes';

export const DASHBOARD_QUERY_KEYS = {
  MY_ACTIVITIES: ['dashboard', 'my-activities'] as const,
  MONTHLY_DASHBOARD: ['dashboard', 'monthly'] as const,
  RESERVED_SCHEDULES: ['dashboard', 'reserved-schedules'] as const,
  ACTIVITY_RESERVATIONS: ['dashboard', 'activity-reservations'] as const,
} as const;

// 내 체험 리스트 조회
export const useMyActivities = () => {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.MY_ACTIVITIES,
    queryFn: getMyActivities,
    staleTime: 1000 * 60 * 5,
  });
};

// 월별 예약 현황 조회
export const useMonthlyReservationDashboard = (
  activityId: number,
  year: number,
  month: number,
) => {
  return useQuery({
    queryKey: [
      ...DASHBOARD_QUERY_KEYS.MONTHLY_DASHBOARD,
      activityId,
      year,
      month,
    ],
    queryFn: () => getMonthlyReservationDashboard(activityId, year, month),
    enabled: !!activityId,
    staleTime: 1000 * 60 * 5,
  });
};

// 날짜별 예약이 있는 스케줄 조회
export const useReservedSchedules = (activityId: number, date: string) => {
  return useQuery({
    queryKey: [...DASHBOARD_QUERY_KEYS.RESERVED_SCHEDULES, activityId, date],
    queryFn: () => getReservedSchedules(activityId, date),
    enabled: !!activityId && !!date,
    staleTime: 1000 * 60 * 2,
  });
};

// 체험 예약 내역 조회 (무한 스크롤)
export const useActivityReservations = (
  activityId: number,
  params: {
    scheduleId?: number;
    status?: 'pending' | 'confirmed' | 'declined';
  } = {},
) => {
  return useInfiniteQuery({
    queryKey: [
      ...DASHBOARD_QUERY_KEYS.ACTIVITY_RESERVATIONS,
      activityId,
      params,
    ],
    queryFn: ({ pageParam = 0 }) =>
      getActivityReservations(activityId, {
        cursorId: pageParam,
        size: 10,
        ...params,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.reservations.length === 10
        ? lastPage.cursorId
        : undefined;
    },
    initialPageParam: 0,
    enabled: !!activityId && !!params.scheduleId,
    staleTime: 1000 * 60 * 2,
  });
};

// 예약 상태 업데이트 (승인/거절)
export const useUpdateActivityReservationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      activityId,
      reservationId,
      data,
    }: {
      activityId: number;
      reservationId: number;
      data: UpdateActivityReservationRequest;
    }) => updateActivityReservationStatus(activityId, reservationId, data),

    onSuccess: (updatedReservation, variables) => {
      // 관련된 쿼리들 무효화
      queryClient.invalidateQueries({
        queryKey: [
          ...DASHBOARD_QUERY_KEYS.ACTIVITY_RESERVATIONS,
          variables.activityId,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          ...DASHBOARD_QUERY_KEYS.MONTHLY_DASHBOARD,
          variables.activityId,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          ...DASHBOARD_QUERY_KEYS.RESERVED_SCHEDULES,
          variables.activityId,
        ],
      });

      // 성공 메시지
      const statusText = {
        confirmed: '승인',
        declined: '거절',
        pending: '대기',
      };
      alert(`예약이 ${statusText[variables.data.status]}되었습니다.`);
    },

    onError: (error) => {
      alert(`예약 상태 변경 실패: ${error.message}`);
    },
  });
};

// 예약 거절
export const useDeclineMultipleReservations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      activityId,
      reservationIds,
    }: {
      activityId: number;
      reservationIds: number[];
    }) => {
      const promises = reservationIds.map((reservationId) =>
        updateActivityReservationStatus(activityId, reservationId, {
          status: 'declined',
        }),
      );
      return Promise.all(promises);
    },

    onSuccess: (_, variables) => {
      // 관련된 쿼리들 무효화
      queryClient.invalidateQueries({
        queryKey: [
          ...DASHBOARD_QUERY_KEYS.ACTIVITY_RESERVATIONS,
          variables.activityId,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          ...DASHBOARD_QUERY_KEYS.MONTHLY_DASHBOARD,
          variables.activityId,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          ...DASHBOARD_QUERY_KEYS.RESERVED_SCHEDULES,
          variables.activityId,
        ],
      });
    },

    onError: (error) => {
      alert(`예약 거절 실패: ${error.message}`);
    },
  });
};
