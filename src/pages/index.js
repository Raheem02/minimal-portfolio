import React from 'react';
import Head from 'next/head';
import { motion, useReducedMotion } from 'framer-motion';
import SidebarProfile from '../components/features/SidebarProfile';
import NightyNightShader from '../components/features/NightyNightShader';
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
        <link rel="canonical" href="https://abdulraheem.tech" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Machine-Readable Summary" />
        <link rel="alternate" type="text/markdown" href="/resume.md" title="Machine-Readable Resume" />
        <meta name="indexnow-key" content="5f4b8e21a09c4d3e8f1b6a7c9d0e2f4a" />
        
        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://abdulraheem.tech" />
        <meta property="og:title" content={`${PROFILE.name} · ${PROFILE.title}`} />
        <meta property="og:description" content={PROFILE.bio} />
        <meta property="og:image" content="https://abdulraheem.tech/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://abdulraheem.tech" />
        <meta name="twitter:title" content={`${PROFILE.name} · ${PROFILE.title}`} />
        <meta name="twitter:description" content={PROFILE.bio} />
        <meta name="twitter:image" content="https://abdulraheem.tech/og-image.png" />

        {/* Asset preconnects */}
        <link rel="preconnect" href="https://raw.githubusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
        <link rel="icon" href="/profile-favicon.png" type="image/png" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': 'https://abdulraheem.tech/#person',
                  name: PROFILE.name,
                  jobTitle: PROFILE.title,
                  worksFor: {
                    '@type': 'Organization',
                    name: 'Insuremile',
                  },
                  alumniOf: [
                    {
                      '@type': 'EducationalOrganization',
                      name: 'University of Visvesvaraya College of Engineering',
                      sameAs: 'https://uvce.ac.in/',
                    },
                    {
                      '@type': 'EducationalOrganization',
                      name: 'Atria Institute of Technology',
                      sameAs: 'https://atria.edu/',
                    },
                  ],
                  knowsAbout: [
                    'Java',
                    'Spring Boot',
                    'Microservices',
                    'REST APIs',
                    'Python',
                    'FastAPI',
                    'Azure SQL',
                    'Azure Cosmos DB',
                    'Distributed Systems',
                    'Phishing Detection',
                  ],
                  sameAs: [PROFILE.linkedin, PROFILE.social.github],
                  url: PROFILE.website,
                },
                {
                  '@type': 'ProfilePage',
                  '@id': 'https://abdulraheem.tech/#webpage',
                  url: PROFILE.website,
                  name: `${PROFILE.name} · ${PROFILE.title}`,
                  description: PROFILE.bio,
                  mainEntity: { '@id': 'https://abdulraheem.tech/#person' },
                },
              ],
            }),
          }}
        />
      </Head>

      <div className="nighty-night-shell min-h-screen text-(--color-text-primary) selection:bg-(--color-accent-indigo)/30 selection:text-(--color-text-primary)">
        <NightyNightShader />

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
