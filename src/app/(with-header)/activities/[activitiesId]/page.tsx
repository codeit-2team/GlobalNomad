'use client';

import { mockActivity } from './mock/mock';
import Title from './components/Title';
import ImageGrid from './components/ImageGrid';
import ReviewCard from './components/ReviewCard';
import BookingInterface from '@/components/FloatingBox/BookingInterface';
import LocationMap from '@/components/LocationMap';
import ReviewTitle from './components/ReviewTitle';

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

      <div className='mt-86 grid grid-cols-1 gap-15 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <h2 className='mb-4 pb-2 text-2xl font-bold'>체험 설명</h2>
          <p className='whitespace-pre-line'>{description}</p>
        </div>
        <div className='md:row-span-2'>
          <BookingInterface />
        </div>

        <div className='md:col-span-2'>
          <h2 className='mb-4 pb-2 text-2xl font-bold'>체험 장소</h2>
          <LocationMap address='서울특별시 강남구' />
          <ReviewTitle />
          <ReviewCard
            userName='강지현'
            date='2023. 2. 4'
            reviewText='전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 이번 체험을 거쳐 저의 춤추기 실력은 더욱 향상되었어요.'
            avatarSrc='/test/image1.png'
          />
          <ReviewCard
            userName='강지현'
            date='2023. 2. 4'
            reviewText='전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 이번 체험을 거쳐 저의 춤추기 실력은 더욱 향상되었어요.'
            avatarSrc='/test/image1.png'
          />

          <ReviewCard
            userName='강지현'
            date='2023. 2. 4'
            reviewText='전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 이번 체험을 거쳐 저의 춤추기 실력은 더욱 향상되었어요.'
            avatarSrc='/test/image1.png'
          />
          <ReviewCard
            userName='강지현'
            date='2023. 2. 4'
            reviewText='전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 이번 체험을 거쳐 저의 춤추기 실력은 더욱 향상되었어요.'
            avatarSrc='/test/image1.png'
          />
        </div>
      </div>
    </div>
  );
}
