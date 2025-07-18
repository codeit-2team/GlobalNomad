import React from 'react';

const IconArrowLeft = ({
  size = 16,
  color = '#0B3B2D',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    {...props}
  >
    <path
      fill={color}
      d="m5.832 7.765 4.22-4.092c.263-.255.766-.1.766.236v8.183c0 .336-.503.491-.766.236l-4.22-4.092a.317.317 0 0 1 0-.471"
    ></path>
  </svg>
);

export default IconArrowLeft;