import { privateServerInstance } from '@/apis/privateServerInstance';

export default async function ServerPrivateInstanceTest() {
  try {
    const instance = await privateServerInstance();
    const res = await instance.get('/users/me'); // 서버 요청용 API (accessToken 필요)

    return (
      <div>
        <h1>서버 요청 테스트</h1>
        <pre>{JSON.stringify(res.data, null, 2)}</pre>
      </div>
    );
  } catch (err: any) {
    return (
      <div>
        <h1>❌ 서버 요청 실패</h1>
        <pre>{JSON.stringify(err?.response?.data || err.message, null, 2)}</pre>
      </div>
    );
  }
}
