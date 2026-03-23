'use client';

import AnimatedSection from '@/components/AnimatedSection';

export default function Founder() {
  return (
    <section id="founder" className="section-soft reveal">
      <div className="container">
        <AnimatedSection>
          <div className="section-head">
            <div>
              <div className="eyebrow">
                <span className="dot" />
                Why Data-Driven
              </div>
              <h2>Built to answer the question operators ask every day.</h2>
            </div>
            <p className="fine" style={{ maxWidth: '62ch' }}>
              Where exactly are we losing time — and what should we fix first?
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="panel">
            <p>
              ALKHAI was built to deliver constraint-first diagnostics using real event data — not
              frameworks, not assumptions. We focus on pinpointing the few fixes that actually move
              throughput.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
