'use client';

import { useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export default function useDeviceSize(): DeviceType {
  const [device, setDevice] = useState<DeviceType>('desktop');

  useEffect(() => {
    const getDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) return 'mobile';
      else if (width < 1024) return 'tablet';
      else return 'desktop';
    };

    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setDevice(getDeviceType());
      };

      handleResize(); // 초기 설정
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return device;
}
