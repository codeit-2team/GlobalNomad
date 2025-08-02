import { privateInstance } from './privateInstance';
import { MyActivitiesResponse } from '@/types/dashboardTypes';

/**
 * 내 체험 리스트 조회 (무한 스크롤용)
 * GET /my-activities
 */
export const getMyActivitiesWithPagination = async (params?: {
  cursorId?: number;
  size?: number;
}): Promise<MyActivitiesResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.cursorId)
    queryParams.append('cursorId', params.cursorId.toString());
  if (params?.size) queryParams.append('size', params.size.toString());

  const url = `/my-activities${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await privateInstance.get(url);
  return response.data;
};

/**
 * 내 체험 삭제
 * DELETE /deleteActivity/{id}
 */
export const deleteMyActivity = async (id: number): Promise<void> => {
  await privateInstance.delete(`/deleteActivity/${id}`);
};
