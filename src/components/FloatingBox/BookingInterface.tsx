'use client';

import useBookingStore from '@/stores/Booking/useBookingStore';
import BookingButton from './BookingButton';
import ParticipantsSelector from './ParticipantSelector';
import PriceDisplay from './PriceDisplay';
import TimeSelector from './TimeSelector';
import TotalPriceDisplay from './TotalPriceDisplay';
import BookingModal from '@/ui/BookingModal';
import DatePicker from '../DatePicker/DatePicker';
import { SchedulesProps } from '@/types/activityDetailType';
import { privateInstance } from '@/apis/privateInstance';
import { useParams } from 'next/navigation';
import { AxiosError } from 'axios';
import useUserStore from '@/stores/authStore';
import { toast } from 'sonner';
import { useState } from 'react';

export default function BookingInterface({
  schedules,
  onMonthChange,
  isOwner,
  price,
}: {
  schedules: SchedulesProps;
  onMonthChange?: (year: number, month: number) => void;
  isOwner: boolean;
  price: number;
}) {
  const [onBooking, setOnBooking] = useState(false);
  const { user } = useUserStore();
  const setIsOpen = useBookingStore((state) => state.setIsOpen);
  const {
    selectedDate,
    selectedTime,
    participants,
    selectedTimeId,
    setToInitial,
  } = useBookingStore();

  const { id } = useParams();

  const handleBooking = async () => {
    setOnBooking(true);
    try {
      await privateInstance.post(`/activities/${id}/reservation`, {
        selectedTimeId,
        participants,
      });

      toast.success('예약되었습니다!');
      setToInitial();
    } catch (err) {
      const error = err as AxiosError;
      const responseData = error.response?.data as
        | { error?: string; message?: string }
        | undefined;

      console.error('전체 에러:', error);

      toast.error(
        responseData?.error ||
          responseData?.message ||
          error.message ||
          '예약에 실패했습니다.',
      );
    } finally {
      setOnBooking(false);
    }
  };

  const isLoggedIn = !!user;
  const isBookable =
    !!selectedDate &&
    !!selectedTime &&
    !!selectedTimeId &&
    !!participants &&
    !isOwner &&
    isLoggedIn;

  const buttonText = !isLoggedIn
    ? '로그인이 필요한 기능입니다'
    : isOwner
      ? '본인이 등록한 체험입니다'
      : '예약하기';

  return (
    <div className='w-full max-w-sm'>
      {/* PC */}
      <div className='hidden rounded-lg border border-gray-800 bg-white p-6 lg:block'>
        <div className='flex flex-col gap-10 px-20'>
          <PriceDisplay price={price} />
          <div className='flex justify-center'>
            <DatePicker schedules={schedules} onMonthChange={onMonthChange} />
          </div>
          <TimeSelector />
          <ParticipantsSelector />
          <BookingButton
            onBooking={onBooking}
            disabled={!isBookable}
            onClick={handleBooking}
          >
            {buttonText}
          </BookingButton>
          <TotalPriceDisplay price={price} />
        </div>
      </div>

      {/* 태블릿 */}
      <div className='relative hidden w-full max-w-sm rounded-lg border border-gray-800 bg-white p-6 md:block lg:hidden'>
        <div className='flex flex-col gap-20 px-18'>
          <div className='mb-6'>
            <PriceDisplay price={price} />
            <h3 className='mb-4 text-lg font-semibold text-gray-900'>날짜</h3>
            <button
              onClick={() => setIsOpen(true)}
              className='w-full rounded-lg border border-gray-300 p-3 py-8 text-left text-black hover:bg-gray-50'
            >
              {selectedDate && selectedTime ? (
                <h2>
                  {selectedDate instanceof Date
                    ? selectedDate.toLocaleDateString()
                    : selectedDate}
                  /{selectedTime}
                </h2>
              ) : (
                '날짜선택하기'
              )}
            </button>
          </div>
          <div className='flex flex-col items-center justify-center gap-20 px-10'>
            <ParticipantsSelector />
            <BookingModal schedules={schedules} price={price} />

            <BookingButton
              onBooking={onBooking}
              disabled={!isBookable}
              onClick={handleBooking}
            >
              {buttonText}
            </BookingButton>
            <TotalPriceDisplay price={price} />
          </div>
        </div>
      </div>

      {/* 모바일 */}
      <div className='fixed right-0 bottom-0 left-0 z-50 block border border-gray-200 bg-white p-6 md:hidden'>
        <div className='mb-6 flex items-start justify-between'>
          <div className='flex-1'>
            <div className='mb-1 text-xl font-bold text-gray-900'>
              ₩{price}
              <span className='text-sm font-normal text-gray-600'>
                / 총 {participants}인
              </span>
            </div>
            <div
              onClick={() => setIsOpen(true)}
              className='mb-4 text-sm text-gray-600'
            >
              {selectedDate && selectedTime ? (
                <h2>
                  {selectedDate instanceof Date
                    ? selectedDate.toLocaleDateString()
                    : selectedDate}
                  /{selectedTime}
                </h2>
              ) : (
                '날짜 선택하기'
              )}
            </div>
            <BookingModal schedules={schedules} price={price} />
            <div className='flex justify-center'>
              <BookingButton
                onBooking={onBooking}
                disabled={!isBookable}
                onClick={handleBooking}
              >
                {buttonText}
              </BookingButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
