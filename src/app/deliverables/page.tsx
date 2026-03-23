import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Platform from '@/components/Platform';
import CTABanner from '@/components/CTABanner';

export const metadata: Metadata = { title: 'Deliverables' };

export default function DeliverablesPage() {
  return (
    <>
      <PageHero
        eyebrow="Deliverables"
        title="What your leadership team receives."
        description="These visuals represent the diagnostic outputs we deliver — not a software license or black-box tool. Clarity, ranked constraints, and a single 'start here' path."
      />
      <Platform />
      <CTABanner />
    </>
  );
}
