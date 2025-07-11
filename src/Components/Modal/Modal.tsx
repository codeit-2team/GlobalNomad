'use client';

import { useState, useEffect } from 'react';
import { ModalContext } from './ModalContext';
import { ModalRootProps } from './types';

/**
 * @component ModalWrapper
 * @description
 * Modal 컴포넌트의 루트입니다.
 * 열림/닫힘 상태를 관리하고, `ModalContext`를 통해 하위 컴포넌트에 상태와 상태 변경 함수를 제공합니다.
 *
 * 이 컴포넌트는 **제어(Controlled)**와 **비제어(Uncontrolled)** 두 가지 방식으로 동작할 수 있습니다.
 *
 * ---
 * ### 제어(Controlled) 모드
 * `isOpen`과 `onOpenChange`를 props로 넘겨주면 외부에서 열림/닫힘 상태를 제어할 수 있습니다.
 *
 * - `isOpen`: boolean
 *   현재 모달이 열려 있는지 여부를 외부에서 제어합니다.
 * - `onOpenChange`: (open: boolean) => void
 *   모달 상태가 변경될 때 호출됩니다. 외부 상태를 업데이트하는 데 사용합니다.
 *
 * 이 경우 내부적으로 상태를 가지지 않고 외부 상태만 사용합니다.
 *
 * ### 비제어(Uncontrolled) 모드
 * `isOpen`과 `onOpenChange`를 넘기지 않으면 내부적으로 상태를 관리합니다.
 *
 * - `useState`로 `internalIsOpen`을 관리하여 모달 열림/닫힘을 내부에서 결정합니다.
 * - 모달 내부에서 상태를 변경할 때 `setInternalIsOpen`을 호출합니다.
 *
 * ---
 * ### Escape 키 처리 및 스크롤 잠금
 * - 모달이 열리면 `Escape` 키를 눌러 닫을 수 있습니다.
 * - 모달이 열려 있는 동안에는 `body` 스크롤이 비활성화됩니다.
 *
 * ---
 * @param {ModalRootProps} props - ModalWrapper의 props입니다.
 * @param {React.ReactNode} props.children - Modal 하위 컴포넌트들 (Trigger, Content 등)
 * @param {boolean} [props.isOpen] - (선택) 제어 모드일 경우 모달 열림 여부를 전달합니다.
 * @param {(open: boolean) => void} [props.onOpenChange] - (선택) 모달 상태가 바뀔 때 호출됩니다.
 *
 * @example
 * // 비제어 방식
 * <Modal>
 *   <Modal.Trigger>
 *     <Button>Open Modal</Button>
 *   </Modal.Trigger>
 *   <Modal.Content>
 *     <Modal.Header>
 *       <Modal.Title>Modal Title</Modal.Title>
 *       <Modal.Close />
 *     </Modal.Header>
 *     <p>Modal Body</p>
 *     <Modal.Footer>
 *       <Button>Close</Button>
 *     </Modal.Footer>
 *   </Modal.Content>
 * </Modal>
 *
 * @example
 * // 제어 방식
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
 *   <Modal.Trigger>
 *     <Button>Open Modal</Button>
 *   </Modal.Trigger>
 *   <Modal.Content>
 *     <Modal.Header>
 *       <Modal.Title>Modal Title</Modal.Title>
 *       <Modal.Close />
 *     </Modal.Header>
 *     <p>Modal Body</p>
 *     <Modal.Footer>
 *       <Button onClick={() => setIsOpen(false)}>Close</Button>
 *     </Modal.Footer>
 *   </Modal.Content>
 * </Modal>
 */
export default function ModalWrapper({
  children,
  isOpen: controlledIsOpen,
  onOpenChange,
}: ModalRootProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleOpenChange = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    }
    if (!isControlled) {
      setInternalIsOpen(open);
    }
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleOpenChange(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </ModalContext.Provider>
  );
}
