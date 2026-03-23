import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background:
            'linear-gradient(135deg, #0b1330 0%, #121B3A 45%, #1A2A54 100%)',
          color: 'white',
          padding: '72px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 20% 20%, rgba(91,140,255,0.35), transparent 35%), radial-gradient(circle at 80% 75%, rgba(61,220,151,0.2), transparent 30%)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: '32px',
            padding: '48px',
            background: 'rgba(255,255,255,0.04)',
          }}
        >
          <div style={{ display: 'flex', fontSize: 28, letterSpacing: 10, color: '#5B8CFF' }}>
            ALKHAI
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ fontSize: 64, lineHeight: 1.05, fontWeight: 700, maxWidth: 760 }}>
              Find and remove your operational bottleneck
            </div>
            <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.78)', maxWidth: 820 }}>
              Fixed-fee diagnostics grounded in real event-data evidence, ranked constraints, and an execution plan your team can act on immediately.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
