import React from 'react';
import { PUBLICATIONS_AND_ACTIVITIES } from '../../data/resumeData';

export const PublicationsActivities = () => {
  return (
    <section className="flex flex-col gap-5" aria-labelledby="activities-heading">
      <div className="border-y border-(--color-border-subtle) py-3">
        <h2 id="activities-heading" className="text-base font-semibold text-(--color-text-primary) tracking-tight">
          Research & Leadership Activities
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PUBLICATIONS_AND_ACTIVITIES.map((item) => (
          <div key={item.id || item.title} className="minimal-card p-5 flex flex-col gap-2 cv-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-(--color-text-primary)">{item.title}</h3>
              <span className="text-[11px] font-mono text-(--color-text-muted)">{item.period}</span>
            </div>
            <p className="text-xs text-(--color-text-secondary) prose-body">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PublicationsActivities;
