import { InputHTMLAttributes } from 'react';

/**
 * InputProps는 HTML 기본 input 속성에 label, error, 스타일 커스터마이징을 위한 props를 확장한 타입입니다.
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 인풋 상단에 표시될 라벨 텍스트 */
  label?: string;

  /** 에러 메시지 (있으면 하단에 표시됨) */
  error?: string;
}
