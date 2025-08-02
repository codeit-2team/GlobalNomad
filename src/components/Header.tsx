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

  // hydration 되기 전엔 스켈레톤 UI 보여주기
  if (!hasHydrated) {
    return (
      <header className='mt-7 h-[5rem] animate-pulse rounded-2xl bg-[#f5f5f5] md:h-[7rem]'>
        <div className='flex h-full items-center justify-between px-[4rem] md:px-[8rem]'>
          <div className='flex space-x-6' />
        </div>
      </header>
    );
  }

  return (
    <header className='fixed z-100 w-full border-b border-gray-300 bg-white'>
      <div className='mx-auto flex min-h-70 max-w-1200 items-center justify-between px-20 py-20'>
        <Link
          href='/'
          className='flex items-center gap-2 text-xl font-bold text-gray-800'
        >
          <IconLogo />
        </Link>

        <div className='text-md relative flex items-center gap-24 text-black'>
          {isLoggedIn ? (
            <>
              <button aria-label='알림' className='hover:text-primary'>
                <IconBell />
              </button>

              <div className='mx-12 h-22 w-px bg-gray-300' />

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
