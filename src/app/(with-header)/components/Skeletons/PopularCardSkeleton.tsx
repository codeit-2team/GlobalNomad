export default function PopularCardSkeleton() {
  return (
    <div className="relative w-186 h-186 md:w-384 md:h-384 rounded-[20px] overflow-hidden shadow-md bg-gray-200 animate-pulse">
      {/* 어두운 오버레이 레이어 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50" />
      
      {/* 텍스트 정보 블록 위치 */}
      <div className="absolute bottom-12 flex flex-col gap-6 md:gap-20 px-20 py-12">
        <div className="w-24 h-16 rounded bg-gray-300" /> {/* 별점 */}
        <div className="w-40 h-24 md:w-60 md:h-28 rounded bg-gray-300" /> {/* 타이틀 */}
        <div className="w-32 h-16 md:w-40 md:h-20 rounded bg-gray-300" /> {/* 가격 */}
      </div>
    </div>
  );
}