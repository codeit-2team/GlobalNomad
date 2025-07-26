'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useDeviceSize from './useDeviceSize';
import useDebounce from './useDebounce';

/**
 * 반응형 라우팅 훅
 * - 모바일: /mypage (메뉴 네비게이션 리스트)
 * - 데스크톱/태블릿: /mypage/profile (내 정보 폼)
 */
export default function useResponsiveRouting() {
  const router = useRouter();
  const pathname = usePathname();
  const deviceType = useDeviceSize();
  const [mounted, setMounted] = useState(false);
  const redirectingRef = useRef(false);
  const lastDeviceTypeRef = useRef<string>('');
  const lastPathChangeRef = useRef<number>(0);

  // 디바운싱
  const debouncedDeviceType = useDebounce(deviceType, 700);

  // Hydration 완료 후 동작
  useEffect(() => {
    setMounted(true);
    lastDeviceTypeRef.current = deviceType;
  }, []);

  // 경로 변경 시 타임스탬프 기록 (사용자 클릭 감지용)
  useEffect(() => {
    lastPathChangeRef.current = Date.now();
  }, [pathname]);

  useEffect(() => {
    if (!mounted) return;
    if (redirectingRef.current) return;

    // 디바이스 타입이 실제로 변경되었는지 확인
    const deviceTypeChanged = lastDeviceTypeRef.current !== debouncedDeviceType;
    const timeSinceLastPathChange = Date.now() - lastPathChangeRef.current;

    // 사용자가 최근에 클릭했다면 (3초 이내) 자동 리다이렉트 무시
    if (timeSinceLastPathChange < 3000) {
      lastDeviceTypeRef.current = debouncedDeviceType;
      return;
    }

    // 디바이스 타입이 변경된 경우에만 리다이렉트 실행
    if (deviceTypeChanged) {
      const currentPath = pathname;

      // 모바일로 변경 시: /mypage/profile -> /mypage
      if (
        debouncedDeviceType === 'mobile' &&
        currentPath === '/mypage/profile'
      ) {
        redirectingRef.current = true;
        router.replace('/mypage');

        setTimeout(() => {
          redirectingRef.current = false;
        }, 1500);
      }

      // 데스크톱/태블릿으로 변경 시: /mypage -> /mypage/profile
      else if (debouncedDeviceType !== 'mobile' && currentPath === '/mypage') {
        redirectingRef.current = true;
        router.replace('/mypage/profile');

        setTimeout(() => {
          redirectingRef.current = false;
        }, 1500);
      }
    }

    // 현재 디바이스 타입 기록
    lastDeviceTypeRef.current = debouncedDeviceType;
  }, [debouncedDeviceType, pathname, router, mounted]);

  return { mounted, deviceType: debouncedDeviceType };
}
