import axios from 'axios';

/**
 * Axios 인스턴스를 생성하여 인증이 필요한 클라이언트 요청을 처리합니다.
 *
 * 이 인스턴스는 기본적으로 `/api`를 baseURL로 사용하며,
 * 서버로부터 401 Unauthorized 응답을 받을 경우 `/api/auth/refresh` 엔드포인트를 통해
 * accessToken을 재발급받고, 실패했던 원래 요청을 한 번만 재시도합니다.
 */

const privateInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

privateInstance.interceptors.response.use(
  (res) => res,
  /**
   * 응답 인터셉터: 401 에러 발생 시 refresh 토큰을 사용하여 accessToken을 재발급하고,
   * 실패했던 요청을 재시도합니다. 단, 동일 요청이 여러 번 재시도되지 않도록 `_retry` 플래그를 설정합니다.
   *
   * @param {import('axios').AxiosError} error - Axios 오류 객체
   * @returns {Promise} - 성공 시 원래 요청 재시도, 실패 시 에러 반환
   */
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post('/api/auth/refresh', null, {});
        console.log('리프레시 토큰 전송');
        return privateInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { privateInstance };
