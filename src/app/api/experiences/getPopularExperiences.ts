import { instance } from '@/apis/instance';
import { Experience } from '@/types/experienceListTypes';

interface ResponseData {
  cursorId: number;
  totalCount: number;
  activities: Experience[];
}

const baseUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
const url = `${baseUrl}/activities`;

export const getPopularExperiences = async (): Promise<ResponseData> => {
  const res = await instance.get<ResponseData>(url, {
    params: {
      method: 'offset',
      sort: 'most_reviewed',
      size: 10,
    },
  });

  return res.data;
};
