import { ReactNode } from 'react';

export interface ModalProps {
  children?: ReactNode;
  className?: string;
}

export interface ModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}
