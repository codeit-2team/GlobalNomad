'use client';

import Link from 'next/link';
import IconLogo from '@assets/svg/logo';
import IconBell from '@assets/svg/bell';
import useUserStore from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import ProfileDropdown from '@/components/ProfileDropdown';
import useLogout from '@/hooks/useLogout';
import { toast } from 'sonner';

export default function Header() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const isLoggedIn = !!user;
  const logout = useLogout();

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
