import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const { selectedTimeId, participants } = await request.json();

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
    const error = err as AxiosError;
    //디버그용 전체 에러 뽑아서 넘기기
    console.error('예약 에러:', error.toJSON?.() ?? error);

    const message =
      (error.response?.data as any)?.error ||
      (error.response?.data as any)?.message ||
      error.message ||
      '예약실패';
    const status = error.response?.status || 500;
    return NextResponse.json({ error: message }, { status });
  }
}
