import Hero from '@/components/Hero';
import MarqueeBar from '@/components/MarqueeBar';
import Capabilities from '@/components/Capabilities';
import Transformation from '@/components/Transformation';
import AnimatedSection from '@/components/AnimatedSection';
import CTABanner from '@/components/CTABanner';
import Link from 'next/link';

const STATS = [
  { value: '20%', label: 'Average throughput lost to hidden constraints' },
  { value: '40%', label: 'Work items continually stuck in rework loops' },
  { value: '30%', label: 'Missed deadlines driven by internal bottlenecks' },
];

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBar />

      {/* Stats bar */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="metrics" style={{ gridTemplateColumns: 'repeat(3, minmax(0,1fr))' }}>
            {STATS.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="metric" style={{ textAlign: 'center' }}>
                  <strong style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: '2.4rem' }}>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities (What We Do) - now inline on home page */}
      <Capabilities />

      {/* Before → After Transformation */}
      <Transformation />

      {/* Why Alkhai teaser */}
      <section className="section-soft" style={{ padding: '86px 0' }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-head">
              <div>
                <div className="eyebrow"><span className="dot" /> Why Alkhai</div>
                <h2>Not another dashboard. A different methodology.</h2>
              </div>
              <p className="fine" style={{ maxWidth: '54ch' }}>
                We built Alkhai because we saw the same pattern everywhere: enterprises spending millions
                on tools that show data but never identify the one thing to fix.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid-3">
            {[
              { title: 'Event-data driven', text: 'All findings derived from timestamps, variants, and real execution data — not interviews.', icon: 'fa-solid fa-database' },
              { title: 'Security-first', text: 'Least-privilege access, NDA-ready, no data extraction outside your environment.', icon: 'fa-solid fa-shield-halved' },
              { title: 'Operationally aligned', text: 'Outputs map to owners, controls, and targets so fixes execute quickly.', icon: 'fa-solid fa-bullseye' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="panel">
                  <div className="title">
                    <span className="icon"><i className={item.icon} aria-hidden /></span>
                    <b>{item.title}</b>
                  </div>
                  <p className="fine">{item.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.3}>
            <div style={{ textAlign: 'center', marginTop: 28 }}>
              <Link className="btn" href="/why-alkhai">
                <i className="fa-solid fa-arrow-right" aria-hidden /> See full comparison
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
