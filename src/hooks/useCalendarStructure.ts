import { useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrBefore);

export function useCalendarStructure(currentDate: Dayjs) {
  return useMemo(() => {
    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const startOfFirstWeek = startOfMonth.startOf('week');
    const endOfLastWeek = endOfMonth.endOf('week');

    const weeks = [];
    let currentWeekStart = startOfFirstWeek;

    while (currentWeekStart.isSameOrBefore(endOfLastWeek)) {
      const week = [];

      for (let i = 0; i < 7; i++) {
        const date = currentWeekStart.add(i, 'day');
        const isCurrentMonth = date.month() === currentDate.month();

        week.push({ date, isCurrentMonth });
      }

      weeks.push(week);
      currentWeekStart = currentWeekStart.add(1, 'week');
    }

    return weeks;
  }, [currentDate]);
}
