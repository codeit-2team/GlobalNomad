import React from 'react';

const IconBell = ({ size = 20, color = '#A1A1A1', ...props }: IconBellProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    {...props}
  >
    <path
      fill={color}
      d="M6.96 16.868c.7.89 1.802 1.465 3.04 1.465s2.34-.574 3.04-1.465a22.6 22.6 0 0 1-6.08 0M15.624 7.5v.586c0 .704.201 1.393.578 1.979l.923 1.435c.843 1.312.2 3.094-1.267 3.509a21.5 21.5 0 0 1-11.716 0c-1.466-.415-2.11-2.197-1.267-3.509l.923-1.435a3.66 3.66 0 0 0 .578-1.979V7.5c0-3.221 2.518-5.833 5.624-5.833s5.624 2.612 5.624 5.833"
    />
  </svg>
);

export default IconBell;