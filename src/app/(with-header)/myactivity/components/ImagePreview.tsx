'use client';

import IconClose from '@assets/svg/close';

interface ImagePreviewProps {
  image: File | string;
  onRemove: () => void;
  alt: string;
  className?: string;
}

export function ImagePreview({
  image,
  onRemove,
  alt,
  className = '',
}: ImagePreviewProps) {
  const src = typeof image === 'string' ? image : URL.createObjectURL(image);

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
        className='absolute top-2 right-2 rounded-full bg-gray-600 p-1 text-white transition-colors hover:bg-gray-700'
        aria-label='이미지 삭제'
      >
        <IconClose />
      </button>
    </div>
  );
}
