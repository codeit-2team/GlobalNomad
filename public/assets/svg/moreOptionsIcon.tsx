import React from 'react';

const MoreOptionsIcon = ({ size = 24, ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    fill='none'
    viewBox='0 0 40 40'
    {...props}
  >
    <circle cx='20' cy='9' r='3' fill='#79747E' />
    <circle cx='20' cy='20' r='3' fill='#79747E' />
    <circle cx='20' cy='31' r='3' fill='#79747E' />
  </svg>
);

export default MoreOptionsIcon;
