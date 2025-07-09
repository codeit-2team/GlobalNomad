import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 여러 tailwind 클래스명을 병합할 때 사용하는 유틸 함수
 *
 * - 조건부 클래스 조합에는 clsx가 사용되고
 * - tailwind 중복 클래스 충돌을 방지하기 위해서 `tailwind-merge`를 사용
 *
 * @param {...ClassValue[]} args - 클래스명 문자열 또는 조건부 클래스 배열
 * @returns {string} 병합된 클래스명 문자열
 *
 * @example
 * const CARD_SIZE = {
 *   s: 'w-[10rem]',
 *   m: 'w-[20rem]',
 * };
 *
 * const className = cn(
 *   'text-red',
 *   CARD_SIZE['m'],
 * );
 *
 * 결과 예: "text-red w-[20rem]"
 */

const cn = (...args: ClassValue[]): string => {
  return twMerge(clsx(...args));
};

export default cn;
