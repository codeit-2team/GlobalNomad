'use client';

import { useState, useEffect } from 'react';

import Dropdown from '@/components/Dropdown';
import { useMyActivities } from '@/hooks/useDashboardQueries';
import { useActivityOptions } from '@/hooks/useActivityOptions';

import EmptyDashboard from './components/EmptyDashboard';
import ReservationDashboardCalendar from './components/ReservationDashboardCalendar';
import ReservationInfoModal from './components/ReservationInfoModal';

export default function MyDashboardPage() {
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 내 체험 리스트 조회
  const { data: activitiesData, isLoading, error } = useMyActivities();
  const { activityOptions, uniqueTitles } = useActivityOptions(activitiesData);

  // 페이지 로드 시 첫 번째 체험 자동 선택
  useEffect(() => {
    if (
      activitiesData?.activities &&
      activitiesData.activities.length > 0 &&
      !selectedActivityId
    ) {
      const firstActivity = activitiesData.activities[0];
      setSelectedActivityId(firstActivity.id);
    }
  }, [activitiesData, selectedActivityId]);

  // 체험 선택 -> 제목으로 ID 찾기
  const handleActivityChange = (selectedTitle: string) => {
    const selectedOption = activityOptions.find(
      (option) => option.label === selectedTitle,
    );

    if (selectedOption) {
      setSelectedActivityId(parseInt(selectedOption.value));
      setSelectedDate('');
    }
  };

  // 현재 선택된 체험의 제목 찾기
  const selectedActivityTitle =
    activityOptions.find(
      (option) => parseInt(option.value) === selectedActivityId,
    )?.label || '';

  // 날짜 클릭 (모달 열기)
  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDate('');
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className='w-full'>
        {/* 제목 */}
        <h1 className='text-nomad mb-32 text-3xl leading-42 font-bold'>
          예약 현황
        </h1>

        {/* 드롭다운 스켈레톤 */}
        <div className='mb-48 h-56 w-full max-w-792 animate-pulse rounded-md bg-gray-200' />

        {/* 달력 스켈레톤 */}
        <div className='rounded-24 h-600 w-full animate-pulse bg-gray-200' />
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className='w-full'>
        {/* 제목 */}
        <h1 className='text-nomad mb-32 text-3xl leading-42 font-bold'>
          예약 현황
        </h1>

        {/* 에러 메시지 */}
        <div className='text-center text-red-500'>
          <p>예약 현황을 불러오는데 실패했습니다.</p>
          <p className='mt-2 text-sm text-gray-600'>{error.message}</p>
        </div>
      </div>
    );
  }

  // 등록한 체험이 없을경우 EmptyDashboard만 표시(드롭다운 x)
  if (!activitiesData?.activities || activitiesData.activities.length === 0) {
    return (
      <div className='w-full'>
        {/* 제목 */}
        <h1 className='text-nomad mb-32 text-3xl leading-42 font-bold'>
          예약 현황
        </h1>

        <EmptyDashboard />
      </div>
    );
  }

  // 등록한 체험이 존재할 경우
  return (
    <>
      <div className='w-full'>
        {/* 제목 */}
        <h1 className='text-nomad mb-32 text-3xl leading-42 font-bold'>
          예약 현황
        </h1>

        {/* 체험 선택 드롭다운 */}
        <div className='mb-48 w-full max-w-792'>
          <Dropdown
            options={uniqueTitles}
            value={selectedActivityTitle}
            onChange={handleActivityChange}
            placeholder='체험을 선택하세요'
            className='h-56'
          />
        </div>

        {/* 컨텐츠 영역 */}
        <div className='relative'>
          {selectedActivityId && (
            <>
              <ReservationDashboardCalendar
                activityId={selectedActivityId}
                onDateClick={handleDateClick}
              />
              {/* 예약 정보 모달 */}
              {isModalOpen && (
                <ReservationInfoModal
                  isOpen={isModalOpen}
                  onClose={handleModalClose}
                  activityId={selectedActivityId}
                  date={selectedDate}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
