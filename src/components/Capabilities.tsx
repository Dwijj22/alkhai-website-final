'use client';

import AnimatedSection from '@/components/AnimatedSection';

const PANELS = [
  {
    icon: 'fa-solid fa-diagram-project',
    title: 'Event-based Discovery',
    body: 'Turn event logs into as-is process flows—variants, rework loops, wait states, and handoff paths.',
  },
  {
    icon: 'fa-solid fa-bullseye',
    title: 'Constraint Ranking',
    body: 'Rank bottlenecks by throughput impact, time/cost leakage, and customer wait time.',
  },
  {
    icon: 'fa-solid fa-robot',
    title: 'Targeted Automation',
    body: 'Apply automation only where it removes the verified constraint — approvals, routing, handoffs, reconciliations — not everywhere.',
  },
] as const;

const METRICS = [
  { value: '22–40%', label: 'work items stuck in loops' },
  { value: '1.5–4 days', label: 'lost to approval & wait states' },
  { value: '15–30%', label: 'missed deadlines driven by bottlenecks' },
  { value: '30–45 days', label: 'to executive bottleneck readout' },
] as const;

export default function Capabilities() {
  return (
    <section id="capabilities" className="video-section reveal">

      <div className="container">
        <AnimatedSection delay={0}>
          <div className="section-head">
            <div>
              <div className="eyebrow">
                <span className="dot" />
                Capabilities
              </div>
              <h2>Built around constraints.</h2>
            </div>
            <div>
              <p className="fine" style={{ maxWidth: '48ch' }}>
                We analyze operations from intake through handoffs — how work actually moves across teams and systems —
                then isolate the few constraints that drain throughput, inflate cost, and extend customer wait time.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid-3">
          {PANELS.map((panel, i) => (
            <AnimatedSection key={panel.title} delay={0.08 + i * 0.08} className="panel">
              <div className="title">
                <span className="icon">
                  <i className={panel.icon} aria-hidden />
                </span>
                <b>{panel.title}</b>
              </div>
              <p>{panel.body}</p>
            </AnimatedSection>
          ))}
        </div>

        <div className="metrics" aria-label="Typical outcomes">
          {METRICS.map((m, i) => (
            <AnimatedSection key={m.label} delay={0.2 + i * 0.06} className="metric">
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
