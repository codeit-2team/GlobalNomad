'use client';

import cn from '@lib/cn';
import { ModalProps } from '@/types/modalTypes';
import { useModalContext } from '@/contexts/ModalContext';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

/**
 * @description Modal의 콘텐츠를 감싸는 컴포넌트입니다. 내부에 Modal의 내용을 구성하는 요소들을 포함합니다.
 * @param {ModalProps} props - ModalContent 컴포넌트의 props입니다.
 * @param {React.ReactNode} props.children - Modal 콘텐츠 내부에 표시될 요소입니다.
 * @param {string} [props.className] - Modal 콘텐츠에 추가할 className입니다.
 * @example
 * <Modal.Content>
 *  <다른 요소들/>
 * </Modal.Content>
 */
export default function ModalContent({ children, className }: ModalProps) {
  const { isOpen } = useModalContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div
        className={cn(
          'relative m-auto flex h-fit max-h-[85%] w-screen min-w-[375] flex-col bg-white p-8 px-10 shadow-2xl inset-shadow-sm inset-shadow-gray-300 md:h-fit md:w-[50%] md:max-w-600',
          className,
        )}
      >
        {children}
      </div>
    </div>,
    modalRoot,
  );
}
