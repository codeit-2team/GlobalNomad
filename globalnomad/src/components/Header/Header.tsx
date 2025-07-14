'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  // 실제로는 로그인 여부를 전역 상태나 context로 받아와야 함
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="w-full h-20 border-b border-gray-200 bg-white flex items-center justify-between px-4 md:px-10">
      {/* 로고 */}
      <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-800">
        <Image src="/img/icon/logo.svg" alt="로고" width={24} height={24} />
        <span>GlobalNomad<sup className="text-[10px]">®</sup></span>
      </Link>

      {/* 우측 메뉴 */}
      <div className="flex items-center gap-4 text-sm text-gray-700">
        {isLoggedIn ? (
          <>
            {/* 알림 아이콘 */}
            <button aria-label="알림" className="hover:text-primary">
              <Image src="/img/icon/bell.svg" alt="알림" width={20} height={20} />
            </button>

            {/* 세로 구분선 */}
            <div className="w-px h-4 bg-gray-300 mx-2" />

            {/* 유저 프로필 */}
            <div className="flex items-center gap-2">
              <Image
                src="/img/sample-user.png" // 사용자 프로필 이미지
                alt="프로필 이미지"
                width={28}
                height={28}
                className="rounded-full"
              />
              <span>정연철</span>
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
    </header>
  );
}
