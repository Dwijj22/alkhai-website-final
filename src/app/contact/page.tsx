import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Contact from '@/components/Contact';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Request a bottleneck scan, describe the workflow you need to improve, and learn what happens after you submit an inquiry.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Request a Bottleneck Scan."
        description="Tell us about the workflow you want to improve and where work is stalling. We review every inquiry within 1 business day and respond with a scoping path if the workflow fits a diagnostic."
      />
      <Contact />
    </>
  );
}
