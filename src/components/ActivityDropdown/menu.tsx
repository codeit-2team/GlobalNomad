'use client';

import { ReactNode } from 'react';

import cn from '@/lib/cn';

import { useDropdownContext } from './DropdownContext';

/**
 * Menu
 *
 * 드롭다운 메뉴 컨테이너 컴포넌트입니다.
 *
 * 드롭다운이 열려 있을 때만 자식 요소들을 보여줍니다.
 *
 * @param {ReactNode} props.children - 드롭다운 메뉴에 들어갈 내용 
 * @param {string} props.menuClassName - 추가 클래스네임
 *
 * @example
 * ```tsx
 * <Menu>
 *   <Item onClick={() => console.log('메뉴 1 클릭')}>메뉴 1</Item>
 *   <Item onClick={() => console.log('메뉴 2 클릭')}>메뉴 2</Item>
 * </Menu>
 * ```
 *
 * ```
 */
export default function Menu({
  children,
  menuClassName,
}: {
  children: ReactNode;
  menuClassName?: string;
}) {
  const { isOpen } = useDropdownContext();

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'absolute top-37 right-0 z-9999 flex flex-col content-center justify-around rounded-md border border-gray-300 bg-white p-2 shadow-lg',
        menuClassName,
      )}
    >
      {children}
    </div>
  );
}
