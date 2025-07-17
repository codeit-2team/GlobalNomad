import { useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export default function useDeviceSize(): DeviceType {
  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    else if (width < 1024) return 'tablet';
    else return 'desktop';
  };

  const [device, setDevice] = useState<DeviceType>(getDeviceType());

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) setDevice('mobile');
      else if (width < 1024) setDevice('tablet');
      else setDevice('desktop');
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return device;
}
