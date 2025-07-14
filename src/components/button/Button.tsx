'use client';

import cn from '@/lib/utils';
import { ButtonProps } from './types';

/**
 * 공통 Button 컴포넌트입니다.
 * variant와 selected 값을 기반으로 버튼 스타일을 조절할 수 있습니다.
 *
 * @component
 *
 * @param {ButtonProps} props - 버튼에 전달되는 props
 * @param {'primary' | 'secondary' | 'category'} props.variant - 버튼 스타일 종류
 * @param {boolean} [props.selected] - category 타입 버튼에서 선택 여부 (선택적)
 * @param {string} [props.className] - 외부에서 전달하는 커스텀 클래스
 * @param {React.ReactNode} props.children - 버튼 내부에 렌더링할 요소
 * @param {string} [props.type='button'] - 버튼의 HTML 타입
 * @returns {JSX.Element} 버튼 JSX
 */

export default function Button({
  type = 'button',
  className = '',
  children,
  variant = 'primary',
  selected,
  ...props
}: ButtonProps) {
  const variantClass: Record<ButtonProps['variant'], string> = {
    primary: 'bg-nomad text-white',
    secondary: 'bg-white border border-nomad text-nomad',
    category: 'bg-white border border-green-300 text-green-300',
  };

  const selectedClass =
    variant === 'category' && selected ? 'bg-green-300 text-white' : '';

  return (
    <button
      type={type}
      className={cn(
        'w-full disabled:border-none disabled:bg-gray-600 disabled:text-white',
        variantClass[variant],
        selectedClass,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
