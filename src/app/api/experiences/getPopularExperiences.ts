import { instance } from '@/apis/instance';
import { Experience } from '@/types/experienceListTypes';

interface Params {
  cursorId: number;
}

interface ResponseData {
  cursorId: number;
  totalCount: number;
  activities: Experience[];
}

const teamId = process.env.NEXT_PUBLIC_TEAM_ID;
const url = `/${teamId}/activities`;

export const getPopularExperiences = async () => {
  const res = await instance.get(url, {
    params: {
      method: 'offset',
      sort: 'most_reviewed',
      size: 10,
    },
  });

  return res.data;
};
