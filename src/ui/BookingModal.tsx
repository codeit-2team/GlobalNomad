'use client';

import useDeviceType from '@/hooks/useDeviceSize';
import MobileModal from './MobileBookingModal';
import TabletModal from './TabletBookingModal';

export default function BookingModal() {
  const device = useDeviceType();

  if (device === 'mobile') return <MobileModal />;
  if (device === 'tablet') return <TabletModal />;

  return null;
}
