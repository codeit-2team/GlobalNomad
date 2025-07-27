'use client';

import { useState } from 'react';
import CategoryFilter from '@/app/(with-header)/components/CategoryFilter';
import ExperienceCard from '@/app/(with-header)/components/ExperienceCard';
import Pagination from '@components/Pagination';

export default function ExperienceList() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="px-24 pt-40 pb-80">
      {/* 카테고리 필터 (상태는 부모가 관리) */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />

      {/* 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-32 mt-40">
        {[...Array(6)].map((_, idx) => (
          <ExperienceCard key={idx} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPage={5}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
