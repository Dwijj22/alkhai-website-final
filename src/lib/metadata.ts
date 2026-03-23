import type { Metadata } from 'next';
import { DEFAULT_OG_DESCRIPTION, SITE_URL } from '@/lib/constants';

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const url = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Alkhai',
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Alkhai social preview' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-image'],
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Alkhai | Operational Intelligence',
    template: '%s | Alkhai',
  },
  description: DEFAULT_OG_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Alkhai | Operational Intelligence',
    description: DEFAULT_OG_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Alkhai',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Alkhai social preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alkhai | Operational Intelligence',
    description: DEFAULT_OG_DESCRIPTION,
    images: ['/twitter-image'],
  },
};
