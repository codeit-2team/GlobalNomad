'use client';

import { useParams } from 'next/navigation';
import { privateInstance } from '@/apis/privateInstance';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import useBookingStore from '@/stores/Booking/useBookingStore';
import useUserStore from '@/stores/authStore';
import { useMutation } from '@tanstack/react-query';

export const useBooking = (isOwner: boolean) => {
  const { id } = useParams();
  const { user } = useUserStore();

  const {
    selectedDate,
    selectedTime,
    participants,
    selectedTimeId,
    setToInitial,
  } = useBookingStore();

  const bookingMutation = useMutation({
    mutationFn: async () => {
      return await privateInstance.post(`/activities/${id}/reservation`, {
        selectedTimeId,
        participants,
      });
    },
    onSuccess: () => {
      toast.success('예약되었습니다!');
      setToInitial();
    },
    onError: (err) => {
      const error = err as AxiosError;
      const responseData = error.response?.data as
        | { error?: string; message?: string }
        | undefined;

      console.error('전체 에러:', error);

      toast.error(
        responseData?.error ||
          responseData?.message ||
          error.message ||
          '예약에 실패했습니다.',
      );
    },
  });

  const isLoggedIn = !!user;
  const isBookable =
    !!selectedDate &&
    !!selectedTime &&
    !!selectedTimeId &&
    !!participants &&
    !isOwner &&
    isLoggedIn;

  const buttonText = !isLoggedIn
    ? '로그인이 필요한 기능입니다'
    : isOwner
      ? '본인이 등록한 체험입니다'
      : '예약하기';

  return {
    onBooking: bookingMutation.isPending,
    handleBooking: () => bookingMutation.mutate(),
    isBookable,
    buttonText,
    selectedDate,
    selectedTime,
  };
};
