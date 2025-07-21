/**
 * 체험(Activity) 카테고리 목록
 *
 * 체험 등록 및 체험 수정 등에서 사용되는 고정된 카테고리 목록입니다.
 * as const를 사용하여 타입 추론과 불변성을 보장합니다.
 */

export const ACTIVITY_CATEGORIES = [
  '문화 예술',
  '식음료',
  '스포츠',
  '투어',
  '관광',
  '웰빙',
] as const;

// 타입 추론을 위한 타입 정의
export type ActivityCategory = (typeof ACTIVITY_CATEGORIES)[number];
