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
import { useBooking } from '@/hooks/useBooking';

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
  const setIsOpen = useBookingStore((state) => state.setIsOpen);

  const {
    onBooking,
    handleBooking,
    isBookable,
    buttonText,
    selectedDate,
    selectedTime,
  } = useBooking(isOwner);

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
              className='flex w-full items-center justify-center rounded-lg border border-gray-300 p-3 py-8 text-left text-black hover:bg-gray-50'
            >
              {selectedDate && selectedTime ? (
                <h2 className='animate-pulse'>
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
      <div className='fixed right-0 bottom-0 left-0 z-50 block h-150 border border-gray-200 bg-white px-20 md:hidden'>
        <div className='mb-6 flex items-start justify-between'>
          <div className='flex-1'>
            <PriceDisplay price={price} />
            <div
              onClick={() => setIsOpen(true)}
              className='mb-4 animate-pulse cursor-pointer text-sm text-gray-600'
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
