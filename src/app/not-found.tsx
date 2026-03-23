import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="hero" style={{ minHeight: 'calc(100vh - 180px)', display: 'grid', alignItems: 'center' }}>
      <div className="container">
        <div className="panel" style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow" style={{ margin: '0 auto 18px' }}>
            <span className="dot" />
            Not Found
          </div>
          <h1 style={{ marginBottom: 14 }}>That page is not in the workflow.</h1>
          <p className="fine" style={{ maxWidth: '54ch', margin: '0 auto 24px' }}>
            The link may be outdated or the page may have moved. Start from the homepage or go
            directly to the bottleneck scan page.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link className="btn primary" href="/">
              Return Home
            </Link>
            <Link className="btn ghost" href="/scan">
              Bottleneck Scan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
