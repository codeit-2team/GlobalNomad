import { StaticImageData } from 'next/image';
import { AVATAR_SIZE } from '@/constants/AvatarConstants';
import { ReactNode } from 'react';

export interface AvatarProps {
  /**
   * 이미지 소스 (URL 문자열 또는 정적 이미지 객체)
   */
  src?: string | StaticImageData;

  /**
   * 이미지 대체 텍스트
   * @default '프로필 이미지'
   */
  alt?: string;

  /**
   * 아바타 크기 (sm, md, lg 중 하나)
   * @default 'lg'
   */
  size: keyof typeof AVATAR_SIZE;

  /**
   * 추가로 적용할 Tailwind 클래스
   */
  className?: string;

  /**
   * 아바타 내부에 렌더링할 자식 요소
   */
  children?: ReactNode;
}
