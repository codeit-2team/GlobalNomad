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
    <div className="rounded-[20px] overflow-hidden bg-white shadow-sm border w-full">
      {/* 썸네일 */}
      <div className="relative w-full h-160">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* 텍스트 정보 */}
      <div className="p-16 flex flex-col gap-8">
        <span className="text-sm text-gray-600">
          ⭐ {rating} ({reviews})
        </span>
        <p className="text-md font-semibold text-gray-900 line-clamp-2">
          {title}
        </p>
        <p className="text-md text-gray-900 font-bold">
          ₩ {price.toLocaleString()} <span className="text-gray-500 text-sm">/ 인</span>
        </p>
      </div>
    </div>
  );
}
