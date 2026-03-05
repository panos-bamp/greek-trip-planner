// ─── TYPES ──────────────────────────────────────────────────────────────────

export type HeroDestination = {
  name: string
  tagline: string
  slug: string
  image: string
  badge: string
  badgeColor: string
  guides: number
  featured?: boolean
}

export type IslandGroup = {
  name: string
  icon: string
  description: string
  color: string
  headerImage: string
  destinations: { name: string; slug: string; vibe: string }[]
}

export type MainlandRegion = {
  region: string
  color: string
  icon: string
  destinations: { name: string; slug: string; desc: string }[]
}

export type HiddenGem = {
  name: string
  slug: string
  why: string
  image: string
  emoji: string
}

// ─── DATA ───────────────────────────────────────────────────────────────────

export const heroDestinations: HeroDestination[] = [
  {
    name: 'Santorini',
    tagline: 'Caldera views & volcanic drama',
    slug: 'santorini',
    image: '/images/destinations/santorini_d.jpg',
    badge: 'Most Iconic',
    badgeColor: '#FF5635',
    guides: 8,
    featured: true,
  },
  {
    name: 'Athens',
    tagline: 'Cradle of civilization',
    slug: 'athens',
    image: '/images/destinations/athens_d.jpg',
    badge: 'Must Visit',
    badgeColor: '#2C73FF',
    guides: 6,
  },
  {
    name: 'Mykonos',
    tagline: 'Glamour, beaches & nightlife',
    slug: 'mykonos',
    image: '/images/destinations/mykonos_d.jpg',
    badge: 'Party Capital',
    badgeColor: '#FF5635',
    guides: 6,
  },
  {
    name: 'Crete',
    tagline: 'Beaches, gorges & Minoan history',
    slug: 'crete',
    image: '/images/destinations/crete_d.jpg',
    badge: 'Largest Island',
    badgeColor: '#27AE60',
    guides: 14,
  },
  {
    name: 'Rhodes',
    tagline: 'Medieval walled city & sun',
    slug: 'rhodes',
    image: '/images/destinations/rhodes_d.jpg',
    badge: 'History & Beach',
    badgeColor: '#8E44AD',
    guides: 5,
  },
  {
    name: 'Corfu',
    tagline: 'Lush green hills & Venetian charm',
    slug: 'corfu',
    image: '/images/destinations/corfu_d.jpg',
    badge: 'Most Lush',
    badgeColor: '#27AE60',
    guides: 6,
  },
]

export const islandGroups: IslandGroup[] = [
  {
    name: 'Cyclades',
    icon: '🌊',
    description: 'White-cube villages, azure domes, and the Aegean\'s most dramatic scenery.',
    color: '#2C73FF',
    headerImage: '/images/destinations/cyclades_d.jpg',
    destinations: [
      { name: 'Paros', slug: 'paros', vibe: 'Laid-back & stylish' },
      { name: 'Naxos', slug: 'naxos', vibe: 'Beaches & mountains' },
      { name: 'Milos', slug: 'milos', vibe: 'Volcanic & unique' },
      { name: 'Ios', slug: 'ios', vibe: 'Party & pristine' },
      { name: 'Folegandros', slug: 'folegandros', vibe: 'Unspoiled & clifftop' },
      { name: 'Sifnos', slug: 'sifnos', vibe: 'Gastronomy & hiking' },
      { name: 'Tinos', slug: 'tinos', vibe: 'Pilgrimage & marble' },
      { name: 'Syros', slug: 'syros', vibe: 'Capital & neoclassical' },
      { name: 'Amorgos', slug: 'amorgos', vibe: 'Wild & cinematic' },
      { name: 'Antiparos', slug: 'antiparos', vibe: 'Tiny & celebrity' },
      { name: 'Serifos', slug: 'serifos', vibe: 'Authentic & rugged' },
      { name: 'Andros', slug: 'andros', vibe: 'Hiking & waterfalls' },
    ],
  },
  {
    name: 'Ionian Islands',
    icon: '🌿',
    description: 'Lush, green, and Venetian-influenced — Greece\'s most dramatic sunsets.',
    color: '#27AE60',
    headerImage: '/images/destinations/corfu_d.jpg',
    destinations: [
      { name: 'Zakynthos', slug: 'zakynthos', vibe: 'Shipwreck & turtles' },
      { name: 'Kefalonia', slug: 'kefalonia', vibe: 'Rugged & cinematic' },
      { name: 'Lefkada', slug: 'lefkada', vibe: 'Lagoons & kite surf' },
      { name: 'Paxos', slug: 'paxos', vibe: 'Tiny & chic' },
      { name: 'Ithaca', slug: 'ithaca', vibe: 'Homeric & serene' },
      { name: 'Corfu', slug: 'corfu', vibe: 'Lush & Venetian' },
    ],
  },
  {
    name: 'Dodecanese',
    icon: '⚓',
    description: 'Crusader castles, Turkish bathhouses, and the bluest water in Greece.',
    color: '#8E44AD',
    headerImage: '/images/destinations/Dodecanese_d.jpg',
    destinations: [
      { name: 'Rhodes', slug: 'rhodes', vibe: 'Medieval & beaches' },
      { name: 'Kos', slug: 'kos', vibe: 'Hippocrates & beach' },
      { name: 'Patmos', slug: 'patmos', vibe: 'Biblical & mystical' },
      { name: 'Symi', slug: 'symi', vibe: 'Pastel neoclassical' },
      { name: 'Karpathos', slug: 'karpathos', vibe: 'Traditional & windy' },
      { name: 'Kalymnos', slug: 'kalymnos', vibe: 'Rock climbing mecca' },
      { name: 'Kastellorizo', slug: 'kastellorizo', vibe: 'Tiny & legendary' },
      { name: 'Leros', slug: 'leros', vibe: 'Art deco & calm' },
    ],
  },
  {
    name: 'Saronic Gulf',
    icon: '⛵',
    description: 'A quick ferry from Athens — the perfect intro to island life.',
    color: '#C0392B',
    headerImage: '/images/destinations/saronic_d.jpg',
    destinations: [
      { name: 'Hydra', slug: 'hydra', vibe: 'Car-free & artistic' },
      { name: 'Aegina', slug: 'aegina', vibe: 'Temple & pistachios' },
      { name: 'Spetses', slug: 'spetses', vibe: 'Pine-scented & elegant' },
      { name: 'Poros', slug: 'poros', vibe: 'Lemon groves & easy' },
      { name: 'Agistri', slug: 'agistri', vibe: 'Pine & budget-friendly' },
    ],
  },
]

export const mainlandRegions: MainlandRegion[] = [
  {
    region: 'Athens & Around',
    color: '#2C73FF',
    icon: '🏛️',
    destinations: [
      { name: 'Athens', slug: 'athens', desc: 'Acropolis, street art & world-class food' },
      { name: 'Delphi', slug: 'delphi', desc: 'Oracle of the ancient world' },
      { name: 'Meteora', slug: 'meteora', desc: 'Monasteries atop rock pillars' },
    ],
  },
  {
    region: 'Thessaloniki & North',
    color: '#8E44AD',
    icon: '⭐',
    destinations: [
      { name: 'Thessaloniki', slug: 'thessaloniki', desc: 'Best food city in Greece' },
      { name: 'Halkidiki', slug: 'halkidiki', desc: 'Three-pronged beach paradise' },
    ],
  },
  {
    region: 'Peloponnese',
    color: '#C0392B',
    icon: '⛰️',
    destinations: [
      { name: 'Nafplio', slug: 'nafplio', desc: 'Most romantic town in Greece' },
      { name: 'Olympia', slug: 'olympia', desc: 'Birthplace of the Olympic Games' },
      { name: 'Epidaurus', slug: 'epidaurus', desc: 'Perfect ancient theatre' },
      { name: 'Mycenae', slug: 'mycenae', desc: 'Bronze Age citadel of legend' },
      { name: 'Monemvasia', slug: 'monemvasia', desc: 'Byzantine rock fortress city' },
      { name: 'Mystras', slug: 'mystras', desc: 'Ghost Byzantine capital' },
      { name: 'Kalamata', slug: 'kalamata', desc: 'Olives, beaches & Mani gateway' },
      { name: 'Sparta', slug: 'sparta', desc: 'Legendary warrior city-state' },
    ],
  },
  {
    region: 'Epirus & Central',
    color: '#27AE60',
    icon: '🌊',
    destinations: [
      { name: 'Parga', slug: 'parga', desc: 'Emerald sea & Venetian castle' },
      { name: 'Pelion', slug: 'pelion', desc: 'Centaur homeland & apple orchards' },
    ],
  },
]

export const creteSubDestinations = [
  { name: 'Chania', slug: 'chania' },
  { name: 'Heraklion', slug: 'heraklion' },
  { name: 'Rethymno', slug: 'rethymno' },
  { name: 'Agios Nikolaos', slug: 'agios-nikolaos' },
  { name: 'Elounda', slug: 'elounda' },
  { name: 'Samaria Gorge', slug: 'samaria-gorge' },
  { name: 'Balos Beach', slug: 'balos-beach' },
  { name: 'Elafonissi Beach', slug: 'elafonissi-beach' },
]

export const hiddenGems: HiddenGem[] = [
  { name: 'Koufonisia', slug: 'koufonisia', why: 'Caribbean-style lagoons in the Aegean', image: '/images/destinations/koufonisia_d.jpg', emoji: '🌿' },
  { name: 'Astypalea', slug: 'astypalea', why: 'Butterfly-shaped & gloriously empty', image: '/images/destinations/Astypalea_d.jpg', emoji: '🦋' },
  { name: 'Gavdos', slug: 'gavdos', why: "Europe's southernmost point", image: '/images/destinations/Gavdos_d.jpg', emoji: '🌍' },
  { name: 'Iraklia', slug: 'iraklia', why: 'The anti-Mykonos', image: '/images/destinations/Iraklia_d.jpg', emoji: '🏝️' },
  { name: 'Kastellorizo', slug: 'kastellorizo', why: 'Tiny, dramatic, unforgettable', image: '/images/destinations/Kastellorizo_d.jpg', emoji: '🎬' },
  { name: 'Tilos', slug: 'tilos', why: 'First Greek island fully on renewables', image: '/images/destinations/tilos_d.jpg', emoji: '⚡' },
  { name: 'Nisyros', slug: 'nisyros', why: 'Walk inside a live volcano', image: '/images/destinations/Nisyros_d.jpg', emoji: '🌋' },
  { name: 'Schinoussa', slug: 'schinoussa', why: '40 people, zero cars, all soul', image: '/images/destinations/Schinoussa_d.jpg', emoji: '🧘' },
]
