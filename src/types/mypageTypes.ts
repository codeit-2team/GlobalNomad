import { User } from '@/types/user';

//  프로필 이미지 컴포넌트 Props
export interface ProfileImageProps {
  src?: string | null;
  alt?: string;
  nickname?: string;
  showEditButton?: boolean;
  onEdit?: () => void;
  className?: string;
}

// 마이페이지 스토어 상태 타입
export interface MyPageStoreState {
  // 사용자 정보
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // UI 상태
  isEditing: boolean;

  // 액션들
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setEditing: (editing: boolean) => void;
  clearError: () => void;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
}

export interface LoginResponse {
  user: User;
  refreshToken: string;
  accessToken: string;
}

export interface ProfileImageResponse {
  profileImageUrl: string;
}

export interface ProfileFormData {
  nickname: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}
