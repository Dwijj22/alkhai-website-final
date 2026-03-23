'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <div className="footer-left">
          <Link href="/" aria-label="Back to home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Alkhai_Footer.png" alt="Alkhai logo" style={{ width: 120, height: 'auto', opacity: 0.92 }} />
          </Link>
          <span>© 2025 Alkhai — Operational Intelligence</span>
        </div>
        <div className="footer-links">
          <Link className="link-chip" href="/deliverables">Deliverables</Link>
          <Link className="link-chip" href="/scan">Bottleneck Scan</Link>
          <Link className="link-chip" href="/why-alkhai">Why Alkhai</Link>
          <Link className="link-chip" href="/about">About Us</Link>
          <Link className="link-chip" href="/team">Our Team</Link>
          <Link className="link-chip" href="/contact">Contact</Link>
          <a className="link-chip" href="mailto:contact@alkhai.com">contact@alkhai.com</a>
          <a
            className="link-chip"
            href="https://www.linkedin.com/company/alkhai/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin" aria-hidden /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
