import { privateInstance } from '@/apis/privateInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const deleteActivity = async (id: number) => {
  const response = await privateInstance.delete(`/deleteActivity/${id}`);
  return response.data;
};

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteActivity,
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ['activity'] });
      queryClient.invalidateQueries({
        queryKey: ['experiences'],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: ['popularExperiences'] });
      router.push(`/`);
      toast.success('체험이 삭제되었습니다!');
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as
        | { error?: string; message?: string }
        | undefined;

      console.error('전체 에러:', error);

      toast.error(
        responseData?.error ||
          responseData?.message ||
          error.message ||
          '삭제에 실패했습니다.',
      );
    },
  });
};
