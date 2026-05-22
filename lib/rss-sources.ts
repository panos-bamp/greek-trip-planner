// ============================================================
// RSS Sources Configuration
// Total: 20 active sources across 8 markets (was 32)
//
// 2026-05-22 audit: 12 dead feeds removed after Vercel timeout caused by
// HTTP 403/404/410/timeout errors on dead endpoints. Removed:
//   • Greek (4): gazzeta, cnn_gr, skai, capital_gr
//   • UK (2):    roughguides, ttg_media
//   • DE (1):    stern_reise
//   • US (1):    forbes_travel
//   • FR (1):    routard
//   • IT (1):    turismo_it
//   • AU (1):    traveller_au  (entire AU section temporarily empty)
//   • Industry (1): travelweekly
// Fixed (URL drift): ekathimerini, kathimerini → now use FeedBurner / direct CMS feed
// ============================================================

export type Country =
  | 'GR'         // Greece
  | 'UK'         // United Kingdom
  | 'DE'         // Germany
  | 'US'         // United States
  | 'NO'         // Norway (top spender per capita)
  | 'FR'         // France (major source market)
  | 'IT'         // Italy (growing source market)
  | 'AU'         // Australia (high-spend long-haul)
  | 'INDUSTRY'   // Travel trade / industry

export type Language = 'en' | 'el' | 'de' | 'no' | 'fr' | 'it'

export interface RSSSource {
  id: string
  name: string
  country: Country
  language: Language
  flag: string
  rssUrl: string
  fallbackUrl?: string
  trustScore: number
  // Focus hint for relevance scoring
  focus?: 'travel' | 'news' | 'business' | 'industry'
}

export const RSS_SOURCES: RSSSource[] = [

  // ─── 🇬🇷 Greek (10 sources) ──────────────────────────────────
  // English-language first — scored directly
  // Greek-language — decoded + translated by processor before scoring

  {
    id: 'ekathimerini',
    name: 'Ekathimerini',
    country: 'GR',
    language: 'en',
    flag: '🇬🇷',
    // Direct CMS feed (confirmed live May 2026). FeedBurner kept as fallback.
    rssUrl: 'https://www.ekathimerini.com/infeeds/rss/nx-rss-feed.xml',
    fallbackUrl: 'https://feeds.feedburner.com/ekathimerini/sKip',
    trustScore: 95,
    focus: 'news',
  },
  {
    id: 'kathimerini',
    name: 'Kathimerini',
    country: 'GR',
    language: 'el',
    flag: '🇬🇷',
    // FeedBurner URL (confirmed live May 2026). Both original URLs return 410/404.
    rssUrl: 'https://feeds.feedburner.com/kathimerini',
    trustScore: 90,
    focus: 'news',
  },
  {
    id: 'travel_gr',
    name: 'Travel.gr',
    country: 'GR',
    language: 'el',
    flag: '🇬🇷',
    rssUrl: 'https://www.travel.gr/feed/',
    trustScore: 88,
    focus: 'travel',
  },
  {
    id: 'protothema',
    name: 'Protothema',
    country: 'GR',
    language: 'el',
    flag: '🇬🇷',
    rssUrl: 'https://www.protothema.gr/rss/',
    trustScore: 80,
    focus: 'news',
  },
  {
    id: 'iefimerida',
    name: 'iefimerida.gr',
    country: 'GR',
    language: 'el',
    flag: '🇬🇷',
    rssUrl: 'https://www.iefimerida.gr/feed',
    fallbackUrl: 'https://www.iefimerida.gr/rss.xml',
    trustScore: 78,
    focus: 'news',
  },
  {
    id: 'newmoney',
    name: 'NewMoney.gr',
    country: 'GR',
    language: 'el',
    flag: '🇬🇷',
    rssUrl: 'https://www.newmoney.gr/feed/',
    trustScore: 80,
    focus: 'business',  // covers tourism economics, hotel investment, sector revenue
  },
  // ─ REMOVED 2026-05-22: dead feeds (see comment block below) ─
  // gazzeta — feed times out
  // cnn_gr — both URLs return 404
  // skai — both URLs return 404
  // capital_gr — 403/404 (likely Cloudflare-walled, won't return without proxy)

  // ─── 🇬🇧 UK (4 sources) ──────────────────────────────────────

  {
    id: 'guardian_travel',
    name: 'The Guardian Travel',
    country: 'UK',
    language: 'en',
    flag: '🇬🇧',
    rssUrl: 'https://www.theguardian.com/travel/rss',
    trustScore: 95,
    focus: 'travel',
  },
  {
    id: 'independent_travel',
    name: 'The Independent Travel',
    country: 'UK',
    language: 'en',
    flag: '🇬🇧',
    rssUrl: 'https://www.independent.co.uk/travel/rss',
    fallbackUrl: 'https://www.independent.co.uk/rss',
    trustScore: 85,
    focus: 'travel',
  },
  // ─ REMOVED 2026-05-22: roughguides (404), ttg_media (404 both URLs) ─

  // ─── 🇩🇪 German (3 sources) ──────────────────────────────────

  {
    id: 'spiegel_reise',
    name: 'Spiegel Reise',
    country: 'DE',
    language: 'de',
    flag: '🇩🇪',
    rssUrl: 'https://www.spiegel.de/reise/index.rss',
    trustScore: 93,
    focus: 'travel',
  },
  // ─ REMOVED 2026-05-22: stern_reise — both URLs return 404 ─
  {
    id: 'faz_reise',
    name: 'FAZ Reise',
    country: 'DE',
    language: 'de',
    flag: '🇩🇪',
    rssUrl: 'https://www.faz.net/rss/aktuell/reise/',
    fallbackUrl: 'https://www.faz.net/aktuell/reise.rss',
    trustScore: 88,
    focus: 'travel',
  },

  // ─── 🇺🇸 US (4 sources) ──────────────────────────────────────

  {
    id: 'cntraveler',
    name: 'Condé Nast Traveler',
    country: 'US',
    language: 'en',
    flag: '🇺🇸',
    rssUrl: 'https://www.cntraveler.com/feed/rss',
    trustScore: 92,
    focus: 'travel',
  },
  {
    id: 'fodors',
    name: "Fodor's Travel",
    country: 'US',
    language: 'en',
    flag: '🇺🇸',
    rssUrl: 'https://www.fodors.com/feed',
    fallbackUrl: 'https://www.fodors.com/rss.xml',
    trustScore: 83,
    focus: 'travel',
  },
  {
    id: 'frommers',
    name: "Frommer's Travel",
    country: 'US',
    language: 'en',
    flag: '🇺🇸',
    rssUrl: 'https://www.frommers.com/feed',
    trustScore: 80,
    focus: 'travel',
  },
  // ─ REMOVED 2026-05-22: forbes_travel — 403 (Cloudflare-walled, needs proxy) ─

  // ─── 🇳🇴 Norway (2 sources) ──────────────────────────────────
  // Highest per-capita spending of all Scandinavian markets
  // Norwegian-language — translated by processor before scoring

  {
    id: 'vg_reise',
    name: 'VG Reise',             // Norway's largest newspaper travel section
    country: 'NO',
    language: 'no',
    flag: '🇳🇴',
    rssUrl: 'https://www.vg.no/rss/feed/?categories=reise',
    fallbackUrl: 'https://www.vg.no/rss/feed/',
    trustScore: 85,
    focus: 'travel',
  },
  {
    id: 'aftenposten_reise',
    name: 'Aftenposten Reise',    // Norway's most authoritative broadsheet
    country: 'NO',
    language: 'no',
    flag: '🇳🇴',
    rssUrl: 'https://www.aftenposten.no/rss',
    trustScore: 88,
    focus: 'travel',
  },

  // ─── 🇫🇷 French (2 sources) ──────────────────────────────────
  // France is Greece's 4th largest source market by volume

  {
    id: 'lefigaro_voyages',
    name: 'Le Figaro Voyages',
    country: 'FR',
    language: 'fr',
    flag: '🇫🇷',
    rssUrl: 'https://www.lefigaro.fr/rss/figaro_voyages.xml',
    fallbackUrl: 'https://www.lefigaro.fr/rss/figaro_international.xml',
    trustScore: 88,
    focus: 'travel',
  },
  // ─ REMOVED 2026-05-22: routard — 404 ─

  // ─── 🇮🇹 Italian (2 sources) ─────────────────────────────────
  // Italy is a growing source market — Italians are Greece's closest European neighbours

  {
    id: 'corriere_viaggi',
    name: 'Corriere Viaggi',      // Italy's top travel supplement
    country: 'IT',
    language: 'it',
    flag: '🇮🇹',
    rssUrl: 'https://www.corriere.it/rss/viaggi.xml',
    trustScore: 85,
    focus: 'travel',
  },
  // ─ REMOVED 2026-05-22: turismo_it — both URLs return 410 (gone permanently) ─

  // ─── 🇦🇺 Australia ────────────────────────────────────────────
  // REMOVED 2026-05-22: traveller_au — both URLs 404. AU coverage temporarily
  // suspended. Skift and eTurboNews still cover the AU→Greece market.
  // TODO: find replacement (escape.com.au, news.com.au/travel)

  // ─── 🌍 Industry ─────────────────────────────────────────────
  // Travel trade, hotel industry, aviation, tourism research

  {
    id: 'skift',
    name: 'Skift',
    country: 'INDUSTRY',
    language: 'en',
    flag: '🌍',
    rssUrl: 'https://skift.com/feed/',
    trustScore: 95,
    focus: 'industry',
  },
  // ─ REMOVED 2026-05-22: travelweekly — 403 both URLs (Cloudflare-walled) ─
  {
    id: 'eturbonews',
    name: 'eTurboNews',           // daily global tourism trade wire — Greece coverage is strong
    country: 'INDUSTRY',
    language: 'en',
    flag: '🌍',
    rssUrl: 'https://eturbonews.com/feed/',
    trustScore: 80,
    focus: 'industry',
  },
  {
    id: 'tornos_news',
    name: 'Tornos News',          // THE dedicated Greek tourism trade news site (English)
    country: 'INDUSTRY',
    language: 'en',
    flag: '🌍',
    rssUrl: 'https://www.tornosnews.gr/en/feed/',
    fallbackUrl: 'https://www.tornosnews.gr/feed/',
    trustScore: 92,
    focus: 'industry',  // specifically focused on Greek tourism — extremely high signal
  },
]

// ─── Helpers ──────────────────────────────────────────────────

export const getSourcesByCountry = (country: Country) =>
  RSS_SOURCES.filter(s => s.country === country)

export const getNonEnglishSources = () =>
  RSS_SOURCES.filter(s => s.language !== 'en')

export const getSourceStats = () => {
  const byCountry = RSS_SOURCES.reduce((acc, s) => {
    acc[s.country] = (acc[s.country] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  return {
    total: RSS_SOURCES.length,
    byCountry,
    nonEnglish: getNonEnglishSources().length,
  }
}
