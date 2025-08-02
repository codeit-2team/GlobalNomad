'use client';

import { getMyNotifications } from '@/hooks/useNotification';
import { Notification } from '@/types/notificationType';
import { useEffect, useRef, useState } from 'react';
import NotificationCard from './NotificationCard';
import { toast } from 'sonner';

type NotificationCardListProps = {
  notification: Notification['notifications'];
};

/**
 * 알림 목록을 렌더링하고, 무한 스크롤 방식으로 알림을 추가 로드하는 컴포넌트입니다.
 *
 * @component
 * @param {NotificationCardListProps} props - 컴포넌트에 전달되는 props
 * @param {Notification['notifications']} props.notification - 초기 알림 목록 데이터
 *
 * @description
 * - 최초 렌더링 시 props로 전달된 알림 데이터를 기반으로 초기 알림 리스트를 구성합니다.
 * - IntersectionObserver를 사용하여 마지막 요소가 뷰포트에 들어올 때 추가 알림을 비동기적으로 요청합니다.
 * - 이미 렌더링된 알림 ID는 `Set`으로 추적하여 중복 알림이 리스트에 추가되지 않도록 방지합니다.
 * - 알림 삭제 시 `onDelete` 콜백을 통해 해당 알림을 `currentNotifications` 상태에서 제거합니다.
 * - 알림이 하나도 없을 경우 "알림이 없습니다"라는 메시지를 출력합니다.
 */
export default function NotificationCardList({
  notification,
}: NotificationCardListProps) {
  // 현재 화면에 표시할 알림 목록 상태
  const [currentNotifications, setCurrentNotifications] =
    useState(notification);

  // 마지막 요소를 감지하기 위한 ref (IntersectionObserver 대상)
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 더 가져올 알림이 있는지 여부
  const [hasMore, setHasMore] = useState(notification.length > 0);

  // 추가 알림을 가져오는 중인지 여부
  const [isFetching, setIsFetching] = useState(false);

  // 중복 알림을 막기 위한 ID 저장소 (Set)
  const existingId = useRef(new Set<number>());

  /**
   * 새로운 알림을 비동기로 불러오는 함수
   * - 중복 알림 필터링
   */
  const fetchNotifications = async () => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);
    try {
      const data = await getMyNotifications({
        size: 10,
      });

      if (!data?.notifications?.length) {
        setHasMore(false);
        return;
      }

      // 중복 제거: 이미 렌더링된 ID 제외
      const newItems = data.notifications.filter(
        (n) => !existingId.current.has(n.id),
      );

      // 새로 들어온 알림 ID 등록
      newItems.forEach((n) => existingId.current.add(n.id));

      if (newItems.length === 0) {
        setHasMore(false);
        return;
      }

      // 새로운 알림을 기존 목록에 추가
      setCurrentNotifications((prev) => [...prev, ...newItems]);

      // 다음 커서가 없으면 더 이상 불러올 데이터 없음
      if (data.cursorId === null) {
        setHasMore(false);
      }
    } catch (err) {
      toast.error('알림 추가 실패');
    } finally {
      setIsFetching(false);
    }
  };

  /**
   * 초기 렌더링 시:
   * - 기존 알림 ID Set 구성
   * - 상태 초기화
   */
  useEffect(() => {
    if (existingId.current.size === 0) {
      const initialId = new Set(notification.map((n) => n.id));
      existingId.current = initialId;
    }

    setCurrentNotifications(notification);
    setHasMore(notification.length > 0);
  }, [notification]);

  /**
   * IntersectionObserver로 스크롤 하단 감지 → fetchNotifications 호출
   */
  useEffect(() => {
    const target = observerRef.current;
    if (!target || !hasMore || isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNotifications();
      },
      { rootMargin: '100px', threshold: 0.1 },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasMore, isFetching]);

  if (currentNotifications.length === 0) {
    return (
      <div className='flex h-full flex-col items-center justify-center pb-50 text-2xl text-gray-700'>
        알림이 없습니다.
      </div>
    );
  }

  return (
    <div className='no-scrollbar relative flex flex-col gap-8 overflow-y-auto'>
      {currentNotifications.map((n) => (
        <NotificationCard
          key={n.id}
          id={n.id}
          content={n.content}
          createdAt={n.createdAt}
          onDelete={(id) =>
            setCurrentNotifications((prev) =>
              prev.filter((item) => item.id !== id),
            )
          }
        />
      ))}

      <div ref={hasMore ? observerRef : null} />
    </div>
  );
}
