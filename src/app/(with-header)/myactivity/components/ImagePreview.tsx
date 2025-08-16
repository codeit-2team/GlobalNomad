'use client';

import IconClose from '@assets/svg/close';
import { useState, useEffect } from 'react';
import { ImagePreviewProps } from '@/types/addEditExperienceType';

export function ImagePreview({
  image,
  onRemove,
  alt,
  className = '',
}: ImagePreviewProps) {
  const [src, setSrc] = useState('');

  useEffect(() => {
    if (typeof image === 'string') {
      setSrc(image);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setSrc(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  return (
    <div className={`group relative ${className}`}>
      <div className='aspect-square w-full overflow-hidden rounded-lg'>
        <img
          src={src || '/placeholder.svg'}
          className='h-full w-full object-cover'
          alt={alt}
        />
      </div>
      <button
        type='button'
        onClick={onRemove}
        className='absolute -top-12 -right-12 h-24 w-24 rounded-full bg-[rgba(27,27,27,0.8)] text-white transition-colors'
        aria-label='이미지 삭제'
      >
        <IconClose
          className='m-auto h-12 w-12'
          fill='currentColor'
          alt='삭제 아이콘'
        />
      </button>
    </div>
  );
}
