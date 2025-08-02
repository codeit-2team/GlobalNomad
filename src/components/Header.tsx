'use client';

import Link from 'next/link';
import IconLogo from '@assets/svg/logo';
import IconBell from '@assets/svg/bell';
import useUserStore from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import ProfileDropdown from '@/components/ProfileDropdown';

export default function Header() {
  const router = useRouter();
  const { user, hasHydrated, setUser } = useUserStore();
  const isLoggedIn = !!user;

  const handleLogout = () => {
    setUser(null);
    router.push('/');
  };

  // hydration 되기 전엔 skeleton 헤더 렌더링
  if (!hasHydrated) {
    return (
      <header className='fixed z-100 w-full border-b border-gray-300 bg-white'>
        <div className='mx-auto flex min-h-70 max-w-1200 items-center justify-between px-20 py-20'>
          {/* 로고는 항상 표시 */}
          <Link
            href='/'
            className='flex items-center gap-2 text-xl font-bold text-gray-800'
          >
            <IconLogo />
          </Link>

          {/* 우측 placeholder (스켈레톤 박스) */}
          <div className='flex gap-24'>
            <div className='h-32 w-32 rounded-full bg-gray-200 animate-pulse' />
            <div className='h-32 w-80 rounded-md bg-gray-200 animate-pulse' />
          </div>
        </div>
      </header>
    );
  }

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
              {/* 알림 아이콘 */}
              <button aria-label='알림' className='hover:text-primary'>
                <IconBell />
              </button>

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
