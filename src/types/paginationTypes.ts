/**
 * Pagination 컴포넌트 props 타입 정의
 */
export interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}
