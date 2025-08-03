'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import Rating from '@/components/Rating';
import Close from '@/../public/assets/svg/close';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (rating: number, content: string) => void;
  isLoading?: boolean;
  activityTitle?: string;
  activityImage?: string;
  activityDate?: string;
  activityTime?: string;
  headCount?: number;
  totalPrice?: number;
}

export default function ReviewModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  activityTitle,
  activityImage,
  activityDate,
  activityTime,
  headCount,
  totalPrice,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      alert('별점을 선택해주세요.');
      return;
    }
    if (content.trim() === '') {
      alert('후기를 작성해주세요.');
      return;
    }
    onConfirm(rating, content);
  };

  const handleClose = () => {
    setRating(0);
    setContent('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <Modal.Content
        zIndex={9999}
        backdropClassName='bg-black/50 max-sm:!items-start max-sm:!justify-start'
        className='!h-750 !w-480 !max-w-none !min-w-0 !rounded-xl !p-0 !m-0 max-sm:!h-full max-sm:!w-full max-sm:!max-h-full max-sm:!rounded-none max-sm:!border-none'
      >
        <div className='flex h-full w-full flex-col overflow-hidden rounded-xl bg-white shadow-lg max-sm:rounded-none'>
          {/* 헤더 */}
          <div className='flex items-center justify-between px-24 pt-23 pb-41'>
            <h2 className='text-nomad text-xl font-bold'>후기 작성</h2>
            <button
              onClick={handleClose}
              className='text-gray-400 hover:text-gray-600'
              disabled={isLoading}
            >
              <Close size={24} color='currentColor' />
            </button>
          </div>

          {/* 본문 */}
          <div className='flex flex-1 flex-col px-24 pb-24'>
            {/* 체험 정보 카드 */}
            <div className='mb-32 flex gap-16'>
              {/* 체험 이미지 */}
              <div className='relative h-126 w-126 flex-shrink-0 overflow-hidden rounded-lg'>
                {activityImage ? (
                  <Image
                    src={activityImage}
                    alt={activityTitle || '체험 이미지'}
                    fill
                    className='object-cover'
                  />
                ) : (
                  <div className='h-full w-full bg-gray-200' />
                )}
              </div>

              {/* 체험 정보 */}
              <div className='flex flex-1 flex-col justify-center'>
                <h3 className='text-nomad mb-8 line-clamp-1 text-xl font-bold max-sm:text-lg'>
                  {activityTitle}
                </h3>
                <div className='mb-8 text-lg font-normal text-gray-600 max-sm:text-sm'>
                  {activityDate} · {activityTime} · {headCount}명
                </div>
                <div className='text-nomad text-3xl font-normal max-sm:text-xl'>
                  ₩{totalPrice?.toLocaleString()}
                </div>
              </div>
            </div>

            {/* 별점 */}
            <div className='mb-32'>
              <Rating
                value={rating}
                onChange={setRating}
                size={56}
                className='justify-center'
              />
            </div>

            {/* 후기 내용 */}
            <div className='flex-1'>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='후기를 작성해주세요.'
                className='focus:border-nomad h-full w-full resize-none rounded-lg border border-gray-900 p-16 text-base placeholder-gray-400 focus:outline-none'
                disabled={isLoading}
              />
            </div>

            {/* 작성하기 버튼 */}
            <div className='mt-24'>
              <Button
                variant='primary'
                className='bg-nomad h-56 w-full rounded-lg text-lg font-medium text-white disabled:bg-gray-500'
                onClick={handleSubmit}
                disabled={isLoading || rating === 0}
              >
                {isLoading ? '작성 중...' : '작성하기'}
              </Button>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
}
