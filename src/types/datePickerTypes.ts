import type dayjs from 'dayjs';

export interface CalendarBodyProps {
  viewDate: dayjs.Dayjs;
  today: dayjs.Dayjs;
  selectedDate: dayjs.Dayjs;
  onSelectDate: (date: dayjs.Dayjs) => void;
  highlightDates?: dayjs.Dayjs[];
}

export interface CalendarHeaderProps {
  viewDate: dayjs.Dayjs;
  onMonthChange: (direction: 'add' | 'subtract') => void;
  isPrevDisabled?: boolean;
}
