import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
})

export async function generateItinerary(answers: any, dbData: any) {
  const prompt = buildPrompt(answers, dbData)

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 6000,
      messages: [{ role: 'user', content: prompt }],
    })

    return message.content[0].type === 'text' ? message.content[0].text : ''
  } catch (error) {
    console.error('Claude API Error:', error)
    throw new Error(`AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/* ─────────────────────────────────────────────
   DESTINATION DATABASE (133 destinations)
   ───────────────────────────────────────────── */
interface Destination {
  name: string
  type: string
  region: string
  guideUrl: string
}

const DESTINATIONS: Destination[] = [
  // Cyclades
  { name: 'Santorini', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/santorini-travel-guide' },
  { name: 'Mykonos', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/mykonos-travel-guide' },
  { name: 'Naxos', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/naxos-travel-guide' },
  { name: 'Paros', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/paros-travel-guide' },
  { name: 'Milos', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/milos-travel-guide' },
  { name: 'Ios', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/ios-travel-guide' },
  { name: 'Folegandros', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/folegandros-travel-guide' },
  { name: 'Sifnos', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/sifnos-travel-guide' },
  { name: 'Tinos', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/tinos-travel-guide' },
  { name: 'Serifos', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/serifos-travel-guide' },
  { name: 'Andros', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/andros-travel-guide' },
  { name: 'Amorgos', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/amorgos-travel-guide' },
  { name: 'Antiparos', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/antiparos-travel-guide' },
  { name: 'Syros', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/syros-travel-guide' },
  { name: 'Koufonisia', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/koufonisia-travel-guide' },
  { name: 'Sikinos', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/sikinos-travel-guide' },
  { name: 'Anafi', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/anafi-travel-guide' },
  { name: 'Kea', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/kea-travel-guide' },
  { name: 'Kythnos', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/kythnos-travel-guide' },
  { name: 'Kimolos', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/kimolos-travel-guide' },
  { name: 'Thirassia', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/thirassia-travel-guide' },
  { name: 'Iraklia', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/iraklia-travel-guide' },
  { name: 'Schinoussa', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/schinoussa-travel-guide' },
  { name: 'Donoussa', type: 'Island', region: 'Cyclades', guideUrl: 'https://greektriplanner.me/blog/donoussa-travel-guide' },
  // Dodecanese
  { name: 'Rhodes', type: 'Island', region: 'Dodecanese', guideUrl: 'https://greektriplanner.me/blog/rhodes-travel-guide' },
  { name: 'Kos', type: 'Island', region: 'Dodecanese', guideUrl: 'https://greektriplanner.me/blog/kos-travel-guide' },
  { name: 'Patmos', type: 'Island', region: 'Dodecanese', guideUrl: 'https://greektriplanner.me/blog/patmos-travel-guide' },
  { name: 'Symi', type: 'Island', region: 'Dodecanese', guideUrl: 'https://greektriplanner.me/blog/symi-travel-guide' },
  { name: 'Karpathos', type: 'Island', region: 'Dodecanese', guideUrl: 'https://greektriplanner.me/blog/karpathos-travel-guide' },
  { name: 'Leros', type: 'Island', region: 'Dodecanese', guideUrl: 'https://greektriplanner.me/blog/leros-travel-guide' },
  { name: 'Kalymnos', type: 'Island', region: 'Dodecanese', guideUrl: 'https://greektriplanner.me/blog/kalymnos-travel-guide' },
  { name: 'Astypalea', type: 'Island', region: 'Dodecanese', guideUrl: 'https://greektriplanner.me/blog/astypalea-travel-guide' },
  { name: 'Kastellorizo', type: 'Island', region: 'Dodecanese', guideUrl: 'https://greektriplanner.me/blog/kastellorizo-travel-guide' },
  { name: 'Tilos', type: 'Island', region: 'Dodecanese', guideUrl: 'https://greektriplanner.me/blog/tilos-travel-guide' },
  { name: 'Nisyros', type: 'Island', region: 'Dodecanese', guideUrl: 'https://greektriplanner.me/blog/nisyros-travel-guide' },
  { name: 'Lipsi', type: 'Island', region: 'Dodecanese', guideUrl: 'https://greektriplanner.me/blog/lipsi-travel-guide' },
  { name: 'Chalki', type: 'Island', region: 'Dodecanese', guideUrl: 'https://greektriplanner.me/blog/chalki-travel-guide' },
  { name: 'Agathonisi', type: 'Island', region: 'Dodecanese', guideUrl: 'https://greektriplanner.me/blog/agathonisi-travel-guide' },
  // Ionian
  { name: 'Corfu', type: 'Island', region: 'Ionian', guideUrl: 'https://greektriplanner.me/blog/corfu-travel-guide' },
  { name: 'Zakynthos', type: 'Island', region: 'Ionian', guideUrl: 'https://greektriplanner.me/blog/zakynthos-travel-guide' },
  { name: 'Kefalonia', type: 'Island', region: 'Ionian', guideUrl: 'https://greektriplanner.me/blog/kefalonia-travel-guide' },
  { name: 'Lefkada', type: 'Island', region: 'Ionian', guideUrl: 'https://greektriplanner.me/blog/lefkada-travel-guide' },
  { name: 'Ithaca', type: 'Island', region: 'Ionian', guideUrl: 'https://greektriplanner.me/blog/ithaca-travel-guide' },
  { name: 'Paxos', type: 'Island', region: 'Ionian', guideUrl: 'https://greektriplanner.me/blog/paxos-travel-guide' },
  // Sporades
  { name: 'Skopelos', type: 'Island', region: 'Sporades', guideUrl: 'https://greektriplanner.me/blog/skopelos-travel-guide' },
  { name: 'Skiathos', type: 'Island', region: 'Sporades', guideUrl: 'https://greektriplanner.me/blog/skiathos-travel-guide' },
  { name: 'Alonissos', type: 'Island', region: 'Sporades', guideUrl: 'https://greektriplanner.me/blog/alonissos-travel-guide' },
  { name: 'Skyros', type: 'Island', region: 'Sporades', guideUrl: 'https://greektriplanner.me/blog/skyros-travel-guide' },
  // Saronic
  { name: 'Hydra', type: 'Island', region: 'Saronic', guideUrl: 'https://greektriplanner.me/blog/hydra-travel-guide' },
  { name: 'Aegina', type: 'Island', region: 'Saronic', guideUrl: 'https://greektriplanner.me/blog/aegina-travel-guide' },
  { name: 'Poros', type: 'Island', region: 'Saronic', guideUrl: 'https://greektriplanner.me/blog/poros-travel-guide' },
  { name: 'Spetses', type: 'Island', region: 'Saronic', guideUrl: 'https://greektriplanner.me/blog/spetses-travel-guide' },
  { name: 'Agistri', type: 'Island', region: 'Saronic', guideUrl: 'https://greektriplanner.me/blog/agistri-travel-guide' },
  // North Aegean
  { name: 'Lesbos', type: 'Island', region: 'North Aegean', guideUrl: 'https://greektriplanner.me/blog/lesbos-travel-guide' },
  { name: 'Samos', type: 'Island', region: 'North Aegean', guideUrl: 'https://greektriplanner.me/blog/samos-travel-guide' },
  { name: 'Chios', type: 'Island', region: 'North Aegean', guideUrl: 'https://greektriplanner.me/blog/chios-travel-guide' },
  { name: 'Ikaria', type: 'Island', region: 'North Aegean', guideUrl: 'https://greektriplanner.me/blog/ikaria-travel-guide' },
  { name: 'Thasos', type: 'Island', region: 'North Aegean', guideUrl: 'https://greektriplanner.me/blog/thasos-travel-guide' },
  { name: 'Samothrace', type: 'Island', region: 'North Aegean', guideUrl: 'https://greektriplanner.me/blog/samothrace-travel-guide' },
  { name: 'Lemnos', type: 'Island', region: 'North Aegean', guideUrl: 'https://greektriplanner.me/blog/lemnos-travel-guide' },
  // Other islands
  { name: 'Kythira', type: 'Island', region: 'Other', guideUrl: 'https://greektriplanner.me/blog/kythira-travel-guide' },
  { name: 'Gavdos', type: 'Island', region: 'Other', guideUrl: 'https://greektriplanner.me/blog/gavdos-travel-guide' },
  { name: 'Elafonisos', type: 'Island', region: 'Other', guideUrl: 'https://greektriplanner.me/blog/elafonisos-travel-guide' },
  // Crete
  { name: 'Crete', type: 'Island', region: 'Crete', guideUrl: 'https://greektriplanner.me/blog/crete-travel-guide' },
  { name: 'Heraklion', type: 'City', region: 'Crete', guideUrl: 'https://greektriplanner.me/blog/heraklion-travel-guide' },
  { name: 'Chania', type: 'City', region: 'Crete', guideUrl: 'https://greektriplanner.me/blog/chania-travel-guide' },
  { name: 'Rethymno', type: 'City', region: 'Crete', guideUrl: 'https://greektriplanner.me/blog/rethymno-travel-guide' },
  { name: 'Agios Nikolaos', type: 'Town', region: 'Crete', guideUrl: 'https://greektriplanner.me/blog/agios-nikolaos-travel-guide' },
  { name: 'Elounda', type: 'Resort', region: 'Crete', guideUrl: 'https://greektriplanner.me/blog/elounda-travel-guide' },
  { name: 'Sitia', type: 'Town', region: 'Crete', guideUrl: 'https://greektriplanner.me/blog/sitia-travel-guide' },
  { name: 'Ierapetra', type: 'Town', region: 'Crete', guideUrl: 'https://greektriplanner.me/blog/ierapetra-travel-guide' },
  { name: 'Paleochora', type: 'Village', region: 'Crete', guideUrl: 'https://greektriplanner.me/blog/paleochora-travel-guide' },
  { name: 'Loutro', type: 'Village', region: 'Crete', guideUrl: 'https://greektriplanner.me/blog/loutro-travel-guide' },
  { name: 'Matala', type: 'Village', region: 'Crete', guideUrl: 'https://greektriplanner.me/blog/matala-travel-guide' },
  { name: 'Samaria Gorge', type: 'Natural', region: 'Crete', guideUrl: 'https://greektriplanner.me/blog/samaria-gorge-travel-guide' },
  { name: 'Balos Beach', type: 'Beach', region: 'Crete', guideUrl: 'https://greektriplanner.me/blog/balos-beach-travel-guide' },
  { name: 'Elafonissi Beach', type: 'Beach', region: 'Crete', guideUrl: 'https://greektriplanner.me/blog/elafonissi-beach-travel-guide' },
  // Athens & Attica
  { name: 'Athens', type: 'City', region: 'Attica', guideUrl: 'https://greektriplanner.me/blog/athens-travel-guide' },
  { name: 'Cape Sounion', type: 'Archaeological', region: 'Attica', guideUrl: 'https://greektriplanner.me/blog/cape-sounion-travel-guide' },
  // Central Greece
  { name: 'Meteora', type: 'UNESCO', region: 'Central Greece', guideUrl: 'https://greektriplanner.me/blog/meteora-travel-guide' },
  { name: 'Delphi', type: 'Archaeological', region: 'Central Greece', guideUrl: 'https://greektriplanner.me/blog/delphi-travel-guide' },
  { name: 'Pelion', type: 'Peninsula', region: 'Central Greece', guideUrl: 'https://greektriplanner.me/blog/pelion-travel-guide' },
  { name: 'Arachova', type: 'Village', region: 'Central Greece', guideUrl: 'https://greektriplanner.me/blog/arachova-travel-guide' },
  { name: 'Volos', type: 'City', region: 'Central Greece', guideUrl: 'https://greektriplanner.me/blog/volos-travel-guide' },
  { name: 'Galaxidi', type: 'Town', region: 'Central Greece', guideUrl: 'https://greektriplanner.me/blog/galaxidi-travel-guide' },
  { name: 'Hosios Loukas', type: 'Monastery', region: 'Central Greece', guideUrl: 'https://greektriplanner.me/blog/hosios-loukas-travel-guide' },
  { name: 'Thermopylae', type: 'Historical', region: 'Central Greece', guideUrl: 'https://greektriplanner.me/blog/thermopylae-travel-guide' },
  { name: 'Lake Plastira', type: 'Nature', region: 'Central Greece', guideUrl: 'https://greektriplanner.me/blog/lake-plastira-travel-guide' },
  { name: 'Makrinitsa', type: 'Village', region: 'Central Greece', guideUrl: 'https://greektriplanner.me/blog/makrinitsa-travel-guide' },
  { name: 'Portaria', type: 'Village', region: 'Central Greece', guideUrl: 'https://greektriplanner.me/blog/portaria-travel-guide' },
  { name: 'Tsagarada', type: 'Village', region: 'Central Greece', guideUrl: 'https://greektriplanner.me/blog/tsagarada-travel-guide' },
  // Northern Greece
  { name: 'Thessaloniki', type: 'City', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/thessaloniki-travel-guide' },
  { name: 'Zagori Villages', type: 'Region', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/zagori-villages-travel-guide' },
  { name: 'Vikos Gorge', type: 'Natural', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/vikos-gorge-travel-guide' },
  { name: 'Ioannina', type: 'City', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/ioannina-travel-guide' },
  { name: 'Metsovo', type: 'Village', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/metsovo-travel-guide' },
  { name: 'Mount Olympus', type: 'Mountain', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/mount-olympus-travel-guide' },
  { name: 'Halkidiki', type: 'Peninsula', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/halkidiki-travel-guide' },
  { name: 'Kastoria', type: 'City', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/kastoria-travel-guide' },
  { name: 'Vergina', type: 'Archaeological', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/vergina-travel-guide' },
  { name: 'Pella', type: 'Archaeological', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/pella-travel-guide' },
  { name: 'Kavala', type: 'City', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/kavala-travel-guide' },
  { name: 'Prespa Lakes', type: 'Nature', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/prespa-lakes-travel-guide' },
  { name: 'Lake Kerkini', type: 'Nature', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/lake-kerkini-travel-guide' },
  { name: 'Edessa', type: 'Town', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/edessa-travel-guide' },
  { name: 'Naousa', type: 'Town', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/naousa-travel-guide' },
  { name: 'Parga', type: 'Town', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/parga-travel-guide' },
  { name: 'Preveza', type: 'Town', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/preveza-travel-guide' },
  { name: 'Syvota', type: 'Village', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/syvota-travel-guide' },
  { name: 'Litochoro', type: 'Village', region: 'Northern Greece', guideUrl: 'https://greektriplanner.me/blog/litochoro-travel-guide' },
  // Peloponnese
  { name: 'Olympia', type: 'Archaeological', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/olympia-travel-guide' },
  { name: 'Nafplio', type: 'Town', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/nafplio-travel-guide' },
  { name: 'Mycenae', type: 'Archaeological', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/mycenae-travel-guide' },
  { name: 'Epidaurus', type: 'Archaeological', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/epidaurus-travel-guide' },
  { name: 'Monemvasia', type: 'Medieval', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/monemvasia-travel-guide' },
  { name: 'Mystras', type: 'Byzantine', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/mystras-travel-guide' },
  { name: 'Mani Peninsula', type: 'Region', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/mani-peninsula-travel-guide' },
  { name: 'Kardamyli', type: 'Village', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/kardamyli-travel-guide' },
  { name: 'Sparta', type: 'Town', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/sparta-travel-guide' },
  { name: 'Ancient Corinth', type: 'Archaeological', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/ancient-corinth-travel-guide' },
  { name: 'Kalamata', type: 'City', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/kalamata-travel-guide' },
  { name: 'Pylos', type: 'Town', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/pylos-travel-guide' },
  { name: 'Gytheio', type: 'Town', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/gytheio-travel-guide' },
  { name: 'Dimitsana', type: 'Village', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/dimitsana-travel-guide' },
  { name: 'Stemnitsa', type: 'Village', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/stemnitsa-travel-guide' },
  { name: 'Methoni', type: 'Castle', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/methoni-travel-guide' },
  { name: 'Koroni', type: 'Castle', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/koroni-travel-guide' },
  { name: 'Vathia', type: 'Village', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/vathia-travel-guide' },
  { name: 'Limeni', type: 'Village', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/limeni-travel-guide' },
  { name: 'Areopoli', type: 'Town', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/areopoli-travel-guide' },
  { name: 'Ancient Messene', type: 'Archaeological', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/ancient-messene-travel-guide' },
  { name: 'Nemea', type: 'Archaeological', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/nemea-travel-guide' },
  { name: 'Kalavryta', type: 'Village', region: 'Peloponnese', guideUrl: 'https://greektriplanner.me/blog/kalavryta-travel-guide' },
]

/* ─────────────────────────────────────────────
   REGION MAPPING
   ───────────────────────────────────────────── */
const REGION_MAP: Record<string, string[]> = {
  'cyclades': ['Cyclades'],
  'dodecanese': ['Dodecanese'],
  'ionian': ['Ionian'],
  'crete': ['Crete'],
  'saronic': ['Saronic'],
  'sporades': ['Sporades'],
  'north-aegean': ['North Aegean'],
  'peloponnese': ['Peloponnese'],
  'northern-greece': ['Northern Greece'],
  'central-greece': ['Central Greece'],
  'athens-attica': ['Attica'],
}

/* ─────────────────────────────────────────────
   INTELLIGENT DESTINATION MATCHING
   ───────────────────────────────────────────── */
function matchDestinations(answers: any): Destination[] {
  const regions = (answers.specificRegions || []) as string[]
  const preference = answers.regionPreference || 'both'
  const crowdPref = answers.crowdPreference || 50 // 0=popular, 100=hidden
  const experience = answers.greeceExperience || 'first-time'

  // Step 1: Filter by region preference
  let pool = [...DESTINATIONS]

  if (preference === 'islands') {
    pool = pool.filter(d => d.type === 'Island' || d.region === 'Crete')
  } else if (preference === 'mainland') {
    pool = pool.filter(d => d.type !== 'Island' || d.region === 'Crete')
  }

  // Step 2: Filter by specific regions if selected
  if (regions.length > 0) {
    const allowedRegions = regions.flatMap(r => REGION_MAP[r] || [])
    // Always include Athens/Attica as a gateway
    allowedRegions.push('Attica')
    pool = pool.filter(d => allowedRegions.includes(d.region))
  }

  // Step 3: Score by crowd preference and experience
  const popularIslands = ['Santorini', 'Mykonos', 'Rhodes', 'Corfu', 'Zakynthos', 'Crete', 'Kos', 'Athens']
  const hiddenGems = ['Folegandros', 'Amorgos', 'Koufonisia', 'Ikaria', 'Karpathos', 'Astypalea', 'Monemvasia', 'Zagori Villages', 'Mani Peninsula', 'Tinos', 'Sifnos', 'Serifos', 'Lemnos', 'Samothrace']

  pool.sort((a, b) => {
    let scoreA = 0, scoreB = 0

    if (crowdPref > 60) {
      // Prefer hidden gems
      if (hiddenGems.includes(a.name)) scoreA += 3
      if (hiddenGems.includes(b.name)) scoreB += 3
      if (popularIslands.includes(a.name)) scoreA -= 1
      if (popularIslands.includes(b.name)) scoreB -= 1
    } else if (crowdPref < 40) {
      // Prefer popular
      if (popularIslands.includes(a.name)) scoreA += 3
      if (popularIslands.includes(b.name)) scoreB += 3
    }

    // First-time visitors should see the classics
    if (experience === 'first-time') {
      if (popularIslands.includes(a.name)) scoreA += 2
      if (popularIslands.includes(b.name)) scoreB += 2
    }

    return scoreB - scoreA
  })

  return pool
}

/* ─────────────────────────────────────────────
   PROMPT BUILDER
   ───────────────────────────────────────────── */
function buildPrompt(answers: any, dbData: any): string {
  const duration = answers.duration || '6-8'
  const month = answers.month || 'June-August'
  const budget = answers.budget || 150
  const interests = Array.isArray(answers.interests) ? answers.interests : []
  const dining = Array.isArray(answers.dining) ? answers.dining : []
  const accommodation = Array.isArray(answers.accommodation) ? answers.accommodation : []
  const regions = Array.isArray(answers.specificRegions) ? answers.specificRegions : []
  const pace = answers.pace || 'moderate'
  const experience = answers.greeceExperience || 'first-time'
  const regionPref = answers.regionPreference || 'both'
  const travelStyle = answers.travelStyle || 50
  const crowdPref = answers.crowdPreference || 50
  const rhythm = answers.dailyRhythm || 50
  const vibe = answers.vacationVibe || 50

  // Get matched destinations
  const matched = matchDestinations(answers)
  const topDestinations = matched.slice(0, 25)

  // Build destination list with guide URLs
  const destList = topDestinations.map(d =>
    `- ${d.name} (${d.type}, ${d.region}) → Guide: ${d.guideUrl}`
  ).join('\n')

  // Pace mapping
  const paceMap: Record<string, string> = {
    'slow': '1-2 main destinations with deep exploration',
    'moderate': '3-4 destinations with balanced time at each',
    'fast': '5+ destinations for maximum variety',
  }

  // Style descriptions
  const styleDesc = travelStyle < 35 ? 'budget-conscious' : travelStyle > 65 ? 'luxury-oriented' : 'mid-range flexible'
  const crowdDesc = crowdPref < 35 ? 'popular landmarks and famous spots' : crowdPref > 65 ? 'hidden gems and off-the-beaten-path places' : 'a mix of popular and lesser-known spots'
  const rhythmDesc = rhythm < 35 ? 'early riser who likes morning activities' : rhythm > 65 ? 'night owl who enjoys late evenings' : 'flexible with timing'
  const vibeDesc = vibe < 35 ? 'action-packed with lots of activities' : vibe > 65 ? 'slow and relaxed with plenty of downtime' : 'balanced between activity and rest'

  return `You are an expert Greece travel planner with deep local knowledge of 133 destinations across all Greek regions. Create a highly personalized, day-by-day itinerary.

TRAVELER PROFILE:
- Name: ${answers.firstName || 'Traveler'}
- Traveling with: ${answers.travelWith || 'Solo'}
- Greece experience: ${experience} visitor
- Duration: ${duration} days
- Season: ${month}
- Focus: ${regionPref === 'islands' ? 'Island hopping & beaches' : regionPref === 'mainland' ? 'Mainland history & nature' : 'Mix of islands & mainland'}
- Specific regions of interest: ${regions.length > 0 ? regions.join(', ') : 'Open to recommendations'}
- Travel pace: ${paceMap[pace] || paceMap['moderate']}
- Interests: ${interests.length > 0 ? interests.join(', ') : 'General exploration'}
- Dining: ${dining.length > 0 ? dining.join(', ') : 'Variety'}
- Accommodation: ${accommodation.length > 0 ? accommodation.join(', ') : 'Mid-range'}
- Style: ${styleDesc}
- Prefers: ${crowdDesc}
- Daily rhythm: ${rhythmDesc}
- Vacation vibe: ${vibeDesc}
- Budget: €${budget}/day per person

MATCHED DESTINATIONS (prioritized for this traveler):
${destList}

${dbData.destinations ? `\nSUPABASE DATABASE CONTEXT:\nDestinations: ${JSON.stringify(dbData.destinations.slice(0, 5))}\nExperiences: ${JSON.stringify((dbData.experiences || []).slice(0, 8))}\nLogistics: ${JSON.stringify((dbData.logistics || []).slice(0, 5))}\nAccommodations: ${JSON.stringify((dbData.accommodations || []).slice(0, 5))}` : ''}

CRITICAL PLANNING RULES:
1. ROUTING: Only suggest destinations that are logistically connected. Don't mix Ionian islands with Cyclades in the same trip unless the traveler has 13+ days. Keep island-hopping within the same group.
2. FERRY AWARENESS: Include realistic ferry/transport times. Summer ferries are frequent; winter service is reduced. Note that some small islands have limited connections.
3. SEASONALITY: Winter (Nov-Mar) = focus on mainland/Athens/Crete. Many small islands close. Spring/Fall = best balance. Summer = everything open but crowded.
4. PACING: Match the traveler's pace preference. Slow = 3-4 days per destination. Moderate = 2-3 days. Fast = 1-2 days.
5. BUDGET ACCURACY: €50-100 = hostels/budget, street food, public transport. €100-200 = mid hotels, tavernas, some tours. €200-500 = boutique/luxury, fine dining, private tours.
6. EXPERIENCE LEVEL: First-timers should include at least one iconic destination. Returning visitors can skip the classics. Frequent visitors want deep cuts.
7. TRAVEL GUIDE LINKS: When the traveler FIRST arrives at a new destination, include the travel guide link INLINE using markdown format: [Destination travel guide](URL). Do NOT repeat the guide link on subsequent days at the same destination.
8. ACCOMMODATION: Only include **Where to Stay:** on the FIRST day at each new destination. Do NOT repeat it on subsequent days at the same destination. Always include a Booking.com search link in this format: [Search hotels on Booking.com](https://www.booking.com/searchresults.html?ss=DESTINATION+Greece&aid=7677415)
9. TOURS & ACTIVITIES: For 3-5 days across the itinerary, include a recommended bookable tour or activity with a GetYourGuide link in this format: [Book this tour on GetYourGuide](https://www.getyourguide.com/s/?q=ACTIVITY+DESTINATION&partner_id=QH4R87F). Place the tour link naturally inside the Morning, Afternoon, or Evening block where the activity happens.

FORMAT YOUR RESPONSE EXACTLY AS:

# Your Perfect ${duration}-Day Greece Adventure

## Overview
[2-3 sentences tailored to their profile, mentioning why these destinations were chosen for them specifically]

## Your Route
[List destinations in order with days allocated, e.g., "Athens (2 days) → Naxos (3 days) → Santorini (2 days)"]

## Day-by-Day Itinerary

### Day 1: [Location] — [Theme]
**Morning:** [Specific activity with approximate cost in €. If a bookable tour, include GetYourGuide link.]
**Afternoon:** [Activity]
**Evening:** [Activity — dinner recommendation matching their dining preferences]
**Where to Stay:** [Accommodation name and description matching their style/budget]. [Search hotels on Booking.com](https://www.booking.com/searchresults.html?ss=DESTINATION+Greece&aid=7677415)
**Insider Tip:** [Genuine local knowledge — not generic tourist advice]
**Daily Budget:** €[amount] breakdown (accommodation: €X, food: €X, activities: €X, transport: €X)
📖 Read our [Location travel guide](URL).

### Day 2: [Same Location or new] — [Theme]
**Morning:** [Activity]
**Afternoon:** [Activity]
**Evening:** [Activity]
[NO "Where to Stay" if same destination as Day 1]
[NO travel guide link if same destination as Day 1]
**Insider Tip:** [Different tip]
**Daily Budget:** €[amount]

[Continue for each day — only show Where to Stay and guide link on FIRST day at each new destination...]

## Transport Between Destinations
[Detailed transport info: ferry companies, approximate times, costs, booking tips]

## Total Budget Breakdown
- Accommodations: €[total]
- Food & Dining: €[total]
- Activities & Tours: €[total]
- Transportation: €[total]
- **TOTAL: €[grand total] (€[per day average]/day — target was €${budget}/day)**

## Final Tips
[5 specific, actionable tips for THIS itinerary — not generic Greece tips]

Make every recommendation specific, personal, and actionable. Reference the traveler by name. Avoid generic advice.`
}
