import React from 'react';

const CheckIcon = ({ size = 24, ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    fill='none'
    viewBox='0 0 24 24'
  >
    <circle cx='12' cy='12' r='12' fill='#121'></circle>
    <path
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='m7.607 12.35 3.08 3.15 5.563-7.143'
    />
  </svg>
);

export default CheckIcon;
