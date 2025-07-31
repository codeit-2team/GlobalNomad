import { privateInstance } from './privateInstance';
import {
  MyReservationsResponse,
  GetMyReservationsParams,
  UpdateReservationRequest,
  Reservation,
  CreateReviewRequest,
  ReviewResponse,
} from '@/types/reservationTypes';

/**
 * 내 예약 리스트 조회
 * GET /api/reservations
 */
export const getMyReservations = async (
  params: GetMyReservationsParams,
): Promise<MyReservationsResponse> => {
  const queryParams = new URLSearchParams();

  if (params.cursorId) {
    queryParams.append('cursorId', params.cursorId.toString());
  }
  if (params.size) {
    queryParams.append('size', params.size.toString());
  }
  if (params.status) {
    queryParams.append('status', params.status);
  }

  const response = await privateInstance.get(
    `/reservations?${queryParams.toString()}`,
  );
  return response.data;
};

/**
 * 내 예약 수정(취소)
 * PATCH /api/reservations/{reservationId}
 */
export const updateMyReservation = async (
  reservationId: number,
  data: UpdateReservationRequest,
): Promise<Reservation> => {
  const response = await privateInstance.patch(
    `/reservations/${reservationId}`,
    data,
  );
  return response.data;
};

/**
 * 내 예약 리뷰 작성
 * POST /api/reservations/{reservationId}/reviews
 */
export const createReview = async (
  reservationId: number,
  data: CreateReviewRequest,
): Promise<ReviewResponse> => {
  const response = await privateInstance.post(
    `/reservations/${reservationId}/reviews`,
    data,
  );
  return response.data;
};
