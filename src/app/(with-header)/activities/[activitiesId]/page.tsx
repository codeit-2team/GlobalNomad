'use client';

import { mockActivity } from './mock/mock';
import Title from './components/Title';
import ImageGrid from './components/ImageGrid';

export default function ActivityDetailPage() {
  const {
    title,
    category,
    description,
    address,
    bannerImageUrl,
    subImages,
    rating,
    reviewCount,
  } = mockActivity;

  const subImageUrls = subImages.map((image) => image.imageUrl);

  return (
    <div className='mx-auto max-w-1200 p-4 sm:px-20 lg:p-8'>
      <Title
        title={title}
        category={category}
        rating={rating}
        reviewCount={reviewCount}
        address={address}
        isDropDown={true}
      />
      <ImageGrid mainImage={bannerImageUrl} subImages={subImageUrls} />

      <div className='mt-8 grid grid-cols-1 gap-8 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <h2 className='mb-4 border-b pb-2 text-2xl font-bold'>체험 설명</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
