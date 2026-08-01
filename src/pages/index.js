import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import SidebarProfile from '../components/features/SidebarProfile';
import BentoProjects from '../components/features/BentoProjects';
import ImpactExperience from '../components/features/ImpactExperience';
import EducationCertifications from '../components/features/EducationCertifications';
import PublicationsActivities from '../components/features/PublicationsActivities';
import Footer from '../components/ui/Footer';
import { PROFILE } from '../data/resumeData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>{`${PROFILE.name} · ${PROFILE.title}`}</title>
        <meta name="description" content={PROFILE.bio} />
        <meta name="viewport" content="width=device-width, initial-scale=1.5, maximum-scale=5.0" />
        <link rel="preconnect" href="https://raw.githubusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
        <link rel="icon" href="/profile-favicon.png" type="image/png" />
      </Head>

      <div className="relative min-h-screen bg-(--color-canvas-bg) text-(--color-text-primary) selection:bg-(--color-accent-indigo)/30 selection:text-(--color-text-primary)">
        {/* Subtle Localized Top Accent Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-radial from-(--color-accent-indigo)/15 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

        {/* Main Content Layout */}
        <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12 flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          <SidebarProfile />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 flex flex-col gap-10 min-w-0"
          >
            <motion.div variants={sectionVariants}>
              <ImpactExperience />
            </motion.div>

            <motion.div variants={sectionVariants}>
              <BentoProjects />
            </motion.div>

            <motion.div variants={sectionVariants}>
              <EducationCertifications />
            </motion.div>

            <motion.div variants={sectionVariants}>
              <PublicationsActivities />
            </motion.div>

            <motion.div variants={sectionVariants}>
              <Footer />
            </motion.div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
