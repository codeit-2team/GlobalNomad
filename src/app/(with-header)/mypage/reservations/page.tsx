'use client';

import { useState } from 'react';
import {
  useMyReservations,
  useCancelReservation,
  useCreateReview,
} from '@/hooks/useReservationQueries';
import { FilterOption } from '@/constants/reservationConstants';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import ReservationCard from './components/ReservationCard';
import ReservationFilter from './components/ReservationFilter';
import EmptyReservations from './components/EmptyReservations';
import CancelReservationModal from './components/CancelReservationModal';
import ReviewModal from './components/ReviewModal';

export default function MyReservationsPage() {
  const [filter, setFilter] = useState<FilterOption>('');
  const [cancelModal, setCancelModal] = useState<{
    isOpen: boolean;
    reservationId: number | null;
  }>({
    isOpen: false,
    reservationId: null,
  });

  const [reviewModal, setReviewModal] = useState<{
    isOpen: boolean;
    reservationId: number | null;
    activityTitle: string | null;
    activityImage: string | null;
    activityDate: string | null;
    activityTime: string | null;
    headCount: number | null;
    totalPrice: number | null;
  }>({
    isOpen: false,
    reservationId: null,
    activityTitle: null,
    activityImage: null,
    activityDate: null,
    activityTime: null,
    headCount: null,
    totalPrice: null,
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

  // 후기 작성 뮤테이션
  const createReviewMutation = useCreateReview();

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

  // 후기 작성 모달 열기
  const handleReviewClick = (reservationId: number) => {
    const reservation = allReservations.find((r) => r.id === reservationId);
    setReviewModal({
      isOpen: true,
      reservationId,
      activityTitle: reservation?.activity.title || null,
      activityImage: reservation?.activity.bannerImageUrl || null,
      activityDate: reservation?.date || null,
      activityTime:
        `${reservation?.startTime} - ${reservation?.endTime}` || null,
      headCount: reservation?.headCount || null,
      totalPrice: reservation?.totalPrice || null,
    });
  };

  // 후기 작성 확인
  const handleReviewConfirm = (rating: number, content: string) => {
    if (reviewModal.reservationId) {
      createReviewMutation.mutate(
        {
          reservationId: reviewModal.reservationId,
          data: { rating, content },
        },
        {
          onSuccess: () => {
            alert('후기가 작성되었습니다.');
            setReviewModal({
              isOpen: false,
              reservationId: null,
              activityTitle: null,
              activityImage: null,
              activityDate: null,
              activityTime: null,
              headCount: null,
              totalPrice: null,
            });
          },
          onError: (error) => {
            alert(`후기 작성 실패: ${error.message}`);
          },
        },
      );
    }
  };

  // 후기 작성 모달 닫기
  const handleReviewClose = () => {
    setReviewModal({
      isOpen: false,
      reservationId: null,
      activityTitle: null,
      activityImage: null,
      activityDate: null,
      activityTime: null,
      headCount: null,
      totalPrice: null,
    });
  };

  // 전체 예약 목록
  const allReservations =
    data?.pages.flatMap((page) => page.reservations) ?? [];

  // 로딩 상태
  if (isLoading) {
    return (
      <div className='w-full max-w-none lg:max-w-792'>
        <div className='mb-48 flex items-center justify-between'>
          <h1 className='text-nomad text-3xl leading-42 font-bold'>
            예약 내역
          </h1>
          <ReservationFilter value={filter} onChange={setFilter} />
        </div>
        <div className='space-y-24'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='flex h-128 w-full max-w-792 animate-pulse flex-row rounded-3xl bg-gray-200 sm:h-156 lg:h-204'
            >
              {/* 이미지 영역 스켈레톤 */}
              <div className='h-full w-128 flex-shrink-0 rounded-l-3xl bg-gray-200 sm:w-156 lg:w-204'></div>

              {/* 콘텐츠 영역 스켈레톤 */}
              <div className='flex w-0 flex-grow flex-col justify-start px-12 py-10 sm:px-16 sm:py-12 lg:px-24 lg:py-14'>
                {/* 상태 라벨 스켈레톤 */}
                <div className='h-4 w-16 rounded bg-gray-200 sm:h-5 sm:w-20'></div>

                {/* 제목 스켈레톤 */}
                <div className='mt-4 h-4 w-40 rounded bg-gray-200 sm:mt-6 sm:h-5 sm:w-48 lg:mt-8 lg:h-6 lg:w-56'></div>

                {/* 날짜 및 인원 정보 스켈레톤 */}
                <div className='mt-6 h-3 w-32 rounded bg-gray-200 sm:mt-8 sm:h-4 sm:w-40 lg:mt-12 lg:h-4 lg:w-48'></div>

                {/* 가격 + 버튼 영역 스켈레톤 */}
                <div className='mt-auto flex items-center justify-between pt-4 sm:pt-6 lg:pt-8'>
                  {/* 가격 스켈레톤 */}
                  <div className='h-5 w-24 rounded bg-gray-200 sm:h-6 sm:w-28 lg:h-7 lg:w-32'></div>

                  {/* 버튼 스켈레톤 */}
                  <div className='h-32 w-80 rounded bg-gray-200 sm:h-40 sm:w-112 lg:h-43 lg:w-144'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className='w-full max-w-none lg:max-w-792'>
        <div className='mb-48 flex items-center justify-between'>
          <h1 className='text-nomad text-3xl leading-42 font-bold'>
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
      <div className='w-full max-w-none lg:max-w-792'>
        {/* 제목과 필터 */}
        <div className='mb-48 flex items-center justify-between'>
          <h1 className='text-nomad text-3xl leading-42 font-bold'>
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
              <div className='flex h-128 w-full max-w-792 animate-pulse flex-row rounded-3xl bg-gray-200 sm:h-156 lg:h-204'>
                {/* 이미지 영역 스켈레톤 */}
                <div className='h-full w-128 flex-shrink-0 rounded-l-3xl bg-gray-200 sm:w-156 lg:w-204'></div>

                {/* 콘텐츠 영역 스켈레톤 */}
                <div className='flex w-0 flex-grow flex-col justify-start px-12 py-10 sm:px-16 sm:py-12 lg:px-24 lg:py-14'>
                  {/* 상태 라벨 스켈레톤 */}
                  <div className='h-4 w-16 rounded bg-gray-200 sm:h-5 sm:w-20'></div>

                  {/* 제목 스켈레톤 */}
                  <div className='mt-4 h-4 w-40 rounded bg-gray-200 sm:mt-6 sm:h-5 sm:w-48 lg:mt-8 lg:h-6 lg:w-56'></div>

                  {/* 날짜 및 인원 정보 스켈레톤 */}
                  <div className='mt-6 h-3 w-32 rounded bg-gray-200 sm:mt-8 sm:h-4 sm:w-40 lg:mt-12 lg:h-4 lg:w-48'></div>

                  {/* 가격 + 버튼 영역 스켈레톤 */}
                  <div className='mt-auto flex items-center justify-between pt-4 sm:pt-6 lg:pt-8'>
                    {/* 가격 스켈레톤 */}
                    <div className='h-5 w-24 rounded bg-gray-200 sm:h-6 sm:w-28 lg:h-7 lg:w-32'></div>

                    {/* 버튼 스켈레톤 */}
                    <div className='h-32 w-80 rounded bg-gray-200 sm:h-40 sm:w-112 lg:h-43 lg:w-144'></div>
                  </div>
                </div>
              </div>
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

      {/* 후기 작성 모달 */}
      <ReviewModal
        isOpen={reviewModal.isOpen}
        onClose={handleReviewClose}
        onConfirm={handleReviewConfirm}
        isLoading={createReviewMutation.isPending}
        activityTitle={reviewModal.activityTitle || undefined}
        activityImage={reviewModal.activityImage || undefined}
        activityDate={reviewModal.activityDate || undefined}
        activityTime={reviewModal.activityTime || undefined}
        headCount={reviewModal.headCount || undefined}
        totalPrice={reviewModal.totalPrice || undefined}
      />
    </>
  );
}
