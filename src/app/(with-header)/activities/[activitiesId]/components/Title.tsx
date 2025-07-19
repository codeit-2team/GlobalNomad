import React from 'react';
import IconDropdown from '@assets/svg/dropdown';

interface TitleProps {
  title: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  isDropDown?: boolean;
}

export default function Title({
  title,
  category,
  rating,
  reviewCount,
  address,
  isDropDown,
}: TitleProps) {
  return (
    <div className='mb-6 flex items-start justify-between'>
      <div className='flex flex-col gap-8'>
        <p>{category}</p>
        <h1 className='mb-2 text-2xl font-bold text-black md:text-3xl'>
          {title}
        </h1>
        <div className='flex items-center gap-4 text-sm text-gray-600'>
          <div className='flex items-center gap-1'>
            <span className='text-yellow-500'>★</span>
            <span className='font-medium'>
              {rating.toFixed(1)} ({reviewCount}명)
            </span>
          </div>
          <span>{address}</span>
        </div>
      </div>

      {isDropDown && (
        <div className='mt-30 flex items-center gap-2'>
          <IconDropdown />
        </div>
      )}
    </div>
  );
}
