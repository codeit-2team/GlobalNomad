import React from 'react';

interface IconArrowRightProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const IconArrowRight = ({
  size = 16,
  color = '#0B3B2D',
  ...props
}: IconArrowRightProps) => (
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
      d="m10.168 7.764-4.22-4.092c-.263-.255-.766-.1-.766.236v8.183c0 .336.503.491.766.236l4.22-4.092a.317.317 0 0 0 0-.471"
    />
  </svg>
);

export default IconArrowRight;
