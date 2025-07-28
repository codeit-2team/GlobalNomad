import api from '@/lib/api/api';
import { Experience } from '@/types/experienceListTypes';

interface Params {
  cursorId: number;
}

interface ResponseData {
  cursorId: number;
  totalCount: number;
  activities: Experience[];
}

// 댓글 수 기준 인기 체험 조회 (무한스크롤)
export const getPopularExperiences = async ({ cursorId }: Params) => {
  const res = await api.get<ResponseData>(
    `/teams/${process.env.NEXT_PUBLIC_TEAM_ID}/activities`,
    {
      params: {
        method: 'cursor',
        cursorId,
        sort: 'most_reviewed',
        size: 10,
      },
    }
  );

  return res.data;
};
