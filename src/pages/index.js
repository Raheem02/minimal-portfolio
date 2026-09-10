import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SidebarProfile from '../components/features/SidebarProfile';
import NightyNightShader from '../components/features/NightyNightShader';
import BentoProjects from '../components/features/BentoProjects';
import ImpactExperience from '../components/features/ImpactExperience';
import EducationCertifications from '../components/features/EducationCertifications';
import PublicationsActivities from '../components/features/PublicationsActivities';
import Footer from '../components/ui/Footer';
import { PROFILE } from '../data/resumeData';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Home() {
  const { data } = usePortfolioData();
  const { basePath } = useRouter();
  const base = basePath || '';
  const profile = data?.profile || PROFILE;

  return (
    <>
      <Head>
        <title>{`${profile.name || PROFILE.name} · ${profile.title || PROFILE.title}`}</title>
        <meta name="description" content={profile.metaDescription || PROFILE.metaDescription} />
        <meta name="author" content={profile.name || PROFILE.name} />
        <meta name="keywords" content="Abdul Raheem, Software Engineer, Software Enginer, Software Engneer, Softwear Engineer, Softwere Engineer, Softwar Engineer, Softwer Enginer, Sftware Engineer, Softare Engineer, Software Engg, Software Engr, Software Developer, Software Development Engineer, SDE, SDE 1, SDE-1, SDE I, SWE, Backend Software Engineer, Backend Developer, Java Software Engineer, Java Developer, Java Backend Engineer, Python Developer, Python Backend Developer, Java, Spring Boot, Microservices, REST APIs, Python, FastAPI, Azure Cosmos DB, PostgreSQL, Redis, Rate Limiting, Caching, Docker, Distributed Systems, TCP/IP Sockets, Bengaluru, Bangalore, UVCE, Atria, Insuremile, Ignite3i" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="theme-color" content="#17181c" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="canonical" href="https://raheem.page/" />
        <link rel="alternate" type="text/plain" href={`${base}/llms.txt`} title="LLM Machine-Readable Summary" />
        <link rel="alternate" type="text/markdown" href={`${base}/resume.md`} title="Machine-Readable Resume" />
        <meta name="indexnow-key" content="5f4b8e21a09c4d3e8f1b6a7c9d0e2f4a" />
        <meta name="msvalidate.01" content="C0B719F693E4D9FFE05ED9756C6D9366" />
        
        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://raheem.page/" />
        <meta property="og:site_name" content={`${profile.name || PROFILE.name} Portfolio`} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={`${profile.name || PROFILE.name} · ${profile.title || PROFILE.title}`} />
        <meta property="og:description" content={profile.metaDescription || PROFILE.metaDescription} />
        <meta property="og:image" content="https://raheem.page/og-image.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Abdul Raheem - Software Engineer Portfolio" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://raheem.page/" />
        <meta name="twitter:title" content={`${profile.name || PROFILE.name} · ${profile.title || PROFILE.title}`} />
        <meta name="twitter:description" content={profile.metaDescription || PROFILE.metaDescription} />
        <meta name="twitter:image" content="https://raheem.page/og-image.webp" />
        <meta name="twitter:image:alt" content="Abdul Raheem - Software Engineer Portfolio" />

        {/* Asset preconnects and LCP Preload */}
        <link rel="preconnect" href="https://raw.githubusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
        <link rel="preload" href={`${base}/profile-160.webp`} as="image" type="image/webp" fetchPriority="high" />
        <link rel="icon" href={`${base}/favicon.ico`} sizes="any" />
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
                  disambiguatingDescription: 'Software Engineer in Bengaluru with 2 years of backend experience in Java, Spring Boot, Python, Azure Cosmos DB, PostgreSQL, and Redis. Profile resolves queries for Software Engineer, Software Enginer, Softwear Engineer, SDE, and SWE.',
                  alternateName: [
                    'Abdul Raheem',
                    'Abdul Raheem SWE',
                    'Abdul Raheem SDE',
                    'Abdul Raheem Software Engineer',
                    'Abdul Raheem Software Enginer',
                    'Abdul Raheem Softwear Engineer',
                    'Abdul Raheem Software Engneer',
                    'Abdul Raheem Softwere Engineer',
                    'Abdul Raheem Softwar Engineer',
                    'Abdul Raheem Backend Engineer',
                    'Software Engineer',
                    'Software Enginer',
                    'Softwear Engineer',
                    'Software Engneer',
                    'Softwere Engineer',
                    'Software Development Engineer',
                    'SDE',
                    'SWE',
                    'Software Engineer Bengaluru',
                    'Software Enginer Bengaluru',
                    'Softwear Engineer Bengaluru',
                    'Software Engineer Bangalore',
                    'Software Enginer Bangalore',
                    'Abdul Raheem Bengaluru',
                    'Abdul Raheem Bangalore',
                    'Abdul Raheem UVCE',
                    'Abdul Raheem Atria',
                    'Abdul Raheem Insuremile',
                    'Abdul Raheem Ignite3i',
                  ],
                  hasOccupation: {
                    '@type': 'Occupation',
                    name: 'Software Engineer',
                    alternateName: [
                      'Software Developer',
                      'Software Development Engineer',
                      'SDE',
                      'SDE 1',
                      'SWE',
                      'Backend Software Engineer',
                      'Backend Developer',
                      'Java Backend Engineer',
                      'Java Developer',
                      'Software Enginer',
                      'Softwear Engineer',
                      'Software Engneer',
                    ],
                    occupationalCategory: '15-1252.00',
                    skills: 'Java, Spring Boot, Microservices, Distributed Systems, Azure Cosmos DB, PostgreSQL, Redis, REST APIs, Python, FastAPI, Docker, TCP/IP Sockets, Rate Limiting, Caching, Connection Pooling',
                  },
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
                    'Distributed Systems',
                    'Microservices',
                    'REST APIs',
                    'Azure Cosmos DB',
                    'PostgreSQL',
                    'Redis',
                    'Rate Limiting',
                    'Caching',
                    'Connection Pooling',
                    'Python',
                    'FastAPI',
                    'Docker',
                    'TCP/IP Sockets',
                    'Database Optimization',
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
        <main
          className="nighty-night-content max-w-6xl mx-auto px-4 py-8 sm:py-12 flex flex-col lg:flex-row gap-8 lg:gap-10 items-start"
        >
          <SidebarProfile profile={data?.profile} coreSkills={data?.coreSkills} />

          <div className="flex-1 flex flex-col gap-10 min-w-0">
            <ImpactExperience experiences={data?.workExperiences} />
            <BentoProjects projects={data?.projects} />
            <EducationCertifications education={data?.education} certifications={data?.certifications} />
            <PublicationsActivities items={data?.publicationsAndActivities} />
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}
