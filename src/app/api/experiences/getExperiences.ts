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

const baseUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
const url = `${baseUrl}/activities`;
const validSorts = ['price_asc', 'price_desc'];

export const getExperiences = async ({ page, category, sort, keyword }: Params) => {
  const isAllCategory = category === '전체';

  const res = await instance.get<ExperienceResponse>(url, {
    params: {
      method: 'offset',
      page,
      size: 8,
      ...(!isAllCategory && category && { category }), // 전체인 경우 카테고리 제외
      ...(sort && validSorts.includes(sort) && { sort }),
      ...(keyword && { keyword }),
    },
  });

  return {
    experiences: res.data.activities, // 이름 변환
    totalCount: res.data.totalCount,
  };
};
