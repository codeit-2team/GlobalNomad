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
    <div className='pt-5 w-full'>
      <div className='flex flex-row items-end gap-5'>
        <div className='flex flex-col gap-10 w-full'>
          <Input
            className='w-full'
            type='date'
            value={date}
            onChange={(e) => onDateChange(index, e.target.value)}
            variant='compact'
          />
        </div>
        <div className='flex flex-col gap-10 w-full max-w-1/4'>
          <Input
            className='w-full'
            type='time'
            value={startTime}
            onChange={(e) => onStartTimeChange(index, e.target.value)}
            variant='compact'
          />
        </div>
        <div className='flex flex-col gap-10 w-full max-w-1/4'>
          <Input
            className='w-full'
            type='time'
            value={endTime}
            onChange={(e) => onEndTimeChange(index, e.target.value)}
            variant='compact'
          />
        </div>

        <div className='flex'>
          {isRemovable && (
            <button
              type='button'
              onClick={() => onRemove(index)}
              className='w-44 h-46 border border-gray-300 rounded-[10px] flex items-center justify-center hover:bg-gray-100'
            >
              <IconClose />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
