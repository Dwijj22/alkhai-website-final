import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Differentiation from '@/components/Differentiation';
import Proof from '@/components/Proof';
import CTABanner from '@/components/CTABanner';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Why Alkhai',
  description:
    'See how Alkhai differs from broad transformation programs with a constraint-first, event-data-driven operating model.',
  path: '/why-alkhai',
});

export default function WhyAlkhaiPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Alkhai"
        title="Not another dashboard. Data backed clarity."
        description="We built Alkhai because we saw the same pattern everywhere: enterprises spending millions on tools that show data but never identify the one thing to fix."
      />
      <Differentiation />
      <Proof />
      <CTABanner />
    </>
  );
}
