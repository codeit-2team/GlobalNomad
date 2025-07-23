import axios from 'axios';

/**
 * Axios 인스턴스
 *
 * - 기본 `baseURL`은 환경 변수에서 설정
 * - 요청 시간 초과는 5000ms (5초)
 * - 모든 요청의 기본 Content-Type은 `application/json`
 */
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

/**
 * 오류 메시지 생성 함수
 *
 * Axios 또는 일반 에러 객체에서 사용자 친화적인 에러 메시지를 추출합니다.
 *
 * @param {unknown} error - Axios 요청 중 발생한 에러 객체
 * @returns {string} - 사용자에게 표시할 수 있는 에러 메시지
 */
const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (typeof message === 'string') return message;
    if (status) {
      switch (status) {
        case 400:
          return '🚨 잘못된 요청입니다. (400)';
        case 401:
          return '🚨 인증이 필요합니다. (401)';
        case 403:
          return '🚨 권한이 없습니다. (403)';
        case 404:
          return '🚨 요청한 리소스를 찾을 수 없습니다. (404)';
        case 429:
          return '🚨 요청이 너무 많습니다. 잠시 후 다시 시도해주세요. (429)';
        case 500:
          return '🚨 서버 내부 오류가 발생했습니다. (500)';
        default:
          return `🚨 요청에 실패했습니다. (Status: ${status})`;
      }
    }
  }

  if (error instanceof Error && error.message === 'Network Error') {
    return '🚨 네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
  }

  return '🚨 알 수 없는 오류가 발생했습니다.';
};

/** 최대 재시도 횟수 */
const MAX_RETRY = 3;

/**
 * URL별 재시도 횟수를 추적하기 위한 Map
 *
 * 키: 요청 URL
 * 값: 현재까지의 재시도 횟수
 */
const retryCounts = new Map<string, number>();

/**
 * Axios 응답 인터셉터
 *
 * - 네트워크 오류 또는 5xx 서버 오류 발생 시 자동으로 재시도
 * - 요청 URL 기준으로 재시도 횟수를 제한
 * - 최대 재시도 횟수(`MAX_RETRY`) 초과 시 오류 메시지를 반환
 */
instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const config = err.config;

    if (!config || !config.url) {
      return Promise.reject(new Error(getErrorMessage(err)));
    }

    const currentRetry = retryCounts.get(config.url) || 0;

    if (
      (err.message === 'Network Error' ||
        (err.response && err.response.status >= 500)) &&
      currentRetry < MAX_RETRY
    ) {
      retryCounts.set(config.url, currentRetry + 1);
      return instance(config); // 재시도
    }

    retryCounts.delete(config.url); // 메모리 누수 방지
    return Promise.reject(new Error(getErrorMessage(err)));
  },
);

export { instance };
