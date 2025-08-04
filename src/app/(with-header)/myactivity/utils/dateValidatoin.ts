import { Schedule } from '@/types/activityDetailType';

export function validateSchedules(schedules: Schedule[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < schedules.length; i++) {
    const { date, startTime, endTime } = schedules[i];

    if (!date || !startTime || !endTime) {
      return `날짜와 시간이 모두 입력되어야 합니다!`;
    }

    const selectedDate = new Date(date);
    if (selectedDate < today) {
      return `오늘보다 이전 날짜는 선택할 수 없습니다!`;
    }

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    if (startMinutes >= endMinutes) {
      return `종료 시간은 시작 시간보다 늦어야 합니다!`;
    }
  }

  return null;
}
