'use client';

import AnimatedSection from './AnimatedSection';

const rows: { left: string; right: string }[] = [
  {
    left: 'Platform-first',
    right: 'Constraint-first ("what\'s stalling work?")',
  },
  {
    left: 'Broad scope, long timelines',
    right: 'Fixed-scope scan with clear start-here path',
  },
  {
    left: 'Heavy workshops & interviews',
    right: 'Event-log truth: timestamps, queues, variants, rework',
  },
  {
    left: 'Reports/dashboards that don’t change throughput',
    right: 'Ranked constraints + measurable time/cost model',
  },
  {
    left: '“Best practices” applied everywhere',
    right: 'Targeted fixes only where they remove the bottleneck',
  },
  {
    left: 'Value hard to attribute',
    right: 'ROI tied to specific queues, handoffs, and loop drivers',
  },
  {
    left: 'High disruption / organizational fatigue',
    right: 'Low-disruption: minimal access, fast diagnosis',
  },
];

export default function Differentiation() {
  return (
    <section id="differentiation" className="section-soft reveal">
      <div className="container">
        <AnimatedSection>
          <div className="section-head">
            <div>
              <div className="eyebrow">
                <span className="dot" />
                A different starting point
              </div>
              <h2>Alkhai vs traditional operations consulting programs</h2>
            </div>
            <div>
              <p className="fine">
                Large initiatives often start with tooling, templates, and broad transformation roadmaps. Alkhai
                starts with flow: what actually happens, where work waits, and which constraint limits
                throughput — then builds a narrow execution path around that signal.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <table>
            <thead>
              <tr>
                <th>Typical large ops program</th>
                <th>Alkhai</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.left}>
                  <td>
                    <span className="x" aria-label="Not this approach">
                      ✕
                    </span>{' '}
                    {row.left}
                  </td>
                  <td>
                    <span className="check" aria-label="Alkhai approach">
                      ✓
                    </span>{' '}
                    {row.right}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AnimatedSection>

        <AnimatedSection delay={0.14}>
          <div style={{ marginTop: 18, display: 'grid', gap: 10 }}>
            <p className="fine">
              <i className="fa-solid fa-layer-group" style={{ marginRight: 8, opacity: 0.85 }} aria-hidden />
              Tool-agnostic by design: we work with the systems you already run — no requirement to buy a new
              platform to get signal.
            </p>
            <p className="fine">
              <i className="fa-solid fa-user-tie" style={{ marginRight: 8, opacity: 0.85 }} aria-hidden />
              Practitioner-led: judgment and context on top of event evidence — not generic benchmarks divorced
              from your operating reality.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
