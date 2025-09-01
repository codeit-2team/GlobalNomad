export default function PriceDisplay({ price }: { price: number }) {
  return (
    <div className='mt-6 mb-6'>
      <div className='mb-2 flex flex-wrap items-center justify-between gap-4'>
        <p className='text-2xl font-bold text-black'>
          ₩{price.toLocaleString('ko-KR')}
          <span className='text-xl font-normal text-gray-600'>/인</span>
        </p>

        <div className='flex items-center gap-2'>
          <div className='h-25 w-25 rounded-full bg-yellow-300' />
          <span className='text-base font-bold text-black'>
            : 예약 가능 일자
          </span>
        </div>
      </div>
    </div>
  );
}
