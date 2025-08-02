import { instance } from '@/apis/instance';
import { Experience } from '@/types/experienceListTypes';

interface Params {
  page: number;
  category?: string;
  sort?: string;
  keyword?: string;
}

// 서버 응답 원본 타입
interface ExperienceResponse {
  activities: Experience[];
  totalCount: number;
  cursorId: number;
}

// 프론트에서 사용할 최종 반환 타입 (useQuery의 제네릭으로도 사용됨)
export interface ExperienceListResult {
  experiences: Experience[];
  totalCount: number;
}

const baseUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
const url = `${baseUrl}/activities`;
const validSorts = ['price_asc', 'price_desc'];

export const getExperiences = async ({
  page,
  category,
  sort,
  keyword,
}: Params): Promise<ExperienceListResult> => {
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
    experiences: res.data.activities,
    totalCount: res.data.totalCount,
  };
};
