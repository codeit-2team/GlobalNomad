import useBookingStore from '@/stores/Booking/useBookingStore';
import { format } from 'date-fns';

export default function TimeSelector() {
  const selectedTime = useBookingStore((state) => state.selectedTime);
  const setSelectedTime = useBookingStore((state) => state.setSelectedTime);
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const availableDates = useBookingStore((state) => state.availableDates);

  const selectedDateStr = selectedDate
    ? format(selectedDate, 'yyyy-MM-dd')
    : null;

  const timeSlots =
    availableDates.find((item) => item.date === selectedDateStr)?.times ?? [];

  return (
    <div className='mb-6'>
      <h3 className='mb-4 text-xl font-bold text-black'>예약 가능한 시간</h3>
      <div className='flex flex-wrap gap-4'>
        {timeSlots.length === 0 ? (
          <p className='text-gray-500'>선택한 날짜에 가능한 시간이 없습니다.</p>
        ) : (
          timeSlots.map(({ id, startTime, endTime }) => {
            const timeRange = `${startTime}-${endTime}`;
            return (
              <button
                key={id}
                onClick={() => setSelectedTime(timeRange)}
                className={`rounded-md px-6 py-3 text-sm font-semibold ${
                  selectedTime === timeRange
                    ? 'bg-green-800 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {timeRange}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
