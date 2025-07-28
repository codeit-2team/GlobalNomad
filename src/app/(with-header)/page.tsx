'use client';

import { useState } from 'react';
import BannerSection from '@/app/(with-header)/components/BannerSection';
import PopularExperiences from '@/app/(with-header)/components/PopularExperiences';
import ExperienceList from './components/ExperienceList';

export default function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <main>
      <BannerSection onSearch={setSearchKeyword} />
      <PopularExperiences />
      <ExperienceList />
    </main>
  );
}