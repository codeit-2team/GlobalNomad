import cn from '@/lib/cn';
import { ModalProps } from './types';

/**
 * @description Modal의 제목을 정의합니다. `Modal.Header` 내부에 위치합니다.
 * @param {ModalProps} props - ModalTitle 컴포ön넌트의 props입니다.
 * @param {React.ReactNode} props.children - 제목으로 표시될 내용입니다.
 * @param {string} [props.className] - 제목에 추가할 className입니다.
 * @example
 * <Modal.Title>
 *   This is the title
 * </Modal.Title>
 */
export default function ModalTitle({ children, className }: ModalProps) {
  return (
    <h2 className={cn('text-xl font-bold text-black md:text-2xl')}>
      {children}
    </h2>
  );
}
