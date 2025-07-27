'use client';

import useBookingStore from '@/stores/Booking/useBookingStore';
import BookingButton from './BookingButton';
import ParticipantsSelector from './ParticipantSelector';
import PriceDisplay from './PriceDisplay';
import TimeSelector from './TimeSelector';
import TotalPriceDisplay from './TotalPriceDisplay';
import BookingModal from '@/ui/BookingModal';
import DatePicker from '../DatePicker/DatePicker';
import Button from '../Button';
import { SchedulesProps } from '@/types/activityDetailType';
import { privateInstance } from '@/apis/privateInstance';
import { useParams } from 'next/navigation';

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
  const handleBooking = async () => {
    try {
      await privateInstance.post(`/activities/${id}/reservation`, {
        selectedTimeId,
        participants,
      });
      alert('예약이 완료되었습니다!');
      setIsOpen(false);
    } catch (err: any) {
      console.error('전체 에러:', err);

      alert(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          '예약에 실패했습니다.',
      );
    }
  };
  const setIsOpen = useBookingStore((state) => state.setIsOpen);
  const { selectedDate, selectedTime, participants, selectedTimeId } =
    useBookingStore();
  const { id } = useParams();

  const isBookable =
    !!selectedDate &&
    !!selectedTime &&
    !!selectedTimeId &&
    !!participants &&
    !isOwner;

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
          <BookingButton disabled={!isBookable} onClick={handleBooking}>
            {isOwner ? '본인이 등록한 체험입니다' : '예약하기'}
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
            <BookingModal schedules={schedules} />

            <BookingButton disabled={!isBookable} onClick={handleBooking}>
              {isOwner ? '본인이 등록한 체험입니다' : '예약하기'}
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
              ₩ 10,000{' '}
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
            <BookingModal schedules={schedules} />
            <Button
              variant='primary'
              disabled={!isBookable}
              className='py-20'
              onClick={handleBooking}
            >
              예약하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
