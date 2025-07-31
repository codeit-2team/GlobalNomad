import React from 'react';

const EmptyDocumentIcon = ({ size = 24, ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    fill='none'
    viewBox='0 0 131 178'
    {...props}
  >
    <path
      fill='#DDD'
      d='M106.397 0c13.255 0 24 10.745 24 24v129.259c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V44.974L44.974 0z'
    />
    <path
      fill='#79747E'
      d='M41.752 2.108c1.895-1.873 5.11-.53 5.11 2.134v18.62c0 13.254-10.746 24-24 24H3.781c-2.68 0-4.015-3.25-2.109-5.134z'
    />
  </svg>
);

export default EmptyDocumentIcon;
