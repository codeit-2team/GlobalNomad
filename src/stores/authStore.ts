import { User } from '@/types/user';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * Zustand를 이용한 사용자 전역 상태 저장소
 *
 * ✅ 사용자 정보(user)를 전역에서 관리하며 로그인/회원가입 시 상태를 설정하고,
 *    로그아웃 시 초기화합니다.
 * ✅ 상태는 localStorage에 저장되며 새로고침 후에도 복원됩니다.
 *
 * @interface UserStore
 * @property {User | null} user - 현재 로그인한 사용자 정보
 * @property {boolean} hasHydrated - 상태가 localStorage에서 복원되었는지 여부
 * @property {(user: User | null) => void} setUser - 사용자 정보를 설정하는 함수
 * @property {() => void} clearUser - 사용자 정보를 초기화하는 함수 (로그아웃 시)
 * @property {(state: boolean) => void} setHasHydrated - 상태 복원 여부를 설정하는 함수
 *
 * @example
 * // ✅ 사용자 정보 가져오기
 * const user = useUserStore((state) => state.user);
 * console.log(user?.nickname);
 *
 * // ✅ 사용자 정보 설정 (로그인 시)
 * const setUser = useUserStore((state) => state.setUser);
 * setUser({ id: 1, email: 'test@test.com', nickname: '홍길동', ... });
 *
 * // ✅ 사용자 정보 초기화 (로그아웃 시)
 * const clearUser = useUserStore((state) => state.clearUser);
 * clearUser();
 *
 * // ✅ 상태 복원 여부 확인 (Hydration 완료 후 렌더링 제어 등에 사용 가능)
 * const hasHydrated = useUserStore((state) => state.hasHydrated);
 */
interface UserStore {
  user: User | null;
  hasHydrated: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setHasHydrated: (state: boolean) => void;
}

const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        hasHydrated: false,
        setUser: (user: User | null) => set({ user }),
        clearUser: () => set({ user: null }),
        setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
      }),
      {
        name: 'user-storage',
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      },
    ),
  ),
);

export default useUserStore;
