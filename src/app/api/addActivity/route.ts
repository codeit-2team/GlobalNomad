import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios, { AxiosError } from 'axios';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

interface ErrorResponse {
  message?: string;
  error?: string;
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();

  try {
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: '액세스 토큰 없음' },
        { status: 401 },
      );
    }
    const body = await req.json();
    const {
      title,
      category,
      description,
      address,
      price,
      schedules,
      bannerImageUrl,
      subImageUrls,
    } = body;

    const response = await axios.post(
      `${BACKEND_BASE_URL}/activities`,
      {
        title,
        category,
        description,
        address,
        price,
        schedules,
        bannerImageUrl,
        subImageUrls,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return NextResponse.json(response.data, { status: 201 });
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
