'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useMonthlyReservationDashboard } from '@/hooks/useDashboardQueries';
import { useCalendarStructure } from '@/hooks/useCalendarStructure';
import { DailyReservationCount } from '@/types/dashboardTypes';
import { WEEKDAYS } from '@/constants/dashboardConstants';
import LeftArrowIcon from '@assets/svg/left-arrow';
import RightArrowIcon from '@assets/svg/right-arrow';
import ReservationStatusChips from './ReservationStatusChips';
import ReservationDot from './ReservationDot';
import CalendarSkeleton from './CalendarSkeleton';

dayjs.locale('ko');

interface Props {
  activityId: number;
  onDateClick: (date: string) => void;
}

export default function ReservationDashboardCalendar({
  activityId,
  onDateClick,
}: Props) {
  const [currentDate, setCurrentDate] = useState(dayjs());

  // 월별 예약 현황 조회
  const { data: monthlyData, isLoading } = useMonthlyReservationDashboard(
    activityId,
    currentDate.year(),
    currentDate.month() + 1,
  );

  const calendarWeeks = useCalendarStructure(currentDate);

  // 월 변경
  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentDate((prev) =>
      direction === 'prev' ? prev.subtract(1, 'month') : prev.add(1, 'month'),
    );
  };

  // 날짜별 예약 데이터 생성
  const reservationMap = new Map<string, DailyReservationCount>();
  monthlyData?.forEach((item) => {
    reservationMap.set(item.date, item.reservations);
  });

  // 로딩 스켈레톤
  if (isLoading) {
    return <CalendarSkeleton calendarWeeksLength={calendarWeeks.length} />;
  }

  return (
    <div className='mx-auto w-full max-w-800'>
      {/* 월 헤더 */}
      <div className='mb-30 flex h-42 w-full items-center justify-center gap-24'>
        <button
          onClick={() => changeMonth('prev')}
          className='flex h-32 w-32 items-center justify-center rounded-md transition-colors hover:bg-gray-100'
        >
          <LeftArrowIcon size={20} />
        </button>

        <h2 className='text-xl font-semibold text-gray-900'>
          {currentDate.format('YYYY년 M월')}
        </h2>

        <button
          onClick={() => changeMonth('next')}
          className='flex h-32 w-32 items-center justify-center rounded-md transition-colors hover:bg-gray-100'
        >
          <RightArrowIcon size={20} />
        </button>
      </div>

      {/* 달력 */}
      <div className='rounded-12 w-full overflow-hidden border border-gray-200 bg-white'>
        {/* 요일 헤더 */}
        <div className='grid grid-cols-7 bg-gray-50'>
          {WEEKDAYS.map((day, index) => (
            <div
              key={day}
              className={`text-md flex h-50 items-center justify-center border-gray-200 font-medium text-gray-600 ${
                index < 6 ? 'border-r' : ''
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        {calendarWeeks.map((week, weekIndex) => (
          <div key={weekIndex} className='grid grid-cols-7'>
            {week.map(({ date, isCurrentMonth }, dayIndex) => {
              const dateString = date.format('YYYY-MM-DD');
              const reservations = reservationMap.get(dateString);
              const isToday = date.isSame(dayjs(), 'day');

              // 경계선
              const borderClass = `border-gray-200 ${dayIndex < 6 ? 'border-r' : ''} ${weekIndex < calendarWeeks.length - 1 ? 'border-b' : ''}`;

              // 이전/다음 월의 날짜는 빈 공간으로
              if (!isCurrentMonth) {
                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`bg-gray-25 h-105 ${borderClass}`}
                  />
                );
              }

              return (
                <button
                  key={`${weekIndex}-${dayIndex}`}
                  onClick={() => onDateClick(dateString)}
                  className={`relative flex h-105 flex-col items-start justify-start p-8 transition-colors ${borderClass} cursor-pointer text-gray-900 hover:bg-gray-50 ${isToday ? 'bg-blue-50' : 'bg-white'} `}
                >
                  <div className='flex items-center gap-4'>
                    <span
                      className={`text-md font-medium ${isToday ? 'font-bold text-blue-600' : 'text-gray-900'} `}
                    >
                      {date.date()}
                    </span>
                    {/* 날짜 옆 도트 */}
                    <ReservationDot reservations={reservations} />
                  </div>

                  {/* 예약 현황 칩들 */}
                  <ReservationStatusChips reservations={reservations} />
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
