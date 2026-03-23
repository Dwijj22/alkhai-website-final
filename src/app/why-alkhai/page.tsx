import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Differentiation from '@/components/Differentiation';
import Proof from '@/components/Proof';
import Founder from '@/components/Founder';
import CTABanner from '@/components/CTABanner';

export const metadata: Metadata = { title: 'Why Alkhai' };

export default function WhyAlkhaiPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Alkhai"
        title="Not another dashboard. A different methodology."
        description="We built Alkhai because we saw the same pattern everywhere: enterprises spending millions on tools that show data but never identify the one thing to fix."
      />
      <Differentiation />
      <Proof />
      <Founder />
      <CTABanner />
    </>
  );
}
