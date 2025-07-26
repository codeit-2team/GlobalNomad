import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const { searchParams } = request.nextUrl;
  const year = searchParams.get('year');
  const month = searchParams.get('month');

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/activities/${id}/available-schedule?year=${year}&month=${month}`,
      {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
      },
    );
    return NextResponse.json(response.data);
  } catch (err) {
    const error = err as AxiosError;
    const message =
      (error.response?.data as any)?.error || '스케줄 데이터 조회 실패';
    const status = error.response?.status || 500;
    return NextResponse.json({ error: message }, { status });
  }
}
