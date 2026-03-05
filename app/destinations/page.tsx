import type { Metadata } from 'next'
import DestinationsClient from './DestinationsClient'

// ─── SEO METADATA ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Greece Destinations: Islands, Cities & Hidden Gems | Greek Trip Planner',
  description:
    'Explore every corner of Greece — from iconic Santorini and Athens to hidden Cycladic gems. Find the perfect Greek island or mainland destination for your trip.',
  keywords: [
    'greece destinations',
    'best places to visit in greece',
    'greek islands guide',
    'places to visit in greece',
    'greece travel guide',
    'santorini mykonos crete',
    'greek islands 2026',
  ],
  openGraph: {
    title: 'Greece Destinations: Islands, Cities & Hidden Gems',
    description:
      'Explore every corner of Greece — from iconic Santorini and Athens to hidden Cycladic gems.',
    url: 'https://greektriplanner.me/destinations',
    siteName: 'Greek Trip Planner',
    images: [
      {
        url: '/images/destinations/hero_section.jpg',
        width: 1200,
        height: 630,
        alt: 'Santorini blue domes — Greece destinations',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greece Destinations | Greek Trip Planner',
    description: 'Find your perfect Greek island or mainland destination.',
    images: ['/images/destinations/hero_section.jpg'],
  },
  alternates: {
    canonical: 'https://greektriplanner.me/destinations',
  },
}

// ─── SCHEMA MARKUP ────────────────────────────────────────────────────────────

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Greece Destinations',
  description:
    'Complete guide to all destinations in Greece — islands, cities, and hidden gems.',
  url: 'https://greektriplanner.me/destinations',
  publisher: {
    '@type': 'Organization',
    name: 'Greek Trip Planner',
    url: 'https://greektriplanner.me',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greektriplanner.me' },
      { '@type': 'ListItem', position: 2, name: 'Destinations', item: 'https://greektriplanner.me/destinations' },
    ],
  },
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function DestinationsPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* All UI is client-side for parallax + scroll-reveal */}
      <DestinationsClient />
    </>
  )
}
