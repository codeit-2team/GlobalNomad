import Avatar from '@/components/Avatar';
import { ReviewCardProps } from '@/types/activityDetailType';

export default function ReviewCard({
  userName,
  date,
  reviewText,
  avatarSrc,
  isBlured = false,
}: ReviewCardProps) {
  return (
    <div className='flex max-w-md justify-start gap-6 p-6 text-black md:max-w-2xl'>
      <Avatar src={avatarSrc} size='sm' />
      <div className='grid flex-1 gap-6'>
        <div className='flex gap-10 text-sm md:text-lg'>
          <p className='font-bold'>{userName}</p>
          <p className='text-black'>|</p>
          <p className='text-gray-600'>{date}</p>
        </div>
        <p
          className={`text-sm leading-relaxed md:text-lg ${
            isBlured ? 'text-gray-300 select-none' : 'text-black'
          }`}
        >
          {reviewText}
        </p>
      </div>
    </div>
  );
}
