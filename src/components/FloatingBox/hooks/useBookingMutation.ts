import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateInstance } from '@/apis/privateInstance';
import useBookingStore from '@/stores/Booking/useBookingStore';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';

export function useBookingMutation(onSuccessCallback?: () => void) {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const {
    selectedTimeId,
    participants,
    setSelectedDate,
    setSelectedTime,
    setSelectedTimeId,
  } = useBookingStore();
  const setIsOpen = useBookingStore((state) => state.setIsOpen);

  const mutation = useMutation({
    mutationFn: async () => {
      return privateInstance.post(`/activities/${id}/reservation`, {
        selectedTimeId,
        participants,
      });
    },
    onSuccess: () => {
      // 예약 내역 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['reservations'],
        exact: false,
      });

      toast.success('예약되었습니다!');
      setSelectedDate(null);
      setSelectedTime('');
      setSelectedTimeId(null);
      setIsOpen(false);
      onSuccessCallback?.();
    },
    onError: (err) => {
      const error = err as AxiosError;
      const responseData = error.response?.data as
        | { error?: string; message?: string }
        | undefined;

      console.error('예약 에러:', error);

      toast.error(
        responseData?.error ||
          responseData?.message ||
          error.message ||
          '예약에 실패했습니다.',
      );
    },
  });

  return mutation;
}
