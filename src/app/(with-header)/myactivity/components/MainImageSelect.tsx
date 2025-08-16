'use client';

import { ImageUpload } from './ImageUpload';
import { ImagePreview } from './ImagePreview';
import { MainImageSelectProps } from '@/types/addEditExperienceType';

export function MainImageSelect({
  mainImage,
  onImageSelect,
  onImageRemove,
}: MainImageSelectProps) {
  return (
    <div className='pt-24'>
      <h3 className='mb-3 text-2xl font-bold text-black'>배너 이미지</h3>
      <p className='mb-4 text-sm text-gray-600'>
        체험을 대표하는 메인 이미지를 등록해주세요.
      </p>

      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4'>
        <ImageUpload onImageSelect={onImageSelect} />

        {mainImage && (
          <ImagePreview
            image={mainImage}
            onRemove={onImageRemove}
            alt='메인 이미지'
          />
        )}
      </div>

      <p className='text-md mt-3 text-gray-500'>
        * 메인 이미지는 1장만 등록할 수 있습니다.
      </p>
    </div>
  );
}
