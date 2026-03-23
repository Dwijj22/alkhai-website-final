import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Contact from '@/components/Contact';

export const metadata: Metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Request a Bottleneck Scan."
        description="Tell us about the workflow you want to improve and where work is stalling. We'll respond with a scoped bottleneck scan and a data-focused plan."
      />
      <Contact />
    </>
  );
}
