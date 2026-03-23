'use client';

import AnimatedSection from '@/components/AnimatedSection';

export default function Proof() {
  return (
    <section id="proof" className="section-soft reveal">
      <div className="container">
        <AnimatedSection>
          <div className="section-head">
            <div>
              <div className="eyebrow">
                <span className="dot" />
                Proof
              </div>
              <h2>Why ALKHAI before large transformation programs.</h2>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="grid-3">
            <div className="panel">
              <b>Event-data driven</b>
              <p className="fine">
                All findings are derived from timestamps, variants, and real execution data - not
                interviews.
              </p>
            </div>
            <div className="panel">
              <b>Security-first engagement</b>
              <p className="fine">
                Least-privilege access, NDA-ready, no data extraction outside your environment.
              </p>
            </div>
            <div className="panel">
              <b>Operationally aligned</b>
              <p className="fine">
                Outputs map to owners, controls, and targets so fixes can be executed quickly.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
