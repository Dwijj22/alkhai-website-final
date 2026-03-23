'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Deliverables', href: '/deliverables' },
  { label: 'Bottleneck Scan', href: '/scan' },
  { label: 'Why Alkhai', href: '/why-alkhai' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Team', href: '/team' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <motion.header
      className="nav"
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 0.72, 0.25, 1] }}
    >
      <div className="container nav-inner">
        <Link className="brand" href="/" aria-label="Alkhai Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ALKHAI.png" alt="Alkhai logo" style={{ width: 132, height: 'auto', opacity: 0.95 }} />
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-cta">
          <Link
            className={`btn ghost${pathname === '/contact' ? ' active-cta' : ''}`}
            href="/contact"
          >
            <i className="fa-solid fa-envelope" aria-hidden />
            Contact Us
          </Link>
          <Link className="btn primary" href="/scan">
            <i className="fa-solid fa-bolt" aria-hidden />
            Request a Scan
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
