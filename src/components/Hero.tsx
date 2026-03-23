'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import { CALENDLY_URL } from '@/lib/constants';

export default function Hero() {
  const gradId = useId().replace(/:/g, '');

  return (
    <motion.section
      id="top"
      className="hero video-section reveal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 0.72, 0.25, 1] }}
    >

      <div className="container hero-grid">
        <div className="hero-copy">
          <AnimatedSection delay={0}>
            <div className="eyebrow">
              <span className="dot" />
              Operational Intelligence for SMBs
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <h1>
              Find and remove the{' '}
              <span className="bottleneck-glow">
                bottlenecks
              </span>{' '}
              bleeding time and money from your operations.
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.12}>
            <p className="hero-sub">
              Most SMBs lose up to <strong style={{ color: 'var(--text)' }}>20% throughput</strong> to hidden
              bottlenecks. We map work as it actually flows across{' '}
              <strong style={{ color: 'var(--text)' }}>onboarding</strong>,{' '}
              <strong style={{ color: 'var(--text)' }}>support</strong>,{' '}
              <strong style={{ color: 'var(--text)' }}>fulfillment</strong>,{' '}
              <strong style={{ color: 'var(--text)' }}>billing</strong>, and{' '}
              <strong style={{ color: 'var(--text)' }}>approvals</strong> — using event data from the tools you
              already run — so you can target the constraints that matter.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.16}>
            <div className="hero-actions">
              <a className="btn primary" href="/contact">
                <i className="fa-solid fa-arrow-right" aria-hidden />
                Request a Bottleneck Scan
              </a>
              <a
                className="btn ghost book-cta"
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer noopener"
              >
                <i className="fa-regular fa-calendar" aria-hidden />
                Book a 30-minute intro
              </a>
            </div>
          </AnimatedSection>

        </div>

        <AnimatedSection delay={0.14} className="hero-visual" direction="left">
          <div className="visual-inner">
            <div className="visual-top">
              <div className="mini-title">
                <span className="pulse" aria-hidden />
                Snapshot
              </div>
              <div className="mini-actions">
                <span className="pill">
                  <i className="fa-solid fa-wave-square" aria-hidden />
                  Variance: <b>High</b>
                </span>
                <span className="pill">
                  <i className="fa-solid fa-triangle-exclamation" aria-hidden />
                  Bottlenecks: <b>3</b>
                </span>
              </div>
            </div>

            <div className="dash-grid">
              <div className="card">
                <h4>Cycle Time (Last 30 Days)</h4>
                <div className="spark" aria-hidden="true">
                  <svg viewBox="0 0 600 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0" stopColor="rgba(91,140,255,0.9)" />
                        <stop offset="1" stopColor="rgba(61,220,151,0.85)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,150 C60,120 90,80 140,95 C190,110 215,160 270,145 C330,125 350,65 410,75 C470,85 500,130 600,90"
                      fill="none"
                      stroke={`url(#${gradId})`}
                      strokeWidth="5"
                    />
                    <path
                      d="M0,200 L0,150 C60,120 90,80 140,95 C190,110 215,160 270,145 C330,125 350,65 410,75 C470,85 500,130 600,90 L600,200 Z"
                      fill="rgba(91,140,255,0.10)"
                    />
                    <line
                      x1="0" y1="165" x2="600" y2="165"
                      stroke="rgba(255,255,255,0.10)"
                      strokeDasharray="6 6"
                    />
                    <circle cx="410" cy="75" r="6" fill="rgba(255,176,32,0.95)" />
                    <circle cx="600" cy="90" r="6" fill="rgba(61,220,151,0.95)" />
                  </svg>
                </div>
                <div className="kpis" style={{ marginTop: 12 }}>
                  <div className="kpi">
                    <strong>−21%</strong>
                    <span>median cycle time</span>
                  </div>
                  <div className="kpi">
                    <strong>+14%</strong>
                    <span>throughput</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h4>Top Constraints</h4>
                <div className="kpi" style={{ marginBottom: 10 }}>
                  <strong style={{ fontSize: '1.12rem' }}>Approval Queue</strong>
                  <span>
                    <b style={{ color: '#fff' }}>4.6 days</b> avg wait •{' '}
                    <span style={{ color: 'var(--amber)', fontWeight: 800 }}>High impact</span>
                  </span>
                </div>
                <div className="kpi" style={{ marginBottom: 10 }}>
                  <strong style={{ fontSize: '1.12rem' }}>Rework Loop</strong>
                  <span>
                    <b style={{ color: '#fff' }}>18%</b> cases •{' '}
                    <span style={{ color: 'var(--danger)', fontWeight: 800 }}>Costly</span>
                  </span>
                </div>
                <div className="kpi">
                  <strong style={{ fontSize: '1.12rem' }}>Handoff Delay</strong>
                  <span>
                    <b style={{ color: '#fff' }}>1.9 days</b> median •{' '}
                    <span style={{ color: 'var(--electric)', fontWeight: 800 }}>Fixable</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </motion.section>
  );
}
