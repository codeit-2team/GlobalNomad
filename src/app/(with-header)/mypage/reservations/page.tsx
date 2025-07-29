'use client';

import { useState } from 'react';
import {
  useMyReservations,
  useCancelReservation,
} from '@/hooks/useReservationQueries';
import { FilterOption } from '@/constants/reservationConstants';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import ReservationCard from './components/ReservationCard';
import ReservationFilter from './components/ReservationFilter';
import EmptyReservations from './components/EmptyReservations';
import CancelReservationModal from './components/CancelReservationModal';

export default function MyReservationsPage() {
  const [filter, setFilter] = useState<FilterOption>('');
  const [cancelModal, setCancelModal] = useState<{
    isOpen: boolean;
    reservationId: number | null;
  }>({
    isOpen: false,
    reservationId: null,
  });

  // 예약 리스트 조회 (무한 스크롤)
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useMyReservations(filter || undefined);

  // 예약 취소 뮤테이션
  const cancelReservationMutation = useCancelReservation();

  // 무한 스크롤 훅
  const { lastElementRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
  });

  // 예약 취소 모달 열기
  const handleCancelClick = (reservationId: number) => {
    setCancelModal({
      isOpen: true,
      reservationId,
    });
  };

  // 예약 취소 확인
  const handleCancelConfirm = () => {
    if (cancelModal.reservationId) {
      cancelReservationMutation.mutate(cancelModal.reservationId);
    }
    setCancelModal({ isOpen: false, reservationId: null });
  };

  // 예약 취소 모달 닫기
  const handleCancelClose = () => {
    setCancelModal({ isOpen: false, reservationId: null });
  };

  // 후기 작성 (나중에 구현)
  const handleReviewClick = (reservationId: number) => {
    console.log('후기 작성:', reservationId);
    // TODO: 후기 작성 모달 구현
  };

  // 전체 예약 목록
  const allReservations =
    data?.pages.flatMap((page) => page.reservations) ?? [];

  // 로딩 상태
  if (isLoading) {
    return (
      <div className='w-full max-w-none lg:max-w-[792px]'>
        <div className='mb-24 flex items-center justify-between'>
          <h1 className='text-nomad text-[32px] leading-[42px] font-bold'>
            예약 내역
          </h1>
          <ReservationFilter value={filter} onChange={setFilter} />
        </div>
        <div className='space-y-24'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='h-[204px] w-[792px] animate-pulse rounded-[24px] bg-gray-200'
            />
          ))}
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className='w-full max-w-none lg:max-w-[792px]'>
        <div className='mb-24 flex items-center justify-between'>
          <h1 className='text-nomad text-[32px] leading-[42px] font-bold'>
            예약 내역
          </h1>
          <ReservationFilter value={filter} onChange={setFilter} />
        </div>
        <div className='text-center text-red-500'>
          <p>예약 내역을 불러오는데 실패했습니다.</p>
          <p className='mt-2 text-sm text-gray-600'>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='w-full max-w-none lg:max-w-[792px]'>
        {/* 제목과 필터 */}
        <div className='mb-48 flex items-center justify-between'>
          <h1 className='text-nomad text-[32px] leading-[42px] font-bold'>
            예약 내역
          </h1>
          <ReservationFilter value={filter} onChange={setFilter} />
        </div>

        {/* 예약 내역 목록 */}
        {allReservations.length === 0 ? (
          <EmptyReservations />
        ) : (
          <div className='space-y-24'>
            {allReservations.map((reservation, index) => (
              <div
                key={reservation.id}
                ref={
                  index === allReservations.length - 1 ? lastElementRef : null
                }
              >
                <ReservationCard
                  reservation={reservation}
                  onCancel={handleCancelClick}
                  onReview={handleReviewClick}
                />
              </div>
            ))}

            {/* 무한 스크롤 로딩 */}
            {isFetchingNextPage && (
              <div className='h-[204px] w-[792px] animate-pulse rounded-[24px] bg-gray-200' />
            )}
          </div>
        )}
      </div>

      {/* 예약 취소 확인 모달 */}
      <CancelReservationModal
        isOpen={cancelModal.isOpen}
        onCancel={handleCancelClose}
        onConfirm={handleCancelConfirm}
        isLoading={cancelReservationMutation.isPending}
      />
    </>
  );
}
