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

  // 목업 데이터 (API 연결 전 임시)
  initMockData: () => void;
}
