import { useEffect } from 'react';

/**
 * 모달 외부 클릭 또는 ESC 키 입력 시 모달을 닫는 커스텀 훅입니다.
 *
 * @param {React.RefObject<HTMLElement>} ref - 모달 DOM 요소를 참조하는 ref 객체
 * @param {() => void} onClose - 모달을 닫는 콜백 함수
 *
 * @example
 * const modalRef = useRef(null);
 * useModalClose(modalRef, () => setIsOpen(false));
 *
 * @description
 * 이 훅은 다음 두 가지 동작을 처리합니다:
 * 1. 모달 외부를 클릭하면 onClose가 호출됨
 * 2. ESC 키를 누르면 onClose가 호출됨
 *
 * 이 훅은 모달, 드롭다운, 팝오버 등 닫기 트리거가 필요한 컴포넌트에 사용할 수 있습니다.
 */

export default function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    // 바깥 클릭 처리
    const handleClickOutside = (e: MouseEvent) => {
      const target = e?.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        onClose();
      }
    };

    // ESC 키 처리
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref, onClose]);
}
