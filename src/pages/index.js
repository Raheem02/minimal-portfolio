import React from 'react';
import Head from 'next/head';
import { motion, useReducedMotion } from 'framer-motion';
import SidebarProfile from '../components/features/SidebarProfile';
import BentoProjects from '../components/features/BentoProjects';
import ImpactExperience from '../components/features/ImpactExperience';
import EducationCertifications from '../components/features/EducationCertifications';
import PublicationsActivities from '../components/features/PublicationsActivities';
import Footer from '../components/ui/Footer';
import { PROFILE } from '../data/resumeData';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <Head>
        <title>{`${PROFILE.name} · ${PROFILE.title}`}</title>
        <meta name="description" content={PROFILE.bio} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://raw.githubusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
        <link rel="icon" href="/profile-favicon.png" type="image/png" />
      </Head>

      <div className="nighty-night-shell min-h-screen text-(--color-text-primary) selection:bg-(--color-accent-indigo)/30 selection:text-(--color-text-primary)">
        {/* Main Content Layout */}
        <motion.main
          variants={prefersReducedMotion ? undefined : pageVariants}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate={prefersReducedMotion ? false : 'visible'}
          className="nighty-night-content max-w-6xl mx-auto px-4 py-8 sm:py-12 flex flex-col lg:flex-row gap-8 lg:gap-10 items-start"
        >
          <SidebarProfile />

          <div className="flex-1 flex flex-col gap-10 min-w-0">
            <ImpactExperience />
            <BentoProjects />
            <EducationCertifications />
            <PublicationsActivities />
            <Footer />
          </div>
        </motion.main>
      </div>
    </>
  );
}
