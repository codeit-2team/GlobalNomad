import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

type ServerErrorResponse = {
  error?: string;
};

export async function GET() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('accessToken')?.value;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return NextResponse.json(res.data);
  } catch (err) {
    const error = err as AxiosError<ServerErrorResponse>;
    const message = error.response?.data?.error || '유저 정보 업데이트 실패';
    const status = error.response?.status || 500;

    return NextResponse.json({ error: message }, { status });
  }
}
