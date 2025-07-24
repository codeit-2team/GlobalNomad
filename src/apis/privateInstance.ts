import axios from 'axios';

/**
 * 인증이 필요한 클라이언트 요청을 처리하기 위한 Axios 인스턴스입니다.
 *
 * - 기본 baseURL은 `/api`입니다.
 * - 모든 요청에 `application/json` 헤더가 포함됩니다.
 * - 응답으로 401 Unauthorized가 반환되면, `/api/auth/refresh`를 호출하여 accessToken을 재발급받습니다.
 *   - 재발급에 성공하면, 실패했던 원래 요청을 한 번만 재시도합니다.
 *   - 재시도 여부는 `_retry` 플래그로 제어합니다.
 *
 * @module privateInstance
 */

const privateInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

privateInstance.interceptors.response.use(
  (res) => res,
  /**
   * 응답 인터셉터
   *
   * 401 Unauthorized 응답이 발생한 경우:
   * - accessToken 재발급을 위해 `/api/auth/refresh` 요청을 보냅니다.
   * - 재발급 성공 시, 원래 요청에 새로운 토큰을 추가하여 재시도합니다.
   * - 같은 요청이 반복되지 않도록 `originalRequest._retry` 플래그로 제어합니다.
   */
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post('/api/auth/refresh');
        const newAccessToken = data.accessToken;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return privateInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { privateInstance };
