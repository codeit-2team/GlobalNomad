interface Props {
  calendarWeeksLength: number;
}

export default function CalendarSkeleton({ calendarWeeksLength }: Props) {
  return (
    <div className='w-800'>
      {/* 월 헤더 스켈레톤 */}
      <div className='mb-30 flex h-42 w-800 items-center justify-center gap-24'>
        <div className='h-32 w-32 animate-pulse rounded bg-gray-200' />
        <div className='h-20 w-120 animate-pulse rounded bg-gray-200' />
        <div className='h-32 w-32 animate-pulse rounded bg-gray-200' />
      </div>

      {/* 달력 스켈레톤 */}
      <div
        className='rounded-12 w-800 animate-pulse bg-gray-200'
        style={{ height: `${calendarWeeksLength * 107 + 120}px` }}
      />
    </div>
  );
}
