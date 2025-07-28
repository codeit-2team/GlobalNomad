'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProfileImage from '@/app/(with-header)/mypage/components/ProfileImage';
import useMyPageStore from '@/stores/MyPage/useMyPageStore';
import useDeviceSize from '@/hooks/useDeviceSize';
import MyUserIcon from '@assets/svg/my-user';
import MyReservationIcon from '@assets/svg/my-reservation';
import MyActivitiesIcon from '@assets/svg/my-activities';
import MyActivitiesDashboardIcon from '@assets/svg/my-activities-dashboard';
import { useProfileImageUpload } from '@/hooks/useProfileImageUpload';
/**
 * 마이페이지 메인 페이지 (/mypage)
 * - 모바일: 메뉴 리스트 표시
 * - 데스크톱/태블릿: /mypage/profile로 자동 리다이렉트
 */
export default function MyPageMainPage() {
  const { user } = useMyPageStore();
  const { fileInputRef, handleImageEdit, handleFileChange } =
    useProfileImageUpload();
  const [mounted, setMounted] = useState(false);
  const deviceType = useDeviceSize();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 데스크톱/태블릿에서는 프로필 페이지로 리다이렉트
  useEffect(() => {
    if (mounted && deviceType !== 'mobile') {
      router.replace('/mypage/profile');
    }
  }, [mounted, deviceType, router]);

  const menuItems = [
    { href: '/mypage/profile', icon: MyUserIcon, label: '내 정보' },
    {
      href: '/mypage/reservations',
      icon: MyReservationIcon,
      label: '예약 내역',
    },
    {
      href: '/mypage/activities',
      icon: MyActivitiesIcon,
      label: '내 체험 관리',
    },
    {
      href: '/mypage/dashboard',
      icon: MyActivitiesDashboardIcon,
      label: '예약 현황',
    },
  ];

  // 초기 로딩 또는 데스크톱/태블릿에서 리다이렉트 중
  if (!mounted || deviceType !== 'mobile') {
    return (
      <div className='min-h-screen bg-gray-100'>
        <div className='mx-auto max-w-1200 px-20 py-40'>
          <div className='animate-pulse rounded border border-gray-300 bg-white p-24'>
            <div className='mb-32 flex justify-center'>
              <div className='h-160 w-160 rounded-full bg-gray-200'></div>
            </div>
            <div className='space-y-2'>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className='h-44 w-full rounded-xl bg-gray-200'
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 모바일에서만 메뉴 리스트 표시
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='mx-auto max-w-1200 px-20 py-40'>
        <div className='rounded border border-gray-300 bg-white p-24'>
          {/* 프로필 이미지 섹션 */}
          <div className='mb-32 text-center'>
            <ProfileImage
              src={user?.profileImageUrl}
              nickname={user?.nickname}
              showEditButton={true}
              onEdit={handleImageEdit}
            />

            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* 메뉴 리스트 */}
          <div className='space-y-2'>
            {menuItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className='flex h-44 w-full items-center gap-12 rounded-xl px-16 text-gray-800 transition-colors hover:bg-gray-100'
              >
                <Icon size={24} />
                <span className='font-regular text-lg'>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
