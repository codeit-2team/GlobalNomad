'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import Dropdown from '@components/Dropdown';
import Pagination from '@components/Pagination';
import CategoryFilter from '@/app/(with-header)/components/CategoryFilter';
import ExperienceCard from '@/app/(with-header)/components/ExperienceCard';
import ExperienceCardSkeleton from '@/app/(with-header)/components/Skeletons/ExperienceCardSkeleton';
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

  const { data, isLoading } = useQuery<ExperienceListResult>({
    queryKey: ['experiences', currentPage, selectedCategory, sortOption, keyword],
    queryFn: () =>
      getExperiences({
        page: currentPage,
        sort: sortOption,
        category: selectedCategory,
        keyword: keyword || undefined,
      }),
    placeholderData: (prev) => prev,
  });

  const experiences = data?.experiences || [];
  const totalCount = data?.totalCount || 0;
  const totalPage = Math.ceil(totalCount / 8);

  return (
    <section className='max-w-1200 m-auto px-16 md:px-24 lg:px-0 pb-83'>
      {/* 🔍 검색 모드일 때 문구 표시 */}
      {isSearchMode && keyword && (
        <>
          <p className="text-left pt-24 lg:pt-40 text-black text-2xl md:text-3xl">
            <span className="text-primary font-bold">{keyword}</span>(으)로 검색한 결과입니다.
          </p>
          <p className="text-left text-lg font-normal mt-8 mb-16">
            총 <span className="font-semibold">{totalCount}</span>개의 결과
          </p>
          {experiences.length === 0 && !isLoading && (
            <p className="text-center text-gray-500 mt-32">검색 결과가 없습니다.</p>
          )}
        </>
      )}

      {!isSearchMode && (
        <div className='relative flex justify-between items-center mb-40 pr-120'>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onChange={(category) => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
          />
          {/* <div className=''> */}
            <Dropdown
              className='absolute right-0 md:w-130'
              buttonClassName='flex flex-row items-center justify-between gap-0 border-nomad border rounded-[15px] text-md py-9 px-15'
              listboxClassName='px-0 py-0'
              optionClassName='pl-10 pr-0 py-9 text-md'
              placeholder='가격'
              options={SORT_OPTIONS}
              value={sortOption && SORT_LABEL_MAP[sortOption as keyof typeof SORT_LABEL_MAP] || ''}
              onChange={(label: keyof typeof SORT_VALUE_MAP) => {
                const value = SORT_VALUE_MAP[label];
                setSortOption(value);
                setCurrentPage(1);
              }}
              />
          {/* </div> */}
        </div>
      )}

      <div className='m-0 pb-30 md:pb-150 lg:pb-100'>
        {!isSearchMode && (
          <h2 className='text-xl md:text-3xl font-bold'>🛼 모든 체험</h2>
        )}

        {/* 체험 카드 목록 */}
        <div className='grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-4 lg:grid-rows-2 gap-8 md:gap-16 lg:gap-24 mt-24'>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, idx) => <ExperienceCardSkeleton key={idx} />)
          ) : (
            experiences.map((exp) => (
              <Link key={exp.id} href={`/activities/${exp.id}`}>
                <ExperienceCard
                  imageUrl={exp.bannerImageUrl}
                  price={exp.price}
                  rating={exp.rating}
                  reviews={exp.reviewCount}
                  title={exp.title}
                />
              </Link>
            ))
          )}
        </div>
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
