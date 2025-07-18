'use client';

import cn from '@/lib/cn';
import { PaginationProps } from '@/types/paginationTypes';
import IconArrowLeft from '@assets/svg/left-arrow';
import IconArrowRight from '@assets/svg/right-arrow';

/**
 * Pagination 컴포넌트
 *
 * - 외부에서 currentPage 상태를 제어하는 컴포넌트입니다.
 * - 최대 5개의 페이지 버튼을 노출하며,
 *   현재 페이지를 중심으로 양옆 페이지 버튼을 계산합니다.
 */
export default function Pagination({
  currentPage,
  totalPage,
  onPageChange,
}: PaginationProps) {
  const MAX_BUTTONS = 5; // 한 번에 보여줄 페이지 버튼 수

  /**
   * 보여줄 페이지 번호 배열을 계산하는 함수
   *
   * 예: currentPage가 3이고 totalPage가 10일 경우 => [1, 2, 3, 4, 5]
   */
  const getPageNumbers = () => {
    const pages = [];

    // 시작 페이지 계산
    let start = Math.max(1, currentPage - Math.floor(MAX_BUTTONS / 2));
    let end = start + MAX_BUTTONS - 1;

    // 끝 페이지가 전체 페이지 수를 넘는 경우 조정
    if (end > totalPage) {
      end = totalPage;
      start = Math.max(1, end - MAX_BUTTONS + 1);
    }

    // 범위 내 페이지 번호 배열 생성
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-center gap-10 mt-6 text-2lg">
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-40 h-40 md:w-55 md:h-55 border rounded-[15px] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <IconArrowLeft className="md:w-21 md:h-21" />
      </button>

      {/* 페이지 번호 버튼들 */}
      {getPageNumbers().map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={cn(
            'w-40 h-40 md:w-55 md:h-55 border rounded-[15px]',
            num === currentPage && 'bg-green-300 text-white border-green-300'
          )}
        >
          {num}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
        className="flex items-center justify-center w-40 h-40 md:w-55 md:h-55 border rounded-[15px] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <IconArrowRight className="md:w-21 md:h-21" />
      </button>
    </div>
  );
}


// 사용 예시:
/*
import Pagination from '@/components/pagination/Pagination';

export default function ExamplePage() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      currentPage={page}
      totalPage={10}
      onPageChange={setPage}
    />
  );
}
*/