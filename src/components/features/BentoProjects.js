import React from 'react';
import { PROJECTS } from '../../data/resumeData';

export const BentoProjects = () => {
  return (
    <section id="projects" className="flex flex-col gap-5" aria-labelledby="projects-heading">
      <div className="border-b border-(--color-border-subtle) pb-3">
        <h2 id="projects-heading" className="text-base font-bold text-(--color-text-primary) tracking-tight">
          Featured Engineering Projects
        </h2>
      </div>

      {/* Horizontal Side-by-Side Projects Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {PROJECTS.map((project) => (
          <div
            key={project.id || project.title}
            className="minimal-card p-5 flex flex-col justify-between gap-4 h-full cv-auto"
          >
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-(--color-text-primary) tracking-tight">
                    {project.title}
                  </h3>
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-(--color-text-muted) hover:text-(--color-accent-blue) transition-colors flex items-center gap-1 text-xs font-mono"
                      title="View GitHub Repository"
                      aria-label={`View GitHub repository for ${project.title}`}
                    >
                      <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      <span className="text-[11px] font-mono">Code</span>
                    </a>
                  )}
                </div>
                <span className="text-[11px] font-mono text-(--color-text-muted) tabular-nums shrink-0">
                  {project.period}
                </span>
              </div>

              <p className="text-sm text-(--color-text-secondary) prose-body">
                {project.description}
              </p>
            </div>

            {project.stack && (
              <div className="pt-3 border-t border-(--color-border-subtle) flex flex-wrap gap-1.5 mt-auto">
                {project.stack.map((tech) => (
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

export default BentoProjects;
