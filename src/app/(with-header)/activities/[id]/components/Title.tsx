import React, { useState, useEffect } from 'react';
import IconDropdown from '@assets/svg/dropdown';
import Star from '@assets/svg/star';
import useUserStore from '@/stores/authStore';
import { ActivityDetail } from '@/types/activityDetailType';

export default function Title({
  title,
  category,
  rating,
  reviewCount,
  address,
  isOwner,
}: ActivityDetail) {
  return (
    <div className='mb-6 flex items-start justify-between'>
      <div className='flex flex-col gap-8'>
        <p>{category}</p>
        <h1 className='mb-2 text-2xl font-bold text-black md:text-3xl'>
          {title}
        </h1>
        <div className='flex items-center gap-10 text-sm text-gray-600'>
          <div className='flex items-center gap-1'>
            <Star />
            <span className='font-medium'>
              {rating.toFixed(1)} ({reviewCount}명)
            </span>
          </div>
          <span>{address}</span>
        </div>
      </div>

      {isOwner && (
        <button>
          <IconDropdown />
        </button>
      )}
    </div>
  );
}
