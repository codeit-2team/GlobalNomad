import useUserStore from '@/stores/authStore';
import axios from 'axios';

/**
 * useLogout 훅은 사용자 로그아웃 기능을 제공합니다.
 *
 * - `/api/auth/logout` 엔드포인트에 POST 요청을 보내 서버 측 세션 및 토큰을 제거합니다.
 * - 응답이 성공적이면 전역 상태에서 사용자 정보를 제거하고 페이지를 새로고침합니다.
 * - 오류 발생 시 사용자에게 알림을 표시합니다.
 *
 * @returns {() => Promise<void>} logout 함수 - 비동기 로그아웃 처리 함수
 *
 * @example
 * const logout = useLogout();
 * await logout();
 */
export default function useLogout() {
  const clearUser = useUserStore((state) => state.clearUser);

  /**
   * 로그아웃을 수행하는 비동기 함수입니다.
   * - 서버에 로그아웃 요청을 보낸 후 상태를 초기화하고 페이지를 리로드합니다.
   * - 실패 시 alert로 오류를 알립니다.
   */
  const logout = async () => {
    try {
      const res = await axios.post('/api/auth/logout');

      if (res.status !== 200) {
        throw new Error('로그아웃에 실패했습니다.');
      }

      clearUser();
      window.location.reload();
    } catch {
      alert('로그아웃 오류 발생'); // 토스트 예정
    }
  };

  return logout;
}
