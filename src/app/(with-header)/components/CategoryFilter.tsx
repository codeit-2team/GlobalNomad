'use client';

import Button from '@/components/Button';

interface CategoryFilterProps {
  selectedCategory: string;
  onChange: (category: string) => void;
}

const CATEGORY_LIST = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

export default function CategoryFilter({
  selectedCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-12">
      {CATEGORY_LIST.map((category) => (
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
