import React from 'react';
import { cn } from '@/lib/utils';

interface BookingButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  onBooking?: boolean;
  className?: string;
}

export default function BookingButton({
  onClick,
  children,
  disabled = false,
  onBooking = false,
  className = '',
}: BookingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || onBooking}
      className={cn(
        'relative mt-4 mb-6 w-full max-w-sm rounded-lg py-10 font-medium transition-colors',
        disabled || onBooking
          ? 'cursor-not-allowed bg-gray-300 text-gray-500'
          : 'bg-green-800 text-white hover:bg-green-900',
        className,
      )}
    >
      {onBooking ? (
        <div className='flex items-center justify-center gap-2'>
          <span className='h-10 w-10 animate-spin rounded-full border-2 border-white border-t-transparent' />
          <p>요청전송중...</p>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
