'use client';

import { useEffect, useRef, useState } from 'react';
import Hero from '@/components/Hero';
import MarqueeBar from '@/components/MarqueeBar';
import Capabilities from '@/components/Capabilities';
import Transformation from '@/components/Transformation';
import AnimatedSection from '@/components/AnimatedSection';
import CTABanner from '@/components/CTABanner';
import Link from 'next/link';
import CaseStudies from '@/components/CaseStudies';

const STATS = [
  { value: 20, label: 'Average throughput lost to hidden constraints', suffix: '%' },
  { value: 40, label: 'Work items continually stuck in rework loops', suffix: '%' },
  { value: 30, label: 'Missed deadlines driven by internal bottlenecks', suffix: '%' },
];

function AnimatedMetric({
  value,
  label,
  suffix,
}: {
  value: number;
  label: string;
  suffix: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    let hasStarted = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStarted) return;
        hasStarted = true;

        const duration = 1400;
        const start = performance.now();

        function animate(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const overshoot = progress < 0.84 ? 1.06 : 1;
          const nextValue = Math.min(value, Math.round(value * eased * overshoot));
          setDisplayValue(nextValue);
          if (progress < 1) {
            frame = requestAnimationFrame(animate);
          } else {
            setDisplayValue(value);
          }
        }

        frame = requestAnimationFrame(animate);
      },
      { threshold: 0.45 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div ref={ref} className="metric" style={{ textAlign: 'center' }}>
      <strong style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: '2.4rem' }}>
        {displayValue}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBar />

      {/* Stats bar */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="metrics home-stats">
            {STATS.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <AnimatedMetric value={stat.value} label={stat.label} suffix={stat.suffix} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities (What We Do) - now inline on home page */}
      <Capabilities />

      {/* Before → After Transformation */}
      <Transformation />

      <CaseStudies />

      {/* Why Alkhai teaser */}
      <section className="section-soft" style={{ padding: '86px 0' }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-head">
              <div>
                <div className="eyebrow"><span className="dot" /> Why Alkhai</div>
                <h2>Not another dashboard. A data backed evidence.</h2>
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
