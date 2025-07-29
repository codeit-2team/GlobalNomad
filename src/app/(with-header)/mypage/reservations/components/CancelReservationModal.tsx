'use client';

import Modal from '@/components/Modal';
import Button from '@/components/Button';
import CheckIcon from '@assets/svg/check';

interface CancelReservationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function CancelReservationModal({
  isOpen,
  onCancel,
  onConfirm,
  isLoading = false,
}: CancelReservationModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <Modal.Content className='!h-[184px] !w-[298px] !max-w-none !min-w-0 !rounded-xl !p-0'>
        <div
          className='flex h-full w-full flex-col items-center justify-center gap-24 bg-white p-16'
          style={{
            borderRadius: '12px',
            background: '#FFFFFF',
            boxShadow: '0px 4px 16px 0px rgba(17, 34, 17, 0.05)',
            overflow: 'hidden',
          }}
        >
          {/* 체크 아이콘 */}
          <div className='flex justify-center'>
            <CheckIcon size={24} />
          </div>

          {/* 메시지 */}
          <p className='text-nomad text-center text-lg font-medium'>
            예약을 취소하시겠어요?
          </p>

          {/* 버튼 */}
          <div className='flex gap-12'>
            <Button
              variant='secondary'
              className='text-md h-[38px] w-[80px] rounded-lg border border-gray-300 font-medium'
              onClick={onCancel}
              disabled={isLoading}
            >
              아니오
            </Button>
            <Button
              variant='primary'
              className='text-md bg-nomad h-[38px] w-[80px] rounded-lg font-medium text-white'
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? '취소 중...' : '취소하기'}
            </Button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
}
