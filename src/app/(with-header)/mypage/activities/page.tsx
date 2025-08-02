'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useMyActivitiesInfinite,
  useDeleteMyActivity,
} from '@/hooks/useMyActivitiesQueries';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import Button from '@/components/Button';
import ActivityCard from './components/ActivityCard';
import EmptyActivities from './components/EmptyActivities';
import DeleteActivityModal from './components/DeleteActivityModal';

export default function MyActivitiesPage() {
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    activityId: number | null;
  }>({
    isOpen: false,
    activityId: null,
  });

  // 내 체험 리스트 조회
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useMyActivitiesInfinite();

  // 체험 삭제
  const deleteActivityMutation = useDeleteMyActivity();

  // 무한 스크롤 훅
  const { lastElementRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
  });

  // 체험 등록하기
  const handleCreateActivity = () => {
    router.push('/myactivity');
  };

  const handleDeleteClick = (activityId: number) => {
    setDeleteModal({
      isOpen: true,
      activityId,
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.activityId) {
      deleteActivityMutation.mutate(deleteModal.activityId);
    }
    setDeleteModal({ isOpen: false, activityId: null });
  };

  const handleDeleteClose = () => {
    setDeleteModal({ isOpen: false, activityId: null });
  };

  // 전체 체험 목록
  const allActivities = data?.pages.flatMap((page) => page.activities) ?? [];

  // 로딩 상태
  if (isLoading) {
    return (
      <div className='w-full max-w-none lg:max-w-792'>
        <div className='mb-24 flex items-center justify-between'>
          <h1 className='text-nomad text-3xl leading-42 font-bold'>
            내 체험 관리
          </h1>
          <Button
            variant='primary'
            onClick={handleCreateActivity}
            className='h-48 w-120 rounded-sm px-16 py-8 text-base font-bold whitespace-nowrap'
          >
            체험 등록하기
          </Button>
        </div>
        <div className='space-y-24'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='rounded-24 h-204 w-792 animate-pulse bg-gray-200'
            />
          ))}
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className='w-full max-w-none lg:max-w-792'>
        <div className='mb-24 flex items-center justify-between'>
          <h1 className='text-nomad text-3xl leading-42 font-bold'>
            내 체험 관리
          </h1>
          <Button
            variant='primary'
            onClick={handleCreateActivity}
            className='h-48 w-120 rounded-sm px-16 py-8 text-base font-bold whitespace-nowrap'
          >
            체험 등록하기
          </Button>
        </div>
        <div className='text-center text-red-500'>
          <p>체험 목록을 불러오는데 실패했습니다.</p>
          <p className='mt-2 text-sm text-gray-600'>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='w-full max-w-none lg:max-w-792'>
        {/* 제목 */}
        <div className='mb-48 flex items-center justify-between'>
          <h1 className='text-nomad text-3xl leading-42 font-bold'>
            내 체험 관리
          </h1>
          <Button
            variant='primary'
            onClick={handleCreateActivity}
            className='h-48 w-120 rounded-sm px-16 py-8 text-base font-bold whitespace-nowrap'
          >
            체험 등록하기
          </Button>
        </div>

        {/* 체험 목록 */}
        {allActivities.length === 0 ? (
          <EmptyActivities />
        ) : (
          <div className='space-y-24'>
            {allActivities.map((activity, index) => (
              <div
                key={activity.id}
                ref={index === allActivities.length - 1 ? lastElementRef : null}
              >
                <ActivityCard
                  activity={activity}
                  onDelete={handleDeleteClick}
                />
              </div>
            ))}

            {/* 무한 스크롤 로딩 */}
            {isFetchingNextPage && (
              <div className='rounded-24 h-204 w-792 animate-pulse bg-gray-200' />
            )}
          </div>
        )}
      </div>

      {/* 삭제 확인 모달 */}
      <DeleteActivityModal
        isOpen={deleteModal.isOpen}
        onCancel={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteActivityMutation.isPending}
      />
    </>
  );
}
