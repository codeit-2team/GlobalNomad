'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getMyProfile,
  updateMyProfile,
  uploadProfileImage,
} from '@/apis/mypage';
import {
  UpdateProfileRequest,
  ProfileImageResponse,
} from '@/types/mypageTypes';
import { User } from '@/types/user';
import useMyPageStore from '@/stores/MyPage/useMyPageStore';
import { useEffect } from 'react';

export const QUERY_KEYS = {
  PROFILE: ['mypage', 'profile'] as const,
} as const;

// 내 정보 조회
export const useMyProfile = () => {
  const { setUser, setLoading, setError } = useMyPageStore();

  const query = useQuery({
    queryKey: QUERY_KEYS.PROFILE,
    queryFn: getMyProfile,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
      setLoading(false);
      setError(null);
    }
    if (query.error) {
      setError(query.error.message);
      setLoading(false);
    }
    if (query.isLoading) {
      setLoading(true);
      setError(null);
    }
  }, [query.data, query.error, query.isLoading, setUser, setLoading, setError]);

  return query;
};

// 내 정보 수정
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { setUser, setLoading, setError } = useMyPageStore();

  const mutation = useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateMyProfile(data),
  });

  useEffect(() => {
    if (mutation.isPending) {
      setLoading(true);
      setError(null);
    }

    if (mutation.isSuccess && mutation.data) {
      setUser(mutation.data);
      setLoading(false);
      // 캐시 업데이트
      queryClient.setQueryData(QUERY_KEYS.PROFILE, mutation.data);
      alert('프로필이 성공적으로 업데이트되었습니다!');
    }

    if (mutation.isError) {
      setError(mutation.error?.message || '프로필 업데이트에 실패했습니다.');
      setLoading(false);
      alert(`프로필 업데이트 실패: ${mutation.error?.message}`);
    }
  }, [
    mutation.isPending,
    mutation.isSuccess,
    mutation.isError,
    mutation.data,
    mutation.error,
    queryClient,
    setUser,
    setLoading,
    setError,
  ]);

  return mutation;
};

// 프로필 이미지 업로드
export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();
  const { setUser, setLoading, setError } = useMyPageStore();

  const mutation = useMutation({
    mutationFn: (file: File) => uploadProfileImage(file),
  });

  useEffect(() => {
    if (mutation.isPending) {
      setLoading(true);
      setError(null);
    }

    if (mutation.isSuccess && mutation.data) {
      // 사용자 정보에 새 이미지 URL 반영
      const currentUser = queryClient.getQueryData<User>(QUERY_KEYS.PROFILE);
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          profileImageUrl: mutation.data.profileImageUrl,
        };

        setUser(updatedUser);
        queryClient.setQueryData(QUERY_KEYS.PROFILE, updatedUser);

        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROFILE });
      }

      setLoading(false);
      alert('프로필 이미지가 성공적으로 업로드되었습니다!');
    }

    if (mutation.isError) {
      setError(mutation.error?.message || '이미지 업로드에 실패했습니다.');
      setLoading(false);
      alert(`이미지 업로드 실패: ${mutation.error?.message}`);
    }
  }, [
    mutation.isPending,
    mutation.isSuccess,
    mutation.isError,
    mutation.data,
    mutation.error,
    queryClient,
    setUser,
    setLoading,
    setError,
  ]);

  return mutation;
};
