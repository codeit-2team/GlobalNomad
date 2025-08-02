'use client';

import Modal from '@/components/Modal';
import Button from '@/components/Button';
import CheckIcon from '@assets/svg/check';

interface DeleteActivityModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function DeleteActivityModal({
  isOpen,
  onCancel,
  onConfirm,
  isLoading = false,
}: DeleteActivityModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <Modal.Content
        className='!h-184 !w-298 !max-w-none !min-w-0 !rounded-xl !p-0'
        zIndex={999}
        backdropClassName='!z-999'
      >
        <div className='flex h-full w-full flex-col items-center justify-center gap-24 rounded-xl bg-white p-16 shadow-[0px_4px_16px_0px_rgba(17,34,17,0.05)]'>
          {/* 체크 아이콘 */}
          <div className='flex justify-center'>
            <CheckIcon size={24} />
          </div>

          {/* 메시지 */}
          <p className='text-nomad text-center text-lg font-medium'>
            체험을 삭제하시겠어요?
          </p>

          {/* 버튼 */}
          <div className='flex gap-12'>
            <Button
              variant='secondary'
              className='text-md h-38 w-80 rounded-lg border border-gray-300 font-medium'
              onClick={onCancel}
              disabled={isLoading}
            >
              아니오
            </Button>
            <Button
              variant='primary'
              className='text-md bg-nomad h-38 w-80 rounded-lg font-medium text-white'
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? '삭제 중...' : '삭제하기'}
            </Button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
}
