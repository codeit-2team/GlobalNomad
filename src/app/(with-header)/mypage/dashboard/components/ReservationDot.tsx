import { DailyReservationCount } from '@/types/dashboardTypes';

interface Props {
  reservations?: DailyReservationCount;
}

export default function ReservationDot({ reservations }: Props) {
  if (!reservations) return null;

  const { pending, confirmed, completed } = reservations;
  const hasReservations = pending > 0 || confirmed > 0 || completed > 0;

  if (!hasReservations) return null;

  const isOnlyCompleted = completed > 0 && pending === 0 && confirmed === 0;
  const dotColor = isOnlyCompleted ? 'bg-gray-900' : 'bg-blue-300';

  return <div className={`h-6 w-6 rounded-full ${dotColor}`} />;
}
