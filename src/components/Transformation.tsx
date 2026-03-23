'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

interface MetricRow {
  label: string;
  before: string;
  after: string;
  beforeColor: string;
  afterColor: string;
  icon: string;
}

const METRICS: MetricRow[] = [
  { label: 'Throughput', before: '62%', after: '91%', beforeColor: '#FF3B5C', afterColor: '#3DDC97', icon: 'fa-solid fa-gauge-high' },
  { label: 'Cycle Time', before: '18.4 days', after: '7.2 days', beforeColor: '#FF3B5C', afterColor: '#3DDC97', icon: 'fa-solid fa-clock' },
  { label: 'Rework Rate', before: '38%', after: '9%', beforeColor: '#FF3B5C', afterColor: '#3DDC97', icon: 'fa-solid fa-rotate' },
  { label: 'SLA Compliance', before: '64%', after: '96%', beforeColor: '#FFB020', afterColor: '#3DDC97', icon: 'fa-solid fa-certificate' },
  { label: 'Cost Leakage', before: '$420K/yr', after: '$62K/yr', beforeColor: '#FF3B5C', afterColor: '#3DDC97', icon: 'fa-solid fa-dollar-sign' },
  { label: 'Deadline Hit Rate', before: '58%', after: '94%', beforeColor: '#FFB020', afterColor: '#3DDC97', icon: 'fa-solid fa-bullseye' },
];

const OUTCOMES = [
  { value: 47, label: 'Throughput Increase', icon: 'fa-solid fa-arrow-trend-up', prefix: '+', suffix: '%' },
  { value: 61, label: 'Cycle Time Reduction', icon: 'fa-solid fa-bolt', prefix: '-', suffix: '%' },
  { value: 358, label: 'Annual Savings', icon: 'fa-solid fa-piggy-bank', prefix: '$', suffix: 'K' },
  { value: 3.2, label: 'ROI in First Year', icon: 'fa-solid fa-chart-line', prefix: '', suffix: 'x' },
];

function AnimatedBar({ targetWidth, color, delay }: { targetWidth: number; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} style={{ width: '100%', height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${targetWidth}%` } : {}}
        transition={{ duration: 1, delay, ease: [0.22, 0.72, 0.25, 1] }}
        style={{ height: '100%', borderRadius: 999, background: color }}
      />
    </div>
  );
}

function FlipNumber({ before, after, beforeColor, afterColor }: { before: string; after: string; beforeColor: string; afterColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setFlipped(true), 1200);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <span ref={ref} style={{ display: 'inline-block', position: 'relative', minWidth: 80, textAlign: 'right' }}>
      <motion.span
        animate={{ opacity: flipped ? 0 : 1, y: flipped ? -10 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ color: beforeColor, fontWeight: 800, fontSize: '1.1rem', display: 'inline-block' }}
      >
        {before}
      </motion.span>
      <motion.span
        animate={{ opacity: flipped ? 1 : 0, y: flipped ? 0 : 10 }}
        transition={{ duration: 0.4 }}
        style={{ color: afterColor, fontWeight: 800, fontSize: '1.1rem', position: 'absolute', right: 0, top: 0 }}
      >
        {after}
      </motion.span>
    </span>
  );
}

function AnimatedOutcomeValue({
  value,
  prefix,
  suffix,
}: {
  value: number;
  prefix: string;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    const duration = 1500;
    const start = performance.now();

    function animate(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const overshoot = progress < 0.84 ? 1.05 : 1;
      const nextValue = Math.min(value, value * eased * overshoot);
      setDisplayValue(nextValue);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  const formatted = value % 1 === 0 ? Math.round(displayValue).toString() : displayValue.toFixed(1);

  return (
    <strong
      ref={ref}
      style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: '2.2rem', color: '#3DDC97' }}
    >
      {prefix}
      {formatted}
      {suffix}
    </strong>
  );
}

export default function Transformation() {
  return (
    <section style={{ padding: '86px 0' }}>
      <div className="container">
        <AnimatedSection>
          <div className="section-head" style={{ marginBottom: 36 }}>
            <div>
              <div className="eyebrow"><span className="dot" /> The Impact</div>
              <h2>What a constraint-first diagnostic typically uncovers.</h2>
            </div>
            <p className="fine" style={{ maxWidth: '52ch' }}>
              Illustrative ranges based on common bottleneck patterns — not attributed to a
              specific engagement. Actual results depend on workflow complexity and data quality.
            </p>
          </div>
        </AnimatedSection>

        {/* Before → After table */}
        <AnimatedSection delay={0.1}>
          <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 100px 6px 100px 1fr',
              alignItems: 'center', gap: 12, padding: '16px 20px',
              background: 'rgba(255,255,255,0.03)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(199,206,217,0.5)' }}>
                Metric
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FF3B5C', textAlign: 'right' }}>
                Before
              </span>
              <span />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#3DDC97', textAlign: 'right' }}>
                After
              </span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(199,206,217,0.4)' }}>Progress</span>
            </div>

            {/* Rows */}
            {METRICS.map((m, i) => (
              <div key={m.label} style={{
                display: 'grid', gridTemplateColumns: '1fr 100px 6px 100px 1fr',
                alignItems: 'center', gap: 12, padding: '14px 20px',
                borderBottom: i < METRICS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                transition: 'background 200ms ease',
              }}
                className="transform-row"
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(199,206,217,0.85)', fontSize: '0.95rem' }}>
                  <i className={m.icon} style={{ color: 'var(--electric)', width: 16, textAlign: 'center', fontSize: '0.85rem' }} aria-hidden />
                  {m.label}
                </span>
                <span style={{ color: m.beforeColor, fontWeight: 800, fontSize: '1.05rem', textAlign: 'right', fontFamily: '"Sora", system-ui, sans-serif' }}>
                  {m.before}
                </span>
                <i className="fa-solid fa-arrow-right" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem', textAlign: 'center' }} aria-hidden />
                <span style={{ color: m.afterColor, fontWeight: 800, fontSize: '1.05rem', textAlign: 'right', fontFamily: '"Sora", system-ui, sans-serif' }}>
                  {m.after}
                </span>
                <AnimatedBar
                  targetWidth={i === 0 ? 91 : i === 1 ? 60 : i === 2 ? 76 : i === 3 ? 96 : i === 4 ? 85 : 94}
                  color={`linear-gradient(90deg, ${m.beforeColor}, ${m.afterColor})`}
                  delay={0.3 + i * 0.1}
                />
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Outcome cards */}
        <div className="metrics impact-outcomes" style={{ marginTop: 24 }}>
          {OUTCOMES.map((o, i) => (
            <AnimatedSection key={o.label} delay={0.2 + i * 0.1}>
              <div className="metric" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: '999px 999px 0 0',
                  background: 'linear-gradient(90deg, var(--electric), var(--teal))',
                }} />
                <i className={o.icon} style={{ fontSize: '1.3rem', color: 'var(--teal)', marginBottom: 8, display: 'block' }} aria-hidden />
                <AnimatedOutcomeValue value={o.value} prefix={o.prefix} suffix={o.suffix} />
                <span>{o.label}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
