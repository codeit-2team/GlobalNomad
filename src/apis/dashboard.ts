import { privateInstance } from './privateInstance';
import {
  MyActivitiesResponse,
  MonthlyReservationDashboard,
  ReservedSchedule,
  ActivityReservationsResponse,
  ActivityReservation,
  UpdateActivityReservationRequest,
} from '@/types/dashboardTypes';

/**
 * 내 체험 리스트 조회
 * GET /my-activities
 */
export const getMyActivities = async (): Promise<MyActivitiesResponse> => {
  const response = await privateInstance.get('/my-activities');
  return response.data;
};

/**
 * 내 체험 월별 예약 현황 조회
 * GET /my-activities/{activityId}/reservation-dashboard
 */
export const getMonthlyReservationDashboard = async (
  activityId: number,
  year: number,
  month: number,
): Promise<MonthlyReservationDashboard[]> => {
  const response = await privateInstance.get(
    `/my-activities/${activityId}/reservation-dashboard`,
    {
      params: { year, month },
    },
  );
  return response.data;
};

/**
 * 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회
 * GET /my-activities/{activityId}/reserved-schedule
 */
export const getReservedSchedules = async (
  activityId: number,
  date: string, // YYYY-MM-DD
): Promise<ReservedSchedule[]> => {
  const response = await privateInstance.get(
    `/my-activities/${activityId}/reserved-schedule`,
    {
      params: { date },
    },
  );
  return response.data;
};

/**
 * 내 체험 예약 시간대별 예약 내역 조회
 * GET /my-activities/{activityId}/reservations
 */
export const getActivityReservations = async (
  activityId: number,
  params: {
    cursorId?: number;
    size?: number;
    scheduleId?: number;
    status?: 'pending' | 'confirmed' | 'declined';
  },
): Promise<ActivityReservationsResponse> => {
  const queryParams = new URLSearchParams();

  if (params.cursorId) {
    queryParams.append('cursorId', params.cursorId.toString());
  }
  if (params.size) {
    queryParams.append('size', params.size.toString());
  }
  if (params.scheduleId) {
    queryParams.append('scheduleId', params.scheduleId.toString());
  }
  if (params.status) {
    queryParams.append('status', params.status);
  }

  const response = await privateInstance.get(
    `/my-activities/${activityId}/reservations?${queryParams.toString()}`,
  );
  return response.data;
};

/**
 * 내 체험 예약 상태(승인, 거절) 업데이트
 * PATCH /my-activities/{activityId}/reservations/{reservationId}
 */
export const updateActivityReservationStatus = async (
  activityId: number,
  reservationId: number,
  data: UpdateActivityReservationRequest,
): Promise<ActivityReservation> => {
  const response = await privateInstance.patch(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    data,
  );
  return response.data;
};
