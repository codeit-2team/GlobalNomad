import React from 'react';

interface CheckIconProps {
  size?: number;
  showBackground?: boolean;
  [key: string]: any;
}

const CheckIcon = ({
  size = 24,
  showBackground = true,
  ...props
}: CheckIconProps) => {
  // 배경 없이 체크만 표시하는 경우
  if (!showBackground) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        fill='none'
        viewBox='0 0 24 24'
        {...props}
      >
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
          d='m7.607 12.35 3.08 3.15 5.563-7.143'
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 24 24'
      {...props}
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
};

export default CheckIcon;
