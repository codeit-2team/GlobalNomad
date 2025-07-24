import Image from 'next/image';

export default function ExperienceCard() {
  return (
    <div className="relative w-186 h-186 md:w-384 md:h-384 rounded-[20px] overflow-hidden shadow-md bg-white">
      <Image
        src="/test/image1.png"
        alt="체험 이미지"
        className="w-full object-cover"
        fill
      />
      {/* 어두운 오버레이 */}
      <div className='absolute inset-0 bg-gradient-to-r from-black to-transparent' />
      <div className="absolute bottom-12 flex flex-col gap-6 md:gap-20 px-20 py-12 text-white">
        <span className="text-md">⭐ 4.9 (293)</span>
        <p className="text-2lg md:text-3xl font-semibold">함께 배우면 즐거운<br />스트릿 댄스</p>
        <p className="text-lg md:text-xl">₩ 38,000 <span className="text-gray-600 text-md">/ 인</span></p>
      </div>
    </div>
  );
}
