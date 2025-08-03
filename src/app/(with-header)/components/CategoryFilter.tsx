'use client';

import Button from '@/components/Button';
import { ACTIVITY_CATEGORIES, ActivityCategory } from '@/constants/categories';
import cn from '@/lib/cn';
import { useRef, useState, useEffect } from 'react';

interface CategoryFilterProps {
  selectedCategory: ActivityCategory;
  onChange: (category: ActivityCategory) => void;
  className?: string;
}

export default function CategoryFilter({
  selectedCategory,
  onChange,
  className,
}: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleFirstInteraction = () => {
    if (!hasInteracted) setHasInteracted(true);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    handleFirstInteraction();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
    handleFirstInteraction();
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleScroll = () => {
    handleFirstInteraction();
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='relative w-full'>
      {/* 스크롤 가능한 영역 */}
      <div
        ref={scrollRef}
        className={cn(
          'relative z-20 flex w-full gap-8 pr-15 overflow-x-auto whitespace-nowrap no-scrollbar cursor-grab active:cursor-grabbing select-none',
          className,
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {ACTIVITY_CATEGORIES.map((category) => (
          <Button
            key={category}
            className='flex-shrink-0 max-w-80 max-h-41 py-12 text-[16px] rounded-[15px]'
            selected={selectedCategory === category}
            variant='category'
            onClick={() => onChange(category)}
          >
            {category}
          </Button>
        ))}

        {/* 그라데이션: 처음만 보이고 상호작용하면 사라짐 */}
        {!hasInteracted && (
          <div className='pointer-events-none absolute top-0 right-0 h-full w-[100px] bg-gradient-to-l from-white to-transparent z-10 transition-opacity duration-300' />
        )}
      </div>
    </div>
  );
}
