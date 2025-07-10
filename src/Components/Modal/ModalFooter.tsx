'use client';

import cn from '@/lib/cn';
import { ModalProps } from './types';

export default function ModalFooter({ children, className }: ModalProps) {
  return (
    <div className={cn('mt-5 flex w-full justify-center gap-3', className)}>
      {children}
    </div>
  );
}
