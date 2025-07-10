'use client';

import cn from '@/lib/cn';
import { ModalProps } from './types';

export default function ModalHeader({ children, className }: ModalProps) {
  return <div className={cn('mb-5', className)}>{children}</div>;
}
