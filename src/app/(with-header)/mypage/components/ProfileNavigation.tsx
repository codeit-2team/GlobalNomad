'use client';

import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ProfileImage from './ProfileImage';
import useMyPageStore from '@/stores/MyPage/useMyPageStore';
import { useUploadProfileImage } from '@/hooks/useMyPageQueries';
import MyUserIcon from '@assets/svg/my-user';
import MyReservationIcon from '@assets/svg/my-reservation';
import MyActivitiesIcon from '@assets/svg/my-activities';
import MyActivitiesDashboardIcon from '@assets/svg/my-activities-dashboard';

/**
 * @component ProfileNavigation
 * @description
 * 마이페이지 전용 프로필 네비게이션 컴포넌트입니다.
 * 데스크톱/태블릿에서 좌측에 표시되며, 프로필 이미지와 네비게이션 메뉴를 포함합니다.
 */
export default function ProfileNavigation() {
  const { user } = useMyPageStore();
  const pathname = usePathname();
  const uploadImageMutation = useUploadProfileImage();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  //   메뉴 활성화 상태 확인
  const isActive = (href: string) => {
    return pathname === href;
  };

  // 프로필 이미지 편집 버튼
  const handleImageEdit = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 타입 검증
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      // 파일 크기 검증
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      uploadImageMutation.mutate(file);
    }

    // 같은 파일을 다시 선택할 수 있도록 input 값 초기화
    event.target.value = '';
  };

  return (
    <div className='hidden flex-shrink-0 md:block'>
      <div className='h-432 w-251 rounded border border-gray-300 bg-white p-24 lg:w-384'>
        {/* 프로필 이미지 섹션 */}
        <div className='mb-32 text-center'>
          <ProfileImage
            src={user?.profileImageUrl}
            nickname={user?.nickname}
            showEditButton={true}
            onEdit={handleImageEdit}
          />

          {/* 숨겨진 파일 입력 */}
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* 네비게이션 메뉴 섹션 */}
        <div className='space-y-2'>
          {menuItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex h-44 w-203 items-center gap-12 rounded-xl px-16 transition-colors lg:w-336 ${
                isActive(href)
                  ? 'bg-green-200 text-green-300'
                  : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              <Icon size={24} />
              <span className='font-regular text-lg'>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
