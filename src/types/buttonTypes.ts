import { ButtonHTMLAttributes } from 'react';

/**
 * Button 컴포넌트에서 사용할 수 있는 버튼 스타일 종류입니다.
 * - 'primary': 배경색이 있는 기본 버튼
 * - 'secondary': 배경색이 없는 기본 버튼
 * - 'category': 필터나 탭 등 선택 가능한 버튼
 */

type Variant = 'primary' | 'secondary' | 'category';

/**
 * Button 컴포넌트의 props 정의입니다.
 *
 * @property variant - 버튼의 스타일 종류
 * @property selected - 'category' 타입 버튼에서 선택 여부 (선택적 사용)
 * @extends ButtonHTMLAttributes<HTMLButtonElement> - 기본 HTML 버튼 속성 모두 포함
 */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  selected?: boolean;
  isLoading?: boolean;
}
