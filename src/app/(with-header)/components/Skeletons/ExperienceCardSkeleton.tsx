export default function ExperienceCardSkeleton() {
  return (
    <div className="flex flex-col w-full gap-16 animate-pulse">
      {/* 썸네일 영역 */}
      <div className="w-full h-168 md:h-221 lg:h-283 rounded-[20px] bg-gray-200" />

      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-10">
        <div className="w-1/2 h-16 bg-gray-200 rounded" />
        <div className="w-full h-20 bg-gray-200 rounded" />
        <div className="w-2/3 h-16 bg-gray-200 rounded" />
      </div>
    </div>
  );
}