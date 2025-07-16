'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import IconLogo from '@/app/assets/icons/logo';
import IconBell from '@/app/assets/icons/bell';

export default function Header() {
  // 실제로는 로그인 여부를 전역 상태나 context로 받아와야 함
  // test하려면 로그인 상태를 true로 변경
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="fixed z-10 w-full border-b border-gray-300 bg-white">
      <div className="flex items-center justify-between max-w-1200 mx-auto min-h-70 px-20 py-20">      
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-800">
          <IconLogo />
        </Link>

        {/* 우측 메뉴 */}
        <div className="flex items-center gap-24 text-md text-black">
          {isLoggedIn ? (
            <> 
              {/* 알림 아이콘 */}
              <button aria-label="알림" className="hover:text-primary">
                <IconBell />
              </button>

              {/* 세로 구분선 */}
              <div className="w-px h-22 bg-gray-300 mx-12" />

              {/* 유저 프로필 */}
              <div className="flex items-center gap-2">
                <Image
                  src="/img/sample-user.png" // 사용자 프로필 이미지
                  alt="프로필 이미지"
                  width={32}
                  height={32}
                  className="rounded-full border border-gray-300"
                />
                <span>김보경</span>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-primary">
                로그인
              </Link>
              <Link href="/signup" className="hover:text-primary">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}