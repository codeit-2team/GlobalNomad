import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

/**
 * 내 예약 리스트 조회
 * GET /api/reservations
 */
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: '인증 토큰이 없습니다.' },
        { status: 401 },
      );
    }

    // URL에서 쿼리 파라미터 추출
    const { searchParams } = new URL(request.url);
    const cursorId = searchParams.get('cursorId');
    const size = searchParams.get('size') || '10';
    const status = searchParams.get('status');

    // 쿼리 파라미터 구성
    const queryParams = new URLSearchParams();
    if (cursorId) queryParams.append('cursorId', cursorId);
    queryParams.append('size', size);
    if (status) queryParams.append('status', status);

    const response = await axios.get(
      `${BACKEND_BASE_URL}/my-reservations?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message =
        error.response?.data?.message || '예약 내역 조회에 실패했습니다.';
      return NextResponse.json({ message }, { status });
    }

    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
