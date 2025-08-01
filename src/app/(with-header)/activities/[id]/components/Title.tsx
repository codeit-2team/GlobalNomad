'use client';

import React, { useState } from 'react';
import IconDropdown from '@assets/svg/dropdown';
import Star from '@assets/svg/star';
import ActivityDropdown from '@/components/ActivityDropdown';
import Menu from '@/components/ActivityDropdown/menu';
import Item from '@/components/ActivityDropdown/Item';
import Trigger from '@/components/ActivityDropdown/trigger';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteActivity } from '../hooks/useDeleteActivity';
import Popup from '@/components/Popup';

interface TitleProps {
  title: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  isOwner: boolean;
}

function Title({
  title,
  category,
  rating,
  reviewCount,
  address,
  isOwner,
}: TitleProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useDeleteActivity();

  const handleEdit = () => {
    queryClient.invalidateQueries({ queryKey: ['edit-activity', id] });
    router.push(`/myactivity/${id}`);
  };

  const handleDeleteConfirm = () => {
    if (!id) return;
    mutate(id as string);
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className='mb-6 flex items-start justify-between'>
        <div className='flex flex-col gap-8'>
          <p>{category}</p>
          <h1 className='mb-2 text-2xl font-bold text-black md:text-3xl'>
            {title}
          </h1>
          <div className='flex items-center gap-10 text-sm text-gray-600'>
            <div className='flex items-center gap-1'>
              <Star />
              <span className='font-medium'>
                {rating.toFixed(1)} ({reviewCount}명)
              </span>
            </div>
            <span>{address}</span>
          </div>
        </div>

        {isOwner && (
          <ActivityDropdown>
            <Trigger>
              <IconDropdown />
            </Trigger>
            <Menu>
              <Item onClick={handleEdit}>수정하기</Item>
              <Item onClick={() => setIsPopupOpen(true)}>삭제하기</Item>
            </Menu>
          </ActivityDropdown>
        )}
      </div>

      <Popup
        isOpen={isPopupOpen}
        type='confirm'
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handleDeleteConfirm}
      >
        정말 삭제하시겠습니까?
      </Popup>
    </>
  );
}

export default React.memo(Title);
