'use client';

const ITEMS = [
  'CRM', 'ERP', 'Ticketing / Support', 'Email / Spreadsheets',
  'E-commerce', 'Accounting', 'QuickBooks', 'Shopify',
  'Excel/CSVs', 'Salesforce/CRM',
];

export default function MarqueeBar() {
  return (
    <div className="marquee-container">
      <div className="marquee-track">
        <div className="marquee-content">
          {ITEMS.map((item, i) => (
            <span key={`a-${i}`} className="marquee-item">{item}</span>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {ITEMS.map((item, i) => (
            <span key={`b-${i}`} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
