'use client';

import cn from '@/lib/cn';
import Button from '@/components/Button';
import { ACTIVITY_CATEGORIES, ActivityCategory } from '@/constants/categories';

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
  return (
    <div className={cn('relative flex w-full gap-8 overflow-x-auto whitespace-nowrap no-scrollbar', className)}>
      {ACTIVITY_CATEGORIES.map((category) => (
        <Button
          key={category}
          variant='category'
          selected={selectedCategory === category}
          onClick={() => onChange(category)}
          className='flex-shrink-0 max-w-80 max-h-41 py-12 text-[16px] rounded-[15px]'
        >
          {category}
        </Button>
      ))}
      <div className='pointer-events-none absolute top-0 right-0 h-full w-100 bg-gradient-to-l from-white to-transparent' />
    </div>
  );
}
