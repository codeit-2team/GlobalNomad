'use client';
import IconClose from '@assets/svg/close';
import { ImageUpload } from './ImageUpload';

interface MainImageSelectProps {
  mainImage: File | string | null;
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
}

export function MainImageSelect({
  mainImage,
  onImageSelect,
  onImageRemove,
}: MainImageSelectProps) {
  const previewUrl =
    typeof mainImage === 'string'
      ? mainImage
      : mainImage
        ? URL.createObjectURL(mainImage)
        : '';

  return (
    <div>
      <h3 className='mb-3 text-2xl font-bold text-black'>배너 이미지</h3>
      <p className='mb-4 text-sm text-gray-600'>
        체험을 대표하는 메인 이미지를 등록해주세요.
      </p>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {!mainImage ? (
          <ImageUpload
            onImageSelect={onImageSelect}
            className='sm:col-span-1'
          />
        ) : (
          <div className='group relative sm:col-span-1'>
            <div className='aspect-square w-full overflow-hidden rounded-lg'>
              <img
                src={previewUrl || '/placeholder.svg'}
                className='h-full w-full object-cover'
                alt='배너 이미지'
              />
            </div>
            <button
              type='button'
              onClick={onImageRemove}
              className='absolute top-2 right-2 rounded-full p-1 text-white opacity-0 transition-colors group-hover:opacity-100 hover:bg-gray-700'
              aria-label='이미지 삭제'
            >
              <IconClose />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
