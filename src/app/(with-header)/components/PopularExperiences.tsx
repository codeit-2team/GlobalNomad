'use client';

import { useRef } from 'react';
import IconArrowRight from '@assets/svg/right-arrow';
import IconArrowLeft from '@assets/svg/left-arrow';
import PopularCard from '@/app/(with-header)/components/PopularCard';

export default function PopularExperiences() {
  // 카드 슬라이더를 참조할 DOM ref
  const sliderRef = useRef<HTMLDivElement>(null);

  // 좌우 버튼 클릭 시 한 장씩 슬라이드 이동
  const scrollByCard = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;

    // 첫 번째 카드 요소를 찾아서 너비 측정
    const card = sliderRef.current.querySelector('.card');
    if (!(card instanceof HTMLElement)) return;

    const cardWidth = card.offsetWidth; // 카드 너비
    const gap = parseInt(getComputedStyle(sliderRef.current).gap) || 0; // gap 값
    const distance = cardWidth + gap; // 한 번에 이동할 거리

    // 슬라이더 스크롤 이동 (좌/우 방향에 따라)
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

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
        {[...Array(4)].map((_, idx) => (
          // 카드 wrapper: flex-shrink-0으로 크기 고정 + 'card' 클래스로 식별
          <div key={idx} className='flex-shrink-0 card'>
            <PopularCard />
          </div>
        ))}
      </div>
    </section>
  );
}
