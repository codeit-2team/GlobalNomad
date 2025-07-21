import Image from 'next/image';
import SearchBar from './SearchBar';

export default function BannerSection() {
  return (
    <section className='relative w-full h-240 md:h-550 mb-93'>
      {/* 배경 이미지 */}
      <Image
        src='/test/image1.png'
        alt='스트릿 댄스'
        fill
        className='object-cover'
        priority
      />

      {/* 어두운 오버레이 */}
      <div className='absolute inset-0 bg-gradient-to-r from-black to-transparent' />

      {/* 텍스트 콘텐츠 */}
      <div className='relative z-10 flex flex-col items-start w-220 max-w-1152 md:w-440 lg:w-full pl-24 pt-74 md:pl-32 lg:pl-0 md:pt-144 lg:pt-159 lg:ml-auto lg:mr-auto gap-8 lg:gap-20 h-full text-white font-bold break-keep'>
        <h2 className='text-2xl md:text-[54px] md:leading-[64px] lg:text-[68px] lg:leading-[78px]'>
          함께 배우면 즐거운<br />
          스트릿 댄스
        </h2>
        <p className='text-md md:text-xl lg:text-2xl'>
          1월의 인기 경험 BEST 🔥
        </p>
      </div>
      <div className='absolute -bottom-100 left-0 right-0'>
        <SearchBar />
      </div>
    </section>
  );
}
