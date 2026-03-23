import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Platform from '@/components/Platform';
import CTABanner from '@/components/CTABanner';
import AnimatedSection from '@/components/AnimatedSection';
import ProcessHeatmap from '@/components/graphics/ProcessHeatmap';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Deliverables',
  description:
    'See the executive readouts, process maps, ranked constraints, and roadmap outputs a bottleneck scan delivers.',
  path: '/deliverables',
});

export default function DeliverablesPage() {
  return (
    <>
      <PageHero
        eyebrow="What You Receive"
        title="What your leadership team receives."
        description="We deliver diagnosttic outputs — not a software license or black-box tool. Clarity, ranked constraints, and a single 'start here' path."
      />
      <Platform />
      <section style={{ padding: '0 0 86px' }}>
        <div className="container">
          <AnimatedSection delay={0.2}>
            <div className="panel" style={{ marginTop: 24 }}>
              <div className="title">
                <span className="icon"><i className="fa-solid fa-diagram-project" aria-hidden /></span>
                <b>Sample diagnostic output</b>
              </div>
              <p className="fine" style={{ marginBottom: 20 }}>
                A simplified example of how Alkhai maps a workflow and surfaces the
                constraint. Real outputs include timestamped event data, variant paths,
                and a ranked constraint list with time and cost impact.
              </p>

              <div
                style={{
                  position: 'relative',
                  borderRadius: 12,
                  overflow: 'visible',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '24px 24px 40px 24px',
                }}
              >
                <ProcessHeatmap />
              </div>

              <p className="fine" style={{ marginTop: 12, fontSize: '0.82rem', color: 'rgba(199,206,217,0.7)' }}>
                Bar length indicates relative cycle delay per stage —{' '}
                <span style={{ color: 'var(--danger)', fontWeight: 600 }}>red</span> = high constraint,{' '}
                <span style={{ color: 'var(--amber)', fontWeight: 600 }}>amber</span> = moderate,{' '}
                <span style={{ color: 'var(--teal)', fontWeight: 600 }}>teal</span> = within normal range.
              </p>
              <p className="fine" style={{ marginTop: 12, color: 'rgba(199,206,217,0.5)', fontSize: '0.82rem' }}>
                Illustrative output — structure and format representative of a real Alkhai readout.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
