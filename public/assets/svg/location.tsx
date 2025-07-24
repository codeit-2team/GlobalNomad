import React from 'react';
import { SvgProps } from '@/types/svgType';

const Location = ({ size = 24, color = '#9fa6b2', className }: SvgProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    className={className}
    style={{ color }}
  >
    <path
      fill='currentColor'
      d='M9 7.875a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25'
    />
    <path
      fill='currentColor'
      d='M9 1.125c-3.101 0-5.625 2.413-5.625 5.379 0 1.412.644 3.29 1.913 5.582 1.02 1.84 2.2 3.504 2.813 4.332a1.117 1.117 0 0 0 1.8 0c.613-.828 1.793-2.492 2.813-4.332 1.267-2.291 1.911-4.17 1.911-5.582 0-2.966-2.524-5.379-5.625-5.379M9 9a2.25 2.25 0 1 1 0-4.5A2.25 2.25 0 0 1 9 9'
    />
  </svg>
);

export default Location;
