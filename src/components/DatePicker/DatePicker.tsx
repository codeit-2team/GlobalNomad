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
import { SchedulesProps } from '@/types/activityDetailType';

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.locale('ko');

export default function DatePicker({
  schedules,
  onMonthChange,
}: {
  schedules: SchedulesProps;
  onMonthChange?: (year: number, month: number) => void;
}) {
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const setSelectedDate = useBookingStore((state) => state.setSelectedDate);
  const setAvailableDates = useBookingStore((state) => state.setAvailableDates);
  const availableDates = useBookingStore((state) => state.availableDates);

  const today = dayjs();

  const [viewDate, setViewDate] = useState(() =>
    selectedDate ? dayjs(selectedDate) : today,
  );

  useEffect(() => {
    setAvailableDates(schedules);
  }, [setAvailableDates, schedules]);

  useEffect(() => {
    if (!selectedDate && schedules.length > 0) {
      const firstSchedule = schedules.find(
        (item) =>
          dayjs(item.date).year() === viewDate.year() &&
          dayjs(item.date).month() === viewDate.month(),
      );
      if (firstSchedule) {
        setSelectedDate(dayjs(firstSchedule.date).toDate());
      }
    }
  }, [schedules, viewDate]);

  useEffect(() => {
    console.log(
      '가능날짜',
      availableDates.map((d) => d.date),
    );
    console.log(
      '하이라이트날짜',
      highlightDates.map((d) => d.format('YYYY-MM-DD')),
    );
    console.log('뷰데이트', viewDate.format('YYYY-MM-DD'));
  }, [availableDates, viewDate]);

  const changeMonth = (direction: 'add' | 'subtract') => {
    setViewDate((prev) => {
      const newDate =
        direction === 'add' ? prev.add(1, 'month') : prev.subtract(1, 'month');
      onMonthChange?.(newDate.year(), newDate.month() + 1);
      return newDate;
    });
  };

  console.log('schedules', schedules);

  const handleDateSelect = (date: dayjs.Dayjs) => {
    setSelectedDate(date.toDate());
  };

  const highlightDates = (availableDates ?? []).map((item) => dayjs(item.date));

  return (
    <div className='max-h-[746px] w-full max-w-md rounded-2xl bg-white p-6'>
      <CalendarHeader viewDate={viewDate} onMonthChange={changeMonth} />
      <CalendarBody
        viewDate={viewDate}
        today={today}
        selectedDate={selectedDate ? dayjs(selectedDate) : dayjs('')}
        onSelectDate={handleDateSelect}
        highlightDates={highlightDates}
      />
    </div>
  );
}
