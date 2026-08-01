import React from 'react';
import Head from 'next/head';
import SidebarProfile from '../components/features/SidebarProfile';
import BentoProjects from '../components/features/BentoProjects';
import ImpactExperience from '../components/features/ImpactExperience';
import EducationCertifications from '../components/features/EducationCertifications';
import PublicationsActivities from '../components/features/PublicationsActivities';
import Footer from '../components/ui/Footer';
import { PROFILE } from '../data/resumeData';

export default function Home() {
  return (
    <>
      <Head>
        <title>{PROFILE.name} · {PROFILE.title}</title>
        <meta name="description" content={PROFILE.bio} />
        <meta name="viewport" content="width=device-width, initial-scale=1.5, maximum-scale=5.0" />
        <link rel="preconnect" href="https://raw.githubusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
        <link rel="icon" href="/profile-favicon.png" type="image/png" />
      </Head>

      <div className="min-h-screen bg-(--color-canvas-bg) text-(--color-text-primary) selection:bg-(--color-accent-indigo)/30 selection:text-(--color-text-primary)">
        {/* Main Content Layout */}
        <main className="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
          <SidebarProfile />

          <div className="flex-1 flex flex-col gap-10 min-w-0">
            <ImpactExperience />
            <BentoProjects />
            <EducationCertifications />
            <PublicationsActivities />
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}
