'use client';

import { useRef, useCallback } from 'react';

interface UseInfiniteScrollProps {
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  fetchNextPage: () => void;
}

/*
 * 무한 스크롤을 구현하기 위한 커스텀 훅
 * @description
 * - Intersection Observer API를 사용하여 마지막 요소가 화면에 보이면 자동으로 다음 페이지 로드
 * - 중복 요청을 방지하기 위한 로딩 상태 체크 포함
 */

export default function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  fetchNextPage,
}: UseInfiniteScrollProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      // 로딩중이거나 다음 페이지를 가져오는 중이면 중복요처 방지
      if (isLoading || isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        // 화면에 보이고 + 다음 페이지가 있다면 실행
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  return { lastElementRef };
}
