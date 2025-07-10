import { createContext, useContext } from 'react';

import { ModalContextType } from './types';

export const ModalContext = createContext<ModalContextType | null>(null);

export function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('모달관련요소들은 <Modal>컴포넌트 내부에서만 사용가능');
  }
  return ctx;
}
