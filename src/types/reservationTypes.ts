// 예약 상태
export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'declined'
  | 'canceled'
  | 'completed';

// 예약
export interface Reservation {
  id: number;
  teamId: string;
  userId: number;
  activity: {
    bannerImageUrl: string;
    title: string;
    id: number;
  };
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

// 예약 리스트 응답
export interface MyReservationsResponse {
  cursorId: number;
  reservations: Reservation[];
  totalCount: number;
}

// 예약 수정 요청
export interface UpdateReservationRequest {
  status: 'canceled';
}

// 예약 리스트 조회 파라미터
export interface GetMyReservationsParams {
  cursorId?: number;
  size?: number;
  status?: ReservationStatus;
}
