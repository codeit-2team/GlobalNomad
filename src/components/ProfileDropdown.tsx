'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import ProfileDefaultIcon from '@assets/svg/profile-default';

import { ProfileDropdownProps } from '@/types/profileDropdownTypes';

export default function ProfileDropdown({ nickname, profileImageUrl, onLogout }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 경로 변경 시 드롭다운 닫기
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className='relative' ref={dropdownRef}>
      {/* 프로필 영역 (드롭다운 토글) */}
      <div
        className='flex items-center gap-8 cursor-pointer'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {profileImageUrl ? (
          <Image
            src={profileImageUrl}
            alt='프로필 이미지'
            width={32}
            height={32}
            className='w-32 h-32 rounded-full border border-gray-300 object-cover'
          />
        ) : (
          <div className='size-32 rounded-full border border-gray-300 overflow-hidden'>
            <ProfileDefaultIcon size={32} />
          </div>
        )}
        <span>{nickname || '사용자'}</span>
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div
          className='absolute top-50 right-0 z-50 mt-12 w-140 rounded-md border border-gray-200 bg-white shadow-md'
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href='/mypage'
            className='block w-full px-16 py-12 text-left hover:bg-gray-50'
          >
            마이페이지
          </Link>
          <button
            onClick={onLogout}
            className='w-full px-16 py-12 text-left hover:bg-gray-50'
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
