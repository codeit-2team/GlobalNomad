import Avatar from '@/components/Avatar';

interface UserReviewProps {
  userName: string;
  date: string;
  reviewText: string;
  avatarSrc: string;
}

export default function ReviewCard({
  userName,
  date,
  reviewText,
  avatarSrc,
}: UserReviewProps) {
  return (
    <div className='mx-auto flex max-w-md items-start gap-6 p-6 text-black md:max-w-2xl'>
      <Avatar src={avatarSrc} size='sm' />
      <div className='grid flex-1 gap-6'>
        <div className='flex items-center gap-10 text-sm md:text-lg'>
          <p className='font-bold'>{userName}</p>
          <p className='text-black'>|</p>
          <p className='text-gray-600'>{date}</p>
        </div>
        <p className='text-sm leading-relaxed text-black md:text-lg'>
          {reviewText}
        </p>
      </div>
    </div>
  );
}
