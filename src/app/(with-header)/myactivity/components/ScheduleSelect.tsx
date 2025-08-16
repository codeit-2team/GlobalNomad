'use client';

import Input from '@/components/Input';
import IconClose from '@assets/svg/close';
import { ScheduleSelectProps } from '@/types/addEditExperienceType';

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
    <div className='w-full pt-5'>
      <div className='flex w-full flex-wrap items-end gap-4'>
        <div className='flex min-w-0 flex-1 flex-col gap-10'>
          <Input
            className='w-full'
            type='date'
            value={date}
            onChange={(e) => onDateChange(index, e.target.value)}
            variant='compact'
          />
        </div>
        <div className='flex min-w-0 flex-1 flex-col gap-10'>
          <Input
            className='w-full'
            type='time'
            value={startTime}
            onChange={(e) => onStartTimeChange(index, e.target.value)}
            variant='compact'
          />
        </div>
        <div className='flex min-w-0 flex-1 flex-col gap-10'>
          <Input
            className='w-full'
            type='time'
            value={endTime}
            onChange={(e) => onEndTimeChange(index, e.target.value)}
            variant='compact'
          />
        </div>

        <div className='flex-shrink-0'>
          {isRemovable && (
            <div className='w-44 flex-shrink-0'>
              <button
                type='button'
                onClick={() => onRemove(index)}
                className='flex h-46 w-full items-center justify-center rounded-[10px] border border-gray-300 hover:bg-gray-100'
              >
                <IconClose />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
