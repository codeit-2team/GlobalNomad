'use client';

import { useState } from 'react';
import Image from 'next/image';
import cn from '@/lib/cn';
import { ProfileImageProps } from '@/types/mypageTypes';
import PenIcon from '@assets/svg/pen';
import ProfileDefaultIcon from '@assets/svg/profile-default';

/**
 * @component ProfileImage
 * @description
 * 마이페이지 전용 프로필 이미지 컴포넌트입니다.
 *
 * @param {ProfileImageProps} props - ProfileImage 컴포넌트의 props
 * @param {string} [props.src] - 프로필 이미지 URL
 * @param {string} [props.alt] - 이미지 alt 텍스트
 * @param {string} [props.nickname='사용자'] - 사용자 닉네임
 * @param {boolean} [props.showEditButton=false] - 편집 버튼 표시 여부
 * @param {() => void} [props.onEdit] - 편집 버튼 클릭 핸들러
 * @param {string} [props.className] - 추가 CSS 클래스
 */

function isValidUrl(url: string): boolean {
  if (!url || url.trim() === '') return false;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export default function ProfileImage({
  src,
  alt,
  nickname = '사용자',
  showEditButton = false,
  onEdit,
  className,
}: ProfileImageProps) {
  const [imageError, setImageError] = useState(false);

  // 이미지 로딩 에러 핸들러
  const handleImageError = () => {
    setImageError(true);
  };

  // URL 유효성 검사
  const hasValidImage = src && isValidUrl(src) && !imageError;

  return (
    <div className={cn('relative inline-block', className)}>
      {/* 프로필 이미지 컨테이너 */}
      <div className='relative h-160 w-160 overflow-hidden rounded-full bg-gray-200 shadow-lg'>
        {hasValidImage ? (
          <Image
            src={src}
            alt={alt || `${nickname}의 프로필 이미지`}
            fill
            className='object-cover'
            onError={handleImageError}
            sizes='160px'
          />
        ) : (
          // 기본 프로필 아이콘
          <div className='flex h-full w-full items-center justify-center'>
            <ProfileDefaultIcon size={160} />
          </div>
        )}
      </div>

      {/* 편집 버튼 */}
      {showEditButton && (
        <button
          onClick={onEdit}
          className='absolute right-0 bottom-0 flex h-32 w-32 items-center justify-center rounded-full bg-green-300 shadow-lg transition-colors hover:bg-green-200 focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:outline-none'
          aria-label='프로필 이미지 편집'
          type='button'
        >
          <PenIcon size={20} />
        </button>
      )}
    </div>
  );
}
