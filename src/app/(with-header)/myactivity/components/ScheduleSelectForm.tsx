'use client';

import { ScheduleSelect } from './ScheduleSelect';

interface ScheduleType {
  date: string;
  startTime: string;
  endTime: string;
}

interface ScheduleSelectFormProps {
  dates: ScheduleType[];
  onAddDate: () => void;
  onRemoveDate: (index: number) => void;
  onDateChange: (
    index: number,
    field: keyof ScheduleType,
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
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='mb-3 text-2xl font-bold text-black'>예약 가능한 시간</h3>
        <button
          type='button'
          onClick={onAddDate}
          className='mt-6 bg-green-300 px-10 py-5 hover:bg-green-600'
        >
          <p className='text-2xl font-bold text-white'>+</p>
        </button>
      </div>

      {dates.map((dateSlot, idx) => (
        <div className='flex'>
          <ScheduleSelect
            key={idx}
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
