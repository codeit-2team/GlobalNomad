'use client';

import { ReactNode, useState, useEffect } from 'react';
import Image from 'next/image';
import cn from '@/lib/cn';
import type { StaticImageData } from 'next/image';
import { AvatarProps } from '@/types/AvatarType';
import { DEFAULT_IMG } from '@/constants/AvatarConstants';
import { AVATAR_SIZE } from '@/constants/AvatarConstants';

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

  useEffect(() => {
    if (src) {
      setImgSrc(src);
      setIsError(false);
    }
  }, [src]);

  const isDefault =
    imgSrc === DEFAULT_IMG ||
    (typeof imgSrc === 'object' &&
      'src' in imgSrc &&
      imgSrc.src === DEFAULT_IMG);

  const avatarClass = cn(
    AVATAR_SIZE[size],
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
