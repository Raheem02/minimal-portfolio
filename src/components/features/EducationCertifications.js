import React from 'react';
import { EDUCATION, CERTIFICATIONS } from '../../data/resumeData';

export const EducationCertifications = () => {
  return (
    <section className="flex flex-col gap-5" aria-labelledby="education-heading">
      <div className="border-y border-(--color-border-subtle) py-3">
        <h2 id="education-heading" className="text-base font-semibold text-(--color-text-primary) tracking-tight">
          Education & Certifications
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Education Column */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-(--color-text-muted)">
            Academic Background
          </h3>
          <div className="minimal-card p-5 flex flex-col divide-y divide-(--color-border-subtle) h-full">
            {EDUCATION.map((edu) => (
              <div key={edu.id || edu.degree} className="py-3.5 first:pt-0 last:pb-0 flex flex-col gap-1 cv-auto">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-(--color-text-primary) leading-snug">{edu.degree}</h4>
                  <span className="text-[11px] font-mono text-(--color-text-muted) shrink-0">{edu.period}</span>
                </div>
                <p className="text-xs text-(--color-text-secondary)">{edu.institution}</p>
                <span className="text-[11px] font-mono text-(--color-accent-green) mt-0.5">{edu.cgpa}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Column */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-(--color-text-muted)">
            Verified Credentials
          </h3>
          <div className="minimal-card p-5 flex flex-col divide-y divide-(--color-border-subtle) h-full">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.title} className="py-3.5 first:pt-0 last:pb-0 flex flex-col gap-1 cv-auto">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-(--color-text-primary) leading-snug">
                    {cert.title}
                  </h4>
                  <span className="text-[11px] font-mono text-(--color-text-muted) shrink-0">{cert.year}</span>
                </div>
                <p className="text-xs text-(--color-text-secondary) mt-0.5">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationCertifications;
