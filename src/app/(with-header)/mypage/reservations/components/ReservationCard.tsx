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
    <div className='rounded-24 flex h-204 w-792 overflow-hidden border border-gray-300 bg-white'>
      {/* 이미지 영역 */}
      <div className='relative h-204 w-204 flex-shrink-0'>
        <Image
          src={activity.bannerImageUrl}
          alt={activity.title}
          fill
          className='rounded-l-24 object-cover'
        />
      </div>

      {/* 콘텐츠 영역 */}
      <div className='flex flex-1 flex-col justify-start py-21 pr-24 pl-24'>
        {/* 상태 라벨 */}
        <div>
          <span className={cn('text-lg font-bold', STATUS_COLORS[status])}>
            {STATUS_LABELS[status]}
          </span>
        </div>

        {/* 제목 */}
        <div className='mt-8'>
          <h3 className='text-nomad text-xl font-bold'>{activity.title}</h3>
        </div>

        {/* 날짜 및 인원 정보 */}
        <div className='mt-12'>
          <p className='text-2lg text-nomad'>
            {date} · {startTime} - {endTime} · {headCount}명
          </p>
        </div>

        {/* 가격 + 버튼  */}
        <div className='mt-21 flex items-center justify-between'>
          {/* 가격 */}
          <p className='text-2xl font-bold text-black'>
            ₩{totalPrice.toLocaleString()}
          </p>

          {/* 버튼/상태 */}
          <div className='flex h-43 w-144 items-center justify-center'>
            {showCancelButton && (
              <Button
                variant='secondary'
                className='h-43 w-144 rounded-md text-lg font-bold'
                onClick={() => onCancel?.(id)}
              >
                예약 취소
              </Button>
            )}
            {showReviewButton && (
              <Button
                variant='primary'
                className='bg-nomad h-43 w-144 rounded-md text-lg font-bold'
                onClick={() => onReview?.(id)}
              >
                후기 작성
              </Button>
            )}
            {showReviewCompleted && (
              <div className='text-lg font-bold text-gray-500'>후기 완료</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
