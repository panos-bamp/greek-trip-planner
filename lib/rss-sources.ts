// ============================================================
// RSS Sources Configuration
// 15 curated sources across 5 markets
// Add new sources here — no other file needs to change
// ============================================================

export type Country = 'GR' | 'UK' | 'DE' | 'US' | 'INDUSTRY'
export type Language = 'en' | 'el' | 'de'

export interface RSSSource {
  id: string
  name: string
  country: Country
  language: Language
  flag: string
  rssUrl: string
  // Optional: fallback scrape URL if RSS fails
  fallbackUrl?: string
  // Weight for relevance (higher = more trusted source)
  trustScore: number
}

export const RSS_SOURCES: RSSSource[] = [
  // ─── 🇬🇷 Greek (4 sources) ───────────────────────────────────
  {
    id: 'ekathimerini',
    name: 'Ekathimerini',
    country: 'GR',
    language: 'en',
    flag: '🇬🇷',
    rssUrl: 'https://www.ekathimerini.com/rss/',
    trustScore: 95,
  },
  {
    id: 'kathimerini',
    name: 'Kathimerini',
    country: 'GR',
    language: 'el',
    flag: '🇬🇷',
    rssUrl: 'https://www.kathimerini.gr/rss/',
    trustScore: 90,
  },
  {
    id: 'travel_gr',
    name: 'Travel.gr',
    country: 'GR',
    language: 'el',
    flag: '🇬🇷',
    rssUrl: 'https://www.travel.gr/feed/',
    trustScore: 85,
  },
  {
    id: 'protothema',
    name: 'Protothema Travel',
    country: 'GR',
    language: 'el',
    flag: '🇬🇷',
    rssUrl: 'https://www.protothema.gr/rss/travelling/',
    fallbackUrl: 'https://www.protothema.gr/rss/',
    trustScore: 80,
  },

  // ─── 🇬🇧 UK (3 sources) ──────────────────────────────────────
  {
    id: 'guardian_travel',
    name: 'The Guardian Travel',
    country: 'UK',
    language: 'en',
    flag: '🇬🇧',
    rssUrl: 'https://www.theguardian.com/travel/rss',
    trustScore: 95,
  },
  {
    id: 'telegraph_travel',
    name: 'Telegraph Travel',
    country: 'UK',
    language: 'en',
    flag: '🇬🇧',
    rssUrl: 'https://www.telegraph.co.uk/rss.xml',
    trustScore: 88,
  },
  {
    id: 'lonelyplanet',
    name: 'Lonely Planet',
    country: 'UK',
    language: 'en',
    flag: '🇬🇧',
    rssUrl: 'https://www.lonelyplanet.com/news/feed',
    fallbackUrl: 'https://www.lonelyplanet.com/feed',
    trustScore: 92,
  },

  // ─── 🇩🇪 German (3 sources) ──────────────────────────────────
  {
    id: 'spiegel_reise',
    name: 'Spiegel Reise',
    country: 'DE',
    language: 'de',
    flag: '🇩🇪',
    rssUrl: 'https://www.spiegel.de/reise/index.rss',
    trustScore: 93,
  },
  {
    id: 'geo_reise',
    name: 'Geo.de Reisen',
    country: 'DE',
    language: 'de',
    flag: '🇩🇪',
    rssUrl: 'https://www.geo.de/rss',
    trustScore: 85,
  },
  {
    id: 'reisereporter',
    name: 'Reisereporter',
    country: 'DE',
    language: 'de',
    flag: '🇩🇪',
    rssUrl: 'https://www.reisereporter.de/feed/',
    trustScore: 78,
  },

  // ─── 🇺🇸 US (3 sources) ──────────────────────────────────────
  {
    id: 'cntraveler',
    name: 'Condé Nast Traveler',
    country: 'US',
    language: 'en',
    flag: '🇺🇸',
    rssUrl: 'https://www.cntraveler.com/feed/rss',
    trustScore: 92,
  },
  {
    id: 'travelandleisure',
    name: 'Travel + Leisure',
    country: 'US',
    language: 'en',
    flag: '🇺🇸',
    rssUrl: 'https://www.travelandleisure.com/rss/all.rss',
    trustScore: 90,
  },
  {
    id: 'afar',
    name: 'AFAR Magazine',
    country: 'US',
    language: 'en',
    flag: '🇺🇸',
    rssUrl: 'https://www.afar.com/magazine/rss/recent',
    fallbackUrl: 'https://www.afar.com/feeds/afar.rss',
    trustScore: 85,
  },

  // ─── 🌍 Industry (2 sources) ─────────────────────────────────
  {
    id: 'skift',
    name: 'Skift',
    country: 'INDUSTRY',
    language: 'en',
    flag: '🌍',
    rssUrl: 'https://skift.com/feed/',
    trustScore: 95,
  },
  {
    id: 'phocuswire',
    name: 'Phocuswire',
    country: 'INDUSTRY',
    language: 'en',
    flag: '🌍',
    rssUrl: 'https://www.phocuswire.com/rss',
    trustScore: 90,
  },
]

// Helper: get sources by country
export const getSourcesByCountry = (country: Country) =>
  RSS_SOURCES.filter(s => s.country === country)

// Helper: get all non-English sources (need translation)
export const getNonEnglishSources = () =>
  RSS_SOURCES.filter(s => s.language !== 'en')
