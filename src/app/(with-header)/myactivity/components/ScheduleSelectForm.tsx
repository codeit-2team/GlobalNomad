'use client';

import { toast } from 'sonner';
import { ScheduleSelect } from './ScheduleSelect';
import { ScheduleSelectFormProps } from '@/types/addEditExperienceType';
import { isPastDate } from '../utils/dateValidatoin';
import { isInvalidTimeRange } from '../utils/dateValidatoin';

export function ScheduleSelectForm({
  dates,
  onAddDate,
  onRemoveDate,
  onDateChange,
}: ScheduleSelectFormProps) {
  return (
    <div className='space-y-4 pt-24'>
      <div className='flex flex-row items-center justify-between gap-5'>
        <p className='text-xl font-bold text-black'>예약 가능한 시간대</p>
        <div>
          <button
            type='button'
            onClick={onAddDate}
            className='h-44 w-44 rounded-[10px] bg-green-300 px-10 py-5 hover:bg-green-600'
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
            onDateChange={(index, value) => {
              if (isPastDate(value)) {
                toast.error('오늘 이전 날짜는 선택할 수 없습니다.');
                return;
              }
              onDateChange(index, 'date', value);
            }}
            onStartTimeChange={(index, value) => {
              const end = dates[index].endTime;
              if (end && isInvalidTimeRange(value, end)) {
                toast.error('시작 시간은 종료 시간보다 빨라야 합니다.');
                return;
              }
              onDateChange(index, 'startTime', value);
            }}
            onEndTimeChange={(index, value) => {
              const start = dates[index].startTime;
              if (start && isInvalidTimeRange(start, value)) {
                toast.error('종료 시간은 시작 시간보다 늦어야 합니다.');
                return;
              }
              onDateChange(index, 'endTime', value);
            }}
            date={dateSlot.date}
            startTime={dateSlot.startTime}
            endTime={dateSlot.endTime}
          />
        </div>
      ))}
    </div>
  );
}
