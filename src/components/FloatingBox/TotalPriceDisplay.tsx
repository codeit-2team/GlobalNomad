import useBookingStore from '@/stores/Booking/useBookingStore';

export default function TotalPriceDisplay({ price }: { price: number }) {
  const participants = useBookingStore((state) => state.participants);

  return (
    <div className='mt-3 flex items-center justify-between text-xl font-semibold'>
      <span>총 합계</span>
      <span>₩ {(participants * price).toLocaleString()}</span>
    </div>
  );
}
