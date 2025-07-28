'use client';

import Dropdown from '@components/Dropdown';
import Pagination from '@components/Pagination';
import { useEffect, useState } from 'react';

import CategoryFilter from '@/app/(with-header)/components/CategoryFilter';
import ExperienceCard from '@/app/(with-header)/components/ExperienceCard';
import { getExperiences } from '@/app/api/experiences/getExperiences';
import { ACTIVITY_CATEGORIES, ActivityCategory } from '@/constants/categories';
import { SORT_OPTIONS, SORT_VALUE_MAP, SORT_LABEL_MAP, } from '@/constants/SortPrices';
import { Experience } from '@/types/experienceListTypes';

interface ExperienceListProps {
  keyword?: string;
}

export default function ExperienceList({ keyword }: ExperienceListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>(ACTIVITY_CATEGORIES[0]);
  const [sortOption, setSortOption] = useState<string | undefined>('');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchExperiences = async () => {
      const res = await getExperiences({
        page: currentPage,
        sort: sortOption,
        keyword,
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

  const totalPage = Math.ceil(totalCount / 8);

  return (
    <section className='max-w-1200 m-auto px-24 md:px-0 pb-83'>
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
          options={SORT_OPTIONS} // ['가격 낮은순', '가격 높은순']
          value={SORT_LABEL_MAP[sortOption || ''] ?? ''} // 표시용 라벨
          onChange={(label: keyof typeof SORT_VALUE_MAP) => {
            const value = SORT_VALUE_MAP[label];
            setSortOption(value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className='m-0'>
        <h2 className='text-xl md:text-3xl font-bold'>🛼 모든 체험</h2>
        <div className='grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-4 lg:grid-rows-2 gap-8 md:gap-16 lg:gap-24 mt-24'>
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              imageUrl={exp.bannerImageUrl}
              price={exp.price}
              rating={exp.rating}
              reviews={exp.reviewCount}
              title={exp.title}
            />
          ))}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
