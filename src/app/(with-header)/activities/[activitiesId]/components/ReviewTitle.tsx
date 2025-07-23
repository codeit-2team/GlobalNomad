import Star from '@assets/svg/star';

export default function ReviewTitle() {
  return (
    <div className='mt-10 mb-10 flex flex-col'>
      <h2 className='text-2xl font-bold'>후기</h2>

      <div className='mt-15 flex items-center gap-15'>
        <h2 className='text-4xl font-bold'>4.2</h2>
        <div className='flex flex-col gap-10'>
          <p>매우 만족</p>
          <div className='flex items-center'>
            <Star />
            <p>1300개 후기</p>
          </div>
        </div>
      </div>
    </div>
  );
}
