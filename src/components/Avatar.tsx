'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import cn from '@/lib/cn';
import type { StaticImageData } from 'next/image';

const SIZE = {
  sm: 'w-40 h-40',
  md: 'w-60 h-60',
  lg: 'w-160 h-160',
};

const DEFAULT_IMG = '/assets/svg/profile-default.svg';

interface AvatarProps {
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
  size?: keyof typeof SIZE;

  /**
   * 추가로 적용할 Tailwind 클래스
   */
  className?: string;

  /**
   * 아바타 내부에 렌더링할 자식 요소
   */
  children?: ReactNode;
}

/**
 * 사용자 프로필 이미지를 렌더링하는 컴포넌트.
 *
 * - 지정된 이미지가 없거나 로드에 실패하면 디폴트이미지로 대체됩니다
 *
 * @param {AvatarProps} props - 아바타 설정값
 * @returns {JSX.Element} Avatar 컴포넌트
 *
 * @example
 * // 기본 사용
 * <Avatar src="/images/user1.jpg" />
 *
 * @example
 * // 사이즈 prop 사용
 * <Avatar src="/images/user2.jpg" size="sm" />
 *
 * @example
 * // 자식 요소 렌더링
 * <Avatar>
 *   <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
 * </Avatar>
 *
 */
export default function Avatar({
  src,
  alt = '프로필 이미지',
  size = 'lg',
  className = '',
  children,
}: AvatarProps) {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(
    src || DEFAULT_IMG,
  );
  const [isError, setIsError] = useState(false);

  const isDefault =
    imgSrc === DEFAULT_IMG ||
    (typeof imgSrc === 'object' &&
      'src' in imgSrc &&
      imgSrc.src === DEFAULT_IMG);

  const avatarClass = cn(
    SIZE[size],
    'relative rounded-full overflow-hidden',
    isDefault && 'bg-black',
    className,
  );

  const handleError = () => {
    if (!isError) {
      setIsError(true);
      setImgSrc(DEFAULT_IMG);
    }
  };

  return (
    <div className={avatarClass}>
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes='100%'
        onError={handleError}
        className='border border-gray-600 object-cover'
      />
      {children}
    </div>
  );
}
