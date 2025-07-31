import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface ErrorResponse {
  error?: string;
  message?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;

  const year = searchParams.get('year');
  const month = searchParams.get('month');

  const segments = pathname.split('/');
  const id = segments[segments.indexOf('activities') + 1];

  if (!id) {
    return NextResponse.json(
      { error: '유효하지 않은 요청입니다.' },
      { status: 400 },
    );
  }

  try {
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
