import React from 'react';

const ChevronIcon = ({ size = 24, direction = 'down', ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    fill='none'
    viewBox='0 0 24 24'
    style={{
      transform: direction === 'up' ? 'rotate(180deg)' : 'none',
      ...props.style,
    }}
  >
    <path
      stroke='#1B1B1B'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='M5.25 9 12 15.75 18.75 9'
    />
  </svg>
);

export default ChevronIcon;
