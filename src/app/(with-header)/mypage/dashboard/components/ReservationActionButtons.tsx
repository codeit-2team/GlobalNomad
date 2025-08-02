import Button from '@/components/Button';

interface Props {
  reservationId: number;
  status: string;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export default function ReservationActionButtons({
  reservationId,
  status,
  onApprove,
  onReject,
}: Props) {
  if (status === 'pending') {
    return (
      <div className='flex flex-shrink-0 gap-8'>
        <Button
          variant='primary'
          onClick={() => onApprove(reservationId)}
          className='bg-nomad h-38 w-82 rounded-[6px] text-xs !font-bold hover:bg-green-300'
        >
          승인하기
        </Button>
        <Button
          variant='secondary'
          onClick={() => onReject(reservationId)}
          className='h-38 w-82 rounded-[6px] border-gray-300 bg-white text-xs !font-bold text-gray-900 hover:bg-gray-50'
        >
          거절하기
        </Button>
      </div>
    );
  }

  return (
    <div className='flex flex-shrink-0 items-center'>
      {status === 'confirmed' && (
        <div className='rounded-[20px] bg-orange-100 px-15 py-10'>
          <span className='text-xs font-medium text-orange-200'>예약 승인</span>
        </div>
      )}
      {status === 'declined' && (
        <div className='rounded-[20px] bg-red-100 px-15 py-10'>
          <span className='text-xs font-medium text-red-300'>예약 거절</span>
        </div>
      )}
      {status === 'completed' && (
        <div className='rounded-[20px] bg-gray-500 px-15 py-10'>
          <span className='text-xs font-medium text-white'>체험 완료</span>
        </div>
      )}
    </div>
  );
}
