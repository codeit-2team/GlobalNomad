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
  const experienceEndDateTime = new Date(`${date}T${endTime}`);
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

  return (
    <div className='flex h-[204px] w-[792px] overflow-hidden rounded-[24px] border border-gray-300 bg-white'>
      {/* 이미지 영역 */}
      <div className='relative h-[204px] w-[204px] flex-shrink-0'>
        <Image
          src={activity.bannerImageUrl}
          alt={activity.title}
          fill
          className='rounded-l-[24px] object-cover'
        />
      </div>

      {/* 콘텐츠 영역 */}
      <div className='flex flex-1 flex-col justify-start py-[21px] pr-[24px] pl-[24px]'>
        {/* 상태 라벨 */}
        <div>
          <span className={cn('text-lg font-bold', STATUS_COLORS[status])}>
            {STATUS_LABELS[status]}
          </span>
        </div>

        {/* 제목 */}
        <div className='mt-[8px]'>
          <h3 className='text-nomad text-xl font-bold'>{activity.title}</h3>
        </div>

        {/* 날짜 및 인원 정보 */}
        <div className='mt-[12px]'>
          <p className='text-2lg text-nomad'>
            {date} · {startTime} - {endTime} · {headCount}명
          </p>
        </div>

        {/* 가격 + 버튼  */}
        <div className='mt-[21px] flex items-center justify-between'>
          {/* 가격 */}
          <p className='text-2xl font-bold text-black'>
            ₩{totalPrice.toLocaleString()}
          </p>

          {/* 버튼 */}
          <div>
            {showCancelButton && (
              <Button
                variant='secondary'
                className='h-[43px] w-[144px] rounded-md text-lg font-bold'
                onClick={() => onCancel?.(id)}
              >
                예약 취소
              </Button>
            )}
            {showReviewButton && (
              <Button
                variant='primary'
                className='bg-nomad h-[43px] w-[144px] rounded-md text-lg font-bold'
                onClick={() => onReview?.(id)}
              >
                후기 작성
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
