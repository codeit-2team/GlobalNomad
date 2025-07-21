'use client';

import { CalendarHeaderProps } from '@/types/datePickerTypes';

export default function CalendarHeader({
  viewDate,
  onMonthChange,
}: CalendarHeaderProps) {
  return (
    <div className='mb-6 flex items-center justify-between'>
      <button
        className='flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
        onClick={() => onMonthChange('subtract')}
      >
        ◀
      </button>

      <div className='flex flex-col items-center'>
        <span className='text-xl font-bold text-gray-900'>
          {viewDate.format('YYYY년 MM월')}
        </span>
        <span className='text-sm text-gray-500'>
          {viewDate.format('MMMM YYYY')}
        </span>
      </div>

      <button
        className='flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
        onClick={() => onMonthChange('add')}
      >
        ▶
      </button>
    </div>
  );
}
