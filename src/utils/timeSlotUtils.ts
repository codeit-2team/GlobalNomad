import { ReservedSchedule } from '@/types/dashboardTypes';

export const createTimeSlotOptions = (schedules: ReservedSchedule[] = []) => {
  return schedules.map(
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
