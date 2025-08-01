'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import Dropdown from '@components/Dropdown';
import Pagination from '@components/Pagination';
import CategoryFilter from '@/app/(with-header)/components/CategoryFilter';
import ExperienceCard from '@/app/(with-header)/components/ExperienceCard';
import { getExperiences, ExperienceListResult } from '@/app/api/experiences/getExperiences';
import { ACTIVITY_CATEGORIES, ActivityCategory } from '@/constants/categories';
import {
  SORT_OPTIONS,
  SORT_VALUE_MAP,
  SORT_LABEL_MAP,
} from '@/constants/SortPrices';

interface ExperienceListProps {
  keyword?: string;
  isSearchMode?: boolean;
}

export default function ExperienceList({ keyword, isSearchMode }: ExperienceListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>(ACTIVITY_CATEGORIES[0]);
  const [sortOption, setSortOption] = useState<string | undefined>('');

  // TanStack Query 사용 (타입 명시 필수)
  const { data, isLoading, error } = useQuery<ExperienceListResult>({
    queryKey: ['experiences', currentPage, selectedCategory, sortOption, keyword],
    queryFn: () =>
      getExperiences({
        page: currentPage,
        sort: sortOption,
        category: selectedCategory,
        keyword,
      }),
    placeholderData: (prev) => prev,
  });

  const experiences = data?.experiences || [];
  const totalCount = data?.totalCount || 0;
  const totalPage = Math.ceil(totalCount / 8);

  return (
    <section className='max-w-1200 m-auto px-24 md:px-0 pb-83'>
      {isSearchMode && keyword && (
        <>
          <p className="text-left text-lg font-semibold ml-4 md:ml-0 mt-32">
            <span className="text-primary font-bold">"{keyword}"</span> (으)로 검색한 결과입니다.
          </p>
          <p className="text-left text-sm font-normal ml-4 md:ml-0 mt-8 mb-16">
            총 <span className="font-semibold">{totalCount}</span>개의 결과
          </p>
          {experiences.length === 0 && (
            <p className="text-center text-gray-500 mt-32">검색 결과가 없습니다.</p>
          )}
        </>
      )}

      {!isSearchMode && (
        <div className='flex justify-between items-center mb-40'>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onChange={(category) => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
          />
          <Dropdown
            className='w-200'
            placeholder='가격'
            options={SORT_OPTIONS}
            value={sortOption && SORT_LABEL_MAP[sortOption as keyof typeof SORT_LABEL_MAP] || ''}
            onChange={(label: keyof typeof SORT_VALUE_MAP) => {
              const value = SORT_VALUE_MAP[label];
              setSortOption(value);
              setCurrentPage(1);
            }}
          />
        </div>
      )}

      <div className='m-0'>
        {!isSearchMode && (
          <h2 className='text-xl md:text-3xl font-bold'>🛼 모든 체험</h2>
        )}

        {isLoading ? (
          <p className="text-center">체험을 불러오는 중입니다...</p>
        ) : error ? (
          <p className="text-center text-red-500">체험 데이터를 불러오는 데 실패했습니다 😢</p>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-16 lg:gap-24 mt-24'>
            {experiences.map((exp) => (
              <Link key={exp.id} href={`/activities/${exp.id}`}>
                <ExperienceCard
                  imageUrl={exp.bannerImageUrl}
                  price={exp.price}
                  rating={exp.rating}
                  reviews={exp.reviewCount}
                  title={exp.title}
                />
              </Link>
            ))}
          </div>
        )}
      </div>

      {experiences.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
}
