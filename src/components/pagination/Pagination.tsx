'use client';

import cn from '@/lib/cn';
import { PaginationProps } from './type';

export default function Pagination({
  currentPage,
  totalPage,
  onPageChange,
}: PaginationProps) {
  const MAX_BUTTONS = 5;

  const getPageNumbers = () => {
    const pages = [];

    let start = Math.max(1, currentPage - Math.floor(MAX_BUTTONS / 2));
    let end = start + MAX_BUTTONS - 1;

    if (end > totalPage) {
      end = totalPage;
      start = Math.max(1, end - MAX_BUTTONS + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 border rounded disabled:opacity-30"
      >
        &lt;
      </button>

      {getPageNumbers().map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={cn(
            'w-8 h-8 border rounded',
            num === currentPage && 'bg-green-900 text-white border-green-900'
          )}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
        className="w-8 h-8 border rounded disabled:opacity-30"
      >
        &gt;
      </button>
    </div>
  );
}
