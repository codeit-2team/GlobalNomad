import { notFound } from 'next/navigation';
import Title from './components/Title';
import ImageGrid from './components/ImageGrid';
import BookingSection from './components/BookingSection';
import LocationMap from '@/components/LocationMap';
import ReviewSection from './components/ReviewSection';
import { ActivityDetail } from '@/types/activityDetailType';

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let activityData: ActivityDetail;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/activities/${id}`,
      { next: { tags: [`activity-${id}`] } },
    );

    if (!res.ok) {
      if (res.status === 404) notFound();
      throw new Error('활동 상세 데이터 조회 실패');
    }

    activityData = await res.json();
  } catch (error: any) {
    if (error?.digest === 'NEXT_NOT_FOUND') throw error;
    throw new Error('활동 상세 데이터 조회 실패');
  }

  const subImageUrls = activityData.subImages.map(
    (image) => image.imageUrl,
  );

  return (
    <div className='mx-auto mt-30 max-w-1200 p-4 px-20 sm:px-20 lg:p-8'>
      <Title
        title={activityData.title}
        category={activityData.category}
        rating={activityData.rating}
        reviewCount={activityData.reviewCount}
        address={activityData.address ?? ''}
        userId={activityData.userId}
      />
      <ImageGrid
        mainImage={activityData.bannerImageUrl}
        subImages={subImageUrls}
      />

      <div className='mt-86 grid gap-15 grid-cols-1 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <h2 className='mb-4 pb-2 text-2xl font-bold'>체험 설명</h2>
          <p className='leading-relaxed whitespace-pre-line'>
            {activityData.description}
          </p>
        </div>

        <BookingSection
          activityId={id}
          userId={activityData.userId}
          price={activityData.price}
        />

        <div className='md:col-span-2'>
          <h2 className='mb-4 pb-2 text-2xl font-bold'>체험 장소</h2>
          <LocationMap address={activityData.address ?? ''} />

          <ReviewSection
            activityId={Number(id)}
            reviewCount={activityData.reviewCount}
            rating={activityData.rating}
          />
        </div>
      </div>
    </div>
  );
}
