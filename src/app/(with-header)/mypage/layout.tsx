'use client';

import { ProfileNavigation } from './components';
import useResponsiveRouting from '@/hooks/useResponsiveRouting';
import { useMyProfile } from '@/hooks/useMyPageQueries';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mounted } = useResponsiveRouting();
  const { isLoading, error } = useMyProfile();

  // mounted + API 로딩 상태 모두 체크
  if (!mounted || isLoading) {
    return (
      <div className='min-h-screen bg-gray-100'>
        <div className='mx-auto max-w-1200 px-20 py-[72px]'>
          <div className='flex gap-24'>
            {/* 좌측 프로필 네비게이션 스켈레톤 - 데스크톱/태블릿 */}
            <div className='hidden flex-shrink-0 animate-pulse md:block'>
              <div className='h-432 w-251 rounded border border-gray-300 bg-white p-24 lg:w-384'>
                {/* 프로필 이미지 영역 */}
                <div className='mb-32 flex justify-center'>
                  <div className='h-160 w-160 rounded-full bg-gray-200'></div>
                </div>
                {/* 메뉴 리스트 영역 */}
                <div className='space-y-2'>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className='h-44 w-203 rounded-xl bg-gray-200 lg:w-336'
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            {/* 메인 스켈레톤 */}
            <div className='flex-grow animate-pulse rounded bg-gray-200'></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-100'>
        <div className='text-center'>
          <h2 className='mb-2 text-xl font-bold text-red-500'>
            로그인이 필요합니다
          </h2>
          <p className='text-gray-600'>다시 로그인해주세요.</p>
        </div>
      </div>
    );
  }

  // API 로딩 완료 + mounted 상태일 때만 실행
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='mx-auto max-w-1200 px-20 py-[72px]'>
        <div className='flex gap-24'>
          {/* 좌측 프로필 네비게이션 섹션 - 데스크톱/태블릿에서만 표시 */}
          <ProfileNavigation />

          {/* 우측 메인 콘텐츠 섹션 */}
          <div className='flex-grow'>{children}</div>
        </div>
      </div>
    </div>
  );
}
