import api from '@/lib/api/api'; // 공통 axios 인스턴스
import { Experience } from '@/types/experienceListTypes';

interface Params {
  page: number;
  category?: string;
  sort?: string;
  keyword?: string; // 검색어 추가
}

export const getExperiences = async ({ page, category, sort, keyword }: Params) => {
  const res = await api.get(`/teams/${process.env.NEXT_PUBLIC_TEAM_ID}/activities`, {
    params: {
      method: 'offset',
      page,
      size: 8,
      ...(category && { category: encodeURIComponent(category) }),
      ...(sort && { sort }),
      ...(keyword && { keyword }),
    },
  });

  return res.data as ExperienceResponse;
};

interface ExperienceResponse {
  experiences: Experience[];
  totalCount: number;
  cursorId: number;
}
