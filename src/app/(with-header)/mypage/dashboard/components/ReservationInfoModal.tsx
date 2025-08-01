'use client';

import { useState } from 'react';
import {
  useReservedSchedules,
  useActivityReservations,
  useUpdateActivityReservationStatus,
} from '@/hooks/useDashboardQueries';
import { DashboardFilterOption } from '@/types/dashboardTypes';
import { DASHBOARD_TAB_OPTIONS } from '@/constants/dashboardConstants';
import {
  createTimeSlotOptions,
  getScheduleIdFromTimeSlot,
  getSelectedTimeSlotValue,
} from '@/utils/timeSlotUtils';
import Dropdown from '@/components/Dropdown';
import ReservationActionButtons from './ReservationActionButtons';
import dayjs from 'dayjs';
import CloseIcon from '@assets/svg/close';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activityId: number;
  date: string;
}

export default function ReservationInfoModal({
  isOpen,
  onClose,
  activityId,
  date,
}: Props) {
  const [activeTab, setActiveTab] = useState<DashboardFilterOption>('pending');
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  );

  // 해당 날짜의 시간대 목록 조회
  const { data: schedules } = useReservedSchedules(
    activityId,
    isOpen ? date : '',
  );

  // 선택된 시간대의 예약 내역 조회
  const { data: reservationsData } = useActivityReservations(activityId, {
    scheduleId: selectedScheduleId || undefined,
    status: activeTab,
  });

  // 예약 상태 업데이트
  const updateReservationMutation = useUpdateActivityReservationStatus();

  const timeSlotOptions = createTimeSlotOptions(schedules);
  const selectedTimeSlotValue = getSelectedTimeSlotValue(
    schedules,
    selectedScheduleId,
  );

  // 예약 승인/거절 처리
  const handleReservationAction = async (
    reservationId: number,
    status: 'confirmed' | 'declined',
  ) => {
    try {
      await updateReservationMutation.mutateAsync({
        activityId,
        reservationId,
        data: { status },
      });
    } catch (_error) {
      alert('예약 처리에 실패했습니다.');
    }
  };

  const handleApprove = (reservationId: number) => {
    handleReservationAction(reservationId, 'confirmed');
  };

  const handleReject = (reservationId: number) => {
    handleReservationAction(reservationId, 'declined');
  };

  if (!isOpen) return null;

  const allReservations =
    reservationsData?.pages.flatMap((page) => page.reservations) || [];

  // 탭별 카운트 계산
  const getTabCounts = () => {
    if (!schedules) return { pending: 0, confirmed: 0, declined: 0 };

    return schedules.reduce(
      (acc, schedule) => {
        acc.pending += schedule.count.pending;
        acc.confirmed += schedule.count.confirmed;
        acc.declined += schedule.count.declined;
        return acc;
      },
      { pending: 0, confirmed: 0, declined: 0 },
    );
  };

  const tabCounts = getTabCounts();

  return (
    <>
      {/* 모바일 배경 오버레이 */}
      <div
        className='bg-opacity-50 fixed inset-0 z-[9999] bg-black sm:hidden'
        onClick={onClose}
      />

      {/* 모달 컨테이너 */}
      <div className='absolute top-72 right-0 z-[9999] h-697 w-429 rounded-3xl border border-gray-200 bg-white shadow-lg max-sm:fixed max-sm:inset-0 max-sm:h-full max-sm:w-full max-sm:rounded-none max-sm:border-none'>
        {/* 헤더 */}
        <div className='flex items-center justify-between p-24 pb-0'>
          <h3 className='text-2xl font-bold text-black'>예약 정보</h3>
          <button
            onClick={onClose}
            className='flex h-24 w-24 items-center justify-center'
          >
            <CloseIcon size={40} />
          </button>
        </div>

        <div className='mt-27 px-24'>
          {/* 탭 메뉴 */}
          <div className='flex border-b border-gray-200'>
            {DASHBOARD_TAB_OPTIONS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`relative px-16 py-12 text-xl font-semibold ${
                  activeTab === tab.value ? 'text-green-300' : 'text-gray-900'
                }`}
              >
                {tab.label} {tabCounts[tab.value]}
                {activeTab === tab.value && (
                  <div className='absolute right-0 bottom-0 left-0 h-2 bg-green-300' />
                )}
              </button>
            ))}
          </div>

          <div className='mt-27'>
            {/* 예약 날짜 */}
            <h4 className='text-xl font-semibold text-black'>예약 날짜</h4>
            <p className='mt-16 text-xl font-normal text-black'>
              {dayjs(date).format('YYYY년 M월 D일')}
            </p>

            {/* 시간대 선택 드롭다운 */}
            <div className='mt-24'>
              <Dropdown
                options={timeSlotOptions}
                value={selectedTimeSlotValue}
                onChange={(value) => {
                  const scheduleId = getScheduleIdFromTimeSlot(
                    value,
                    schedules,
                  );
                  setSelectedScheduleId(scheduleId);
                }}
                placeholder='시간대를 선택하세요'
                className='h-56 w-full sm:w-381 [&>button]:!rounded-xl [&>button]:!border-black [&>button]:sm:!rounded-sm [&>button:focus]:!border-black [&>button[aria-expanded="true"]]:!border-black'
              />
            </div>
          </div>

          {/* 예약 내역 섹션 */}
          <div className='mt-16 max-h-246 overflow-x-hidden overflow-y-auto'>
            {selectedScheduleId && allReservations.length > 0 ? (
              <div className='space-y-12'>
                {allReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className='flex h-116 w-full items-end justify-between rounded-xl border border-gray-300 p-12 sm:rounded-lg'
                  >
                    <div className='flex flex-col gap-4 self-start'>
                      <div className='flex items-center gap-10'>
                        <span className='text-lg text-gray-800'>닉네임</span>
                        <span className='text-lg font-medium text-black'>
                          {reservation.nickname}
                        </span>
                      </div>
                      <div className='flex items-center gap-10'>
                        <span className='text-lg text-gray-800'>인원</span>
                        <span className='text-lg font-medium text-black'>
                          {reservation.headCount}명
                        </span>
                      </div>
                    </div>

                    {/* 상태 */}
                    <ReservationActionButtons
                      reservationId={reservation.id}
                      status={reservation.status}
                      onApprove={handleApprove}
                      onReject={handleReject}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className='py-40 text-center text-gray-500'>
                {selectedScheduleId
                  ? '예약 내역이 없습니다.'
                  : '시간대를 선택해주세요.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
