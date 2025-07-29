import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios, { AxiosError } from 'axios';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

interface ErrorResponse {
  message?: string;
  error?: string;
}

export async function PATCH(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const url = new URL(req.url); // <- 여기서 전체 URL 접근
  const segments = url.pathname.split('/');
  const id = segments[segments.indexOf('editActivity') + 1]; // editActivity 다음 segment가 id임

  if (!id) {
    return NextResponse.json(
      { error: '유효하지 않은 요청입니다.' },
      { status: 400 },
    );
  }

  if (!accessToken) {
    return NextResponse.json({ message: '액세스 토큰 없음' }, { status: 401 });
  }

  try {
    const body = await req.json();

    const response = await axios.patch(
      `${BACKEND_BASE_URL}/my-activities/${id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error('체험 등록 에러:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const status = axiosError.response?.status || 500;
      const detail = axiosError.response?.data;
      const errorMessage = detail?.message || detail?.error || '체험 등록 실패';

      return NextResponse.json({ message: errorMessage }, { status });
    }

    return NextResponse.json({ message: '서버 내부 오류' }, { status: 500 });
  }
}
