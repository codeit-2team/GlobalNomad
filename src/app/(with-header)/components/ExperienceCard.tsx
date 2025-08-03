import Image from 'next/image';

interface Props {
  imageUrl: string;
  title: string;
  rating: number;
  reviews: number;
  price: number;
}

export default function ExperienceCard({
  imageUrl,
  title,
  rating,
  reviews,
  price,
}: Props) {
  return (
    <div className='flex flex-col w-full gap-16'>
      {/* 썸네일 */}
      <div className='relative w-full h-168 md:h-221 lg:h-283 rounded-[20px] overflow-hidden'>
        <Image
          fill
          alt={title}
          className='object-cover'
          src={imageUrl}
        />
      </div>

      {/* 텍스트 정보 */}
      <div className='flex flex-col'>
        <span className='pb-10 text-lg text-black'>
          ⭐ {rating} <span className='text-gray-700 text-lg'>({reviews})</span>
        </span>
        <p className='mb-15 text-2lg font-semibold text-black line-clamp-2-custom'>
          {title}
        </p>
        <p className='text-xl text-black font-bold'>
          ₩ {price.toLocaleString()} <span className='text-gray-900 text-lg font-medium'>/ 인</span>
        </p>
      </div>
    </div>
  );
}
