import React from 'react';

interface IconBellProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const IconDropdown = ({ size = 64, color = '#000', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 52 52'
    fill={color}
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fill='#535358'
      d='M16 10a2 2 0 100-4 2 2 0 000 4zM16 18a2 2 0 100-4 2 2 0 000 4zM16 26a2 2 0 100-4 2 2 0 000 4z'
    />
  </svg>
);

export default IconDropdown;
