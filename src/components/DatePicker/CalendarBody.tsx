'use client';

import type dayjs from 'dayjs';
import { CalendarBodyProps } from '@/types/datePickerTypes';
import cn from '@/lib/cn';

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
              className={cn(
                'relative flex h-30 w-30 items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none',
                'hover:scale-105 hover:shadow-md',
                !isSameMonth && 'text-gray-400 hover:text-gray-300',
                isSameMonth && isWeekend && 'text-red-500',
                isSameMonth && !isWeekend && 'text-gray-900',
                // 오늘
                isToday &&
                  !isSelected &&
                  'bg-blue-100 font-bold text-blue-700 ring-2 ring-blue-300',
                // 선택된 날짜
                isSelected &&
                  'scale-105 transform bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg',
                // 선택된날짜가 일정이존재하는 날일경우
                isSelected &&
                  isHighlighted &&
                  'text-white ring-2 ring-yellow-400',

                !isToday &&
                  !isSelected &&
                  isSameMonth &&
                  'hover:bg-gray-100 active:scale-95',
                !isToday && !isSelected && !isSameMonth && 'hover:bg-gray-50',

                isHighlighted &&
                  !isSelected &&
                  'bg-yellow-300 font-bold text-black',
                !isHighlighted && 'opacity-90',
              )}
              aria-label={`${day.format('YYYY년 MM월 DD일')} ${
                isToday ? '오늘' : ''
              } ${isSelected ? '선택됨' : ''}`}
            >
              {day.format('D')}

              {isToday && !isSelected && (
                <div className='absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-blue-600' />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
