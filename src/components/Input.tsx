'use client';

import { InputHTMLAttributes, useId, useState } from 'react';
import On from '@/assets/visibility-on.svg';
import Off from '@/assets/visibility-off.svg';
import Image from 'next/image';
import clsx from 'clsx';

/**
 * InputProps는 HTML 기본 input 속성에 label, error, 스타일 커스터마이징을 위한 props를 확장한 타입입니다.
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 인풋 상단에 표시될 라벨 텍스트 */
  label?: string;

  /** 에러 메시지 (있으면 하단에 표시됨) */
  error?: string;

  /** 라벨의 마진 관련 Tailwind 클래스 */
  labelMargin?: string;

  /** 라벨의 텍스트 스타일 클래스 */
  labelText?: string;
}

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
  labelMargin,
  labelText,
  ...props
}: InputProps) {
  const [visibility, setVisibility] = useState(false);
  const id = useId();

  let inputType = props.type;

  if (props.type === 'password') {
    inputType = visibility ? 'text' : 'password';
  }

  const handleVisibility = () => {
    setVisibility((prev) => !prev);
  };

  return (
    <div className='font-regular flex flex-col text-lg text-black'>
      <label className={clsx(labelText, labelMargin)} htmlFor={id}>
        {label}
      </label>

      <div className='relative'>
        <input
          {...props}
          id={id}
          type={inputType}
          className={clsx(
            'w-full rounded-md border bg-white px-20 py-15 placeholder-gray-600',
            error ? 'border-red-300' : 'border-gray-800',
          )}
        />
        {props.type === 'password' && (
          <Image
            src={visibility ? On : Off}
            alt='eye'
            onClick={handleVisibility}
            className='absolute top-1/2 right-20 -translate-y-1/2 cursor-pointer'
          />
        )}
      </div>
      {error && <p className='mt-8 pl-8 text-xs text-red-300'>{error}</p>}
    </div>
  );
}
