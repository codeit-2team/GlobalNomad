import React from 'react';

interface BookingButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function BookingButton({
  onClick,
  children,
}: BookingButtonProps) {
  return (
    <button
      onClick={onClick}
      className='mt-4 mb-6 w-full max-w-sm rounded-lg bg-green-800 py-20 font-medium text-white hover:bg-green-900'
    >
      {children}
    </button>
  );
}
