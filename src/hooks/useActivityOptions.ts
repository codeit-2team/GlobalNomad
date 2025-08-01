import { useMemo } from 'react';
import { MyActivitiesResponse } from '@/types/dashboardTypes';

export function useActivityOptions(activitiesData?: MyActivitiesResponse) {
  return useMemo(() => {
    if (!activitiesData) return { activityOptions: [], uniqueTitles: [] };

    const activityOptions = activitiesData.activities.map((activity) => {
      const duplicateCount = activitiesData.activities.filter(
        (a) => a.title === activity.title,
      ).length;

      const displayTitle =
        duplicateCount > 1
          ? `${activity.title} (${activity.id})`
          : activity.title;

      return {
        value: activity.id.toString(),
        label: displayTitle,
      };
    });

    const uniqueTitles = activityOptions.map((option) => option.label);

    return { activityOptions, uniqueTitles };
  }, [activitiesData]);
}
