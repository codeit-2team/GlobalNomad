'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import useBookingStore from '@/stores/Booking/useBookingStore';
import { DatepickerStyles } from '@/components/floating-box/styles/DatePickerStyles';
import { useEffect } from 'react';

const mockAvailableDates = [
  {
    date: '2025-12-01',
    times: [{ id: 21498, startTime: '12:00', endTime: '13:00' }],
  },
  {
    date: '2025-12-05',
    times: [
      { id: 21499, startTime: '12:00', endTime: '13:00' },
      { id: 21500, startTime: '13:00', endTime: '14:00' },
      { id: 21501, startTime: '14:00', endTime: '15:00' },
    ],
  },
];

export default function Calendar() {
  const { selectedDate, setSelectedDate, setAvailableDates } =
    useBookingStore();

  useEffect(() => {
    setAvailableDates(mockAvailableDates);
  }, [setAvailableDates]);

  const highlightDates = mockAvailableDates.map(
    (item) => new Date(item.date + 'T00:00:00'),
  );

  return (
    <div className='mx-auto max-w-sm'>
      <DatepickerStyles />
      <DatePicker
        inline
        locale={ko}
        dateFormat='yyyy년 MM월 dd일'
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        calendarClassName='custom-calendar'
        dayClassName={(date) => {
          const isAvailable = highlightDates.some(
            (highlightDate) =>
              date.getFullYear() === highlightDate.getFullYear() &&
              date.getMonth() === highlightDate.getMonth() &&
              date.getDate() === highlightDate.getDate(),
          );
          return isAvailable ? 'highlight-day' : '';
        }}
      />
    </div>
  );
}
