import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Scan from '@/components/Scan';
import CTABanner from '@/components/CTABanner';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Bottleneck Scan',
  description:
    'A fixed-fee, 30-45 day diagnostic that identifies exactly where work is stalling with event-data evidence and a ranked execution plan.',
  path: '/scan',
});

export default function ScanPage() {
  return (
    <>
      <PageHero
        eyebrow="The Audit"
        title="A Bottleneck Scan — built for SMB owners and operators."
        description="A fixed-fee, 30–45 day diagnostic that identifies exactly where work is stalling — with event-data evidence — and delivers a ranked execution plan your team can act on without a platform change."
      />
      <Scan />
      <CTABanner />
    </>
  );
}
