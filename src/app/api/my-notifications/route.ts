import { ServerErrorResponse } from '@/types/apiErrorResponseType';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * [GET] /api/my-notifications
 *
 * 클라이언트로부터 전달받은 액세스 토큰을 기반으로
 * 사용자 본인의 알림 목록을 백엔드에서 조회하는 API 라우트 핸들러입니다.
 *
 * @param {NextRequest} req - Next.js에서 제공하는 요청 객체.
 *   - `searchParams.cursorId` (선택): 커서 기반 페이지네이션을 위한 알림 ID
 *   - `searchParams.size` (선택): 한 번에 가져올 알림 개수 (기본값: 10)
 *
 * @returns {Promise<NextResponse>} 응답 객체
 *   - 200 OK: 알림 목록(JSON) 반환
 *   - 401 Unauthorized: 액세스 토큰이 없을 경우
 *   - 500 또는 기타 상태: 백엔드 오류 또는 알 수 없는 오류 발생 시
 *
 * @example
 * // 요청 예시
 * GET /api/my-notifications?cursorId=30&size=10
 *
 * // 성공 응답 예시
 * {
 *   "notifications": [{ id: 31, content: "새 알림", ... }],
 *   "cursorId": 41,
 *   "totalCount": 99
 * }
 *
 * @description
 * - 이 핸들러는 클라이언트 쿠키에서 accessToken을 추출하여,
 *   백엔드 `/my-notifications` 엔드포인트에 요청을 보냅니다.
 * - `cursorId`와 `size`는 쿼리 파라미터로 전달되며, 둘 다 선택입니다.
 * - 오류 발생 시 적절한 상태 코드 및 메시지를 포함하여 응답합니다.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawCursor = searchParams.get('cursorId');
  const cursorId = rawCursor !== null ? Number(rawCursor) : undefined;

  const size = Number(searchParams.get('size')) || 10;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: '액세스 토큰 없음' }, { status: 401 });
  }

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/my-notifications`,
      {
        params: cursorId !== undefined ? { cursorId, size } : { size },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return NextResponse.json(res.data);
  } catch (err) {
    const error = err as AxiosError<ServerErrorResponse>;
    const message = error.response?.data?.error || '알람 데이터 조회 실패';
    const status = error.response?.status || 500;

    return NextResponse.json({ error: message }, { status });
  }
}
