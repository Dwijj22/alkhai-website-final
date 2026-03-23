'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="hero" style={{ minHeight: 'calc(100vh - 180px)', display: 'grid', alignItems: 'center' }}>
      <div className="container">
        <div className="panel" style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow" style={{ margin: '0 auto 18px' }}>
            <span className="dot" />
            Error
          </div>
          <h1 style={{ marginBottom: 14 }}>The page hit an unexpected constraint.</h1>
          <p className="fine" style={{ maxWidth: '54ch', margin: '0 auto 24px' }}>
            Try reloading the page. If the issue persists, contact Alkhai and include the page you
            were visiting.
          </p>
          <button className="btn primary" type="button" onClick={() => reset()}>
            Try Again
          </button>
        </div>
      </div>
    </section>
  );
}
