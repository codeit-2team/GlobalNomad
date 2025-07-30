'use client';

import cn from '@lib/cn';
import { PopupProps } from '@/types/popupTypes';
import Button from './Button';
import CheckIcon from '@assets/svg/check';
import { useRef } from 'react';
import useOutsideClick from '@hooks/useOutsideClick';

/**
 * Popup 컴포넌트는 `alert` 또는 `confirm` 타입의 모달을 렌더링합니다.
 * - `alert` 타입은 확인 버튼 하나만 있는 단순 알림 용도
 * - `confirm` 타입은 취소하기 / 아니오 버튼이 있는 확인 용도
 *
 * 외부 영역 클릭 또는 ESC 키 입력 시 onClose 콜백이 호출됩니다.
 *
 * @component
 * @param {boolean} isOpen - 팝업의 열림 여부
 * @param {'alert' | 'confirm'} type - 팝업의 유형
 * @param {ReactNode} children - 팝업 내부의 메시지 또는 JSX 콘텐츠
 * @param {() => void} onClose - 팝업을 닫을 때 호출되는 함수
 * @param {() => void} [onConfirm] - confirm 타입일 때 확인 버튼 클릭 시 호출되는 함수
 *
 * @example
 * ```tsx
 * <Popup
 *   isOpen={true}
 *   type="alert"
 *   onClose={() => setOpen(false)}
 * >
 *   완료되었습니다!
 * </Popup>
 * ```
 */

export default function Popup({
  isOpen,
  type,
  children,
  onClose,
  onConfirm,
  closeText,
  confirmText,
}: PopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  useOutsideClick(popupRef, onClose);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/70',
      )}
    >
      {type === 'alert' ? (
        <div
          ref={popupRef}
          className={cn(
            'flex h-220 w-327 flex-col items-center gap-43 rounded-lg bg-white pt-81 md:h-250 md:w-540 md:gap-40 md:px-28 md:pt-108',
          )}
        >
          <div className={cn('md:text-2lg text-lg font-medium text-[#333236]')}>
            {children}
          </div>
          <Button
            variant='primary'
            className={cn(
              'text-md h-42 w-138 rounded-lg font-medium md:h-48 md:w-120 md:self-end md:text-lg',
            )}
            onClick={onClose}
          >
            확인
          </Button>
        </div>
      ) : (
        <div
          ref={popupRef}
          className={cn(
            'flex h-184 w-298 flex-col items-center gap-32 rounded-xl bg-white py-24',
          )}
        >
          <div className={cn('flex flex-col items-center gap-16')}>
            <CheckIcon />
            <div className={cn('font-regular text-lg text-black')}>
              {children}
            </div>
          </div>
          <div className={cn('text-md flex h-38 gap-8 font-bold')}>
            <Button
              variant='secondary'
              className={cn('w-80 rounded-md')}
              onClick={onClose}
            >
              {closeText}
            </Button>
            <Button
              variant='primary'
              className={cn('w-80 rounded-md')}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
