import { ReservationStatus } from './reservationTypes';

// 내 체험 정보
export interface MyActivity {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

// 내 체험 리스트 응답
export interface MyActivitiesResponse {
  activities: MyActivity[];
  totalCount: number;
  cursorId: number | null;
}

// 일별 예약 현황 카운트
export interface DailyReservationCount {
  completed: number;
  confirmed: number;
  pending: number;
}

// 월별 예약 현황
export interface MonthlyReservationDashboard {
  date: string; // YYYY-MM-DD
  reservations: DailyReservationCount;
}

// 시간대별 예약 카운트
export interface ScheduleReservationCount {
  declined: number;
  confirmed: number;
  pending: number;
}

// 예약이 있는 스케줄 정보
export interface ReservedSchedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: ScheduleReservationCount;
}

// 체험 예약 내역의 예약자 정보
export interface ActivityReservation {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

// 체험 예약 내역 응답
export interface ActivityReservationsResponse {
  cursorId: number;
  totalCount: number;
  reservations: ActivityReservation[];
}

// 예약 상태 업데이트 요청 (호스트용)
export interface UpdateActivityReservationRequest {
  status: 'pending' | 'confirmed' | 'declined';
}

// 예약 현황 필터 옵션
export type DashboardFilterOption = 'pending' | 'confirmed' | 'declined';
