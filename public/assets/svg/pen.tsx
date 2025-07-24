import React from 'react';

const PenIcon = ({ size = 24, ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    fill='none'
    viewBox='0 0 25 24'
  >
    <path
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2.063'
      d='M17.31 6.06 4.554 18.848l-.773 1.87 1.871-.772L18.44 7.19zm2.553-2.552-.553.552 1.13 1.13.552-.553a.774.774 0 0 0 0-1.094l-.035-.035a.774.774 0 0 0-1.094 0'
    />
  </svg>
);

export default PenIcon;
