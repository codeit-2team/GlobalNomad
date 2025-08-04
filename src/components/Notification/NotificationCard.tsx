'use client';

import { useDeleteNotification } from '@/hooks/useDeleteNotification';
import cn from '@/lib/cn';
import relativeTime from '@/utils/relativeTime';
import IconClose from '@assets/svg/close';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type NotificationStatus = 'confirmed' | 'declined';

interface NotificationCardProps {
  content: string;
  id: number;
  createdAt: string;
  onDelete: (id: number) => void;
}

const statusColorMap: Record<
  NotificationStatus,
  { dot: string; text: string }
> = {
  confirmed: { dot: 'bg-blue-300', text: 'text-blue-300' },
  declined: { dot: 'bg-red-300', text: 'text-red-300' },
};

const statusKeywordMap: Record<string, NotificationStatus> = {
  승인: 'confirmed',
  거절: 'declined',
};

/**
 * 알림 카드를 표시하는 UI 컴포넌트입니다.
 * 알림 내용, 생성 시간, 상태(승인/거절)에 따라 스타일을 다르게 보여주며,
 * 알림 삭제 버튼도 함께 제공합니다.
 *
 * @component
 * @param {NotificationCardProps} props - 알림 카드에 전달되는 속성들
 * @param {string} props.content - 알림 본문 내용
 * @param {number} props.id - 알림 ID
 * @param {string} props.createdAt - 알림 생성 시각 (ISO 형식)
 * @param {(id: number) => void} props.onDelete - 삭제 시 실행할 콜백 함수
 *
 * @description
 * - 알림 내용 중 '승인' 또는 '거절'이라는 키워드를 포함하면 상태를 감지해 색상을 다르게 표시합니다.
 * - 날짜 정보가 포함된 경우 날짜 앞에 줄바꿈을 추가하여 보기 좋게 포맷합니다.
 * - 삭제 버튼 클릭 시 알림을 UI에서 제거하고, 서버에도 삭제 요청을 보냅니다.
 * - 삭제 버튼 클릭 시 이벤트 전파로 인해 드롭다운이 닫히는 현상을 막기 위해 `setTimeout`을 사용하여 처리 순서를 조정합니다.
 */
export default function NotificationCard({
  content,
  createdAt,
  id,
  onDelete,
}: NotificationCardProps) {
  const { mutateAsync: deleteNotification } = useDeleteNotification();
  const router = useRouter();

  const formattedContent = content.replace(/(\(\d{4}-\d{2}-\d{2})\s+/, '$1\n');

  const handleDelete = async () => {
    await deleteNotification(id);
    onDelete(id);
  };

  const keywordMatch = Object.entries(statusKeywordMap).find(([k]) =>
    content.includes(k),
  );

  const status = keywordMatch?.[1];

  const handleCardClick = async () => {
    try {
      await deleteNotification(id);
      onDelete(id);
      router.push('/mypage/reservations');
    } catch {
      toast.error(
        '알림 확인 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      );
    }
  };

  return (
    <div
      className='w-full cursor-pointer rounded-[5px] border border-gray-400 bg-white px-12 py-16'
      onClick={handleCardClick}
    >
      <div className='flex items-start justify-between'>
        {status && (
          <div
            className={cn(
              'mt-4 h-5 w-5 rounded-full',
              statusColorMap[status].dot,
            )}
          />
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setTimeout(() => {
              handleDelete();
            }, 0);
          }}
          aria-label='알림 삭제'
        >
          <IconClose color='#a1a1a1' className='pointer-events-none' />
        </button>
      </div>

      <p className='text-md font-regular whitespace-pre-line text-black'>
        {formattedContent.split(/(승인|거절)/).map((text, i) => {
          const matchedStatus = statusKeywordMap[text];
          return (
            <span
              key={i}
              className={cn(
                matchedStatus && statusColorMap[matchedStatus].text,
              )}
            >
              {text}
            </span>
          );
        })}
      </p>

      <p className='mt-4 text-xs text-gray-600'>{relativeTime(createdAt)}</p>
    </div>
  );
}
