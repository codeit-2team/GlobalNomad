'use client';

import Image from 'next/image';
import Button from '@/components/Button';
import { Reservation } from '@/types/reservationTypes';
import { STATUS_LABELS, STATUS_COLORS } from '@/constants/reservationConstants';
import cn from '@/lib/cn';

interface ReservationCardProps {
  reservation: Reservation;
  onCancel?: (reservationId: number) => void;
  onReview?: (reservationId: number) => void;
}

// 체험 완료 여부 확인 (현재 시간이 체험 종료 시간을 지났는지)
const isExperienceCompleted = (date: string, endTime: string): boolean => {
  const experienceEndDateTime = new Date(`${date}T${endTime}+09:00`);
  return new Date() > experienceEndDateTime;
};

export default function ReservationCard({
  reservation,
  onCancel,
  onReview,
}: ReservationCardProps) {
  const {
    id,
    activity,
    status,
    reviewSubmitted,
    totalPrice,
    headCount,
    date,
    startTime,
    endTime,
  } = reservation;

  const isCompleted = isExperienceCompleted(date, endTime);
  const showCancelButton = status === 'pending';
  const showReviewButton = isCompleted && !reviewSubmitted;
  const showReviewCompleted = isCompleted && reviewSubmitted;

  return (
    <div className='flex h-128 w-full max-w-792 flex-row rounded-3xl border border-gray-300 bg-white sm:h-156 lg:h-204'>
      {/* 이미지 영역 */}
      <div className='relative h-full w-128 flex-shrink-0 overflow-hidden rounded-l-3xl sm:w-156 lg:w-204'>
        <Image
          src={activity.bannerImageUrl}
          alt={activity.title}
          fill
          className='rounded-l-24 object-cover'
        />
      </div>

      {/* 콘텐츠 영역 */}
      <div className='flex w-0 flex-grow flex-col justify-start px-12 py-10 sm:px-16 sm:py-12 lg:px-24 lg:py-14'>
        {/* 상태 라벨 */}
        <div>
          <span
            className={cn(
              'text-sm font-bold sm:text-lg',
              STATUS_COLORS[status],
            )}
          >
            {STATUS_LABELS[status]}
          </span>
        </div>

        {/* 제목 */}
        <div className='mt-4 sm:mt-6 lg:mt-8'>
          <h3 className='text-nomad truncate text-sm font-bold sm:text-lg lg:text-xl'>
            {activity.title}
          </h3>
        </div>

        {/* 날짜 및 인원 정보 */}
        <div className='mt-6 sm:mt-8 lg:mt-12'>
          <p className='text-nomad lg:text-2lg text-xs sm:text-sm'>
            {date} · {startTime} - {endTime} · {headCount}명
          </p>
        </div>

        {/* 가격 + 버튼  */}
        <div className='mt-auto flex items-center justify-between pt-4 sm:pt-6 lg:pt-8'>
          {/* 가격 */}
          <p className='text-base font-bold text-black sm:text-xl lg:text-2xl'>
            ₩{totalPrice.toLocaleString()}
          </p>

          {/* 버튼/상태 */}
          <div className='flex h-32 w-80 items-center justify-center sm:h-40 sm:w-112 lg:h-43 lg:w-144'>
            {showCancelButton && (
              <Button
                variant='secondary'
                className='h-32 w-80 rounded-md text-sm font-bold sm:h-40 sm:w-112 sm:text-lg lg:h-43 lg:w-144'
                onClick={() => onCancel?.(id)}
              >
                예약 취소
              </Button>
            )}
            {showReviewButton && (
              <Button
                variant='primary'
                className='bg-nomad h-32 w-80 rounded-md text-sm font-bold sm:h-40 sm:w-112 sm:text-lg lg:h-43 lg:w-144'
                onClick={() => onReview?.(id)}
              >
                후기 작성
              </Button>
            )}
            {showReviewCompleted && (
              <div className='text-sm font-bold text-gray-500 sm:text-lg'>
                후기 완료
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
