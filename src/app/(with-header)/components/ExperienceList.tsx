'use client';

import Dropdown from '@components/Dropdown';
import Pagination from '@components/Pagination';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import CategoryFilter from '@/app/(with-header)/components/CategoryFilter';
import ExperienceCard from '@/app/(with-header)/components/ExperienceCard';
import { getExperiences } from '@/app/api/experiences/getExperiences';
import { ACTIVITY_CATEGORIES, ActivityCategory } from '@/constants/categories';
import {
  SORT_OPTIONS,
  SORT_VALUE_MAP,
  SORT_LABEL_MAP,
} from '@/constants/SortPrices';
import { Experience } from '@/types/experienceListTypes';

interface ExperienceListProps {
  keyword?: string;
  isSearchMode?: boolean;
}

export default function ExperienceList({ keyword, isSearchMode }: ExperienceListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>(ACTIVITY_CATEGORIES[0]);
  const [sortOption, setSortOption] = useState<string | undefined>('');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const resync = async () => {
      const res = await getExperiences({
        page: currentPage,
        sort: sortOption,
        category: selectedCategory,
        keyword: keyword || undefined, // 빈 문자열이면 undefined로 처리
      });

      setExperiences(res.experiences);
      setTotalCount(res.totalCount);
    };

    resync();
  }, [currentPage, sortOption, selectedCategory, keyword]);

  useEffect(() => {
    if (keyword) {
      setSelectedCategory(ACTIVITY_CATEGORIES[0]);
      setSortOption('');
      setCurrentPage(1);
    }
  }, [keyword]);

  const totalPage = Math.ceil(totalCount / 8);

  return (
    <section className='max-w-1200 m-auto px-24 lg:px-0 pb-83'>

      {/* 🔍 검색 모드일 때 문구 표시 */}
      {isSearchMode && keyword && (
        <>
          <p className="text-left text-lg font-semibold ml-4 md:ml-0 mt-32">
            <span className="text-primary font-bold">"{keyword}"</span>
            (으)로 검색한 결과입니다.
          </p>

          <p className="text-left text-sm font-normal ml-4 md:ml-0 mt-8 mb-16">
            총 <span className="font-semibold">{totalCount}</span>개의 결과
          </p>

          {experiences.length === 0 && (
            <p className="text-center text-gray-500 mt-32">검색 결과가 없습니다.</p>
          )}
        </>
      )}

      {/* 🧭 필터/정렬 UI (검색 모드 아닐 때만) */}
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
        {/* 🚂 모든 체험 제목 (검색 아닐 때만) */}
        {!isSearchMode && (
          <h2 className='text-xl md:text-3xl font-bold'>🛼 모든 체험</h2>
        )}

        {/* 체험 카드 목록 */}
        <div className='grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-4 lg:grid-rows-2 gap-8 md:gap-16 lg:gap-24 mt-24'>
          {experiences.map((exp) => (
            <Link
              key={exp.id}
              href={`/activities/${exp.id}`} // 아이디 기반 라우팅
            >
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
      </div>

      {/* 페이지네이션: 결과 있을 때만 표시 */}
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
