'use client';

import { useEffect, useRef, useState } from 'react';
import IconArrowRight from '@assets/svg/right-arrow';
import IconArrowLeft from '@assets/svg/left-arrow';
import PopularCard from '@/app/(with-header)/components/PopularCard';
import { getPopularExperiences } from '../../api/experiences/getPopularExperiences';
import { Experience } from '@/types/experienceListTypes';

export default function PopularExperiences() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [popularExperiences, setPopularExperiences] = useState<Experience[]>([]);

  // 좌우 버튼 클릭 시 한 장씩 슬라이드 이동
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

  // 인기 체험 목록 불러오기
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await getPopularExperiences({ cursorId: 0 });
        setPopularExperiences(res.activities);
      } catch (error) {
        console.error('인기 체험을 불러오는 데 실패했습니다:', error);
      }
    };

    fetchPopular();
  }, []);

  return (
    <section className='pt-24 md:pt-34 pl-24 lg:pl-0 pb-40 lg:pb-33 lg:max-w-1200 lg:w-full mx-auto'>
      {/* 섹션 제목 + 좌우 화살표 버튼 */}
      <div className='flex justify-between items-center pb-16 md:pb-32 mb-6'>
        <h2 className='text-xl md:text-3xl font-bold'>🔥 인기 체험</h2>
        <div className='flex gap-2'>
          <IconArrowLeft size={32} onClick={() => scrollByCard('left')} className='text-2xl px-3' />
          <IconArrowRight size={32} onClick={() => scrollByCard('right')} className='text-2xl px-3' />
        </div>
      </div>

      {/* 가로 슬라이드 카드 리스트 */}
      <div
        ref={sliderRef}
        className='flex gap-16 md:gap-32 lg:gap-24 overflow-x-auto scroll-smooth no-scrollbar'
      >
        {popularExperiences.map((exp) => (
          <div key={exp.id} className='flex-shrink-0 card'>
            <PopularCard
              imageUrl={exp.bannerImageUrl}
              title={exp.title}
              rating={exp.rating}
              reviews={exp.reviewCount}
              price={exp.price}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
