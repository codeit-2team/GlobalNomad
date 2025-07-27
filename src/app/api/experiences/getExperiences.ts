import api from '@/lib/api/api'; // 공통 axios 인스턴스
import { Experience } from '@/types/experienceListTypes';

interface Params {
  page: number;
  category?: string;
  sort?: string;
}

export const getExperiences = async ({ page, category, sort }: Params) => {
  const res = await api.get(`/teams/${process.env.NEXT_PUBLIC_TEAM_ID}/activities`, {
    params: {
      method: 'offset',
      page,
      size: 8,
      ...(category && { category: encodeURIComponent(category) }),
      ...(sort && { sort }),
    },
  });

  return res.data as ExperienceResponse;
};

interface ExperienceResponse {
  experiences: Experience[];
  totalCount: number;
  cursorId: number;
}
