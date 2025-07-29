import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

/**
 * 예약 수정(취소)
 * PATCH /api/reservations/[id]
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
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

    const body = await request.json();
    const resolvedParams = await params;
    const reservationId = resolvedParams.id;

    const response = await axios.patch(
      `${BACKEND_BASE_URL}/my-reservations/${reservationId}`,
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
        error.response?.data?.message || '예약 수정에 실패했습니다.';

      return NextResponse.json({ message }, { status });
    }

    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
