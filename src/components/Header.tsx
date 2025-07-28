'use client';

import Link from 'next/link';
import Image from 'next/image';
import IconLogo from '@assets/svg/logo';
import IconBell from '@assets/svg/bell';
import useUserStore from '@/stores/authStore';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileDefaultIcon from '@assets/svg/profile-default';

export default function Header() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const isLoggedIn = !!user;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 로그아웃 처리 후 홈 이동
  const handleLogout = () => {
    setUser(null);
    router.push('/');
  };

  return (
    <header className='fixed z-100 w-full border-b border-gray-300 bg-white'>
      <div className='mx-auto flex min-h-70 max-w-1200 items-center justify-between px-20 py-20'>
        {/* 로고 */}
        <Link
          href='/'
          className='flex items-center gap-2 text-xl font-bold text-gray-800'
        >
          <IconLogo />
        </Link>

        {/* 우측 메뉴 */}
        <div className='text-md relative flex items-center gap-24 text-black'>
          {isLoggedIn ? (
            <>
              <button aria-label='알림' className='hover:text-primary'>
                <IconBell />
              </button>

              <div className='mx-12 h-22 w-px bg-gray-300' />

              {/* 프로필 + 드롭다운 */}
              <div
                className='flex items-center gap-8 cursor-pointer'
                onClick={() => setIsOpen((prev) => !prev)}
                ref={dropdownRef}
              >
                {user.profileImageUrl ? (
                  <Image
                    src={user.profileImageUrl}
                    alt='프로필 이미지'
                    width={32}
                    height={32}
                    className='rounded-full border border-gray-300'
                  />
                ) : (
                  <div className='size-32 rounded-full border border-gray-300 overflow-hidden'>
                    <ProfileDefaultIcon size={32} />
                  </div>
                )}
                <span>{user.nickname || '사용자'}</span>

                {/* 드롭다운 메뉴 */}
                {isOpen && (
                  <div className='absolute top-50 right-0 z-50 mt-20 w-120 rounded-md border border-gray-200 bg-white shadow-md'>
                    <Link
                      href='/mypage'
                      className='block w-full px-16 py-12 text-left hover:bg-gray-50 cursor-pointer'
                    >
                      마이페이지
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='w-full px-16 py-12 text-left hover:bg-gray-50 cursor-pointer'
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href='/login' className='hover:text-primary'>
                로그인
              </Link>
              <Link href='/signup' className='hover:text-primary'>
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
