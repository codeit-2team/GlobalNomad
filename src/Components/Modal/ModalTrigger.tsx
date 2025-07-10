'use client';

import { useModalContext } from './ModalContext';
import { ModalProps } from './types';

export default function ModalTrigger({ children }: ModalProps) {
  const { open } = useModalContext();

  return <div onClick={open}>{children}</div>;
}
