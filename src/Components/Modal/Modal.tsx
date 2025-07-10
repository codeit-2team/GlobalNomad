'use client';

import { ReactNode, useState } from 'react';
import { ModalContext } from './ModalContext';

export default function ModalWrapper({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}
