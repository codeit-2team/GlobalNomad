export default function ReviewCardSkeleton() {
  return (
    <div className='bg-white p-6'>
      <div className='space-y-6'>
        <div className='flex items-start gap-3'>
          <div className='h-40 w-40 flex-shrink-0 animate-pulse rounded-full bg-gray-300' />

          <div className='min-w-0 flex-1'>
            <div className='mb-10 flex items-center gap-2'>
              <div className='h-10 w-30 animate-pulse rounded bg-gray-300' />
              <div className='h-10 w-1 animate-pulse rounded bg-gray-300' />
              <div className='h-10 w-80 animate-pulse rounded bg-gray-300' />
            </div>
            <div className='mb-5 h-15 w-400 animate-pulse rounded bg-gray-300' />
            <div className='h-15 w-400 animate-pulse rounded bg-gray-300' />
          </div>
        </div>
      </div>
    </div>
  );
}
