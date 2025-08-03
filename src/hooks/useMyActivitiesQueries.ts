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
      toast.error(`체험 삭제 실패: ${error.message}`);
    },
  });
};
