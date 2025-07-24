'use client';

import { useEffect, useState } from 'react';
import { privateInstance } from '@/apis/privateInstance';

export default function AuthFlowTestPage() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await privateInstance.get('/test');
        setUser(res.data);
      } catch (err: any) {
        setError(err.response?.data || err.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>🧪 인증 흐름 테스트</h1>
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
      {error && (
        <pre style={{ color: 'red' }}>{JSON.stringify(error, null, 2)}</pre>
      )}
    </div>
  );
}
