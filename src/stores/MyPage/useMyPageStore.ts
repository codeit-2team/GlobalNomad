import { create } from 'zustand';
import { MyPageStoreState } from '@/types/mypageTypes';

/**
 * 마이페이지 Zustand 스토어
 *
 * @description
 * - UI 상태 관리 (로딩, 에러, 편집 모드)
 */
const useMyPageStore = create<MyPageStoreState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  isEditing: false,

  // 사용자 관련 액션
  setUser: (user) => {
    set({
      user,
      error: null,
    });
  },

  // 로딩 상태 액션
  setLoading: (isLoading) => {
    set({ isLoading });
  },

  // 에러 관리 액션
  setError: (error) => {
    set({
      error,
      isLoading: false,
    });
  },

  clearError: () => {
    set({ error: null });
  },

  // UI 상태 액션
  setEditing: (isEditing) => {
    set({ isEditing });
  },
}));

export default useMyPageStore;
