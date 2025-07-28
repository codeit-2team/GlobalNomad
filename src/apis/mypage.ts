import { privateInstance } from './privateInstance';
import { User } from '@/types/user';
import {
  ProfileImageResponse,
  UpdateProfileRequest,
} from '@/types/mypageTypes';

/**
 * 내 정보 조회
 * GET /api/users/me
 */
export const getMyProfile = async (): Promise<User> => {
  const response = await privateInstance.get('/users/me');
  return response.data;
};

/**
 * 내 정보 수정
 * PATCH /api/users/me
 */
export const updateMyProfile = async (
  data: UpdateProfileRequest,
): Promise<User> => {
  const response = await privateInstance.patch('/users/me', data);
  return response.data;
};

/**
 * 프로필 이미지 업로드
 * POST /api/users/me/image
 */
export const uploadProfileImage = async (
  file: File,
): Promise<ProfileImageResponse> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await privateInstance.post('/users/me/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
