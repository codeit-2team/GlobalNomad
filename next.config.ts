import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Docker 배포를 위한 standalone 모드 활성화
  // 해당 설정은 프로덕션 빌드 시 필요한 파일만 .next/standalone 폴더에 복사됨.
  output: 'standalone',
};

export default nextConfig;
