'use client';

import AnimatedSection from './AnimatedSection';

export default function Platform() {
  return (
    <section id="platform" className="section-soft video-section reveal">

      <div className="container">
        <AnimatedSection>
          <div className="section-head">
            <div>
              <div className="eyebrow">
                <span className="dot" />
                Deliverables
              </div>
              <h2>Stop the &ldquo;Invisible Leaks&rdquo;</h2>
            </div>
            <div>
              <p className="fine">
                You get diagnostic outputs grounded in how work actually moves: variants, queues, rework loops,
                and handoff delays — not slide decks based on interviews alone.
              </p>
              <p className="fine">
                Your team receives ranked constraints, quantified leakage, and a practical path to remove what
                is stalling throughput first — before you spend on tools or headcount.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <div className="grid-2">
            <div className="panel">
              <div className="title">
                <span className="icon" aria-hidden>
                  <i className="fa-solid fa-route" />
                </span>
                <b>Process map + variants</b>
              </div>
              <p>
                End-to-end flow reconstructed from timestamps and events — including real-world branches, skips,
                and the paths that actually happen in production.
              </p>
              <div className="spark" style={{ height: 160, marginTop: 12 }} aria-hidden="true">
                <svg viewBox="0 0 700 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="g2" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="rgba(91,140,255,0.85)" />
                      <stop offset="1%" stopColor="rgba(255,176,32,0.90)" />
                    </linearGradient>
                  </defs>
                  <circle cx="90" cy="120" r="14" fill="rgba(61,220,151,0.95)" />
                  <circle cx="260" cy="90" r="14" fill="rgba(91,140,255,0.95)" />
                  <circle cx="260" cy="150" r="14" fill="rgba(91,140,255,0.70)" />
                  <circle cx="450" cy="120" r="14" fill="rgba(255,176,32,0.95)" />
                  <circle cx="620" cy="120" r="14" fill="rgba(61,220,151,0.95)" />
                  <path
                    d="M104,120 C160,120 200,96 246,90"
                    stroke="url(#g2)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M104,120 C160,120 200,144 246,150"
                    stroke="rgba(91,140,255,0.52)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="8 8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M274,90 C330,88 380,115 436,120"
                    stroke="url(#g2)"
                    strokeWidth="5"
                    fill="none"
                  />
                  <path
                    d="M274,150 C330,152 380,125 436,120"
                    stroke="rgba(255,176,32,0.35)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="8 8"
                  />
                  <path
                    d="M464,120 C510,120 560,120 606,120"
                    stroke="rgba(61,220,151,0.85)"
                    strokeWidth="5"
                    fill="none"
                  />
                  <text
                    x="438"
                    y="72"
                    fill="rgba(255,255,255,0.85)"
                    fontSize="22"
                    fontWeight="700"
                  >
                    Bottleneck
                  </text>
                  <line
                    x1="450"
                    y1="78"
                    x2="450"
                    y2="106"
                    stroke="rgba(255,176,32,0.85)"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>

            <div className="panel">
              <div className="title">
                <span className="icon" aria-hidden>
                  <i className="fa-solid fa-fire-flame-curved" />
                </span>
                <b>Constraint heatmap</b>
              </div>
              <p>
                See where time and cost concentrate across stages, roles, and tools — so fixes target the
                constraint, not the noise.
              </p>
              <div style={{ display: 'grid', gap: 12, marginTop: 14 }}>
                <div className="kpi">
                  <strong>Cost leakage</strong>
                  <span>Dollar impact quantified where work waits, reworks, or bounces.</span>
                </div>
                <div className="kpi">
                  <strong>Time leakage</strong>
                  <span>Wait time, rework, and handoff drag measured from real event sequences.</span>
                </div>
                <div className="kpi">
                  <strong>Fix difficulty</strong>
                  <span>Policy → process → automation: ranked by leverage vs. effort.</span>
                </div>
              </div>
              <div style={{ marginTop: 14 }}>
                <span className="pill">
                  <i className="fa-solid fa-layer-group" aria-hidden />
                  <span>
                    <b>Tool-agnostic:</b> integrates with your stack
                  </span>
                </span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
