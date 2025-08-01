import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

/**
 * 내 체험 예약 상태(승인,거절) 업데이트
 * PATCH /api/my-activities/[activityId]/reservations/[reservationId]
 */

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: { params: Promise<{ activityId: string; reservationId: string }> },
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

    const body = await request.json();

    const response = await axios.patch(
      `${BACKEND_BASE_URL}/my-activities/${resolvedParams.activityId}/reservations/${resolvedParams.reservationId}`,
      body,
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
        error.response?.data?.message || '예약 상태 업데이트에 실패했습니다.';
      return NextResponse.json({ message }, { status });
    }

    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
