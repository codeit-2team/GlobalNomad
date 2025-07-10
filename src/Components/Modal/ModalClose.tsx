'use client';

import cn from '@/lib/cn';
import { useModalContext } from './ModalContext';
import { ModalProps } from './types';

export default function ModalClose({ children, className }: ModalProps) {
  const { close } = useModalContext();
  return (
    <button
      className={cn('absolute top-6 right-6 cursor-pointer', className)}
      onClick={close}
    >
      X
    </button>
  );
}
