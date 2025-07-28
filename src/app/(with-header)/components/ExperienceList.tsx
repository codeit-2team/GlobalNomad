'use client';

import { useEffect, useState } from 'react';
import CategoryFilter from '@/app/(with-header)/components/CategoryFilter';
import ExperienceCard from '@/app/(with-header)/components/ExperienceCard';
import Pagination from '@components/Pagination';
import Dropdown from '@components/Dropdown';
import { ACTIVITY_CATEGORIES, ActivityCategory } from '@/constants/categories';
import { SORT_OPTIONS, SortOption } from '@/constants/SortPrices';
import { Experience } from '@/types/experienceListTypes';
import { getExperiences } from '@/app/api/experiences/getExperiences';

interface ExperienceListProps {
  keyword?: string;
}

export default function ExperienceList({ keyword }: ExperienceListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>(ACTIVITY_CATEGORIES[0]);
  const [sortOption, setSortOption] = useState<SortOption | ''>('');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  // API 호출
  useEffect(() => {
    const fetchExperiences = async () => {
      const res = await getExperiences({
        page: currentPage,
        sort: sortOption,
        keyword, // 검색어
      });

      setExperiences(res.experiences);
      setTotalCount(res.totalCount);
    };

    fetchExperiences();
  }, [currentPage, sortOption, keyword]);

  useEffect(() => {
    if (keyword) {
      setSelectedCategory(ACTIVITY_CATEGORIES[0]);
      setSortOption('');
      setCurrentPage(1);
    }
  }, [keyword]);

  const totalPage = Math.ceil(totalCount / 8); // 한 페이지당 8개 기준

  return (
    <section className='max-w-1200 m-auto px-24 md:px-0 pb-83'>
      {/* 필터 + 드롭다운 라인 */}
      <div className='flex justify-between items-center mb-40'>
        <CategoryFilter
          selectedCategory={selectedCategory}
          onChange={(category) => {
            setSelectedCategory(category);
            setCurrentPage(1); // 필터 변경 시 페이지 초기화
          }}
        />
        <Dropdown
          options={SORT_OPTIONS}
          placeholder='가격'
          value={sortOption}
          onChange={(sort) => {
            setSortOption(sort);
            setCurrentPage(1); // 정렬 변경 시 페이지 초기화
          }}
          className='w-120 h-41 text-[14px]'
        />
      </div>

      {/* 카드 리스트 */}
      <div className='m-0'>
        <h2 className='text-xl md:text-3xl font-bold'>🛼 모든 체험</h2>
        <div className='grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-4 lg:grid-rows-2 gap-8 md:gap-16 lg:gap-24 mt-24'>
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              imageUrl={exp.bannerImageUrl}
              title={exp.title}
              rating={exp.rating}
              reviews={exp.reviewCount}
              price={exp.price}
            />
          ))}
        </div>
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
