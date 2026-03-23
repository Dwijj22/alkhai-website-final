'use client';

import AnimatedSection from '@/components/AnimatedSection';
import Image from 'next/image';
import { FOUNDER_LINKEDIN_URL } from '@/lib/constants';

export default function Founder() {
  return (
    <section id="founder" className="section-soft reveal">
      <div className="container">
        <AnimatedSection>
          <div className="section-head">
            <div>
              <div className="eyebrow">
                <span className="dot" />
                Founder Note
              </div>
              <h2>Why Alkhai exists.</h2>
            </div>
            <p className="fine" style={{ maxWidth: '62ch' }}>
              A founder statement grounded in operating reality, not broad transformation language.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="panel founder-panel">
            <div className="founder-photo-wrap">
              <Image
                src="/dwij-founder.jpeg"
                alt="Dwij Ravikumar"
                width={320}
                height={320}
                className="founder-photo"
              />
            </div>
            <div>
              <p style={{ color: '#fff', fontSize: '1.08rem', lineHeight: 1.8 }}>
                &quot;I built Alkhai after seeing the same failure pattern repeatedly: teams were drowning in
                dashboards, workshops, and transformation plans, but nobody could point to the one queue or
                handoff actually limiting throughput. The gap was never data volume. It was diagnostic
                precision. Alkhai exists to identify that constraint quickly, show the evidence in operating
                terms, and give leaders a ranked plan they can act on without a platform reset.&quot;
              </p>
              <div style={{ marginTop: 18 }}>
                <b style={{ display: 'block', marginBottom: 4, fontSize: '1.05rem' }}>Dwij Ravikumar</b>
                <span className="fine" style={{ display: 'block', marginBottom: 12 }}>
                  Founder, Alkhai
                </span>
                <a className="link-chip" href={FOUNDER_LINKEDIN_URL} target="_blank" rel="noreferrer noopener">
                  <i className="fa-brands fa-linkedin" aria-hidden /> View LinkedIn
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
