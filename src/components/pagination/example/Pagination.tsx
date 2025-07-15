'use client';

import { useState } from 'react';
import Pagination from './Pagination';

export default function PaginationExample() {
  const [page, setPage] = useState(1);
  const totalPage = 7;

  return (
    <div className="p-4">
      <h2 className="mb-2 font-bold">Pagination Example</h2>

      <Pagination currentPage={page} totalPage={totalPage} onPageChange={setPage} />

      <p className="mt-4 text-center">현재 페이지: {page}</p>
    </div>
  );
}