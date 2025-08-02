import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface ErrorResponse {
  error?: string;
  message?: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const { selectedTimeId, participants } = await req.json();

  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    if (!id) {
      return NextResponse.json(
        { error: '유효하지 않은 요청입니다.' },
        { status: 400 },
      );
    }
    if (!accessToken) {
      return NextResponse.json(
        { error: '액세스 토큰이 없습니다' },
        { status: 401 },
      );
    }

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
