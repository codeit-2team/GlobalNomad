'use client';

import ExperienceCard from '@/app/(with-header)/components/ExperienceCard';

export default function PopularExperiences() {
  return (
    <section className="px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">🔥 인기 체험</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </div>
    </section>
  );
}
