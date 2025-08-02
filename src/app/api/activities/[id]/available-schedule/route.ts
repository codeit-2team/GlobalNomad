import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

interface ErrorResponse {
  error?: string;
  message?: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { searchParams } = req.nextUrl;

  const year = searchParams.get('year');
  const month = searchParams.get('month');

  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    if (!id) {
      return NextResponse.json(
        { error: '유효하지 않은 요청입니다.' },
        { status: 400 },
      );
    }
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/activities/${id}/available-schedule?year=${year}&month=${month}`,
    );
    return NextResponse.json(response.data);
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;

    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      '스케줄 데이터 조회 실패';

    const status = error.response?.status || 500;

    return NextResponse.json({ error: message }, { status });
  }
}
