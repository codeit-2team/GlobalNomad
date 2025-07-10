import cn from '@/lib/cn';
import { ModalProps } from './types';

export default function ModalTitle({ children, className }: ModalProps) {
  return (
    <h2 className={cn('text-xl font-bold text-black md:text-2xl')}>
      {children}
    </h2>
  );
}
