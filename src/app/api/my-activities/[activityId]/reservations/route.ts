import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

/**
 * 내 체험 예약 시간대별 예약 내역 조회
 * GET /api/my-activities/[activityId]/reservations
 */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ activityId: string }> },
) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: '인증 토큰이 없습니다.' },
        { status: 401 },
      );
    }

    const resolvedParams = await params;

    const { searchParams } = new URL(request.url);
    const cursorId = searchParams.get('cursorId');
    const size = searchParams.get('size') || '10';
    const scheduleId = searchParams.get('scheduleId');
    const status = searchParams.get('status');

    const queryParams = new URLSearchParams();
    if (cursorId) queryParams.append('cursorId', cursorId);
    queryParams.append('size', size);
    if (scheduleId) queryParams.append('scheduleId', scheduleId);
    if (status) queryParams.append('status', status);

    const finalUrl = `${BACKEND_BASE_URL}/my-activities/${resolvedParams.activityId}/reservations?${queryParams.toString()}`;

    const response = await axios.get(finalUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message =
        error.response?.data?.message || '체험 예약 내역 조회에 실패했습니다.';
      return NextResponse.json({ message }, { status });
    }

    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
