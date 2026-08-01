import React from 'react';
import { PROFILE } from '../../data/resumeData';

export const Footer = () => {
  return (
    <footer className="border-t border-(--color-border-subtle) py-8 mt-12">
      <div className="flex items-center justify-center text-xs text-(--color-text-muted) font-mono">
        <p>© {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location}</p>
      </div>
    </footer>
  );
};

export default Footer;
