import { privateInstance } from '@/apis/privateInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const deleteActivity = async (id: string) => {
  const response = await privateInstance.delete(`/deleteActivity/${id}`);
  return response.data;
};

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteActivity,
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['activity'] });
      router.push(`/`);
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as
        | { error?: string; message?: string }
        | undefined;

      console.error('전체 에러:', error);

      alert(
        //토스트로 대체
        responseData?.error ||
          responseData?.message ||
          error.message ||
          '삭제에 실패했습니다.',
      );
    },
  });
};
