'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { ImageGridProps } from '@/types/activityDetailType';

function ImageGrid({ mainImage, subImages }: ImageGridProps) {
  const images = [mainImage, ...subImages];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* 모바일 */}
      <div className='relative block aspect-square h-[300px] w-full overflow-hidden rounded-lg md:hidden'>
        <Image
          src={images[currentIndex]}
          alt={`슬라이드 이미지 ${currentIndex + 1}`}
          fill
          className='object-cover hover:animate-pulse'
        />
        <button
          onClick={prevSlide}
          aria-label='이전 이미지'
          className='absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/50 px-6 py-10 text-white'
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          aria-label='다음 이미지'
          className='absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/50 px-6 py-10 text-white'
        >
          ›
        </button>
        <div className='absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1'>
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-10 w-10 rounded-full ${
                i === currentIndex ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
      {/* PC 태블릿 */}
      <div className='hidden h-[500px] grid-cols-4 grid-rows-4 gap-6 md:grid'>
        <div className='relative col-span-2 row-span-4 hover:animate-pulse'>
          <Image
            src={mainImage}
            alt='메인이미지'
            fill
            className='rounded-lg object-cover'
          />
        </div>

        {subImages.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className='relative col-span-1 row-span-2 h-full hover:animate-pulse'
          >
            <Image
              src={image}
              alt={`서브이미지 ${index + 1}`}
              fill
              className='rounded-lg object-cover'
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default React.memo(ImageGrid);
