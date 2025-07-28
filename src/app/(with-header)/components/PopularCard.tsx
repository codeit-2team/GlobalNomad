import Image from 'next/image';

interface PopularCardProps {
  imageUrl: string;
  title: string;
  rating: number;
  reviews: number;
  price: number;
}

export default function PopularCard({
  imageUrl,
  title,
  rating,
  reviews,
  price,
}: PopularCardProps) {
  return (
    <div className='relative w-186 h-186 md:w-384 md:h-384 rounded-[20px] overflow-hidden shadow-md bg-white'>
      {/* 배경 이미지 */}
      <Image
        src={imageUrl}
        alt={title}
        className='w-full object-cover'
        fill
      />
      {/* 어두운 오버레이 */}
      <div className='absolute inset-0 bg-gradient-to-r from-black to-transparent' />
      {/* 텍스트 정보 블록 (카드 하단 위치 고정) */}
      <div className='absolute bottom-12 flex flex-col gap-6 md:gap-20 px-20 py-12 text-white'>
        {/* 별점 정보 */}
        <span className='text-md'>⭐ {rating} ({reviews})</span>
        {/* 체험명 (줄바꿈 포함, 반응형 크기) */}
        <p className='text-2lg md:text-3xl font-semibold'>{title}</p>
        {/* 가격 정보 */}
        <p className='text-lg md:text-xl'>₩ {price.toLocaleString()} <span className='text-gray-600 text-md'>/ 인</span></p>
      </div>
    </div>
  );
}
