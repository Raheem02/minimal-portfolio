import React from 'react';
import { PROJECTS } from '../../data/resumeData';

export const BentoProjects = () => {
  return (
    <section className="flex flex-col gap-5" aria-labelledby="projects-heading">
      <div className="border-y border-(--color-border-subtle) py-3">
        <h2 id="projects-heading" className="text-base font-semibold text-(--color-text-primary) tracking-tight">
          Featured Engineering Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROJECTS.map((project) => (
          <div
            key={project.id || project.title}
            className="minimal-card p-5 flex flex-col justify-between gap-4 h-full cv-auto"
          >
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-(--color-text-primary) tracking-tight">
                  {project.title}
                </h3>
                <span className="text-[11px] font-mono text-(--color-text-muted) shrink-0">
                  {project.period}
                </span>
              </div>

              <p className="text-sm lg:text-base text-(--color-text-secondary) prose-body">
                {project.description}
              </p>
            </div>

            {project.stack && (
              <div className="pt-3 border-t border-(--color-border-subtle) flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-(--color-surface-subtle) border border-(--color-border-subtle) text-(--color-text-secondary) hover:border-(--color-card-border-hover) hover:text-(--color-text-primary) transition-colors cursor-default select-none"
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

export default BentoProjects;
