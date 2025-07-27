'use client';

import { useState } from 'react';
import CategoryFilter from '@/app/(with-header)/components/CategoryFilter';
import ExperienceCard from '@/app/(with-header)/components/ExperienceCard';
import Pagination from '@components/Pagination';
import Dropdown from '@components/Dropdown';
import { ACTIVITY_CATEGORIES, ActivityCategory, } from '@/constants/categories';
import { SORT_OPTIONS, SortOption, } from '@/constants/SortPrices';

export default function ExperienceList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>(
  ACTIVITY_CATEGORIES[0]
);
  const [sortOption, setSortOption] = useState<SortOption | ''>(''); // 초기값 없음

  return (
    <section className='max-w-1200 m-auto px-24 md:px-0 pb-83'>
      {/* 필터 + 드롭다운 라인 */}
      <div className='flex justify-between items-center mb-40'>
        <CategoryFilter
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
        <Dropdown
          options={SORT_OPTIONS}
          placeholder='가격'
          value={sortOption}
          onChange={setSortOption}
          className='w-120 h-41 text-[14px]'
        />
      </div>

      {/* 카드 리스트 */}
      <div className='m-0'>
        <h2 className='text-xl md:text-3xl font-bold'>🛼 모든 체험</h2>
        <div className='grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-4 lg:grid-rows-2 gap-8 md:gap-16 lg:gap-24 mt-24'>
          {[...Array(6)].map((_, idx) => (
            <ExperienceCard
              key={idx}
              imageUrl={`/test/image${idx + 1}.png`}
              title={`Experience Title ${idx + 1}`}
              rating={4.5}
              reviews={120 + idx}
              price={10000 + idx * 1000}
            />
          ))}
        </div>
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
