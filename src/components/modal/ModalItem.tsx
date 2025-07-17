import { ModalProps } from './types';

import cn from '@lib/cn';

/**
 * @description Modal의 본문영역
 * @param {ModalProps} props - ModalItem 컴포넌트의 props입니다.
 * @param {React.ReactNode} props.children - 내부에 표시될 요소입니다.
 * @param {string} [props.className] -  추가할 className입니다.
 * @example
 * <Modal.Item>
 *   <Component/> -> 본문에 보이게할 요소
 * </Modal.Item>
 */

export default function ModalItem({ children, className }: ModalProps) {
  return (
    <div className={cn('h-fit overflow-y-auto py-4', className)}>
      {children}
    </div>
  );
}
