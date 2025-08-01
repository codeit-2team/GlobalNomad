'use client';

import IconArrowLeft from '@assets/svg/left-arrow';
import IconArrowRight from '@assets/svg/right-arrow';
import { useRef } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import PopularCard from '@/app/(with-header)/components/PopularCard';
import { getPopularExperiences } from '../../api/experiences/getPopularExperiences';

export default function PopularExperiences() {
  const sliderRef = useRef<HTMLDivElement>(null);

  // TanStack Query 도입
  const { data, isLoading, error } = useQuery({
    queryKey: ['popularExperiences'],
    queryFn: getPopularExperiences,
  });

  const scrollByCard = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const card = sliderRef.current.querySelector('.card');
    if (!(card instanceof HTMLElement)) return;

    const cardWidth = card.offsetWidth;
    const gap = parseInt(getComputedStyle(sliderRef.current).gap) || 0;
    const distance = cardWidth + gap;

    sliderRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  if (isLoading) return <p className="text-center">인기 체험을 불러오는 중입니다...</p>;
  if (error || !data) return <p className="text-center text-red-500">데이터를 불러오는 데 실패했어요 😢</p>;

  return (
    <section className='pt-24 md:pt-34 pl-24 lg:pl-0 pb-40 lg:pb-33 lg:max-w-1200 lg:w-full mx-auto'>
      <div className='flex justify-between items-center pb-16 md:pb-32 mb-6'>
        <h2 className='text-xl md:text-3xl font-bold'>🔥 인기 체험</h2>
        <div className='flex gap-2'>
          <IconArrowLeft className='text-2xl px-3 cursor-pointer' size={32} onClick={() => scrollByCard('left')} />
          <IconArrowRight className='text-2xl px-3 cursor-pointer' size={32} onClick={() => scrollByCard('right')} />
        </div>
      </div>

      <div
        ref={sliderRef}
        className='flex gap-16 md:gap-32 lg:gap-24 overflow-x-auto scroll-smooth no-scrollbar'
      >
        {data.activities.map((exp) => (
          <div key={exp.id} className='flex-shrink-0 card'>
            <Link href={`/activities/${exp.id}`} className='flex-shrink-0 card'>
              <PopularCard
                imageUrl={exp.bannerImageUrl}
                price={exp.price}
                rating={exp.rating}
                reviews={exp.reviewCount}
                title={exp.title}
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
