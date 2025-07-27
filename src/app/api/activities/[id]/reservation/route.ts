import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface ErrorResponse {
  error?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const { selectedTimeId, participants } = await request.json();

  const pathname = request.nextUrl.pathname;
  const segments = pathname.split('/');
  const id = segments[segments.indexOf('activities') + 1];

  if (!id) {
    return NextResponse.json(
      { error: '유효하지 않은 요청입니다.' },
      { status: 400 },
    );
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/activities/${id}/reservations`,
      {
        scheduleId: Number(selectedTimeId),
        headCount: Number(participants),
      },
      {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
      },
    );
    return NextResponse.json(response.data);
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;

    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      '예약 실패';

    const status = error.response?.status || 500;
    return NextResponse.json({ error: message }, { status });
  }
}
