import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { ServerErrorResponse } from '@/types/apiErrorResponseType';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/activities/${id}`,
    );

    return NextResponse.json(response.data);
  } catch (err) {
    const error = err as AxiosError<ServerErrorResponse>;
    const message = error.response?.data?.error || '활동 상세 데이터 조회실패';
    const status = error.response?.status || 500;

    return NextResponse.json({ error: message }, { status });
  }
}
