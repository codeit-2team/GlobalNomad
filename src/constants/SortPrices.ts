export const SORT_OPTIONS = ['가격 낮은순', '가격 높은순'] as const;

export type SortOptionLabel = typeof SORT_OPTIONS[number]; // 표시용 (한글)
export type SortOptionValue = 'price_asc' | 'price_desc'; // 서버에 보내는 값

// 한글 → 서버 값
export const SORT_VALUE_MAP: Record<SortOptionLabel, SortOptionValue> = {
  '가격 낮은순': 'price_asc',
  '가격 높은순': 'price_desc',
};

// 서버 값 → 한글
export const SORT_LABEL_MAP: Record<SortOptionValue, SortOptionLabel> = {
  price_asc: '가격 낮은순',
  price_desc: '가격 높은순',
};
