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
              <div className="spark" style={{ height: 220, marginTop: 14 }}>
                <svg viewBox="0 0 700 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <defs>
                    <linearGradient id="pf-path" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(91,140,255,0.35)" />
                      <stop offset="100%" stopColor="rgba(61,220,151,0.25)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 70 110 L 150 110 L 200 90 L 260 110 L 320 110 L 360 130 L 420 100 L 480 95 L 540 105 L 610 110"
                    stroke="url(#pf-path)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 200 90 L 200 125 L 360 130"
                    stroke="rgba(255,176,32,0.45)"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    strokeLinecap="round"
                  />
                  <circle cx="70" cy="110" r="18" fill="#3DDC97" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                  <circle cx="200" cy="90" r="14" fill="#5B8CFF" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                  <circle cx="320" cy="110" r="14" fill="#5B8CFF" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                  <circle cx="380" cy="130" r="24" fill="#FFB020" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
                  <circle cx="480" cy="95" r="14" fill="#5B8CFF" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                  <circle cx="610" cy="110" r="18" fill="#3DDC97" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                  <text
                    x="380"
                    y="188"
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.88)"
                    fontSize="13"
                    fontFamily="Sora, system-ui, sans-serif"
                    fontWeight="700"
                  >
                    Bottleneck
                  </text>
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
