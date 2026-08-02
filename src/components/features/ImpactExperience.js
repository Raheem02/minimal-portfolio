import React from 'react';
import { WORK_EXPERIENCES } from '../../data/resumeData';

export const ImpactExperience = () => {
  return (
    <section id="experience" className="flex flex-col gap-4" aria-labelledby="experience-heading">
      <div className="border-b border-(--color-border-subtle) pb-3">
        <h2 id="experience-heading" className="text-base font-bold text-(--color-text-primary) tracking-tight">
          Work Experience
        </h2>
      </div>

      <div className="flex flex-col divide-y divide-(--color-border-subtle)">
        {WORK_EXPERIENCES.map((exp) => (
          <div
            key={exp.id || exp.company}
            className="py-6 first:pt-2 last:pb-2 flex flex-col gap-3 cv-auto"
          >
            {/* Header section with Company, Role and Period */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-(--color-text-primary) tracking-tight">
                  {exp.company}
                </h3>
                <p className="text-xs font-mono text-(--color-text-muted) tracking-tight mt-0.5">
                  {exp.role}
                </p>
              </div>
              <span className="text-[11px] font-mono text-(--color-text-muted) tabular-nums sm:mt-1 shrink-0">
                {exp.period}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-(--color-text-secondary) prose-body w-full max-w-none">
              {exp.description}
            </p>

            {/* Tech Stack Details */}
            {exp.stack && (
              <div className="pt-2 flex flex-wrap gap-1.5">
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-(--color-surface-subtle) border border-(--color-border-subtle) text-(--color-text-secondary) cursor-default select-none"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactExperience;
