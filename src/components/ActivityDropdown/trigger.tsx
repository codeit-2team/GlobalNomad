'use client';

import { ReactNode } from 'react';

import { useDropdownContext } from './DropdownContext';

/**
 * Trigger
 *
 * 드롭다운 메뉴를 여닫는 트리거 버튼 컴포넌트입니다.
 *
 *
 * @param {ReactNode} props.children - 버튼 내부 표시할 children
 *
 * @example
 * ```tsx
 * <Trigger>
 *   <ProfileImg />
 * </Trigger>
 * ```
 *
 */
export default function Trigger({ children }: { children: ReactNode }) {
  const { isOpen, setIsOpen } = useDropdownContext();

  return (
    <button
      aria-expanded={isOpen}
      aria-haspopup='true'
      className='cursor-pointer'
      type='button'
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      }}
    >
      {children}
    </button>
  );
}
