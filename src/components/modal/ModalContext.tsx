import { createContext, useContext } from 'react';

import { ModalContextType } from './types';

/**
 * @description Modal 컴포넌트의 상태를 공유하기 위한 React Context입니다.
 * `isOpen`과 `onOpenChange` 함수를 제공합니다.
 * @internal
 */
export const ModalContext = createContext<ModalContextType | null>(null);

/**
 * @description `ModalContext`를 사용하기 위한 custom hook입니다.
 * `Modal` 컴포넌트 외부에서 사용될 경우 에러를 발생시킵니다.
 * @returns {ModalContextType} Modal context 객체를 반환합니다. (`isOpen`, `onOpenChange` 포함)
 * @throws {Error} `Modal` 컴포넌트 외부에서 사용될 경우 에러를 발생시킵니다.
 * @example
 * const { isOpen, onOpenChange } = useModalContext();
 */
export function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('모달관련요소들은 <Modal>컴포넌트 내부에서만 사용가능!!');
  }
  return ctx;
}
