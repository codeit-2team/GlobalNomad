'use client';

import { useState } from 'react';
import useBookingStore from '@/stores/Booking/useBookingStore';
import Modal from '@/components/Modal';
import DatePicker from '@/components/DatePicker/DatePicker';
import TimeSelector from '@/components/FloatingBox/TimeSelector';
import BookingButton from '@/components/FloatingBox/BookingButton';
import ParticipantsSelector from '@/components/FloatingBox/ParticipantSelector';
import TotalPriceDisplay from '@/components/FloatingBox/TotalPriceDisplay';

export default function MobileModal() {
  const isOpen = useBookingStore((state) => state.isOpen);
  const setIsOpen = useBookingStore((state) => state.setIsOpen);

  const { selectedDate, selectedTime, participants } = useBookingStore();

  const [step, setStep] = useState<'date-time' | 'participants' | 'confirm'>(
    'date-time',
  );

  const next = () => {
    setStep((prev) => (prev === 'date-time' ? 'participants' : 'confirm'));
  };

  const prev = () => {
    setStep((prev) => (prev === 'confirm' ? 'participants' : 'date-time'));
  };

  const handleBooking = () => {
    alert('예약이 완료되었습니다!');
    setIsOpen(false);
    setStep('date-time');
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>예약하기</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Item className='relative min-h-400'>
          <div className={step === 'date-time' ? 'block' : 'hidden'}>
            <div className='flex justify-center'>
              <DatePicker />
            </div>
            <div className='mt-6'>
              <h3 className='mb-2 text-sm font-semibold text-gray-900'>
                예약 가능한 시간
              </h3>
              <TimeSelector />
            </div>
          </div>
          <div className={step === 'participants' ? 'block' : 'hidden'}>
            <div className='flex min-h-400 items-center justify-center'>
              <ParticipantsSelector />
            </div>
          </div>
          <div className={step === 'confirm' ? 'block' : 'hidden'}>
            <div className='flex min-h-400 flex-col items-center justify-center gap-20'>
              <h3 className='text-xl font-bold'>예약 내역 확인</h3>
              <div>
                <p className='font-bold'>
                  날짜 및 시간 {selectedDate?.toLocaleDateString()}{' '}
                  {selectedTime}{' '}
                </p>
              </div>
              <div>
                <p className='font-bold'>인원 {participants}</p>
              </div>
              <TotalPriceDisplay />
            </div>
          </div>
        </Modal.Item>
        <Modal.Footer>
          <div className='flex justify-between gap-10'>
            {step !== 'date-time' && (
              <button
                onClick={prev}
                className='flex-1 rounded-lg border border-gray-300 px-10 py-10 font-medium text-gray-700 hover:bg-gray-50'
              >
                이전
              </button>
            )}
            {step !== 'confirm' ? (
              <button
                onClick={next}
                className='flex-1 rounded-lg bg-green-800 px-10 py-10 font-medium text-white hover:bg-green-900'
              >
                다음
              </button>
            ) : (
              <BookingButton onClick={() => setIsOpen(false)}>
                확인
              </BookingButton>
            )}
          </div>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
