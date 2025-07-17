import useBookingStore from '@/stores/Booking/useBookingStore';

export default function ParticipantsSelector() {
  const participants = useBookingStore((state) => state.participants);
  const incrementParticipants = useBookingStore(
    (state) => state.incrementParticipants,
  );
  const decrementParticipants = useBookingStore(
    (state) => state.decrementParticipants,
  );
  return (
    <div className='mb-6'>
      <h3 className='mb-4 text-xl font-bold text-black'>참여 인원 수</h3>
      <div className='flex w-fit items-center rounded-lg border border-gray-300'>
        <button
          onClick={decrementParticipants}
          className='p-3 hover:bg-gray-50'
        >
          <svg
            className='h-12 w-12'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={4}
              d='M20 12H4'
            />
          </svg>
        </button>
        <span className='px-20 py-10 text-lg font-medium'>{participants}</span>
        <button
          onClick={incrementParticipants}
          className='p-3 hover:bg-gray-50'
        >
          <svg
            className='h-12 w-12'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={4}
              d='M12 4v16m8-8H4'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
