'use client';

import type React from 'react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  multiple?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function ImageUpload({
  onImageSelect,
  multiple = false,
  className = '',
  children,
}: ImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <label className={`group cursor-pointer ${className}`}>
      <div className='flex aspect-square w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-green-400 hover:bg-green-50'>
        {children || (
          <>
            <h2 className='text-xl text-gray-600 group-hover:text-green-600'>
              +
            </h2>
            <span className='text-center text-xs font-medium text-gray-600 group-hover:text-green-600'>
              이미지
              <br />
              등록
            </span>
          </>
        )}
      </div>
      <input
        type='file'
        accept='image/*'
        multiple={multiple}
        className='hidden'
        onChange={handleFileChange}
      />
    </label>
  );
}
