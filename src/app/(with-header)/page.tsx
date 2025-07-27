import BannerSection from '@/app/(with-header)/components/BannerSection';
import PopularExperiences from '@/app/(with-header)/components/PopularExperiences';
import ExperienceList from './components/ExperienceList';

export default function HomePage() {
  return (
    <main>
      <BannerSection />
      <PopularExperiences />
      <ExperienceList />
    </main>
  );
}