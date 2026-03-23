'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import alkhaiLogoBlue from '../../AlkhaiLogoBlue.jpeg';

const NAV_LINKS = [
  { label: 'Deliverables', href: '/deliverables' },
  { label: 'Bottleneck Scan', href: '/scan' },
  { label: 'Why Alkhai', href: '/why-alkhai' },
  { label: 'About Us', href: '/about' },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false);
    }

    if (menuOpen) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <motion.header
      className="nav"
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 0.72, 0.25, 1] }}
    >
      <div className="container nav-inner">
        <Link className="brand" href="/" aria-label="Alkhai Home">
          <Image src={alkhaiLogoBlue} alt="Alkhai logo" width={132} priority />
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

        <button
          type="button"
          className="mobile-nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden />
        </button>
      </div>

      <div
        className={`mobile-nav-overlay${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />
      <aside id="mobile-nav-drawer" className={`mobile-nav-drawer${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-nav-head">
          <span>Navigation</span>
          <button
            type="button"
            className="mobile-nav-close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-xmark" aria-hidden />
          </button>
        </div>
        <nav className="mobile-nav-links" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''}>
              {link.label}
            </Link>
          ))}
          <Link href="/contact">Contact Us</Link>
          <Link className="btn primary mobile-nav-primary" href="/scan">
            <i className="fa-solid fa-bolt" aria-hidden />
            Request a Scan
          </Link>
        </nav>
      </aside>
    </motion.header>
  );
}
