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
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ['activity'] });  // 내 체험 관리
      queryClient.invalidateQueries({ queryKey: ['experiences'], exact: false }); // 모든 체험 리스트
      queryClient.invalidateQueries({ queryKey: ['popularExperiences'] });   // 인기 체험
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
