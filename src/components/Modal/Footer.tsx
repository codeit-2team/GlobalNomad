'use client';

import cn from '@lib/cn';
import { ModalProps } from '@/types/modalTypes';

/**
 * @description Modal의 푸터 영역을 정의합니다. 주로 버튼들을 포함합니다.
 * @param {ModalProps} props - ModalFooter 컴포넌트의 props입니다.
 * @param {React.ReactNode} props.children - 푸터 내부에 표시될 요소입니다.
 * @param {string} [props.className] - 푸터에 추가할 className입니다.
 * @example
 * <Modal.Footer>
 *   <Button onClick={handleConfirm}>확인</Button>
 *   <Button onClick={handleCancel}>취소</Button>
 * </Modal.Footer>
 */
export default function ModalFooter({ children, className }: ModalProps) {
  return (
    <div className={cn('mt-5 flex w-full justify-center gap-3', className)}>
      {children}
    </div>
  );
}
