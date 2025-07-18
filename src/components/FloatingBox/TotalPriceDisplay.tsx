import useBookingStore from '@/stores/Booking/useBookingStore';

export default function TotalPriceDisplay() {
  const participants = useBookingStore((state) => state.participants);
  const pricePerPerson = 1000;
  return (
    <div className='mt-3 flex items-center justify-between text-xl font-semibold'>
      <span>총 합계</span>
      <span>₩ {(participants * pricePerPerson).toLocaleString()}</span>
    </div>
  );
}
