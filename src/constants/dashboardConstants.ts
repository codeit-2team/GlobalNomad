export const DASHBOARD_TAB_OPTIONS = [
  { value: 'pending' as const, label: '신청' },
  { value: 'confirmed' as const, label: '승인' },
  { value: 'declined' as const, label: '거절' },
] as const;

export const WEEKDAYS = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
] as const;
