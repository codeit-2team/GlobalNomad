import { privateInstance } from '@/apis/privateInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * 특정 알림을 삭제하는 비동기 함수입니다.
 *
 * @param {number} notificationId - 삭제할 알림의 고유 ID
 * @returns {Promise<void>} 삭제가 성공하면 아무것도 반환하지 않음
 * @throws {Error} 삭제가 실패한 경우 에러를 throw
 *
 * @example
 * await deleteNotification(1234); // 알림 ID 1234 삭제
 */
const deleteNotification = async (notificationId: number): Promise<void> => {
  const res = await privateInstance.delete(
    `/my-notifications/${notificationId}`,
  );
  if (res.status === 204) return;

  throw new Error(`삭제 실패:status ${res.status}`);
};

/**
 * 알림 삭제를 위한 커스텀 훅입니다.
 *
 * @returns {UseMutationResult<void, Error, number>} 알림 삭제 뮤테이션 훅
 *
 * @description
 * - TanStack Query의 `useMutation`을 활용하여 알림을 삭제합니다.
 * - 삭제 성공 시 `['notifications']` 쿼리를 무효화하여 목록을 자동 갱신합니다.
 *
 * @example
 * const { mutate: deleteNotification } = useDeleteNotification();
 * deleteNotification(1234); // 알림 ID 1234 삭제
 */
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (NotificationId: number) => deleteNotification(NotificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
