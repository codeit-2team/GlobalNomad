'use client';

import Star from '@assets/svg/star';
import { useState, useEffect } from 'react';

interface ReviewTitleProps {
  reviewCount: number;
  rating: number;
}
export default function ReviewTitle({ reviewCount, rating }: ReviewTitleProps) {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const handleSummary = () => {
      if (rating >= 4.5) {
        setSummary('매우 만족');
      } else if (rating >= 3) {
        setSummary('만족');
      } else if (rating >= 2.5) {
        setSummary('보통');
      } else {
        setSummary('별로에요');
      }
    };

    handleSummary();
  }, [rating]);

  return (
    <div className='mt-10 mb-10 flex flex-col'>
      <h2 className='text-2xl font-bold'>후기</h2>

      <div className='mt-15 flex items-center gap-15'>
        <h2 className='text-4xl font-bold'>{rating}</h2>
        <div className='flex flex-col gap-10'>
          <p>{summary}</p>
          <div className='flex items-center'>
            <Star />
            <p>{reviewCount}개의 후기</p>
          </div>
        </div>
      </div>
    </div>
  );
}
