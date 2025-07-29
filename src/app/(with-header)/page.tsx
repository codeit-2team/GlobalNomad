'use client';

import { useState } from 'react';
import BannerSection from '@/app/(with-header)/components/BannerSection';
import PopularExperiences from '@/app/(with-header)/components/PopularExperiences';
import ExperienceList from '@/app/(with-header)/components/ExperienceList';

export default function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <main>
      <BannerSection onSearch={setSearchKeyword} />

      {searchKeyword ? (
        <ExperienceList keyword={searchKeyword} isSearchMode />
      ) : (
        <>
          <PopularExperiences />
          <ExperienceList />
        </>
      )}
    </main>
  );
}
