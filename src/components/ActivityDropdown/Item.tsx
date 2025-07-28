'use client';

import { ReactNode } from 'react';

import cn from '@/lib/cn';

import { useDropdownContext } from './DropdownContext';

/**
 * Item
 *
 * Dropdown 내부 개별 아이템 요소 컴포넌트
 *
 * 클릭 시 `onClick` 핸들러가 실행되고, 드롭다운 메뉴가 닫힙니다.
 *
 * @param {ReactNode | string} props.children - 버튼 내부 표시할 children
 * @param {() => void} props.onClick - 버튼 클릭 시 실행될 함수
 * @param {string} [props.itemClassName] - 버튼 추가 클래스네임
 *
 * @example
 * ```tsx
 * <Item onClick={() => console.log('클릭')}>
 *   메뉴 1
 * </Item>
 * ```
 *
 */
export default function Item({
  children,
  onClick,
  itemClassName,
}: {
  children: string | ReactNode;
  onClick: () => void;
  itemClassName?: string;
}) {
  const { setIsOpen } = useDropdownContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
    setIsOpen(false);
  };

  return (
    <button
      className={cn(
        'md:text-md z-30 h-40 w-90 cursor-pointer rounded-[1.2rem] text-sm font-medium hover:animate-pulse hover:bg-gray-300 md:h-46 md:w-108',
        itemClassName,
      )}
      type='button'
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
