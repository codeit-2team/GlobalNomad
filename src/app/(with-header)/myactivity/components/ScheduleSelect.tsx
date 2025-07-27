'use client';

import Input from '@/components/Input';
import IconClose from '@assets/svg/close';

interface ScheduleSelectProps {
  index: number;
  isRemovable: boolean;
  onAddDate: () => void;
  onRemove: (index: number) => void;
  onDateChange: (index: number, value: string) => void;
  onStartTimeChange: (index: number, value: string) => void;
  onEndTimeChange: (index: number, value: string) => void;
  date: string;
  startTime: string;
  endTime: string;
}

export function ScheduleSelect({
  index,
  isRemovable,

  onRemove,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
  date,
  startTime,
  endTime,
}: ScheduleSelectProps) {
  return (
    <div className='rounded-lg bg-gray-50 p-4'>
      <div className='grid grid-cols-1 items-center gap-10 sm:grid-cols-4'>
        <div className='sm:col-span-1'>
          <Input
            className='w-full'
            label='날짜'
            type='date'
            value={date}
            onChange={(e) => onDateChange(index, e.target.value)}
          />
        </div>

        <div className='sm:col-span-1'>
          <Input
            className='w-full'
            label='시작시간'
            type='time'
            value={startTime}
            onChange={(e) => onStartTimeChange(index, e.target.value)}
          />
        </div>

        <div className='sm:col-span-1'>
          <Input
            className='w-full'
            label='종료시간'
            type='time'
            value={endTime}
            onChange={(e) => onEndTimeChange(index, e.target.value)}
          />
        </div>

        <div className='flex sm:col-span-1'>
          {isRemovable && (
            <button
              type='button'
              onClick={() => onRemove(index)}
              className='mt-6 rounded-full p-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-800'
            >
              <IconClose />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
