'use client';

import { useId, useState } from 'react';
import { InputProps } from '@/types/inputTypes';
import OpenEyeIcon from '@assets/svg/open-eye';
import CloseEyeIcon from '@assets/svg/close-eye';
import cn from '@lib/cn';

/**
 * 재사용 가능한 커스텀 Input 컴포넌트입니다.
 *
 * - 기본 input 요소의 모든 속성을 사용할 수 있습니다.
 * - type="password"일 경우, 비밀번호 보기 토글 아이콘을 자동으로 표시합니다.
 * - label, error 메시지, 커스텀 스타일을 props로 제어할 수 있습니다.
 */

export default function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  const [visibility, setVisibility] = useState(false);
  const id = useId();

  const inputType =
    props.type === 'password' && visibility ? 'text' : props.type || 'text';

  const handleVisibility = () => {
    setVisibility((prev) => !prev);
  };

  return (
    <div className='font-regular flex flex-col text-lg text-black'>
      <label className={cn(className)} htmlFor={id}>
        {label}
      </label>

      <div className='relative'>
        <input
          {...props}
          id={id}
          type={inputType}
          className={cn(
            'w-full rounded-md border bg-white px-20 py-15 placeholder-gray-600',
            error ? 'border-red-300' : 'border-gray-800',
          )}
        />
        {props.type === 'password' && (
          <div
            onClick={handleVisibility}
            className='absolute top-1/2 right-20 -translate-y-1/2 cursor-pointer'
          >
            {visibility ? <OpenEyeIcon /> : <CloseEyeIcon />}
          </div>
        )}
      </div>
      {error && <p className='mt-8 pl-8 text-xs text-red-300'>{error}</p>}
    </div>
  );
}
