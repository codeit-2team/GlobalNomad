import { ReactNode } from 'react';

type PopupType = 'alert' | 'confirm';

/**
 * 팝업 컴포넌트에 전달되는 props입니다.
 *
 * @property {boolean} isOpen - 팝업의 열림 여부를 나타냅니다. true일 경우 팝업이 화면에 표시됩니다.
 * @property {'alert' | 'confirm'} type - 팝업의 유형을 지정합니다.
 *    - 'alert': 확인 버튼만 있는 단순 알림 팝업
 *    - 'confirm': 예/아니오 또는 확인/취소 버튼이 있는 확인용 팝업
 * @property {ReactNode} children - 팝업 내부에 표시할 내용입니다. 텍스트 또는 JSX 요소를 전달할 수 있습니다.
 * @property {() => void} onClose - 팝업을 닫을 때 호출되는 콜백 함수입니다.
 *    - 보통 확인 버튼 또는 '아니오' 버튼에 사용됩니다.
 * @property {() => void} [onConfirm] - 확인 또는 '예' 버튼 클릭 시 호출되는 선택적 콜백 함수입니다.
 *    - type이 'confirm'일 때 사용되며, 'alert'일 경우 생략 가능합니다.
 */

export interface PopupProps {
  isOpen: boolean;
  closeText: string;
  confirmText: string;
  type: PopupType;
  children: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
}

export interface PopupState {
  message: string;
  redirect: string;
  isOpen: boolean;
}
