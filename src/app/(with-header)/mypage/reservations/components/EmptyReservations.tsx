import EmptyDocumentIcon from '@assets/svg/empty-document';

export default function EmptyReservations() {
  return (
    <div className='flex flex-col items-center justify-center py-120'>
      {/* 빈 상태 아이콘 */}
      <div className='mb-24'>
        <EmptyDocumentIcon size={131} />
      </div>

      {/* 빈 상태 메시지 */}
      <p className='text-2xl font-normal text-gray-700'>
        아직 등록한 체험이 없어요
      </p>
    </div>
  );
}
