'use Client';

import { useNotifications } from '@/hooks/useNotification';
import useOutsideClick from '@/hooks/useOutsideClick';
import IconClose from '@assets/svg/close';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import Loading from '../Loading';
import NotificationCardList from './NotificationCardList';

type NotificationDropdownProps = {
  onClose: () => void;
};

/**
 * 알림 드롭다운 컴포넌트
 *
 * @component
 * @param {NotificationDropdownProps} props - 알림 드롭다운 props
 * @param {() => void} props.onClose - 드롭다운을 닫는 콜백 함수
 *
 * @description
 * - 알림 목록을 보여주는 드롭다운 컴포넌트입니다.
 * - `useNotifications` 훅을 사용하여 알림 데이터를 가져옵니다.
 * - 로딩 중에는 Loading 컴포넌트를, 에러 발생 시 토스트 알림을 표시합니다.
 * - `NotificationCardList` 컴포넌트를 통해 알림 목록을 렌더링합니다.
 * - 드롭다운 외부를 클릭하면 `onClose` 콜백을 호출하여 닫힙니다.
 * - 반응형 대응이 되어 있으며, 모바일에서는 전체 화면으로, 데스크탑에서는 작은 박스로 표시됩니다.
 */
export default function NotificationDropdown({
  onClose,
}: NotificationDropdownProps) {
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, onClose);

  const { data, isLoading, isError } = useNotifications({
    size: 10,
  });

  useEffect(() => {
    if (isError && !data) {
      toast.error('알림을 불러오지 못했어요.');
    }
  }, [isError, data]);

  return (
    <div
      ref={dropdownRef}
      className='z-50 flex h-full w-full flex-col gap-16 bg-[#ced8d5] px-20 py-40 md:h-494 md:w-368 md:rounded-[10px] md:border md:border-gray-400 md:py-24'
    >
      <div className='flex items-center justify-between'>
        <p className='text-xl text-black'>알림 {data?.totalCount ?? 0}개</p>
        <button onClick={onClose}>
          <IconClose />
        </button>
      </div>

      {isLoading && (
        <div className='flex h-full items-center justify-center'>
          <Loading />
        </div>
      )}

      {!isLoading && data && (
        <NotificationCardList notification={data.notifications} />
      )}
    </div>
  );
}
