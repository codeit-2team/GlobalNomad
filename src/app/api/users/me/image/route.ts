import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

/**
 * 프로필 이미지 업로드
 * POST /api/users/me/image
 */
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: '인증 토큰이 없습니다.' },
        { status: 401 },
      );
    }

    // FormData 추출
    const formData = await request.formData();

    const response = await axios.post(`${API_URL}/users/me/image`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message =
        error.response?.data?.message || '이미지 업로드에 실패했습니다.';
      return NextResponse.json({ message }, { status });
    }

    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
