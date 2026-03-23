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
              <h2>What an Alkhai diagnostic finding should make obvious.</h2>
            </div>
            <p className="fine" style={{ maxWidth: '56ch' }}>
              Proof comes from showing a specific queue, handoff, or rework loop with event-data
              evidence, then linking the fix to a measurable change in flow.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="grid-2">
            <div className="panel">
              <div className="title">
                <span className="icon">
                  <i className="fa-solid fa-filter-circle-dollar" aria-hidden />
                </span>
                <b>Diagnostic finding example</b>
              </div>
              <p className="fine">
                In a client-ready readout, Alkhai does not say &quot;operations are inefficient.&quot; It
                shows that a specific approval queue, owner reassignment loop, or missing handoff rule
                created the largest share of total cycle delay.
              </p>
            </div>
            <div className="panel">
              <div className="title">
                <span className="icon">
                  <i className="fa-solid fa-file-lines" aria-hidden />
                </span>
                <b>What the evidence includes</b>
              </div>
              <ul style={{ marginTop: 8, paddingLeft: '1.15rem' }}>
                <li>Timestamped wait-state evidence</li>
                <li>Variant and rework-path concentration</li>
                <li>Ranked throughput impact by constraint</li>
                <li>Owner-linked action path for the first 30-60 days</li>
              </ul>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
