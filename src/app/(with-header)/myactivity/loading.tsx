'use client';

export default function EditActivityFormSkeleton() {
  return (
    <div className='bg-gray-white min-h-screen px-16 py-24 sm:px-6 md:py-0 lg:px-8'>
      <div className='mx-auto max-w-1200 animate-pulse space-y-8 p-4 sm:px-20 lg:p-8'>
        <div className='mb-8 flex items-center justify-between'>
          <div className='h-40 w-150 rounded bg-gray-300' />
          <div className='h-40 w-120 rounded bg-gray-300' />
        </div>

        <section className='flex flex-col gap-24 space-y-6 pt-24'>
          <div className='h-58 w-full rounded bg-gray-300' />
          <div className='h-58 w-full rounded bg-gray-300' />
          <div className='h-292 w-full rounded bg-gray-300' />
          <div className='h-58 w-full rounded bg-gray-300' />
          <div className='h-58 w-full rounded bg-gray-300' />
        </section>

        <div className='space-y-4 pt-24'>
          <div className='flex items-center justify-between'>
            <div className='h-32 w-120 rounded bg-gray-300' />
            <div className='h-32 w-50 rounded bg-gray-300' />
          </div>
          {[...Array(2)].map((_, i) => (
            <div key={i} className='flex gap-4'>
              <div className='h-46 w-full rounded bg-gray-300' />
            </div>
          ))}
        </div>

        <div className='space-y-8 pt-24'>
          <div>
            <div className='mb-10 h-32 w-100 rounded bg-gray-300' />

            <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4'>
              {[...Array(1)].map((_, i) => (
                <div
                  key={i}
                  className='flex aspect-square w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300'
                />
              ))}
            </div>
          </div>

          <div>
            <div className='mb-8 h-32 w-100 rounded bg-gray-300' />

            <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4'>
              {[...Array(1)].map((_, i) => (
                <div
                  key={i}
                  className='flex aspect-square w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300'
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
