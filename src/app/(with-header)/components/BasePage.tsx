'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

import BannerSection from '@/app/(with-header)/components/BannerSection';
import PopularExperiences from '@/app/(with-header)/components/PopularExperiences';
import ExperienceList from '@/app/(with-header)/components/ExperienceList';

export default function BasePage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q') ?? '';
  const isSearchMode = Boolean(keyword.trim());

  return (
    <main>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <BannerSection keyword={keyword} />
      </motion.div>

      {isSearchMode ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ExperienceList keyword={keyword} isSearchMode />
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PopularExperiences />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ExperienceList />
          </motion.div>
        </>
      )}
    </main>
  );
}
