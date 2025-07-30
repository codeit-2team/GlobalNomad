import React from 'react';
import IconDropdown from '@assets/svg/dropdown';
import Star from '@assets/svg/star';
import { ActivityDetail } from '@/types/activityDetailType';
import ActivityDropdown from '@/components/ActivityDropdown';
import Menu from '@/components/ActivityDropdown/menu';
import Item from '@/components/ActivityDropdown/Item';
import Trigger from '@/components/ActivityDropdown/trigger';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteActivity } from '../hooks/useDeleteActivity';

export default function Title({
  title,
  category,
  rating,
  reviewCount,
  address,
  isOwner,
}: ActivityDetail) {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isError, error } = useDeleteActivity();

  const handleDelete = () => {
    if (!id) return;
    if (confirm('정말 삭제하시겠습니까?')) {
      mutate(id as string);
    }
  };
  const handleEdit = () => {
    queryClient.invalidateQueries({ queryKey: ['edit-activity', id] });
    router.push(`/myactivity/${id}`);
  };

  return (
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
            <Item onClick={handleDelete}>삭제하기</Item>
          </Menu>
        </ActivityDropdown>
      )}
    </div>
  );
}
