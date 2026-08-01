import React from 'react';
import { EDUCATION, CERTIFICATIONS } from '../../data/resumeData';

export const EducationCertifications = () => {
  return (
    <section className="flex flex-col gap-6" aria-labelledby="education-heading">
      <div className="border-b border-(--color-border-subtle) pb-3">
        <h2 id="education-heading" className="text-base font-bold text-(--color-text-primary) tracking-tight">
          Education & Certifications
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Education Column */}
        <div className="minimal-card p-5 flex flex-col divide-y divide-(--color-border-subtle) h-full justify-center">
          {EDUCATION.map((edu) => (
            <div key={edu.id || edu.degree} className="py-3 first:pt-0 last:pb-0 flex flex-col gap-1 cv-auto">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-(--color-text-primary) tracking-tight">{edu.degree}</h3>
                <span className="text-[11px] font-mono text-(--color-text-muted) tabular-nums shrink-0">{edu.period}</span>
              </div>
              <div className="flex items-center justify-between gap-2 text-xs text-(--color-text-secondary)">
                <span className="leading-snug">{edu.institution}</span>
                <span className="text-[11px] font-mono text-(--color-accent-green) tabular-nums shrink-0 ml-2">{edu.cgpa}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Column */}
        <div className="minimal-card p-5 flex flex-col divide-y divide-(--color-border-subtle) h-full justify-center">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.title} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 cv-auto">
              <h3 className="text-xs sm:text-sm font-semibold text-(--color-text-primary) truncate">
                {cert.title}
              </h3>
              <div className="flex items-center gap-2 shrink-0 text-[11px] font-mono text-(--color-text-muted) tabular-nums">
                <span className="text-(--color-text-secondary)">{cert.issuer}</span>
                <span className="text-(--color-text-muted)/50">·</span>
                <span>{cert.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationCertifications;
