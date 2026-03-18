// ============================================================
// RSS Sources Configuration — verified working feeds
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
  fallbackUrl?: string
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
    rssUrl: 'https://www.ekathimerini.com/feed/',       // updated path
    fallbackUrl: 'https://www.ekathimerini.com/rss.xml',
    trustScore: 95,
  },
  {
    id: 'kathimerini',
    name: 'Kathimerini',
    country: 'GR',
    language: 'el',
    flag: '🇬🇷',
    rssUrl: 'https://www.kathimerini.gr/feed/',          // updated path
    fallbackUrl: 'https://www.kathimerini.gr/rss.xml',
    trustScore: 90,
  },
  {
    id: 'travel_gr',
    name: 'Travel.gr',
    country: 'GR',
    language: 'el',
    flag: '🇬🇷',
    rssUrl: 'https://www.travel.gr/feed/',               // confirmed working
    trustScore: 85,
  },
  {
    id: 'protothema',
    name: 'Protothema',
    country: 'GR',
    language: 'el',
    flag: '🇬🇷',
    rssUrl: 'https://www.protothema.gr/rss/',            // fixed path (was /rss/travelling/)
    trustScore: 80,
  },

  // ─── 🇬🇧 UK (3 sources) ──────────────────────────────────────
  {
    id: 'guardian_travel',
    name: 'The Guardian Travel',
    country: 'UK',
    language: 'en',
    flag: '🇬🇧',
    rssUrl: 'https://www.theguardian.com/travel/rss',    // confirmed working
    trustScore: 95,
  },
  {
    id: 'independent_travel',
    name: 'The Independent Travel',                      // replaces Telegraph (403)
    country: 'UK',
    language: 'en',
    flag: '🇬🇧',
    rssUrl: 'https://www.independent.co.uk/travel/rss',
    fallbackUrl: 'https://www.independent.co.uk/rss',
    trustScore: 85,
  },
  {
    id: 'roughguides',
    name: 'Rough Guides',                                // replaces Lonely Planet (404)
    country: 'UK',
    language: 'en',
    flag: '🇬🇧',
    rssUrl: 'https://www.roughguides.com/feed/',
    trustScore: 82,
  },

  // ─── 🇩🇪 German (3 sources) ──────────────────────────────────
  {
    id: 'spiegel_reise',
    name: 'Spiegel Reise',
    country: 'DE',
    language: 'de',
    flag: '🇩🇪',
    rssUrl: 'https://www.spiegel.de/reise/index.rss',    // confirmed working
    trustScore: 93,
  },
  {
    id: 'stern_reise',
    name: 'Stern Reise',                                 // replaces Geo.de (404)
    country: 'DE',
    language: 'de',
    flag: '🇩🇪',
    rssUrl: 'https://www.stern.de/reise/rss.xml',
    fallbackUrl: 'https://www.stern.de/feed/rss.xml',
    trustScore: 82,
  },
  {
    id: 'faz_reise',
    name: 'FAZ Reise',                                   // replaces Reisereporter (404)
    country: 'DE',
    language: 'de',
    flag: '🇩🇪',
    rssUrl: 'https://www.faz.net/rss/aktuell/reise/',
    fallbackUrl: 'https://www.faz.net/aktuell/reise.rss',
    trustScore: 88,
  },

  // ─── 🇺🇸 US (3 sources) ──────────────────────────────────────
  {
    id: 'cntraveler',
    name: 'Condé Nast Traveler',
    country: 'US',
    language: 'en',
    flag: '🇺🇸',
    rssUrl: 'https://www.cntraveler.com/feed/rss',       // confirmed working
    trustScore: 92,
  },
  {
    id: 'fodors',
    name: "Fodor's Travel",                              // replaces T+L (403) and AFAR (403)
    country: 'US',
    language: 'en',
    flag: '🇺🇸',
    rssUrl: 'https://www.fodors.com/feed',
    fallbackUrl: 'https://www.fodors.com/rss.xml',
    trustScore: 83,
  },
  {
    id: 'frommers',
    name: "Frommer's Travel",
    country: 'US',
    language: 'en',
    flag: '🇺🇸',
    rssUrl: 'https://www.frommers.com/feed',
    trustScore: 80,
  },

  // ─── 🌍 Industry (2 sources) ─────────────────────────────────
  {
    id: 'skift',
    name: 'Skift',
    country: 'INDUSTRY',
    language: 'en',
    flag: '🌍',
    rssUrl: 'https://skift.com/feed/',                   // confirmed working
    trustScore: 95,
  },
  {
    id: 'travelweekly',
    name: 'Travel Weekly',                               // replaces Phocuswire (403)
    country: 'INDUSTRY',
    language: 'en',
    flag: '🌍',
    rssUrl: 'https://www.travelweekly.com/rss',
    fallbackUrl: 'https://www.travelweekly.com/feed',
    trustScore: 88,
  },
]

export const getSourcesByCountry = (country: Country) =>
  RSS_SOURCES.filter(s => s.country === country)

export const getNonEnglishSources = () =>
  RSS_SOURCES.filter(s => s.language !== 'en')
