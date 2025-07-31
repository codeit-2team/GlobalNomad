'use client';

import { useState } from 'react';
import Star from '@/../public/assets/svg/star';
import StarEmpty from '@/../public/assets/svg/star-empty';

interface RatingProps {
  value: number;
  onChange: (rating: number) => void;
  size?: number;
  className?: string;
}

export default function Rating({
  value,
  onChange,
  size = 56,
  className = '',
}: RatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (rating: number) => {
    onChange(rating);
  };

  const handleMouseEnter = (rating: number) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className={`flex gap-8 ${className}`} onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hoverRating || value);
        return (
          <button
            key={star}
            type='button'
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            className='cursor-pointer transition-transform hover:scale-110'
          >
            {isActive ? (
              <Star size={size} className='color-yellow-100' />
            ) : (
              <StarEmpty size={size} className='color-gray-300' />
            )}
          </button>
        );
      })}
    </div>
  );
}
