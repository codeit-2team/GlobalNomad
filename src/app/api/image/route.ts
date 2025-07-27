import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: '액세스 토큰 없음' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('image');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: '이미지 파일 없음' },
        { status: 400 },
      );
    }

    const uploadForm = new FormData();
    uploadForm.append('image', file);

    const backendRes = await fetch(`${BACKEND_BASE_URL}/activities/image`, {
      method: 'POST',
      body: uploadForm,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: '백엔드 이미지 업로드 실패' },
        { status: backendRes.status },
      );
    }

    const result = await backendRes.json();

    if (!result.activityImageUrl) {
      return NextResponse.json(
        { message: '이미지 URL이 백엔드 응답에 없습니다.' },
        { status: 500 },
      );
    }

    const Image = JSON.stringify(result.activityImageUrl);

    return NextResponse.json(Image, { status: 200 });
  } catch (error) {
    console.error('업로드 중 에러:', error);
    return NextResponse.json({ message: '서버 내부 오류' }, { status: 500 });
  }
}
