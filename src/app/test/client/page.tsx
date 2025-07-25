'use client';

import { useEffect, useState } from 'react';
import { privateInstance } from '@/apis/privateInstance';
import { User } from '@/types/user';
import { AxiosError } from 'axios';

export default function AuthFlowTestPage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | object | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await privateInstance.get('/test');
        setUser(res.data);
      } catch (err: unknown) {
        const axiosErr = err as AxiosError;
        setError(axiosErr.response?.data || axiosErr.message);
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
