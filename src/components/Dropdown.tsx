'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cn from '@lib/cn';
import useOutsideClick from '@hooks/useOutsideClick';
import ChevronIcon from '@assets/svg/chevron';
import { DropdownProps } from '@/types/dropdownTypes';
// import CheckIcon from '@assets/svg/check';

/**
 * 드롭다운 컴포넌트입니다.
 * 제네릭 타입을 사용하여 다양한 옵션 타입을 지원합니다.
 *
 * @component
 * @template T - 옵션의 타입 (string을 상속해야 함)
 *
 * @example
 * // 카테고리 선택
 * <Dropdown
 *   className="w-800 h-56"
 *   options={ACTIVITY_CATEGORIES}
 *   placeholder="카테고리"
 *   value={category}
 *   onChange={setCategory}
 * />
 *
 */
export default function Dropdown<T extends string>({
  options,
  value,
  onChange,
  placeholder,
  className,
  disabled = false,
  disableScroll = false,
  buttonClassName,
  listboxClassName,
  optionClassName,
  truncateText = false,
}: DropdownProps<T>) {
  // 내부 상태 관리
  const [internalValue, setInternalValue] = useState<T | ''>('');
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 내/외부 상태 관리 판별
  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  // 외부 클릭 감지
  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
    setFocusedIndex(-1);
  });

  // 값 선택 핸들러
  const handleSelect = (option: T) => {
    if (!isControlled) {
      setInternalValue(option);
    }
    onChange?.(option);
    setIsOpen(false);
    setFocusedIndex(-1);
    buttonRef.current?.focus();
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          handleSelect(options[focusedIndex]);
        } else {
          setIsOpen(!isOpen);
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        }
        break;

      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  // focusedIndex 변경 시 스크롤
  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      const focusedElement = document.getElementById(
        `dropdown-option-${focusedIndex}`,
      );
      focusedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex, isOpen]);

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      {/* 드롭다운 버튼 */}
      <button
        ref={buttonRef}
        type='button'
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          'flex h-full w-full items-center justify-between px-16',
          'rounded border border-gray-800',
          'bg-white text-lg font-normal',
          'transition-all duration-200',
          'focus:border-green-300 focus:outline-none',
          'overflow-hidden',
          disabled && 'cursor-not-allowed bg-gray-100 opacity-50',
          isOpen && !disabled && 'border-green-300',
          buttonClassName,
        )}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        aria-label={placeholder}
      >
        <span
          className={cn(
            'text-gray-900',
            !selectedValue && 'text-gray-500',
            truncateText && 'flex-1 truncate text-left',
          )}
        >
          {selectedValue || placeholder}
        </span>
        <ChevronIcon
          size={24}
          direction={isOpen ? 'up' : 'down'}
          className='transition-transform duration-200'
        />
      </button>
      {/* 드롭다운 옵션 목록 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute top-full right-0 left-0 z-50 mt-2',
              'rounded border border-gray-300 bg-white',
              'overflow-hidden shadow-lg',
            )}
          >
            <ul
              role='listbox'
              className={cn(
                'p-8',
                disableScroll ? '' : 'max-h-240 overflow-auto',
                listboxClassName,
              )}
            >
              {options.map((option, index) => {
                const isSelected = option === selectedValue;
                const isFocused = index === focusedIndex;

                return (
                  <li
                    key={option}
                    id={`dropdown-option-${index}`}
                    role='option'
                    aria-selected={isSelected}
                    className={cn(
                      'flex items-center px-16 py-12',
                      'cursor-pointer transition-colors duration-150',
                      isFocused && 'bg-gray-100',
                      isSelected
                        ? 'bg-nomad rounded text-white'
                        : 'hover:bg-gray-100',
                      optionClassName,
                    )}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setFocusedIndex(index)}
                  >
                    {/* 아이콘 영역 */}
                    {/* <div className='flex w-24 justify-start'>
                      {isSelected && (
                        <CheckIcon
                          size={20}
                          showBackground={false}
                          className='text-white'
                        />
                      )}
                    </div> */}
                    <span>{option}</span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
