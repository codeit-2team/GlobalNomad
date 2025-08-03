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

  const handleCardClick = () => {
    router.push(`/activities/${id}`);
  };

  const handleEdit = () => {
    router.push(`/myactivity/${id}`);
  };

  const handleDelete = () => {
    onDelete(id);
    setIsMenuOpen(false);
  };

  return (
    <div
      className='flex h-128 w-full max-w-792 cursor-pointer flex-row rounded-3xl border border-gray-300 bg-white transition-shadow hover:shadow-md sm:h-156 lg:h-204'
      onClick={handleCardClick}
    >
      {/* 이미지 영역 */}
      <div className='relative h-full w-128 flex-shrink-0 overflow-hidden rounded-l-3xl sm:w-156 lg:w-204'>
        <Image src={bannerImageUrl} alt={title} fill className='object-cover' />
      </div>

      {/* 콘텐츠 영역 */}
      <div className='flex w-0 flex-grow flex-col justify-start px-12 py-10 sm:px-16 sm:py-12 lg:px-24 lg:py-14'>
        {/* 별점 및 리뷰 */}
        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-2'>
            <Star size={19} />
            <span className='text-sm font-normal text-black sm:text-base'>
              {rating}
            </span>
            <span className='text-sm font-normal text-black sm:text-base'>
              ({reviewCount})
            </span>
          </div>
        </div>

        {/* 제목 */}
        <div className='mt-2 sm:mt-4 lg:mt-6'>
          <h3 className='text-nomad truncate text-sm font-bold sm:text-lg lg:text-xl'>
            {title}
          </h3>
        </div>

        <div className='mt-auto flex items-center justify-between'>
          {/* 가격 */}
          <p className='text-base font-medium text-gray-900 sm:text-xl lg:text-2xl'>
            ₩{price.toLocaleString()} / 인
          </p>

          {/* 더보기 옵션 */}
          <div className='relative'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className='flex h-40 w-40 items-center justify-center rounded-full hover:bg-gray-100'
            >
              <MoreOptionsIcon size={40} />
            </button>

            {isMenuOpen && (
              <>
                <div
                  className='fixed inset-0 z-40'
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                  }}
                />
                {/* 드롭다운 메뉴 */}
                <div className='absolute top-full right-0 z-50 w-120 rounded-md border border-gray-300 bg-white shadow-lg sm:w-160'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit();
                    }}
                    className='flex h-50 w-full items-center justify-center border-b border-gray-300 px-4 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-50 sm:h-62 sm:px-46 sm:py-18 sm:text-lg'
                  >
                    수정하기
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
                    className='flex h-50 w-full items-center justify-center px-4 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-50 sm:h-62 sm:px-46 sm:py-18 sm:text-lg'
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
