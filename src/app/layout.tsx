import type { Metadata, Viewport } from 'next';
import { Sora, Fraunces } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import GlobalParticleMesh from '@/components/graphics/GlobalParticleMesh';
import ProcessReport from '@/components/ProcessReport';

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sora',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  title: {
    default: 'Alkhai — Operational Intelligence',
    template: '%s | Alkhai',
  },
  description:
    'Alkhai helps businesses find and remove process bottlenecks using real event data and targeted automation.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  openGraph: {
    title: 'Alkhai — Operational Intelligence',
    description: 'Find and remove the bottlenecks bleeding time and money from your operations.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${fraunces.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className="divider-anim"
        style={{
          fontFamily: 'var(--font-sora), "Sora", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
        }}
      >
        <GlobalParticleMesh />
        <div className="blob one" aria-hidden="true" />
        <div className="blob two" aria-hidden="true" />
        <Nav />
        <main>{children}</main>
        <Footer />
        <ProcessReport />
      </body>
    </html>
  );
}
