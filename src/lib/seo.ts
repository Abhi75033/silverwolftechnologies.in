import { Metadata } from "next";

export const defaultSEO: Metadata = {
  metadataBase: new URL('https://www.silverwolftechnologies.in'),
  title: {
    default: 'Marketing Agency | Silver Wolf Technologies',
    template: '%s | Silver Wolf Technologies',
  },
  description: 'Silver Wolf Technologies is a full-service marketing agency offering SEO, paid ads, social media, and web development to drive traffic, leads, and growth.',
  keywords: [
    'web development company India',
    'SEO services India',
    'digital marketing agency India',
    'website design Maharashtra',
    'app development India',
    'Silver Wolf Technologies',
  ],
  authors: [{ name: 'Silver Wolf Technologies' }],
  creator: 'Silver Wolf Technologies',
  publisher: 'Silver Wolf Technologies',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.silverwolftechnologies.in',
    siteName: 'Silver Wolf Technologies',
    title: 'Marketing Agency | Silver Wolf Technologies',
    description: 'Silver Wolf Technologies is a full-service marketing agency offering SEO, paid ads, social media, and web development to drive traffic, leads, and growth.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Silver Wolf Technologies - Digital Agency India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing Agency | Silver Wolf Technologies',
    description: 'Silver Wolf Technologies is a full-service marketing agency offering SEO, paid ads, social media, and web development to drive traffic, leads, and growth.',
    images: ['/og-image.jpg'],
    creator: '@silverwolftech',
  },
  alternates: {
    canonical: 'https://www.silverwolftechnologies.in',
  },

};
