'use client';

import Link from 'next/link';
import Image from 'next/image';
import alkhaiLogoBlue from '../../AlkhaiLogoBlue.jpeg';

export default function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <div className="footer-top">
          <Link href="/" aria-label="Back to home" className="footer-brand">
            <Image src={alkhaiLogoBlue} alt="Alkhai logo" width={120} />
          </Link>
          <span className="footer-meta">
            © {new Date().getFullYear()} ALKHAI — Operational Process Intelligence
          </span>
        </div>

        <div className="footer-links">
          <a className="link-chip" href="mailto:contact@alkhai.com">contact@alkhai.com</a>
          <a
            className="link-chip"
            href="https://www.linkedin.com/company/alkhai/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin" aria-hidden /> LinkedIn
          </a>
          <Link className="link-chip" href="/privacy">Privacy</Link>
          <Link className="link-chip" href="/terms">Terms</Link>
          <span className="link-chip">© {new Date().getFullYear()} ALKHAI</span>
        </div>
      </div>
    </footer>
  );
}
