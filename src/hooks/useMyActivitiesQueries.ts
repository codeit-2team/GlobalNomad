'use client';

import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import {
  getMyActivitiesWithPagination,
  deleteMyActivity,
} from '@/apis/myActivities';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const MY_ACTIVITIES_QUERY_KEYS = {
  ALL: ['my-activities'] as const,
  INFINITE: ['my-activities', 'infinite'] as const,
} as const;

// 내 체험 리스트 조회 (무한 스크롤)
export const useMyActivitiesInfinite = () => {
  return useInfiniteQuery({
    queryKey: MY_ACTIVITIES_QUERY_KEYS.INFINITE,
    queryFn: ({ pageParam = 0 }) =>
      getMyActivitiesWithPagination({ cursorId: pageParam, size: 10 }),
    getNextPageParam: (lastPage) => {
      return lastPage.activities.length === 10 ? lastPage.cursorId : undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  });
};

// 내 체험 삭제
export const useDeleteMyActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyActivity,
    onSuccess: () => {
      // 내 체험 관련 쿼리들 무효화
      queryClient.invalidateQueries({
        queryKey: MY_ACTIVITIES_QUERY_KEYS.ALL,
      });

      // 홈페이지 체험 리스트 쿼리들 무효화
      queryClient.invalidateQueries({
        queryKey: ['popularExperiences'],
      });
      queryClient.invalidateQueries({
        queryKey: ['experiences'],
        exact: false,
      });

      toast.success('체험이 삭제되었습니다.');
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;

      switch (status) {
        case 400:
          toast.error('예약이 있는 체험은 삭제할 수 없습니다.');
          break;
        case 401:
          toast.error('로그인이 필요합니다.');
          break;
        case 403:
          toast.error('삭제 권한이 없습니다.');
          break;
        case 404:
          toast.error('존재하지 않는 체험입니다.');
          break;
        default:
          toast.error('체험 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });
};
