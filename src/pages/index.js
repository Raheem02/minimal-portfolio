import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
  const { basePath } = useRouter();
  const base = basePath || '';

  return (
    <>
      <Head>
        <title>{`${PROFILE.name} · ${PROFILE.title}`}</title>
        <meta name="description" content={PROFILE.metaDescription} />
        <meta name="author" content={PROFILE.name} />
        <meta name="keywords" content="Abdul Raheem, Backend Engineer, Java, Spring Boot, Microservices, REST APIs, Python, FastAPI, Azure SQL, Azure Cosmos DB, Distributed Systems, Bengaluru, India" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="theme-color" content="#17181c" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="canonical" href="https://raheem.page/" />
        <link rel="alternate" type="text/plain" href={`${base}/llms.txt`} title="LLM Machine-Readable Summary" />
        <link rel="alternate" type="text/markdown" href={`${base}/resume.md`} title="Machine-Readable Resume" />
        <meta name="indexnow-key" content="5f4b8e21a09c4d3e8f1b6a7c9d0e2f4a" />
        
        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://raheem.page/" />
        <meta property="og:site_name" content={`${PROFILE.name} Portfolio`} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={`${PROFILE.name} · ${PROFILE.title}`} />
        <meta property="og:description" content={PROFILE.metaDescription} />
        <meta property="og:image" content="https://raheem.page/og-image.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Abdul Raheem - Backend Engineer Portfolio" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://raheem.page/" />
        <meta name="twitter:title" content={`${PROFILE.name} · ${PROFILE.title}`} />
        <meta name="twitter:description" content={PROFILE.metaDescription} />
        <meta name="twitter:image" content="https://raheem.page/og-image.webp" />
        <meta name="twitter:image:alt" content="Abdul Raheem - Backend Engineer Portfolio" />

        {/* Asset preconnects and LCP Preload */}
        <link rel="preconnect" href="https://raw.githubusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
        <link rel="preload" href={`${base}/profile-160.webp`} as="image" type="image/webp" fetchPriority="high" />
        <link rel="icon" href={`${base}/profile-favicon.webp`} type="image/webp" />
        <link rel="apple-touch-icon" href={`${base}/profile-favicon.webp`} />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': 'https://raheem.page/#person',
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
                  '@id': 'https://raheem.page/#webpage',
                  url: PROFILE.website,
                  name: `${PROFILE.name} · ${PROFILE.title}`,
                  description: PROFILE.bio,
                  mainEntity: { '@id': 'https://raheem.page/#person' },
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://raheem.page/#website',
                  url: PROFILE.website,
                  name: `${PROFILE.name} Portfolio`,
                  publisher: { '@id': 'https://raheem.page/#person' },
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
