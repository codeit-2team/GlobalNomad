'use client';

import { useId } from 'react';
import { TextareaProps } from '@/types/inputTypes';
import cn from '@lib/cn';

export default function Textarea({
  label,
  error,
  className,
  focusColor,
  variant,
  rows,
  ...props
}: TextareaProps) {
  const id = useId();
  const isCompact = variant === 'compact';

  return (
    <div className='font-regular flex flex-col text-lg text-black'>
      {label && (
        <label htmlFor={id} className={cn(className)}>
          {label}
        </label>
      )}
      <textarea
        {...props}
        id={id}
        rows={rows}
        className={cn(
          'w-full rounded-md border bg-white placeholder:text-gray-600 focus:outline-none resize-none',
          isCompact ? 'py-10 px-12 text-md' : 'py-15 pr-50 pl-20',
          focusColor,
          error ? 'border-red-300' : 'border-gray-800',
        )}
      />
      {error && <p className='mt-8 pl-8 text-xs text-red-300'>{error}</p>}
    </div>
  );
}
