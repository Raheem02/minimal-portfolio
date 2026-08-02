import React from 'react';
import { PROFILE } from '../../data/resumeData';

export const Footer = () => {
  return (
    <footer className="border-t border-(--color-border-subtle) py-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-(--color-text-muted) font-mono">
      <p>© {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location}</p>
      <nav aria-label="Footer Links" className="flex items-center gap-4">
        <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-(--color-text-primary) transition-colors">
          LinkedIn Profile
        </a>
        <a href={PROFILE.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-(--color-text-primary) transition-colors">
          GitHub Profile
        </a>
        <a href={`mailto:${PROFILE.email}`} className="hover:text-(--color-text-primary) transition-colors">
          Direct Email
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
