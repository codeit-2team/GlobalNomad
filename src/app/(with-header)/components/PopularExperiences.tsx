'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

import IconArrowLeft from '@assets/svg/left-arrow';
import IconArrowRight from '@assets/svg/right-arrow';

import PopularCard from '@/app/(with-header)/components/PopularCard';
import PopularCardSkeleton from '@/app/(with-header)/components/Skeletons/PopularCardSkeleton';

import { getPopularExperiences } from '@/app/api/experiences/getPopularExperiences';
import { ExperienceResponse } from '@/types/experienceListTypes';

export default function PopularExperiences() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<
    ExperienceResponse,               // 단일 page 응답 타입
    Error,                            // 에러 타입
    InfiniteData<ExperienceResponse>  // 전체 infinite data 타입
  >({
    queryKey: ['popularExperiences'],
    queryFn: ({ pageParam = undefined }) =>
      getPopularExperiences(pageParam as number | undefined), // 타입 단언 필요
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      Array.isArray(lastPage.activities) && lastPage.activities.length > 0
        ? lastPage.cursorId
        : undefined,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: sliderRef.current, threshold: 1.0 },
    );

    const target = loadMoreRef.current;
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allActivities =
    data?.pages.flatMap((page) => page.activities) ?? [];

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

  return (
    <section className='pt-24 md:pt-34 pl-16 md:pl-24 lg:pl-0 pb-40 lg:pb-33 lg:max-w-1200 lg:w-full mx-auto'>
      <div className='flex justify-between items-center pb-16 md:pb-32 mb-6'>
        <h2 className='text-xl md:text-3xl font-bold'>🔥 인기 체험</h2>
        <div className='flex gap-2'>
          <IconArrowLeft className='text-2xl px-3 cursor-pointer' size={32} onClick={() => scrollByCard('left')} />
          <IconArrowRight className='text-2xl px-3 cursor-pointer' size={32} onClick={() => scrollByCard('right')} />
        </div>
      </div>

      <div
        ref={sliderRef}
        className='flex gap-16 md:gap-32 lg:gap-24 overflow-x-auto scroll-smooth no-scrollbar select-none'
      >
        {status === 'pending' ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex-shrink-0 card">
              <PopularCardSkeleton />
            </div>
          ))
        ) : (
          <>
            {allActivities.map((exp) => (
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
            {/* 무한스크롤 감지용 */}
            <div ref={loadMoreRef} className='flex-shrink-0 w-1 h-1' />
          </>
        )}
      </div>
    </section>
  );
}
