import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Differentiation from '@/components/Differentiation';
import AnimatedSection from '@/components/AnimatedSection';
import CTABanner from '@/components/CTABanner';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Why Alkhai',
  description:
    'See how Alkhai differs from broad transformation programs with a constraint-first, event-data-driven operating model.',
  path: '/why-alkhai',
});

export default function WhyAlkhaiPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Alkhai"
        title="Not another dashboard. Evidence-first operations."
        description="We built Alkhai because we saw the same pattern everywhere: enterprises spending millions on tools that show data but never identify the one thing to fix."
      />
      <Differentiation />

      <section className="section-soft" style={{ padding: '86px 0' }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-head" style={{ marginBottom: 32 }}>
              <div>
                <div className="eyebrow"><span className="dot" /> Who this is built for</div>
                <h2>You&apos;ll recognise one of these situations.</h2>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid-3">
            {[
              {
                icon: 'fa-solid fa-magnifying-glass-chart',
                title: 'The COO who knows something is wrong',
                text: 'Throughput is flat, the team is busy, and every root-cause conversation ends in a different answer. You need a single source of truth — not another opinion.',
              },
              {
                icon: 'fa-solid fa-users',
                title: 'The founder about to hire',
                text: 'Before adding headcount, you want to know whether the bottleneck is capacity or process. Hiring into a broken workflow compounds the problem.',
              },
              {
                icon: 'fa-solid fa-gauge-high',
                title: 'The ops lead asked to reduce cycle time',
                text: 'You have been given a target and no additional budget. You need to know exactly which constraint to remove first — and be able to show the evidence.',
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="panel" style={{ height: '100%' }}>
                  <div className="title">
                    <span className="icon"><i className={item.icon} aria-hidden /></span>
                    <b>{item.title}</b>
                  </div>
                  <p className="fine">{item.text}</p>
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
