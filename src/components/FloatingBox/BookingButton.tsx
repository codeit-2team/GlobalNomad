import React from 'react';

interface BookingButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}
export default function BookingButton({
  onClick,
  children,
  disabled = false,
}: BookingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-4 mb-6 w-full max-w-sm rounded-lg py-20 font-medium ${disabled ? 'cursor-not-allowed bg-gray-300 text-gray-500' : 'bg-green-800 text-white hover:bg-green-900'}`}
    >
      {children}
    </button>
  );
}
