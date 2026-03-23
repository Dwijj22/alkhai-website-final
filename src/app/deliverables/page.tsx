import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Platform from '@/components/Platform';
import CTABanner from '@/components/CTABanner';
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
      <CTABanner />
    </>
  );
}
