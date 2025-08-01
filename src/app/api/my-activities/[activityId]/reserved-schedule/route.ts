import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

/**
 * 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회
 * GET /api/my-activities/[activityId]/reserved-schedule
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
    const date = searchParams.get('date');

    const queryParams = new URLSearchParams();
    if (date) queryParams.append('date', date);

    const response = await axios.get(
      `${BACKEND_BASE_URL}/my-activities/${resolvedParams.activityId}/reserved-schedule?${queryParams.toString()}`,
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
        error.response?.data?.message || '예약된 스케줄 조회에 실패했습니다.';
      return NextResponse.json({ message }, { status });
    }

    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
