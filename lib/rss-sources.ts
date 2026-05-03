// ============================================================
// RSS Sources Configuration
// Total: 38 sources across 9 markets
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
    rssUrl: 'https://www.ekathimerini.com/feed/',
    fallbackUrl: 'https://www.ekathimerini.com/rss.xml',
    trustScore: 95,
    focus: 'news',
  },
  {
    id: 'kathimerini',
    name: 'Kathimerini',
    country: 'GR',
    language: 'el',
    flag: '🇬🇷',
    rssUrl: 'https://www.kathimerini.gr/feed/',
    fallbackUrl: 'https://www.kathimerini.gr/rss.xml',
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
  {
    id: 'gazzeta',
    name: 'Gazzeta.gr',
    country: 'GR',
    language: 'el',
    flag: '🇬🇷',
    rssUrl: 'https://www.gazzeta.gr/feed/',
    trustScore: 72,
    focus: 'news',
  },
  {
    id: 'cnn_gr',
    name: 'CNN Greece',
    country: 'GR',
    language: 'el',
    flag: '🇬🇷',
    rssUrl: 'https://www.cnn.gr/rss',
    fallbackUrl: 'https://www.cnn.gr/feed',
    trustScore: 80,
    focus: 'news',
  },
  {
    id: 'skai',
    name: 'Skai.gr',
    country: 'GR',
    language: 'el',
    flag: '🇬🇷',
    rssUrl: 'https://www.skai.gr/feed/rss-news',
    fallbackUrl: 'https://www.skai.gr/rss',
    trustScore: 82,
    focus: 'news',
  },
  {
    id: 'capital_gr',
    name: 'Capital.gr',
    country: 'GR',
    language: 'el',
    flag: '🇬🇷',
    rssUrl: 'https://www.capital.gr/rss',
    fallbackUrl: 'https://www.capital.gr/feed',
    trustScore: 82,
    focus: 'business',  // financial/business — strong on tourism revenue, investment
  },

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
  {
    id: 'roughguides',
    name: 'Rough Guides',
    country: 'UK',
    language: 'en',
    flag: '🇬🇧',
    rssUrl: 'https://www.roughguides.com/feed/',
    trustScore: 82,
    focus: 'travel',
  },
  {
    id: 'ttg_media',
    name: 'TTG Media',           // UK travel trade — tour operators, retail travel
    country: 'UK',
    language: 'en',
    flag: '🇬🇧',
    rssUrl: 'https://www.ttgmedia.com/rss',
    fallbackUrl: 'https://www.ttgmedia.com/feed',
    trustScore: 88,
    focus: 'industry',
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
    focus: 'travel',
  },
  {
    id: 'stern_reise',
    name: 'Stern Reise',
    country: 'DE',
    language: 'de',
    flag: '🇩🇪',
    rssUrl: 'https://www.stern.de/reise/rss.xml',
    fallbackUrl: 'https://www.stern.de/feed/rss.xml',
    trustScore: 82,
    focus: 'travel',
  },
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
  {
    id: 'forbes_travel',
    name: 'Forbes Travel',        // covers luxury travel, hotel openings, market data
    country: 'US',
    language: 'en',
    flag: '🇺🇸',
    rssUrl: 'https://www.forbes.com/travel/feed/',
    fallbackUrl: 'https://www.forbes.com/sites/travel/feed/',
    trustScore: 87,
    focus: 'travel',
  },

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
  {
    id: 'routard',
    name: 'Le Routard',           // France's most-read travel guide brand
    country: 'FR',
    language: 'fr',
    flag: '🇫🇷',
    rssUrl: 'https://www.routard.com/rss/rss.xml',
    trustScore: 82,
    focus: 'travel',
  },

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
  {
    id: 'turismo_it',
    name: 'Turismo.it',
    country: 'IT',
    language: 'it',
    flag: '🇮🇹',
    rssUrl: 'https://www.turismo.it/rss.xml',
    fallbackUrl: 'https://www.turismo.it/feed/',
    trustScore: 75,
    focus: 'travel',
  },

  // ─── 🇦🇺 Australia (1 source) ────────────────────────────────
  // Australians avg €958/trip to Greece — highest-spending long-haul market

  {
    id: 'traveller_au',
    name: 'Traveller (Aus)',      // Australia's most-read travel publication
    country: 'AU',
    language: 'en',
    flag: '🇦🇺',
    rssUrl: 'https://www.traveller.com.au/rss.xml',
    fallbackUrl: 'https://www.smh.com.au/travel/feed.xml',
    trustScore: 82,
    focus: 'travel',
  },

  // ─── 🌍 Industry (4 sources) ─────────────────────────────────
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
  {
    id: 'travelweekly',
    name: 'Travel Weekly',
    country: 'INDUSTRY',
    language: 'en',
    flag: '🌍',
    rssUrl: 'https://www.travelweekly.com/rss',
    fallbackUrl: 'https://www.travelweekly.com/feed',
    trustScore: 88,
    focus: 'industry',
  },
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
