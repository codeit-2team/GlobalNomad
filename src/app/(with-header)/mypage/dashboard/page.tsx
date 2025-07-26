export default function MyDashboardPage() {
  return (
    <>
      {/* 제목 */}
      <div className='mb-48'>
        <h1 className='text-nomad text-[32px] leading-[42px] font-bold'>
          예약 현황
        </h1>
      </div>

      {/* 예약 현황 컨텐츠 */}
      <div className='mx-auto w-full max-w-[343px] md:max-w-[429px] lg:mx-0 lg:max-w-[792px]'>
        <p className='text-lg text-gray-600'>예약 현황 페이지입니다.</p>
        {/* TODO: 예약 현황 컴포넌트 구현 */}
      </div>
    </>
  );
}
