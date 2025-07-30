import { privateInstance } from '@/apis/privateInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
    onError: (error) => {
      console.error('삭제 실패:', error);
    },
  });
};
