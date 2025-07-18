'use client';

import type dayjs from 'dayjs';

interface CalendarBodyProps {
  viewDate: dayjs.Dayjs;
  today: dayjs.Dayjs;
  selectedDate: dayjs.Dayjs;
  onSelectDate: (date: dayjs.Dayjs) => void;
  highlightDates?: dayjs.Dayjs[];
}

export default function CalendarBody({
  viewDate,
  today,
  selectedDate,
  onSelectDate,
  highlightDates = [],
}: CalendarBodyProps) {
  const startDate = viewDate.startOf('month').startOf('week');
  const endDate = viewDate.endOf('month').endOf('week');

  const days: dayjs.Dayjs[] = [];
  let current = startDate;

  while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
    days.push(current);
    current = current.add(1, 'day');
  }

  return (
    <>
      <div className='mb-4 grid grid-cols-7 gap-1'>
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={day}
            className={`flex h-30 w-30 items-center justify-center text-sm font-semibold ${
              index === 0 || index === 6 ? 'text-red-500' : 'text-gray-600'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-1'>
        {days.map((day, i) => {
          const isSelected = selectedDate.isSame(day, 'day');
          const isToday = today.isSame(day, 'day');
          const isSameMonth =
            viewDate.month() === day.month() && viewDate.year() === day.year();
          const isWeekend = day.day() === 0 || day.day() === 6;
          const isHighlighted = highlightDates.some((d) =>
            d.isSame(day, 'day'),
          );

          return (
            <button
              key={i}
              onClick={() => onSelectDate(day)}
              className={`relative flex h-30 w-30 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
                !isSameMonth
                  ? 'text-gray-300 hover:text-gray-400'
                  : isWeekend
                    ? 'text-red-600'
                    : 'text-gray-700'
              } ${
                isToday && !isSelected
                  ? 'bg-blue-100 font-bold text-blue-700 ring-2 ring-blue-200'
                  : ''
              } ${
                isSelected
                  ? 'scale-105 transform bg-blue-600 font-bold text-white shadow-lg'
                  : ''
              } ${
                !isToday && !isSelected && isSameMonth
                  ? 'hover:scale-105 hover:bg-gray-100'
                  : ''
              } ${
                !isToday && !isSelected && !isSameMonth
                  ? 'hover:bg-gray-50'
                  : ''
              } ${isHighlighted && !isSelected ? 'bg-yellow-200' : ''} `}
              aria-label={`${day.format('YYYY년 MM월 DD일')} ${
                isToday ? '오늘' : ''
              } ${isSelected ? '선택됨' : ''}`}
            >
              {day.format('D')}
              {isToday && !isSelected && (
                <div className='absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-600'></div>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
