'use client';

import { useModalContext } from '@/contexts/ModalContext';
import { ModalProps } from '@/types/modalTypes';

/**
 * @description Modal을 열기 위한 트리거 컴포넌트입니다. 이 컴포넌트를 클릭하면 Modal이 열립니다.
 * @param {ModalProps} props - ModalTrigger 컴포넌트의 props입니다.
 * @param {React.ReactNode} props.children - 트리거로 사용될 요소입니다.
 * @example
 * <Modal.Trigger>
 *   <Button>열기</Button>
 * </Modal.Trigger>
 */
export default function ModalTrigger({ children }: ModalProps) {
  const { onOpenChange } = useModalContext();

  return <div onClick={() => onOpenChange(true)}>{children}</div>;
}
