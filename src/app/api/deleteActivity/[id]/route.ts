import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios, { AxiosError } from 'axios';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

interface ErrorResponse {
  message?: string;
  error?: string;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!accessToken) {
      return NextResponse.json(
        { message: '액세스 토큰 없음' },
        { status: 401 },
      );
    }
    const response = await axios.delete(
      `${BACKEND_BASE_URL}/my-activities/${id}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error('체험 삭제 에러:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const status = axiosError.response?.status || 500;
      const detail = axiosError.response?.data;
      const errorMessage = detail?.message || detail?.error || '체험 삭제 실패';

      return NextResponse.json({ message: errorMessage }, { status });
    }

    return NextResponse.json({ message: '서버 내부 오류' }, { status: 500 });
  }
}
