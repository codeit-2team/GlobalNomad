'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MyActivity } from '@/types/dashboardTypes';
import { useRouter } from 'next/navigation';
import Star from '@assets/svg/star';
import MoreOptionsIcon from '@assets/svg/moreOptionsIcon';

interface ActivityCardProps {
  activity: MyActivity;
  onDelete: (activityId: number) => void;
}

export default function ActivityCard({
  activity,
  onDelete,
}: ActivityCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const { id, title, price, bannerImageUrl, rating, reviewCount } = activity;

  const handleEdit = () => {
    router.push(`/myactivity/${id}`);
  };

  const handleDelete = () => {
    onDelete(id);
    setIsMenuOpen(false);
  };

  return (
    <div className='flex h-204 w-792 rounded-3xl border border-gray-300 bg-white'>
      {/* 이미지 영역 */}
      <div className='relative h-204 w-204 flex-shrink-0 overflow-hidden rounded-l-xl'>
        <Image src={bannerImageUrl} alt={title} fill className='object-cover' />
      </div>

      {/* 콘텐츠 영역 */}
      <div className='flex flex-1 flex-col justify-start px-24 py-14'>
        {/* 별점 및 리뷰 */}
        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-2'>
            <Star size={19} />
            <span className='font-base font-normal text-black'>{rating}</span>
            <span className='font-base font-normal text-black'>
              ({reviewCount})
            </span>
          </div>
        </div>

        {/* 제목 */}
        <div className='mt-6'>
          <h3 className='text-nomad text-xl font-bold'>{title}</h3>
        </div>

        <div className='mt-auto flex items-center justify-between'>
          {/* 가격 */}
          <p className='text-2xl font-medium text-gray-900'>
            ₩{price.toLocaleString()} / 인
          </p>

          {/* 더보기 옵션 */}
          <div className='relative'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='flex h-40 w-40 items-center justify-center rounded-full hover:bg-gray-100'
            >
              <MoreOptionsIcon size={40} />
            </button>

            {isMenuOpen && (
              <>
                <div
                  className='fixed inset-0 z-40'
                  onClick={() => setIsMenuOpen(false)}
                />

                {/* 드롭다운 메뉴 */}
                <div className='absolute top-full right-0 z-50 w-160 rounded-md border border-gray-300 bg-white shadow-lg'>
                  <button
                    onClick={handleEdit}
                    className='flex h-62 w-full items-center justify-center border-b border-gray-300 px-46 py-18 text-center text-lg font-medium text-gray-900 hover:bg-gray-50'
                  >
                    수정하기
                  </button>
                  <button
                    onClick={handleDelete}
                    className='flex h-62 w-full items-center justify-center px-46 py-18 text-center text-lg font-medium text-gray-900 hover:bg-gray-50'
                  >
                    삭제하기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
