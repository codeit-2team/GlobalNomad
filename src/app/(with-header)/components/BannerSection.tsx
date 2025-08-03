import Image from 'next/image';

import SearchBar from '@/app/(with-header)/components/SearchBar';

interface BannerSectionProps {
  keyword: string;
}

export default function BannerSection({ keyword }: BannerSectionProps) {
  return (
    <section className='relative w-full h-240 md:h-550 mb-93'>
      {/* 배경 이미지 */}
      <Image
        fill
        priority
        alt='스트릿 댄스'
        className='object-cover'
        src='/assets/img/main-banner.jpg'
      />

      {/* 어두운 오버레이 */}
      <div className='absolute inset-0 bg-gradient-to-r from-black to-transparent' />

      {/* 텍스트 콘텐츠 */}
      <div className='relative z-10 flex flex-col items-start w-220 max-w-1200 md:w-440 lg:w-full pl-24 pt-74 md:pl-32 lg:pl-0 md:pt-144 lg:pt-159 lg:ml-auto lg:mr-auto gap-8 lg:gap-20 h-full text-white font-bold break-keep'>
        <h2 className='text-2xl md:text-[54px] md:leading-[64px] lg:text-[68px] lg:leading-[78px]'>
          오로라와 함께하는<br />
          여름의 북극 감성 체험
        </h2>
        <p className='text-md md:text-xl lg:text-2xl'>
          자연 속에서 즐기는 이색 액티비티 추천 ❤️
        </p>
      </div>
      <div className='absolute -bottom-100 left-0 right-0'>
        <SearchBar keyword={keyword} />
      </div>
    </section>
  );
}
