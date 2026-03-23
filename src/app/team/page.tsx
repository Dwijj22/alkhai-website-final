import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import CTABanner from '@/components/CTABanner';

export const metadata: Metadata = { title: 'Our Team' };

const TEAM = [
  {
    initials: 'DR',
    name: 'Dwij Ravikumar',
    role: 'Founder & CEO',
    bio: 'Built Alkhai after years of watching enterprises throw millions at broad transformations that never identified the one constraint that mattered. Background in operations, process analysis, and data-driven diagnostics.',
    color: 'var(--electric)',
  },
];

const ADVISORS = [
  {
    initials: 'OP',
    name: 'Operations & Process',
    description: 'Practitioners with hands-on experience in IT operations, service delivery, and process analysis across enterprise and SMB environments.',
    icon: 'fa-solid fa-cogs',
  },
  {
    initials: 'DA',
    name: 'Data & Analytics',
    description: 'Specialists in event-log mining, process mining, and constraint analysis who turn raw operational data into actionable intelligence.',
    icon: 'fa-solid fa-chart-bar',
  },
  {
    initials: 'SI',
    name: 'Systems Integration',
    description: 'Engineers experienced with ServiceNow, Jira, Zendesk, CRM/ERP platforms, and building read-only data pipelines at scale.',
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
              <div className="panel" style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 20, alignItems: 'start' }}>
                <div style={{
                  width: 80, height: 80, borderRadius: 18,
                  background: `linear-gradient(135deg, ${member.color}, var(--teal))`,
                  display: 'grid', placeItems: 'center',
                  fontSize: '1.5rem', fontWeight: 800, color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}>
                  {member.initials}
                </div>
                <div>
                  <b style={{ fontSize: '1.2rem', display: 'block', marginBottom: 4 }}>{member.name}</b>
                  <span style={{ color: 'var(--electric)', fontWeight: 600, fontSize: '0.9rem', display: 'block', marginBottom: 10 }}>
                    {member.role}
                  </span>
                  <p className="fine">{member.bio}</p>
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
                  find their bottleneck, we want to talk.
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
