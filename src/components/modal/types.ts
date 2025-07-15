import { ReactNode } from 'react';

export interface ModalRootProps {
  children: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export interface ModalProps {
  children?: ReactNode;
  className?: string;
  variant?: 'default' | 'fullScreen';
}

export interface ModalContextType {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
