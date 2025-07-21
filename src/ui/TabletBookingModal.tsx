'use client';

import useBookingStore from '@/stores/Booking/useBookingStore';
import DatePicker from '@/components/DatePicker/DatePicker';
import TimeSelector from '@/components/FloatingBox/TimeSelector';
import IconClose from '@assets/svg/close';
import Button from '@/components/Button';

export default function TabletModal() {
  const isOpen = useBookingStore((state) => state.isOpen);
  const setIsOpen = useBookingStore((state) => state.setIsOpen);

  if (!isOpen) return null;

  return (
    <div className='absolute right-0 bottom-0 z-200 flex min-h-480 w-500 flex-col bg-white p-8 px-10 shadow-2xl inset-shadow-sm inset-shadow-gray-300'>
      <div className='mb-4 flex w-full items-center justify-between'>
        <h2 className='text-lg font-bold'>날짜</h2>
        <button onClick={() => setIsOpen(false)}>
          <IconClose />
        </button>
      </div>

      <div className='min-h-[400px] w-full'>
        <div className='mb-4 flex justify-center'>
          <DatePicker />
        </div>

        <div className='mt-6'>
          <h3 className='mb-2 text-sm font-semibold text-gray-900'>
            예약 가능한 시간
          </h3>
          <TimeSelector />
        </div>

        <Button
          variant='primary'
          className='py-20'
          onClick={() => setIsOpen(false)}
        >
          확인
        </Button>
      </div>
    </div>
  );
}
