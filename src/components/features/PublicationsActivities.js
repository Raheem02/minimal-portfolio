import React from 'react';
import { PUBLICATIONS_AND_ACTIVITIES } from '../../data/resumeData';

export const PublicationsActivities = () => {
  return (
    <section className="flex flex-col gap-4" aria-labelledby="research-heading">
      <div className="border-b border-(--color-border-subtle) pb-3">
        <h2 id="research-heading" className="text-base font-bold text-(--color-text-primary) tracking-tight">
          Research & Leadership Activities
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {PUBLICATIONS_AND_ACTIVITIES.map((item) => (
          <div key={item.id || item.title} className="minimal-card p-5 flex flex-col gap-2 cv-auto">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-bold text-(--color-text-primary) tracking-tight">{item.title}</h3>
              <span className="text-[11px] font-mono text-(--color-text-muted) tabular-nums shrink-0">{item.period}</span>
            </div>
            <p className="text-sm text-(--color-text-secondary) prose-body">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PublicationsActivities;
