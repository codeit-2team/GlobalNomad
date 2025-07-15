import React from "react";

interface IconYouTubeProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const IconYouTube = ({ size = 20, color = '#fff', ...props }: IconYouTubeProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    {...props}
  >
    <g clipPath="url(#clip0)">
      <path
        fill={color}
        d="M19.583 5.421a2.3 2.3 0 0 0-.638-1.058 2.54 2.54 0 0 0-1.116-.618c-1.564-.413-7.834-.413-7.834-.413a64 64 0 0 0-7.825.392 2.63 2.63 0 0 0-1.115.633 2.4 2.4 0 0 0-.649 1.064A24.2 24.2 0 0 0 0 9.999c-.01 1.534.125 3.067.406 4.578.114.4.337.764.646 1.058.31.294.694.506 1.118.619 1.585.412 7.825.412 7.825.412 2.617.03 5.233-.101 7.835-.392.418-.108.801-.32 1.115-.618.304-.289.524-.655.637-1.059.288-1.509.427-3.043.418-4.579a22 22 0 0 0-.417-4.597M8 12.852V7.146L13.218 10z"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default IconYouTube;
