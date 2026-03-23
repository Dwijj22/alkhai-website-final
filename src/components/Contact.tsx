'use client';

import { FormEvent, useRef, useState } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { CALENDLY_URL } from '@/lib/constants';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Form submit failed');
      form.reset();
      setShowSuccess(true);
    } catch {
      /* keep UX quiet on failure; formspree handles edge cases */
    }
  }

  return (
    <section id="contact" className="section-soft video-section reveal">

      <div className="container">
        <AnimatedSection>
          <div className="section-head">
            <p className="fine" style={{ maxWidth: '60ch' }}>
              Tell us about the workflow you want to improve and where work is stalling. We&apos;ll
              respond with a scoped bottleneck scan and a data-focused plan.
            </p>
            <p className="fine" style={{ maxWidth: '60ch' }}>
              We review every inquiry within 1 business day. If your workflow has the right data
              characteristics for a diagnostic, we&apos;ll respond with a scoping call and a brief
              data-viability checklist.
            </p>
            <p className="fine" style={{ maxWidth: '60ch' }}>
              No platform changes. Read-only access. NDA available. No long-term engagement
              required. If we don&apos;t find actionable constraints, you don&apos;t proceed.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="cta-box">
            <div>
              <div
                className="panel soft"
                style={{
                  border: 'none',
                  background: 'transparent',
                  boxShadow: 'none',
                  padding: 0,
                }}
              >
                <h3 style={{ marginBottom: 12 }}>What to include</h3>
                <div className="steps" style={{ marginTop: 0 }}>
                  <div className="step">
                    <div className="badge">
                      <i className="fa-solid fa-building" aria-hidden />
                    </div>
                    <div>
                      <b>Company + team</b>
                      <p className="fine">
                        Size, the systems involved (CRM/ERP/ticketing/spreadsheets), and stakeholders
                        (Ops, Finance, Sales Ops, Support leadership).
                      </p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="badge">
                      <i className="fa-solid fa-sitemap" aria-hidden />
                    </div>
                    <div>
                      <b>Process scope</b>
                      <p className="fine">
                        Order-to-cash, support, onboarding, fulfillment, procurement, or a specific
                        workflow.
                      </p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="badge">
                      <i className="fa-solid fa-bullseye" aria-hidden />
                    </div>
                    <div>
                      <b>Outcome target</b>
                      <p className="fine">
                        Cycle time reduction, throughput increase, cost savings, fewer missed
                        deadlines, or faster cash collection.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <form
              ref={formRef}
              className="form"
              id="contact-form"
              action="https://formspree.io/f/mzdzkroe"
              method="POST"
              onSubmit={handleSubmit}
            >
              <label>
                Name
                <input name="name" type="text" autoComplete="name" placeholder="Name" required />
              </label>
              <label>
                Work email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Work Email"
                  required
                />
              </label>
              <label>
                Company
                <input
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Company"
                />
              </label>
              <label>
                Describe the workflow and where work is stalling
                <textarea
                  name="message"
                  placeholder="Describe the workflow and where work is stalling"
                />
              </label>
              <button className="btn primary" type="submit">
                <i className="fa-solid fa-paper-plane" aria-hidden /> Request a Scan
              </button>
              <p
                className="fine"
                style={{ marginTop: 16, textAlign: 'center', color: 'rgba(199,206,217,0.6)' }}
              >
                Or reach us directly —{' '}
                <a
                  href="mailto:contact@alkhai.com?subject=Request%20a%20Bottleneck%20Scan"
                  style={{ color: 'var(--electric)' }}
                >
                  contact@alkhai.com
                </a>{' '}
                or{' '}
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{ color: 'var(--electric)' }}
                >
                  book a 30-minute intro
                </a>
              </p>
              <div
                className={`form-success${showSuccess ? ' show' : ''}`}
                id="form-success"
                role="status"
                aria-live="polite"
              >
                Thank you, we will contact you soon.
              </div>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
