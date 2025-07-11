'use client';

import cn from '@/lib/cn';
import { ModalProps } from './types';

/**
 * @description Modal의 헤더 영역을 정의합니다. `Modal.Title`과 `Modal.Close` 컴포넌트를 포함할 수 있습니다.
 * @param {ModalProps} props - ModalHeader 컴포넌트의 props입니다.
 * @param {React.ReactNode} props.children - 헤더 내부에 표시될 요소입니다.
 * @param {string} [props.className] - 헤더에 추가할 className입니다.
 * @example
 * <Modal.Header>
 *   <Modal.Title>Modal Title</Modal.Title>
 *   <Modal.Close />
 * </Modal.Header>
 */
export default function ModalHeader({ children, className }: ModalProps) {
  return <div className={cn('mb-5', className)}>{children}</div>;
}
