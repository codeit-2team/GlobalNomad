'use client';

import cn from '@/lib/cn';
import { ModalProps } from './types';
import { useModalContext } from './ModalContext';
import { createPortal } from 'react-dom';

export default function ModalContent({ children, className }: ModalProps) {
  const { isOpen, close } = useModalContext();
  if (typeof window === 'undefined') return null;
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return isOpen
    ? createPortal(
        <div className={cn('modal-content', className)}>{children}</div>,
        modalRoot,
      )
    : null;
}
