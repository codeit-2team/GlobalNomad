import { instance } from '@/apis/instance';
import { Experience } from '@/types/experienceListTypes';

interface ResponseData {
  cursorId: number;
  totalCount: number;
  activities: Experience[];
}

const teamId = process.env.NEXT_PUBLIC_TEAM_ID;
const url = `/${teamId}/activities`;

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
