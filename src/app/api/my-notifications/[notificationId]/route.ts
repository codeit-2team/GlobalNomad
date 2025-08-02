import { ServerErrorResponse } from '@/types/apiErrorResponseType';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { notificationId: string } },
) {
  const id = Number(params.notificationId);

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: '액세스 토큰 없음' }, { status: 401 });
  }

  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/my-notifications/${id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    if (res.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json({ message: '삭제 실패' }, { status: res.status });
  } catch (err) {
    const error = err as AxiosError<ServerErrorResponse>;
    const message = error.response?.data?.error || '알람 데이터 조회 실패';
    const status = error.response?.status || 500;

    return NextResponse.json({ error: message }, { status });
  }
}
