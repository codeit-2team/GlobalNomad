import React from 'react';

const ProfileDefaultIcon = ({ size = 24, ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    fill='none'
    viewBox='0 0 160 160'
  >
    <path
      fill='#E3E5E8'
      d='M80 0C35.813 0 0 35.813 0 80c0 44.188 35.813 80 80 80 44.188 0 80-35.812 80-80 0-44.187-35.812-80-80-80m0 40c12.428 0 22.5 10.075 22.5 22.5S92.438 85 80 85c-12.425 0-22.5-10.075-22.5-22.5S67.563 40 80 40m0 100c-16.54 0-31.531-6.728-42.406-17.591C42.656 109.344 55.156 100 70 100h20c14.856 0 27.356 9.337 32.406 22.409C111.531 133.281 96.531 140 80 140'
    />
  </svg>
);

export default ProfileDefaultIcon;
