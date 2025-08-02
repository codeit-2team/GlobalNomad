'use client';

import { useSearchParams } from 'next/navigation';
import BannerSection from '@/app/(with-header)/components/BannerSection';
import PopularExperiences from '@/app/(with-header)/components/PopularExperiences';
import ExperienceList from '@/app/(with-header)/components/ExperienceList';

export default function BasePage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q') ?? '';
  const isSearchMode = Boolean(keyword.trim());

  return (
    <main>
      <BannerSection keyword={keyword} />
      {isSearchMode ? (
        <ExperienceList keyword={keyword} isSearchMode />
      ) : (
        <>
          <PopularExperiences />
          <ExperienceList />
        </>
      )}
    </main>
  );
}
