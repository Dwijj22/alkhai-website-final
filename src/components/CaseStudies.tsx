'use client';

import AnimatedSection from '@/components/AnimatedSection';

const CASE_STUDY_POINTS = [
  {
    label: 'Client type',
    value: 'Mid-market workflows with event-data visibility across ticketing, CRM, finance, and approvals systems.',
  },
  {
    label: 'Problem',
    value: 'Leaders know throughput is being lost, but they cannot see which queue, handoff, or rework loop is actually limiting output.',
  },
  {
    label: 'What Alkhai finds',
    value: 'The exact wait state, owner handoff, or approval gate causing the system-wide slowdown, quantified with event timestamps and variant analysis.',
  },
  {
    label: 'What the team receives',
    value: 'An executive readout, ranked constraints, and a 30-60 day action plan linked to owners, controls, and measurable flow impact.',
  },
];

export default function CaseStudies() {
  return (
    <section id="results" className="section-soft" style={{ padding: '86px 0' }}>
      <div className="container">
        <AnimatedSection>
          <div className="section-head">
            <div>
              <div className="eyebrow">
                <span className="dot" />
                Results Structure
              </div>
              <h2>How Alkhai presents proof in a client-ready case study.</h2>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid-2">
          <AnimatedSection delay={0.08}>
            <div className="panel" style={{ height: '100%' }}>
              <div className="title">
                <span className="icon">
                  <i className="fa-solid fa-file-waveform" aria-hidden />
                </span>
                <b>Case study template</b>
              </div>
              <div className="case-study-list">
                {CASE_STUDY_POINTS.map((item) => (
                  <div key={item.label} className="case-study-item">
                    <span>{item.label}</span>
                    <p className="fine">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.14}>
            <div className="panel" style={{ height: '100%' }}>
              <div className="title">
                <span className="icon">
                  <i className="fa-solid fa-magnifying-glass-chart" aria-hidden />
                </span>
                <b>Evidence Alkhai leads with</b>
              </div>
              <div className="steps" style={{ marginTop: 4 }}>
                <div className="step step-rail">
                  <div className="step-number" aria-hidden>
                    01
                  </div>
                  <div>
                    <b>Specific process scope</b>
                    <p className="fine">Name the workflow, systems touched, and who owned it.</p>
                  </div>
                </div>
                <div className="step step-rail">
                  <div className="step-number" aria-hidden>
                    02
                  </div>
                  <div>
                    <b>Measured bottleneck</b>
                    <p className="fine">Show the queue, delay, or rework loop in operating terms.</p>
                  </div>
                </div>
                <div className="step step-rail">
                  <div className="step-number" aria-hidden>
                    03
                  </div>
                  <div>
                    <b>Attributed result</b>
                    <p className="fine">Publish before-and-after metrics only when they are verified.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
