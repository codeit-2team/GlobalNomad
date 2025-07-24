'use client';

import { useRef } from 'react';
import ExperienceCard from '@/app/(with-header)/components/ExperienceCard';
import IconArrowRight from '@assets/svg/right-arrow';
import IconArrowLeft from '@assets/svg/left-arrow';

export default function PopularExperiences() {
  const sliderRef = useRef<HTMLDivElement>(null);

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
    <section className="pt-24 pl-24 pb-40">
      <div className="flex justify-between items-center pb-16 md:pb-32 mb-6">
        <h2 className="text-xl md:text-3xl font-bold">🔥 인기 체험</h2>
        <div className="flex gap-2">
          <IconArrowLeft onClick={() => scrollByCard('left')} className="text-2xl px-3" />
          <IconArrowRight onClick={() => scrollByCard('right')} className="text-2xl px-3" />
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex gap-16 md:gap-32 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="flex-shrink-0 card">
            <ExperienceCard />
          </div>
        ))}
      </div>
    </section>
  );
}
