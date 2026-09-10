import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PROFILE, CORE_SKILLS } from '../../data/resumeData';
import SocialIcons from '../ui/SocialIcons';
import { supabase } from '../../lib/supabaseClient';
import { maskPhoneInPdfDataUrl } from '../../lib/pdfMasker';

export const SidebarProfile = ({ profile: propProfile, coreSkills: propSkills }) => {
  const profile = propProfile || PROFILE;
  const coreSkills = propSkills || CORE_SKILLS;
  const router = useRouter();
  const base = router?.basePath || '';
  const profileSrc = `${base}/profile-160.webp`;

  const [pdfResume, setPdfResume] = useState({
    url: `${base}/resume.pdf`,
    fileName: 'Abdul_Raheem_Resume.pdf',
  });

  useEffect(() => {
    async function fetchPdfResume() {
      try {
        // 1. Primary lookup: portfolio_content table
        const { data, error } = await supabase
          .from('portfolio_content')
          .select('data')
          .eq('section_key', 'pdf_resume')
          .maybeSingle();

        if (!error && data?.data?.url) {
          let safeUrl = data.data.url;
          try { safeUrl = await maskPhoneInPdfDataUrl(safeUrl); } catch {}
          setPdfResume({
            url: safeUrl,
            fileName: data.data.fileName || 'Abdul_Raheem_Resume.pdf',
          });
          return;
        }

        // 2. Fallback: dedicated resume_history table
        try {
          const { data: historyRow } = await supabase
            .from('resume_history')
            .select('*')
            .eq('is_active', true)
            .maybeSingle();

          if (historyRow?.url) {
            let safeUrl = historyRow.url;
            try { safeUrl = await maskPhoneInPdfDataUrl(safeUrl); } catch {}
            setPdfResume({
              url: safeUrl,
              fileName: historyRow.file_name || 'Abdul_Raheem_Resume.pdf',
            });
          }
        } catch (tableErr) {}
      } catch (err) {}
    }
    fetchPdfResume();
  }, []);

  const triggerFileDownload = async () => {
    if (typeof window === 'undefined') return;

    let targetUrl = pdfResume.url || `${base}/resume.pdf`;

    // Dynamically mask phone numbers on the fly right before download
    try {
      targetUrl = await maskPhoneInPdfDataUrl(targetUrl);
    } catch (_) {}

    if (targetUrl && targetUrl.startsWith('data:application/pdf')) {
      try {
        const base64Data = targetUrl.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = pdfResume.fileName || 'Abdul_Raheem_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        return;
      } catch (err) {}
    }

    const link = document.createElement('a');
    link.href = targetUrl;
    link.download = pdfResume.fileName || 'Abdul_Raheem_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const logDownloadAnalytics = async (locationData = {}) => {
    try {
      const payload = {
        id: `dl-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        timestamp: new Date().toISOString(),
        user_agent: typeof window !== 'undefined' && navigator ? navigator.userAgent : 'Unknown Browser',
        file_name: pdfResume.fileName || 'Abdul_Raheem_Resume.pdf',
        latitude: locationData.latitude || null,
        longitude: locationData.longitude || null,
        city: locationData.city || 'Unknown City',
        country: locationData.country || 'Unknown Country',
        ip: locationData.ip || 'Client IP',
        permission: locationData.permission || 'granted',
      };

      try {
        const { data: existing } = await supabase
          .from('portfolio_content')
          .select('data')
          .eq('section_key', 'resume_downloads')
          .maybeSingle();

        const logsList = existing?.data?.logs || [];
        await supabase.from('portfolio_content').upsert(
          {
            section_key: 'resume_downloads',
            data: { logs: [payload, ...logsList] },
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'section_key' }
        );
      } catch (e) {}

      try {
        await supabase.from('resume_downloads').insert([payload]);
      } catch (tableErr) {}
    } catch (err) {}
  };

  const handleDownloadResume = async (e) => {
    e.preventDefault();

    // Trigger instant PDF download: zero delay, no popups
    await triggerFileDownload();

    if (typeof window === 'undefined') return;

    try {
      let permissionState = 'unknown';
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const perm = await navigator.permissions.query({ name: 'geolocation' });
          permissionState = perm.state;
        } catch (_) {
          permissionState = 'unsupported';
        }
      }

      if (permissionState === 'granted' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            let city = 'Unknown City';
            let country = 'Unknown Country';
            try {
              const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
              if (res.ok) {
                const geo = await res.json();
                city = geo.city || geo.locality || 'Unknown City';
                country = geo.countryName || 'Unknown Country';
              }
            } catch (_) {}
            logDownloadAnalytics({ latitude, longitude, city, country, permission: 'granted' });
          },
          () => {
            collectIpLocation();
          },
          { timeout: 3000 }
        );
      } else {
        collectIpLocation();
      }
    } catch (_) {
      logDownloadAnalytics({ permission: 'not_supported' });
    }
  };

  const collectIpLocation = async () => {
    let city = 'Unknown City';
    let country = 'Unknown Country';
    let ip = '';
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        const ipData = await res.json();
        city = ipData.city || 'Unknown City';
        country = ipData.country_name || 'Unknown Country';
        ip = ipData.ip || '';
      }
    } catch (_) {}
    logDownloadAnalytics({ city, country, ip, permission: 'ip_only' });
  };

  return (
    <aside className="w-full lg:w-80 xl:w-96 shrink-0 self-start lg:sticky lg:top-8">
      <div className="minimal-card p-6 flex flex-col gap-6">
        {/* Profile Info Header */}
        <div className="flex items-start gap-3.5 border-b border-(--color-border-subtle) pb-5">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-(--color-border-subtle) mt-0.5">
            <Image
              src={profileSrc}
              alt={profile.name}
              width={48}
              height={48}
              priority
              decoding="async"
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <h1 className="text-base font-bold text-(--color-text-primary) tracking-tight leading-tight flex flex-col gap-0.5">
              <span>{profile.name}</span>
              <span className="text-xs font-mono font-normal text-(--color-text-secondary)">{profile.title}</span>
            </h1>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-(--color-accent-green) font-medium pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-green)" />
              <span>{profile.status}</span>
            </div>
          </div>
        </div>

        {/* Section Navigation Links */}
        <nav aria-label="Section Navigation" className="flex flex-wrap gap-2.5 text-xs font-mono text-(--color-text-muted) border-b border-(--color-border-subtle) pb-4">
          <a href="#experience" className="hover:text-(--color-text-primary) transition-colors">#experience</a>
          <a href="#projects" className="hover:text-(--color-text-primary) transition-colors">#projects</a>
          <a href="#education" className="hover:text-(--color-text-primary) transition-colors">#education</a>
        </nav>

        {/* Bio Group */}
        <div className="flex flex-col gap-3">
          <p className="text-sm text-(--color-text-secondary) prose-body w-full">
            {profile.bio}
          </p>
        </div>

        {/* Skills Tag Cloud */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-mono text-(--color-text-muted) uppercase tracking-wider">
            Core Stack
          </span>
          <div className="flex flex-wrap gap-1.5">
            {coreSkills.map((skill) => (
              <span
                key={skill}
                className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-(--color-surface-subtle) border border-(--color-border-subtle) text-(--color-text-secondary) hover:border-(--color-card-border-hover) hover:text-(--color-text-primary) transition-colors cursor-default select-none"
              >
                #{skill}
              </span>
            ))}
          </div>
        </div>

        {/* Resume Action Button */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleDownloadResume}
            className="w-full min-h-[44px] px-4 rounded-lg bg-(--color-accent-green)/10 hover:bg-(--color-accent-green)/20 border border-(--color-accent-green)/30 text-(--color-accent-green) text-xs font-mono font-semibold flex items-center justify-center transition-colors duration-150 select-none cursor-pointer"
          >
            <span>Download Resume</span>
          </button>
        </div>

        {/* Social Links */}
        <div className="pt-3 border-t border-(--color-border-subtle) flex justify-center">
          <SocialIcons />
        </div>
      </div>
    </aside>
  );
};

export default SidebarProfile;
