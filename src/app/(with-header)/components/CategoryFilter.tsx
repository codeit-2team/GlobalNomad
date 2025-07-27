'use client';

import Button from '@/components/Button';
import { ACTIVITY_CATEGORIES, ActivityCategory } from '@/constants/categories';

interface CategoryFilterProps {
  selectedCategory: ActivityCategory;
  onChange: (category: ActivityCategory) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-12">
      {ACTIVITY_CATEGORIES.map((category) => (
        <Button
          key={category}
          variant="category"
          selected={selectedCategory === category}
          onClick={() => onChange(category)}
          className="w-fit px-20 py-12 text-md"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
