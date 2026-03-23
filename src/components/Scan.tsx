'use client';

import AnimatedSection from './AnimatedSection';

export default function Scan() {
  return (
    <section id="scan" className="section-soft video-section reveal">

      <div className="container">
        <AnimatedSection>
          <div className="section-head">
            <div>
              <div className="eyebrow">
                <span className="dot" />
                The Audit
              </div>
              <h2>
                A Bottleneck Scan — built for SMB owners and operators who need throughput gains fast, without
                platform changes.
              </h2>
            </div>
            <div>
              <p className="fine">
                Not a transformation program, not a tool rollout, and not a months-long discovery phase. A
                fixed-scope diagnostic that tells you what is actually stalling flow — with evidence.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <div className="grid-2">
            <div className="panel">
              <div className="title">
                <span className="icon" aria-hidden>
                  <i className="fa-solid fa-magnifying-glass" />
                </span>
                <b>What we analyze</b>
              </div>
              <ul style={{ marginTop: 8, paddingLeft: '1.15rem' }}>
                <li>Lead-to-cash and billing handoffs</li>
                <li>Order-to-fulfillment/delivery flow</li>
                <li>Customer support and escalation paths</li>
                <li>Approvals queues and backlog aging</li>
                <li>Rework loops and handoff delays</li>
              </ul>
              <p className="fine" style={{ marginTop: 12 }}>
                Input: event logs and operational data already inside your systems.
              </p>
            </div>

            <div className="panel">
              <div className="title">
                <span className="icon" aria-hidden>
                  <i className="fa-solid fa-file-signature" />
                </span>
                <b>What you receive</b>
              </div>
              <ul style={{ marginTop: 8, paddingLeft: '1.15rem' }}>
                <li>As-is process maps</li>
                <li>Top 3 throughput-killing constraints</li>
                <li>Quantified time &amp; cost leakage</li>
                <li>Backlog queue and wait-time drivers</li>
                <li>30–60 day execution roadmap</li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="grid-2" style={{ marginTop: 16 }}>
            <div className="panel">
              <div className="title">
                <span className="icon" aria-hidden>
                  <i className="fa-solid fa-circle-check" />
                </span>
                <b>Good fit if</b>
              </div>
              <ul style={{ marginTop: 8, paddingLeft: '1.15rem' }}>
                <li>Processes span multiple tools</li>
                <li>Everyone is busy but throughput is not rising</li>
                <li>Work bounces between people or teams</li>
                <li>You need clarity before hiring or automating</li>
              </ul>
            </div>

            <div className="panel">
              <div className="title">
                <span className="icon" aria-hidden>
                  <i className="fa-solid fa-circle-xmark" />
                </span>
                <b>Not a fit if</b>
              </div>
              <ul style={{ marginTop: 8, paddingLeft: '1.15rem' }}>
                <li>You want a new platform</li>
                <li>You are looking for generic best practices</li>
                <li>You want automation without diagnosis</li>
                <li>There is no usable timestamp / event data</li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.16}>
          <div className="panel soft" style={{ marginTop: 16 }}>
            <h3>How it works</h3>
            <div className="steps" style={{ marginTop: 12 }}>
              <div className="step">
                <div className="badge" aria-hidden>
                  1
                </div>
                <div>
                  <p>
                    <b>Connect + ingest</b>
                  </p>
                  <p className="fine" style={{ marginTop: 6 }}>
                    Secure access to the systems that already record work — tickets, orders, CRM stages, and
                    operational logs — normalized into an analyzable timeline.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="badge" aria-hidden>
                  2
                </div>
                <div>
                  <p>
                    <b>Quantify + rank</b>
                  </p>
                  <p className="fine" style={{ marginTop: 6 }}>
                    Reconstruct flows, measure queues and rework, and rank constraints by throughput impact
                    with a clear time-and-cost model.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="badge" aria-hidden>
                  3
                </div>
                <div>
                  <p>
                    <b>Executive readout</b>
                  </p>
                  <p className="fine" style={{ marginTop: 6 }}>
                    A concise walkthrough of what is stalling work, what to fix first, and a 30–60 day roadmap
                    your team can execute without a platform swap.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="trust-note">
            <span className="trust-dot" aria-hidden />
            Designed by operators and process analysts who have worked inside real, deadline-driven environments.
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
