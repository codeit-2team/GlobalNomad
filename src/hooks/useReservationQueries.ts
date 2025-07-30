'use client';

import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { getMyReservations, updateMyReservation, createReview } from '@/apis/reservations';
import { ReservationStatus, CreateReviewRequest } from '@/types/reservationTypes';

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
      alert('예약이 취소되었습니다.');
    },
    onError: (error) => {
      alert(`예약 취소 실패: ${error.message}`);
    },
  });
};

// 후기 작성 훅
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reservationId, data }: { reservationId: number; data: CreateReviewRequest }) =>
      createReview(reservationId, data),
    onSuccess: () => {
      // 예약 리스트 캐시 무효화하여 reviewSubmitted 상태 업데이트
      queryClient.invalidateQueries({
        queryKey: RESERVATION_QUERY_KEYS.RESERVATIONS,
      });
    },
  });
};
