'use client';

import { SchedulesProps } from '@/types/activityDetailType';
import MobileModal from './MobileBookingModal';
import TabletModal from './TabletBookingModal';
import useDeviceSize from '@/hooks/useDeviceSize';

export default function BookingModal({
  schedules,
  price,
}: {
  schedules: SchedulesProps;
  price: number;
}) {
  const device = useDeviceSize();

  if (device === 'mobile')
    return <MobileModal schedules={schedules} price={price} />;
  if (device === 'tablet') return <TabletModal schedules={schedules} />;

  return null;
}
