'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import 'dayjs/locale/ko';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import useBookingStore from '@/stores/Booking/useBookingStore';

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.locale('ko');

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

export default function DatePicker() {
  const {
    selectedDate,
    setSelectedDate,
    setAvailableDates,
    availableDates,
  } = useBookingStore();

  const today = dayjs();
  const [viewDate, setViewDate] = useState(dayjs(selectedDate));

  useEffect(() => {
    setAvailableDates(mockAvailableDates);
  }, [setAvailableDates]);

  const handleDateSelect = (date: dayjs.Dayjs) => {
    setSelectedDate(date.toDate());
  };

  const changeMonth = (direction: 'add' | 'subtract') => {
    setViewDate((prev) =>
      direction === 'add' ? prev.add(1, 'month') : prev.subtract(1, 'month'),
    );
  };

  const highlightDates = availableDates.map((item) => dayjs(item.date));

  return (
    <div className='w-full max-w-md rounded-2xl bg-white p-6'>
      <CalendarHeader viewDate={viewDate} onMonthChange={changeMonth} />
      <CalendarBody
        viewDate={viewDate}
        today={today}
        selectedDate={dayjs(selectedDate)}
        onSelectDate={handleDateSelect}
        highlightDates={highlightDates}
      />
    </div>
  );
}