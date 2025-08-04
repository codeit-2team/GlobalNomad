'use client';

import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import {
  getMyReservations,
  updateMyReservation,
  createReview,
} from '@/apis/reservations';
import {
  ReservationStatus,
  CreateReviewRequest,
} from '@/types/reservationTypes';
import { toast } from 'sonner';

export const RESERVATION_QUERY_KEYS = {
  RESERVATIONS: ['reservations'] as const,
} as const;

// 내 예약 리스트 조회 (무한 스크롤)
export const useMyReservations = (status?: ReservationStatus) => {
  return useInfiniteQuery({
    queryKey: [...RESERVATION_QUERY_KEYS.RESERVATIONS, status],
    queryFn: ({ pageParam = 0 }) =>
      getMyReservations({
        cursorId: pageParam,
        size: 10,
        status,
      }),
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 있으면 cursorId 반환, 없으면 undefined
      return lastPage.reservations.length === 10
        ? lastPage.cursorId
        : undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

// 예약 취소 훅
export const useCancelReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservationId: number) =>
      updateMyReservation(reservationId, { status: 'canceled' }),
    onSuccess: () => {
      // 예약 리스트 캐시 무효화하여 최신 데이터 다시 가져오기
      queryClient.invalidateQueries({
        queryKey: RESERVATION_QUERY_KEYS.RESERVATIONS,
      });
      toast.success('예약이 취소되었습니다.');
    },
    onError: (error) => {
      toast.error(`예약 취소 실패: ${error.message}`);
    },
  });
};

// 후기 작성 훅
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reservationId,
      data,
    }: {
      reservationId: number;
      data: CreateReviewRequest;
    }) => createReview(reservationId, data),
    onSuccess: () => {
      // 기존 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: RESERVATION_QUERY_KEYS.RESERVATIONS,
      });

      toast.success('후기가 작성되었습니다.');
    },
    onError: (error) => {
      toast.error(`후기 작성 실패: ${error.message}`);
    },
  });
};

// 쿼리 무효화 훅
export const useInvalidateActivityQueries = () => {
  const queryClient = useQueryClient();

  return (activityId: number) => {
    queryClient.invalidateQueries({
      queryKey: ['popularExperiences'],
    });
    queryClient.invalidateQueries({
      queryKey: ['experiences'],
      exact: false,
    });
    queryClient.invalidateQueries({
      queryKey: ['activity', activityId.toString()],
    });
    queryClient.invalidateQueries({
      queryKey: ['reviews'],
      exact: false,
    });
  };
};
