import { DailyReservationCount } from '@/types/dashboardTypes';

interface Props {
  reservations?: DailyReservationCount;
}

export default function ReservationStatusChips({ reservations }: Props) {
  if (!reservations) return null;

  const { pending, confirmed, completed } = reservations;
  const chips = [];

  if (completed > 0) {
    chips.push(
      <div
        key='completed'
        className='rounded-4 flex h-30 w-110 items-center bg-gray-300 px-8 py-4'
      >
        <span className='text-md font-medium text-gray-900'>
          완료 {completed}
        </span>
      </div>,
    );
  }

  if (pending > 0) {
    chips.push(
      <div
        key='pending'
        className='rounded-4 flex h-30 w-110 items-center bg-blue-300 px-8 py-4'
      >
        <span className='text-md font-medium text-white'>예약 {pending}</span>
      </div>,
    );
  }

  if (confirmed > 0) {
    chips.push(
      <div
        key='confirmed'
        className='rounded-4 flex h-30 w-110 items-center bg-orange-100 px-8 py-4'
      >
        <span className='text-md font-medium text-orange-200'>
          확정 {confirmed}
        </span>
      </div>,
    );
  }

  if (chips.length === 0) return null;

  return (
    <div className='absolute bottom-2 left-2 flex flex-col gap-2'>{chips}</div>
  );
}
