'use client';

import { ScheduleSelect } from './ScheduleSelect';
import { Schedule } from '@/types/activityDetailType';

interface ScheduleSelectFormProps {
  dates: Schedule[];
  onAddDate: () => void;
  onRemoveDate: (index: number) => void;
  onDateChange: (
    index: number,
    field: keyof Omit<Schedule, 'id'>,
    value: string,
  ) => void;
}

export function ScheduleSelectForm({
  dates,
  onAddDate,
  onRemoveDate,
  onDateChange,
}: ScheduleSelectFormProps) {
  return (
    <div className='space-y-4 pt-24'>
      <div className='flex flex-row items-center justify-between gap-5'>
        <p className='text-2lg text-black'>예약 가능한 시간대</p>
        <div>
          <button
            type='button'
            onClick={onAddDate}
            className='w-44 h-44 rounded-[10px] bg-green-300 px-10 py-5 hover:bg-green-600'
          >
            <p className='text-2xl font-bold text-white'>+</p>
          </button>
        </div>
      </div>
      {dates.map((dateSlot, idx) => (
        <div key={dateSlot.id ?? idx} className='flex'>
          <ScheduleSelect
            index={idx}
            isRemovable={dates.length > 1}
            onAddDate={onAddDate}
            onRemove={onRemoveDate}
            onDateChange={(index, value) => onDateChange(index, 'date', value)}
            onStartTimeChange={(index, value) =>
              onDateChange(index, 'startTime', value)
            }
            onEndTimeChange={(index, value) =>
              onDateChange(index, 'endTime', value)
            }
            date={dateSlot.date}
            startTime={dateSlot.startTime}
            endTime={dateSlot.endTime}
          />
        </div>
      ))}
      
    </div>
  );
}
