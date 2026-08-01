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
      transition={{ duration: 0.3 }}
      className="w-full lg:w-72 xl:w-80 shrink-0"
    >
      <div className="minimal-card p-5 flex flex-col gap-5 sticky top-16">
        {/* Profile Info Header */}
        <div className="flex items-center gap-3 border-b border-(--color-border-subtle) pb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-(--color-border-subtle)">
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
          <div className="flex flex-col">
            <h1 className="text-base font-bold text-(--color-text-primary) tracking-tight">
              {PROFILE.name}
            </h1>
            <p className="text-xs font-mono text-(--color-text-secondary)">
              {PROFILE.title}
            </p>
          </div>
        </div>

        {/* Bio Paragraph */}
        <p className="text-xs text-(--color-text-secondary) prose-body">
          {PROFILE.bio}
        </p>

        {/* Status Badge */}
        <div className="flex items-center gap-2 text-xs font-mono text-(--color-text-secondary)">
          <span className="w-2 h-2 rounded-full bg-(--color-accent-green) animate-pulse" />
          <span>{PROFILE.status}</span>
        </div>

        {/* Skills Tag Cloud */}
        <div className="flex flex-col gap-2 border-t border-(--color-border-subtle) pt-3">
          <span className="text-[11px] font-mono text-(--color-text-muted) uppercase tracking-wider">
            Core Stack
          </span>
          <div className="flex flex-wrap gap-1.5">
            {CORE_SKILLS.map((skill) => (
              <span
                key={skill}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-(--color-surface-subtle) border border-(--color-border-subtle) text-(--color-text-secondary) hover:border-(--color-card-border-hover) hover:text-(--color-text-primary) transition-colors cursor-default select-none"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Single Download Resume Button - Text Only */}
        <div className="border-t border-(--color-border-subtle) pt-3">
          <a
            href="https://raw.githubusercontent.com/raheem022/Portfolio/main/main.tex"
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

        {/* Interactive Social Icons */}
        <div className="pt-2 border-t border-(--color-border-subtle) flex justify-center">
          <SocialIcons />
        </div>
      </div>
    </motion.aside>
  );
};

export default SidebarProfile;
