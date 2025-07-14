'use client';

import cn from '@/lib/utils';
import { ButtonProps } from './types';

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
