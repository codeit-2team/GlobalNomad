import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

/**
 * 내 체험 월별 예약 현황 조회 (대시보드 캘린더용)
 * GET /api/my-activities/[activityId]/reservation-dashboard
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
    const year = searchParams.get('year');
    const month = searchParams.get('month');

    const queryParams = new URLSearchParams();
    if (year) queryParams.append('year', year);
    // month를 2자리 형식으로 포맷팅
    if (month) {
      const formattedMonth = month.padStart(2, '0');
      queryParams.append('month', formattedMonth);
    }

    const backendUrl = `${BACKEND_BASE_URL}/my-activities/${resolvedParams.activityId}/reservation-dashboard?${queryParams.toString()}`;

    const response = await axios.get(backendUrl, {
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
        error.response?.data?.message || '월별 예약 현황 조회에 실패했습니다.';
      return NextResponse.json({ message }, { status });
    }

    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
