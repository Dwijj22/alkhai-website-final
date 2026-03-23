import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Scan from '@/components/Scan';
import CTABanner from '@/components/CTABanner';

export const metadata: Metadata = { title: 'Bottleneck Scan' };

export default function ScanPage() {
  return (
    <>
      <PageHero
        eyebrow="The Audit"
        title="A Bottleneck Scan — built for SMB owners and operators."
        description="Not a transformation program. A data-driven readout that tells you exactly where to act first and why. Throughput gains fast, without platform changes."
      />
      <Scan />
      <CTABanner />
    </>
  );
}
