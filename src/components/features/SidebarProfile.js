import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PROFILE, CORE_SKILLS } from '../../data/resumeData';
import SocialIcons from '../ui/SocialIcons';

export const SidebarProfile = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full lg:w-80 xl:w-96 shrink-0 self-start lg:sticky lg:top-8"
    >
      <div className="minimal-card p-6 flex flex-col gap-6">
        {/* Profile Info Header */}
        <div className="flex items-start gap-3.5 border-b border-(--color-border-subtle) pb-5">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-(--color-border-subtle) mt-0.5">
            <Image
              src="/profile-160.png"
              alt={PROFILE.name}
              width={48}
              height={48}
              priority
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-bold text-(--color-text-primary) tracking-tight leading-tight">
              {PROFILE.name}
            </h1>
            <p className="text-xs font-mono text-(--color-text-secondary)">
              {PROFILE.title}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-(--color-accent-green) font-medium pt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-green) animate-pulse" />
              <span>{PROFILE.status}</span>
            </div>
          </div>
        </div>

        {/* Bio Group */}
        <div className="flex flex-col gap-3">
          <p className="text-sm text-(--color-text-secondary) prose-body max-w-prose">
            {PROFILE.bio}
          </p>
        </div>

        {/* Skills Tag Cloud */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-mono text-(--color-text-muted) uppercase tracking-wider">
            Core Stack
          </span>
          <div className="flex flex-wrap gap-1.5">
            {CORE_SKILLS.map((skill) => (
              <span
                key={skill}
                className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-(--color-surface-subtle) border border-(--color-border-subtle) text-(--color-text-secondary) hover:border-(--color-card-border-hover) hover:text-(--color-text-primary) transition-colors cursor-default select-none"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Download Resume Action Button */}
        <div>
          <a
            href="https://github.com/raheem022/Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group w-full min-h-[44px] px-4 rounded-lg bg-(--color-surface-subtle) hover:bg-(--color-surface-subtle-hover) active:scale-[0.97] border border-(--color-border-subtle) hover:border-(--color-card-border-hover) text-(--color-text-primary) text-xs font-medium flex items-center justify-center overflow-hidden transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-(--color-accent-indigo) focus-visible:outline-offset-2 select-none"
          >
            {/* Ambient Shimmer Sweep Light */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-(--color-accent-indigo)/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            <span className="relative z-10 font-medium">
              Download Resume
            </span>
          </a>
        </div>

        {/* Social Links */}
        <div className="pt-3 border-t border-(--color-border-subtle) flex justify-center">
          <SocialIcons />
        </div>
      </div>
    </motion.aside>
  );
};

export default SidebarProfile;
