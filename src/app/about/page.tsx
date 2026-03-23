import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import CTABanner from '@/components/CTABanner';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'About Us',
  description:
    'Learn why Alkhai applies Theory of Constraints with event-data evidence, read-only access, and an operator-led diagnostic model.',
  path: '/about',
});

const VALUES = [
  {
    icon: 'fa-solid fa-crosshairs',
    title: 'Constraint-First',
    text: 'We don\'t optimize everything. We find the single constraint that limits total system throughput — the only place where improvement actually moves the needle.',
  },
  {
    icon: 'fa-solid fa-database',
    title: 'Evidence Over Opinion',
    text: 'Every finding is backed by real event data from your systems. No guesswork, no assumptions, no "best practices" divorced from your actual operations.',
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Non-Disruptive',
    text: 'Read-only API access. No agents to install, no process changes during analysis, no impact on your team\'s daily work. We observe, we don\'t interfere.',
  },
  {
    icon: 'fa-solid fa-bullseye',
    title: 'Outcome-Linked',
    text: 'We tie every recommendation to specific queues, handoffs, and loop drivers with projected time and cost impact. If we can\'t find actionable constraints, you don\'t proceed.',
  },
  {
    icon: 'fa-solid fa-user-shield',
    title: 'Client-Protective',
    text: 'Data minimization, NDA-ready workflows, and least-privilege access are built into the engagement from the start. We ask for only what the diagnostic requires.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Operational intelligence, built by operators."
        description="Alkhai is a data-driven operational intelligence firm that finds the single bottleneck limiting a business's throughput — using real event data from the systems they already run — and delivers a precise, ranked plan to remove it in 30 days."
      />

      {/* Mission */}
      <section style={{ padding: '0 0 86px' }}>
        <div className="container">
          <div className="grid-2">
            <AnimatedSection>
              <div className="panel" style={{ height: '100%' }}>
                <div className="title">
                  <span className="icon"><i className="fa-solid fa-compass" aria-hidden /></span>
                  <b>Our Mission</b>
                </div>
                <p>
                  To give every business — from growth-stage SMBs to large enterprises — the ability to see
                  where their operations actually break down, and the clarity to fix the one thing that
                  matters most. No more million-dollar dashboards that show data but never change outcomes.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="panel" style={{ height: '100%' }}>
                <div className="title">
                  <span className="icon"><i className="fa-solid fa-lightbulb" aria-hidden /></span>
                  <b>Why We Exist</b>
                </div>
                <p>
                  We watched enterprises spend millions on broad transformation programs that optimized
                  everything except the one thing that mattered. The Theory of Constraints isn&apos;t new —
                  but applying it with real event data at scale is. That&apos;s what Alkhai does.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-soft" style={{ padding: '86px 0' }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-head" style={{ marginBottom: 32 }}>
              <div>
                <div className="eyebrow"><span className="dot" /> Our Principles</div>
                <h2>How we operate.</h2>
              </div>
            </div>
          </AnimatedSection>

          <div className="principles-grid">
            {VALUES.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.08}>
                <div className="panel" style={{ height: '100%' }}>
                  <div className="title">
                    <span className="icon"><i className={v.icon} aria-hidden /></span>
                    <b>{v.title}</b>
                  </div>
                  <p className="fine">{v.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section style={{ padding: '86px 0' }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-head" style={{ marginBottom: 32 }}>
              <div>
                <div className="eyebrow"><span className="dot" /> Our Approach</div>
                <h2>Theory of Constraints, applied with data.</h2>
              </div>
              <p className="fine" style={{ maxWidth: '54ch' }}>
                Every system has one constraint that limits its total output. Improving anything
                other than that constraint is waste. We find it, quantify it, and give you the
                exact plan to remove it.
              </p>
            </div>
          </AnimatedSection>

          <div className="steps">
            {[
              { num: '01', title: 'Identify', text: 'Connect to your systems, ingest event data, and reconstruct actual process flows — not the documented ones.' },
              { num: '02', title: 'Exploit', text: 'Make the most of the existing constraint without additional investment. Often this alone yields 10-20% throughput gains.' },
              { num: '03', title: 'Subordinate', text: 'Align all other processes to support the constraint. Stop local optimizations that don\'t help the bottleneck.' },
              { num: '04', title: 'Elevate', text: 'If needed, invest to break the constraint. With data, you know exactly where the investment goes and what ROI to expect.' },
              { num: '05', title: 'Repeat', text: 'Once removed, a new constraint emerges. The cycle continues — each iteration unlocking the next level of performance.' },
            ].map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 0.08}>
                <div className="step step-rail">
                  <div className="step-number">{step.num}</div>
                  <div>
                    <b>{step.title}</b>
                    <p className="fine">{step.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
