import BannerSection from '@/app/(with-header)/components/BannerSection';
import PopularExperiences from '@/app/(with-header)/components/PopularExperiences';

export default function HomePage() {
  return (
    <main>
      <BannerSection />
      <PopularExperiences />
    </main>
  );
}