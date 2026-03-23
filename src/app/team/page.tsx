import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import CTABanner from '@/components/CTABanner';
import { createPageMetadata } from '@/lib/metadata';
import { FOUNDER_LINKEDIN_URL } from '@/lib/constants';

export const metadata: Metadata = createPageMetadata({
  title: 'Our Team',
  description:
    'Meet the founder behind Alkhai and the operator, analytics, and systems talent network supporting each diagnostic engagement.',
  path: '/team',
});

const TEAM = [
  {
    name: 'Dwij Ravikumar',
    role: 'Founder & CEO',
    bio: 'Built Alkhai after working across operations, analytics, and process improvement environments where teams had plenty of reporting but not enough diagnostic clarity. Focused on event-data analysis, constraint ranking, and execution plans that operating teams can use immediately.',
  },
];

const ADVISORS = [
  {
    name: 'Operations & Process Leaders',
    description: 'Our network includes practitioners from IT operations, service delivery, finance operations, and workflow design roles who have led deadline-driven execution inside real operating teams.',
    icon: 'fa-solid fa-cogs',
  },
  {
    name: 'Data & Analytics Specialists',
    description: 'We work with analysts experienced in event-log interpretation, process mining, queue analysis, and translating operational data into decisions leaders can trust.',
    icon: 'fa-solid fa-chart-bar',
  },
  {
    name: 'Systems Integration Engineers',
    description: 'Our network includes engineers familiar with ServiceNow, Jira, Zendesk, CRM and ERP environments, and secure read-only data collection patterns.',
    icon: 'fa-solid fa-plug',
  },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="Practitioners, not consultants."
        description="Alkhai engagements are led by people who have worked inside real, deadline-driven operational environments — not from slide decks."
      />

      {/* Leadership */}
      <section style={{ padding: '0 0 86px' }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-head" style={{ marginBottom: 32 }}>
              <div>
                <div className="eyebrow"><span className="dot" /> Leadership</div>
                <h2>Who&apos;s behind Alkhai.</h2>
              </div>
            </div>
          </AnimatedSection>

          {TEAM.map((member, i) => (
            <AnimatedSection key={member.name} delay={i * 0.1}>
              <div className="panel founder-panel">
                <div className="founder-photo-wrap">
                  <Image
                    src="/dwij-founder.jpeg"
                    alt="Dwij Ravikumar"
                    width={320}
                    height={320}
                    className="founder-photo"
                  />
                </div>
                <div>
                  <b style={{ fontSize: '1.2rem', display: 'block', marginBottom: 4 }}>{member.name}</b>
                  <span style={{ color: 'var(--electric)', fontWeight: 600, fontSize: '0.9rem', display: 'block', marginBottom: 10 }}>
                    {member.role}
                  </span>
                  <p className="fine">{member.bio}</p>
                  <p className="fine" style={{ marginTop: 12 }}>
                    Alkhai was built to help operators answer one practical question with evidence:
                    where exactly is work stalling, and what should the team fix first?
                  </p>
                  <div style={{ marginTop: 14, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <a className="link-chip" href={FOUNDER_LINKEDIN_URL} target="_blank" rel="noreferrer noopener">
                      <i className="fa-brands fa-linkedin" aria-hidden /> LinkedIn
                    </a>
                    <span className="link-chip">Currently building the core team</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="section-soft" style={{ padding: '86px 0' }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-head" style={{ marginBottom: 32 }}>
              <div>
                <div className="eyebrow"><span className="dot" /> Expertise</div>
                <h2>The disciplines we bring.</h2>
              </div>
              <p className="fine" style={{ maxWidth: '50ch' }}>
                Every engagement is backed by deep expertise across three pillars:
                operations, data analytics, and systems integration.
              </p>
              <p className="fine" style={{ maxWidth: '50ch' }}>
                Today this is a founder-led firm supported by a specialist network. The site now states that directly rather than implying a larger in-house team than exists.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid-3">
            {ADVISORS.map((a, i) => (
              <AnimatedSection key={a.name} delay={i * 0.1}>
                <div className="panel" style={{ height: '100%' }}>
                  <div className="title">
                    <span className="icon"><i className={a.icon} aria-hidden /></span>
                    <b>{a.name}</b>
                  </div>
                  <p className="fine">{a.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring */}
      <section style={{ padding: '86px 0' }}>
        <div className="container">
          <AnimatedSection>
            <div className="cta-box" style={{ gridTemplateColumns: '1fr', textAlign: 'center', padding: '40px 30px' }}>
              <div>
                <div className="eyebrow" style={{ margin: '0 auto 16px' }}>
                  <span className="dot" /> We&apos;re Hiring
                </div>
                <h2 style={{ marginBottom: 12 }}>Join the team.</h2>
                <p className="fine" style={{ maxWidth: '50ch', margin: '0 auto 20px' }}>
                  We&apos;re looking for practitioners who think in constraints, not frameworks.
                  If you&apos;ve spent time inside real operations and want to help businesses
                  find their bottleneck, we want to talk. Priority roles include data diagnostics,
                  process analysis, and systems integration support.
                </p>
                <a className="btn primary" href="mailto:contact@alkhai.com?subject=Joining%20Alkhai">
                  <i className="fa-solid fa-envelope" aria-hidden /> Get in touch
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
