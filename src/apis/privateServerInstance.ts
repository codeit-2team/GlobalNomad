import axios, { AxiosInstance } from 'axios';
import { cookies } from 'next/headers';

/**
 * 서버 환경에서 쿠키를 문자열로 변환하여 Authorization 요청 시 사용할 수 있도록 반환합니다.
 *
 * @returns {Promise<string>} - `name=value` 형식의 쿠키 문자열
 */
const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((token) => `${token.name}=${token.value}`)
    .join(';');
};

/**
 * 서버에서 accessToken이 만료되었을 때, refreshToken을 사용하여 새로운 accessToken을 발급받습니다.
 *
 * @returns {Promise<string | null>} - 재발급된 accessToken (실패 시 null 반환)
 */
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/refresh`,
      {},
      { headers: { Cookie: await getCookieHeader() } },
    );

    return res.data.accessToken;
  } catch (e) {
    return null;
  }
};

/**
 * 서버 환경에서 사용할 인증이 필요한 Axios 인스턴스를 생성합니다.
 *
 * - `accessToken`과 `refreshToken`은 Next.js 서버의 `cookies()`로부터 가져옵니다.
 * - 기본 baseURL은 `NEXT_PUBLIC_API_SERVER_URL`입니다.
 * - 응답에서 401 Unauthorized가 발생하면 `/api/auth/refresh`를 통해 accessToken을 갱신하고,
 *   실패했던 원래 요청을 한 번만 재시도합니다.
 * - 재시도 여부는 `originalRequest._retry` 플래그로 판단합니다.
 *
 * @returns {Promise<AxiosInstance>} - 인증이 설정된 Axios 인스턴스
 */
const privateServerInstance = async (): Promise<AxiosInstance> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  instance.interceptors.response.use(
    (res) => res,

    /**
     * 응답 인터셉터:
     * - 401 에러가 발생하면, accessToken을 새로 발급받고 원래 요청을 한 번만 재시도합니다.
     * - `_retry` 플래그를 사용하여 무한 루프를 방지합니다.
     */
    async (err) => {
      const originalRequest = err.config;

      if (
        err.response?.status === 401 &&
        !originalRequest._retry &&
        refreshToken
      ) {
        originalRequest._retry = true;

        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }
      }

      return Promise.reject(err);
    },
  );

  return instance;
};

export { privateServerInstance };
