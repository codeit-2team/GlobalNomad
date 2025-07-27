export const SORT_OPTIONS = ['가격이 낮은 순', '가격이 높은 순'] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];