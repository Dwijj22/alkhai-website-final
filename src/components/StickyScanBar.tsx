'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StickyScanBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function onScroll() {
      const shouldShow = window.scrollY > 600;
      if (!shouldShow) {
        setDismissed(false);
      }
      setVisible(shouldShow && !dismissed);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  if (!visible) return null;

  return (
    <div className="sticky-scan-bar" role="complementary" aria-label="Request a scan">
      <div className="sticky-scan-copy">
        <span className="sticky-scan-kicker">Find your bottleneck in 30 days.</span>
      </div>
      <div className="sticky-scan-actions">
        <Link className="btn primary" href="/contact">
          <i className="fa-solid fa-bolt" aria-hidden />
          Request a Scan
        </Link>
        <button
          type="button"
          className="sticky-scan-close"
          aria-label="Dismiss request a scan bar"
          onClick={() => setDismissed(true)}
        >
          <i className="fa-solid fa-xmark" aria-hidden />
        </button>
      </div>
    </div>
  );
}
