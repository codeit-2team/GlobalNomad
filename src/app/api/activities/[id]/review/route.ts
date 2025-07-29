import { ServerErrorResponse } from '@/types/apiErrorResponseType';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { AxiosError } from 'axios';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);

  const page = searchParams.get('page') || '1';
  const size = searchParams.get('size') || '3';

  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/activities/${id}/reviews?page=${page}&size=${size}`,
    );

    return NextResponse.json(response.data);
  } catch (err) {
    const error = err as AxiosError<ServerErrorResponse>;
    const message = error.response?.data?.error || '활동 상세 데이터 조회실패';
    const status = error.response?.status || 500;

    return NextResponse.json({ error: message }, { status });
  }
}
