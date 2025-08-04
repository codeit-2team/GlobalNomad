import { instance } from '@/apis/instance';
import { Experience } from '@/types/experienceListTypes';

export interface ExperienceResponse {
  cursorId: number;
  totalCount: number;
  activities: Experience[];
}

const baseUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
const url = `${baseUrl}/activities`;

// 커서 기반 파라미터를 받도록 수정
export const getPopularExperiences = async (
  cursorId?: number,
): Promise<ExperienceResponse> => {
  const res = await instance.get<ExperienceResponse>(url, {
    params: {
      method: 'cursor',
      sort: 'most_reviewed',
      size: 10,
      cursorId, // null이면 첫 페이지로 처리됨
    },
  });

  return res.data;
};
