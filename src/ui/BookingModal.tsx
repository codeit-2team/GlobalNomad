'use client';

import useDeviceType from '@/hooks/useDeviceSize';
import MobileModal from './MobileBookingModal';
import TabletModal from './TabletBookingModal';
import useDeviceSize from '@/hooks/useDeviceSize';

export default function BookingModal() {
  const device = useDeviceSize();

  if (device === 'mobile') return <MobileModal />;
  if (device === 'tablet') return <TabletModal />;

  return null;
}
