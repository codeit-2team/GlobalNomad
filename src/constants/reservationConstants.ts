import { ReservationStatus } from '@/types/reservationTypes';

// 필터 옵션 타입
export type FilterOption = '' | ReservationStatus;

// 필터 옵션 배열
export const FILTER_OPTIONS: readonly FilterOption[] = [
  '', // 전체
  'pending', // 예약 신청
  'confirmed', // 예약 완료
  'declined', // 예약 거절
  'canceled', // 예약 취소
  'completed', // 체험 완료
] as const;

// 상태별 표시 라벨
export const STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: '예약 신청',
  confirmed: '예약 승인',
  declined: '예약 거절',
  canceled: '예약 취소',
  completed: '체험 완료',
};

// 필터 라벨
export const FILTER_LABELS: Record<FilterOption, string> = {
  '': '전체',
  ...STATUS_LABELS,
};

// 상태별 색상 매핑
export const STATUS_COLORS: Record<ReservationStatus, string> = {
  pending: 'text-blue-200', // 예약 신청
  confirmed: 'text-orange-200', // 예약 완료
  declined: 'text-red-300', // 예약 거절
  canceled: 'text-gray-800', // 예약 취소
  completed: 'text-gray-800', // 체험 완료
};
