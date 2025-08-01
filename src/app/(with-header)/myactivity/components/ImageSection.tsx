'use client';

import { MainImageSelect } from './MainImageSelect';
import { SubImageSelect } from './SubImageSelect';

interface ImagesSectionProps {
  mainImage: string | File | null;
  subImage: (string | File)[];
  onMainImageSelect: (file: File) => void;
  onMainImageRemove: () => void;
  onSubImageAdd: (files: File[]) => void;
  onSubImageRemove: (index: number) => void;
}

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
