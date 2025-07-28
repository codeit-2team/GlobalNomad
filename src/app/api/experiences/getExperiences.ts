import { instance } from '@/apis/instance';
import { Experience } from '@/types/experienceListTypes';

interface Params {
  page: number;
  category?: string;
  sort?: string;
  keyword?: string;
}

interface ExperienceResponse {
  activities: Experience[];
  totalCount: number;
  cursorId: number;
}

const teamId = process.env.NEXT_PUBLIC_TEAM_ID;
const url = `/${teamId}/activities`;
const validSorts = ['price_asc', 'price_desc'];

export const getExperiences = async ({ page, category, sort, keyword }: Params) => {
  const res = await instance.get<ExperienceResponse>(url, {
    params: {
      method: 'offset',
      page,
      size: 8,
      ...(category && { category }),
      ...(sort && validSorts.includes(sort) && { sort }),
      ...(keyword && { keyword }),
    },
  });

  return {
    experiences: res.data.activities, // 이름 변환
    totalCount: res.data.totalCount,
  };
};
