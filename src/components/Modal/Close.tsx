'use client';

import cn from '@lib/cn';
import { useModalContext } from '@/contexts/ModalContext';
import { ModalProps } from '@/types/modalTypes';
import IconClose from '@assets/svg/close';

/**
 * @description Modal을 닫는 버튼입니다. `Modal.Header` 내부에 위치하거나, 단독으로 사용할 수 있습니다.
 * @param {ModalProps} props - ModalClose 컴포넌트의 props입니다.
 * @param {React.ReactNode} [props.children] - 버튼 내부에 표시될 요소입니다. 기본값은 X 아이콘입니다.
 * @param {string} [props.className] - 버튼에 추가할 className입니다.
 * @example
 * // 기본 사용법
 *     <Modal.Header>
 *       <Modal.Title>제목</Modal.Title>
 *       <Modal.Close />
 *     </Modal.Header>
 */
export default function ModalClose({ children, className }: ModalProps) {
  const { onOpenChange } = useModalContext();
  return (
    <button
      className={cn('absolute top-8 right-8 cursor-pointer', className)}
      onClick={() => onOpenChange(false)}
    >
      {children || <IconClose />}
    </button>
  );
}
