'use client';

import Link from 'next/link';
import AnimatedSection from './AnimatedSection';

export default function CTABanner() {
  return (
    <section style={{ padding: '60px 0 86px' }}>
      <div className="container">
        <AnimatedSection>
          <div className="cta-box" style={{ gridTemplateColumns: '1fr', textAlign: 'center', padding: '40px 30px' }}>
            <div>
              <h2 style={{ marginBottom: 12 }}>Ready to find your bottleneck?</h2>
              <p className="fine" style={{ maxWidth: '50ch', margin: '0 auto 24px' }}>
                Start with a 30-minute intro call. We&apos;ll discuss your operational challenges
                and determine if a diagnostic is the right fit.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link className="btn primary" href="/contact">
                  <i className="fa-solid fa-arrow-right" aria-hidden /> Request a Bottleneck Scan
                </Link>
                <a
                  className="btn ghost book-cta"
                  href="https://calendly.com/dwijravikumar/alkhai-initial-meeting"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <i className="fa-regular fa-calendar" aria-hidden /> Book a 30-minute intro
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
