import { ImagePreview } from './ImagePreview';
import { ImageUpload } from './ImageUpload';

interface SubImageSelectProps {
  subImage: (string | File)[];
  onImagesAdd: (files: File[]) => void;
  onImageRemove: (index: number) => void;
}

export function SubImageSelect({
  subImage,
  onImagesAdd,
  onImageRemove,
}: SubImageSelectProps) {
  const handleImageUpload = (file: File) => {
    if (subImage.length < 4) {
      onImagesAdd([file]);
    }
  };

  return (
    <div className='pt-24'>
      <h3 className='mb-3 text-2xl font-bold text-black'>소개 이미지</h3>
      <p className='mb-4 text-sm text-gray-600'>
        체험의 상세한 모습을 보여주는 이미지들을 등록해주세요.
      </p>

      <div className='grid grid-cols-2 gap-20 sm:grid-cols-3 lg:grid-cols-4'>
        {subImage.length < 4 && (
          <ImageUpload onImageSelect={handleImageUpload} />
        )}
        {subImage.map((img, idx) => (
          <ImagePreview
            key={idx}
            image={img}
            onRemove={() => onImageRemove(idx)}
            alt={`소개 이미지 ${idx + 1}`}
          />
        ))}
      </div>

      <p className='text-md mt-3 text-gray-500'>
        * 이미지는 최대 4장까지 등록 가능합니다.
      </p>
    </div>
  );
}
