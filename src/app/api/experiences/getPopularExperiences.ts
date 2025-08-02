import { instance } from '@/apis/instance';
import { Experience } from '@/types/experienceListTypes';

interface PopularExperiencesResponse {
  activities: Experience[];
}

const baseUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
const url = `${baseUrl}/activities`;

export const getPopularExperiences = async (): Promise<PopularExperiencesResponse> => {
  const res = await instance.get<PopularExperiencesResponse>(url, {
    params: {
      method: 'cursor',
      sort: 'most_reviewed',
      size: 12,
    },
  });

  return res.data;
};