'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import IconLogo from '@assets/svg/logo';
import IconBell from '@assets/svg/bell';
import useUserStore from '@/stores/authStore';
import ProfileDropdown from '@/components/ProfileDropdown';
import useLogout from '@/hooks/useLogout';
import { toast } from 'sonner';
import { useState } from 'react';
import NotificationDropdown from './Notification/NotificationDropdown';
import { useNotifications } from '@/hooks/useNotification';

export default function Header() {
  const router = useRouter();
  const { user, hasHydrated, setUser } = useUserStore();
  const isLoggedIn = !!user;
  const logout = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const { data } = useNotifications({ size: 10 }, isLoggedIn);
  const hasNotification = (data?.totalCount ?? 0) > 0;

  const handleLogoClick = () => {
    router.push('/'); // 쿼리 제거됨 → 검색어 초기화됨
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      router.push('/');
    } catch {
      toast.error('로그아웃 실패');
    }
  };

  // hydration 되기 전엔 skeleton 헤더 렌더링
  if (!hasHydrated) {
    return (
      <header className='fixed z-100 w-full border-b border-gray-300 bg-white'>
        <div className='mx-auto flex min-h-70 max-w-1200 items-center justify-between px-20 py-20'>
          {/* 로고는 항상 표시 */}
          <Link
            onClick={handleLogoClick}
            href='/'
            className='flex items-center gap-2 text-xl font-bold text-gray-800'
          >
            <IconLogo />
          </Link>

          {/* 우측 placeholder (스켈레톤 박스) */}
          <div className='flex gap-24'>
            <div className='h-32 w-32 animate-pulse rounded-full bg-gray-200' />
            <div className='h-32 w-80 animate-pulse rounded-md bg-gray-200' />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className='fixed z-100 w-full border-b border-gray-300 bg-white'>
      <div className='relative mx-auto flex min-h-70 max-w-1200 items-center justify-between px-20 py-20'>
        {/* 로고 */}
        <Link
          href='/'
          className='flex items-center gap-2 text-xl font-bold text-gray-800'
        >
          <IconLogo />
        </Link>

        {/* 우측 메뉴 */}
        <div className='text-md flex items-center gap-24 text-black'>
          {isLoggedIn ? (
            <>
              {/* 알림 아이콘 */}
              <button
                aria-label='알림'
                onClick={toggleOpen}
                className='hover:text-primary relative'
              >
                <IconBell />
                {hasNotification && (
                  <span className='font-regular absolute top-[-11px] right-[-3px] text-[10px] text-red-500'>
                    {data?.totalCount}
                  </span>
                )}
              </button>

              {isOpen && (
                <NotificationDropdown
                  className='md:right- fixed inset-0 md:absolute md:top-90 md:left-800'
                  onClose={() => setIsOpen(false)}
                />
              )}

              {/* 구분선 */}
              <div className='mx-12 h-22 w-px bg-gray-300' />

              {/* 프로필 드롭다운 */}
              <ProfileDropdown
                nickname={user.nickname}
                profileImageUrl={user.profileImageUrl}
                onLogout={handleLogout}
              />
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
