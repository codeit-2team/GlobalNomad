import {
  ReservedSchedule,
  DashboardFilterOption,
} from '@/types/dashboardTypes';

export const createTimeSlotOptions = (schedules: ReservedSchedule[] = []) => {
  return schedules.map(
    (schedule) => `${schedule.startTime} - ${schedule.endTime}`,
  );
};

// 탭별로 필터링된 시간대 옵션 생성
export const createFilteredTimeSlotOptions = (
  schedules: ReservedSchedule[] = [],
  activeTab: DashboardFilterOption,
) => {
  const filteredSchedules = schedules.filter((schedule) => {
    // 해당 탭의 상태에 예약이 있는 시간대만 필터링
    return schedule.count[activeTab] > 0;
  });

  return filteredSchedules.map(
    (schedule) => `${schedule.startTime} - ${schedule.endTime}`,
  );
};

export const getScheduleIdFromTimeSlot = (
  timeSlot: string,
  schedules: ReservedSchedule[] = [],
) => {
  return (
    schedules.find(
      (schedule) => `${schedule.startTime} - ${schedule.endTime}` === timeSlot,
    )?.scheduleId || null
  );
};

export const getSelectedTimeSlotValue = (
  schedules: ReservedSchedule[] = [],
  selectedScheduleId: number | null,
) => {
  const selectedTimeSlot = schedules.find(
    (schedule) => schedule.scheduleId === selectedScheduleId,
  );
  return selectedTimeSlot
    ? `${selectedTimeSlot.startTime} - ${selectedTimeSlot.endTime}`
    : '';
};
