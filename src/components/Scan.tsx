'use client';

import AnimatedSection from './AnimatedSection';
import { CALENDLY_URL } from '@/lib/constants';

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
                A fixed-scope diagnostic. Evidence-first. No platform changes.
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
          <div className="grid-2" style={{ marginBottom: 16 }}>
            <div className="panel" style={{ height: '100%' }}>
              <div className="title">
                <span className="icon" aria-hidden>
                  <i className="fa-solid fa-briefcase" />
                </span>
                <b>Engagement overview</b>
              </div>
              <div className="case-study-list">
                <div className="case-study-item">
                  <span>Engagement type</span>
                  <p className="fine">Fixed-fee diagnostic focused on one bottlenecked workflow.</p>
                </div>
                <div className="case-study-item">
                  <span>Duration</span>
                  <p className="fine">30-45 days from access approval to executive readout.</p>
                </div>
                <div className="case-study-item">
                  <span>Access required</span>
                  <p className="fine">Read-only access to one to three systems with usable event timestamps.</p>
                </div>
                <div className="case-study-item">
                  <span>Outputs</span>
                  <p className="fine">Executive readout, slide deck, ranked constraints, and implementation roadmap.</p>
                </div>
                <div className="case-study-item">
                  <span>Investment</span>
                  <p className="fine">Fixed-fee engagement — contact for a scoped quote based on workflow complexity.</p>
                </div>
              </div>
            </div>

            <div className="panel" style={{ height: '100%' }}>
              <div className="title">
                <span className="icon" aria-hidden>
                  <i className="fa-solid fa-calendar-check" />
                </span>
                <b>Before we start</b>
              </div>
              <p className="fine" style={{ marginBottom: 14 }}>
                We scope the workflow, confirm data viability, and align on the operating question:
                where is work stalling, and what should the team fix first?
              </p>
              <p className="fine" style={{ marginBottom: 14 }}>
We scope every engagement before it starts — confirming data viability and aligning on the exact operating question before you invest.              </p>
              <a className="btn primary" href={CALENDLY_URL} target="_blank" rel="noreferrer noopener">
                <i className="fa-regular fa-calendar" aria-hidden /> Book a scoping call
              </a>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
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

        <AnimatedSection delay={0.14}>
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

        <AnimatedSection delay={0.18}>
          <div className="panel" style={{ marginTop: 16 }}>
            <div className="section-head" style={{ marginBottom: 20 }}>
              <div>
                <div className="eyebrow">
                  <span className="dot" />
                  Timeline
                </div>
                <h2 style={{ fontSize: 'clamp(1.5rem, 2vw, 1.85rem)' }}>A clear week-by-week diagnostic.</h2>
              </div>
            </div>
            <div className="steps" style={{ marginTop: 0 }}>
              {[
                [
                  'Week 1 — Connect + Ingest',
                  'Scope the workflow, confirm access, and validate event-data fields. Secure read-only access to the systems that record work — tickets, orders, CRM stages, operational logs — normalized into an analyzable timeline.',
                ],
                [
                  'Week 2 — Reconstruct the Flow',
                  'Rebuild the as-is process from timestamps and events. Identify queues, isolate the highest-friction wait states, and map real-world variants — including the paths that actually happen, not the documented ones.',
                ],
                [
                  'Week 3 — Rank Constraints',
                  'Score bottlenecks by throughput impact, quantify time and cost leakage, and stress-test the leading hypotheses against the event data.',
                ],
                [
                  'Week 4+ — Executive Readout',
                  'Deliver the readout, ranked action roadmap, and owner-linked execution path for the next 30–60 days. No platform swap required to act on the findings.',
                ],
              ].map(([title, text], index) => (
                <div className="step step-rail" key={title}>
                  <div className="step-number" aria-hidden>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <b>{title}</b>
                    <p className="fine">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.22}>
          <div id="scan-faq" className="panel" style={{ marginTop: 16 }}>
            <div className="section-head" style={{ marginBottom: 18 }}>
              <div>
                <div className="eyebrow">
                  <span className="dot" />
                  FAQ
                </div>
                <h2 style={{ fontSize: 'clamp(1.5rem, 2vw, 1.85rem)' }}>Questions buyers ask before a scan.</h2>
              </div>
            </div>
            <div className="faq-list">
              {[
                ['Do you need a new platform?', 'No. The scan is designed to work with the systems you already run.'],
                ['What access is required?', 'Read-only access to one to three systems with usable timestamps or event histories.'],
                ['What if our event data quality is poor?', "We assess data viability during the scoping call. If the data can't support constraint analysis, we tell you before you invest — you don't proceed to a full scan."],
                ['What if you don\'t find anything actionable?', "If we can't identify a constraint with sufficient evidence to quantify, we don't deliver a recommendation you can't act on. Our commercial structure reflects this commitment."],
                ['How disruptive is the work?', 'Low disruption. Most of the work happens in the data and readout layer, not through workshops.'],
                ['What happens after the readout?', 'Your team gets a ranked action plan with owners, sequence, and the first moves to make.'],
              ].map(([question, answer]) => (
                <div key={question} className="faq-item">
                  <b>{question}</b>
                  <p className="fine">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
