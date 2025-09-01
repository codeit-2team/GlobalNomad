'use client';

import { MainImageSelect } from './MainImageSelect';
import { SubImageSelect } from './SubImageSelect';
import { ImagesSectionProps } from '@/types/addEditExperienceType';

export function ImageSection({
  mainImage,
  subImage,
  onMainImageSelect,
  onMainImageRemove,
  onSubImageAdd,
  onSubImageRemove,
}: ImagesSectionProps) {
  return (
    <div className='space-y-8'>
      <MainImageSelect
        mainImage={mainImage}
        onImageSelect={onMainImageSelect}
        onImageRemove={onMainImageRemove}
      />

      <SubImageSelect
        subImage={subImage}
        onImagesAdd={onSubImageAdd}
        onImageRemove={onSubImageRemove}
      />
    </div>
  );
}
