'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full h-240 md:h-500">
      {/* 배경 이미지 */}
      <Image
        src="/test/image1.png"
        alt="스트릿 댄스"
        fill
        className="object-cover"
        priority
      />

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 pl-24 bg-gradient-to-r from-black to-transparent" />

      {/* 텍스트 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-2">
          함께 배우면 즐거운
          스트릿 댄스
        </h2>
        <p className="text-sm md:text-base lg:text-lg">
          1월의 인기 경험 BEST
        </p>
      </div>
    </section>
  );
}
