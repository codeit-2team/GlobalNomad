import { privateInstance } from '@/apis/privateInstance';
import { Notification, NotificationParams } from '@/types/notificationType';
import { useQuery } from '@tanstack/react-query';

/**
 * 사용자의 알림 목록을 백엔드에서 가져오는 비동기 함수입니다.
 *
 * @param {NotificationParams} params - 알림 요청 파라미터
 * @param {number} params.size - 가져올 알림 개수
 * @param {number} [params.cursorId] - 커서 기반 페이지네이션을 위한 기준 ID (선택)
 * @returns {Promise<Notification>} 알림 목록, 전체 개수 및 커서 정보를 포함한 객체 반환
 *
 * @example
 * const data = await getMyNotifications({ size: 10, cursorId: 100 });
 * console.log(data.notifications); // 알림 목록 출력
 */
export const getMyNotifications = async (
  params: NotificationParams,
): Promise<Notification> => {
  const queryParams: Record<string, number> = {
    size: params.size,
    ...(params.cursorId != null ? { cursorId: params.cursorId } : {}),
  };

  const res = await privateInstance.get<Notification>('/my-notifications', {
    params: queryParams,
  });

  return res.data;
};

/**
 * 사용자 알림을 가져오기 위한 TanStack Query 훅입니다.
 *
 * @param {NotificationParams} params - 알림 요청 파라미터
 * @returns {UseQueryResult<Notification>} 알림 데이터 및 쿼리 상태를 포함한 객체
 *
 * @description
 * - `getMyNotifications`를 내부적으로 호출하여 데이터를 불러옵니다.
 * - `params`에 따라 쿼리 키가 고유하게 결정되어 캐싱됩니다.
 * - 실패 시 fallback으로 빈 알림 배열과 totalCount 0을 반환합니다.
 *
 * @example
 * const { data, isLoading } = useNotifications({ size: 10 });
 */
export const useNotifications = (params: NotificationParams) => {
  return useQuery<Notification>({
    queryKey: ['notifications', params],
    queryFn: async () => {
      const data = await getMyNotifications(params);
      return data || { notifications: [], totalCount: 0 };
    },
  });
};
