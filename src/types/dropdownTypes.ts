import { ClassValue } from 'clsx';

/**
 * 범용 Dropdown 컴포넌트의 props 정의입니다.
 * 제네릭 타입 T를 사용하여 다양한 문자열 옵션 타입을 지원합니다.
 *
 * @template T - 드롭다운 옵션의 타입 (string을 상속해야 함)
 *
 * @property options - 선택 가능한 옵션 목록 (readonly 배열)
 * @property value - 현재 선택된 값 (Controlled 모드, 빈 문자열 허용)
 * @property onChange - 값 변경 시 호출되는 콜백 함수
 * @property placeholder - 선택되지 않았을 때 표시되는 텍스트
 * @property className - 컴포넌트에 적용할 CSS 클래스 (크기, 위치 등)
 * @property disabled - 비활성화 여부
 * @property disableScroll - 스크롤 비활성화 여부
 */
export interface DropdownProps<T extends string> {
  options: readonly T[];
  value?: T | '';
  onChange?: (value: T) => void;
  placeholder?: string;
  className?: ClassValue;
  disabled?: boolean;
  disableScroll?: boolean;
}
