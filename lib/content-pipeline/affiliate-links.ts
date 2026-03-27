// ============================================================
// Affiliate Links — Travelpayouts API + Ferryhopper
// Marker: 708500 | TRS: 505027
// API: POST https://api.travelpayouts.com/links/v1/create
//
// HOW IT WORKS:
// The TP API takes a canonical destination URL and returns a
// tracked partner_url — no hardcoded program IDs needed.
// We pass the canonical URL, TP detects the program automatically.
//
// Widgets use tpwdgt.com with trs + shmarker (from widgets.json).
// EKTA uses a static affiliate URL — no API call needed.
// Ferryhopper enrollment pending — plain links preserved as-is.
// ============================================================

const MARKER = process.env.TP_MARKER || '708500'
const TRS    = process.env.TP_TRS    || '505027'
const TP_API = 'https://api.travelpayouts.com/links/v1/create'
const TP_TOKEN = process.env.TP_API_TOKEN || ''

// ─── Types ───────────────────────────────────────────────────

export interface AffiliateLink {
  canonicalUrl: string  // original destination URL (passed to TP API)
  affiliateUrl: string  // resolved partner_url (or canonicalUrl if API unavailable)
  widget:       string  // tpwdgt.com embed script
  label:        string  // program display name
  program:      string  // programme key (matches types.ts Programme type)
  cta:          string  // anchor text / button label
  commission:   string  // for internal reference
}

export interface ArticleAffiliates {
  primary:    AffiliateLink
  secondary?: AffiliateLink
  tertiary?:  AffiliateLink
}

// ─── TP API: resolve canonical URLs to affiliate URLs ─────────
// Mirrors the logic in affiliate-automation/src/travelpayouts.ts

export async function resolveAffiliateUrl(canonicalUrl: string): Promise<string> {
  if (!TP_TOKEN) return canonicalUrl  // fallback: untracked link

  try {
    const res = await fetch(TP_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': TP_TOKEN,
      },
      body: JSON.stringify({
        trs: Number(TRS),
        marker: Number(MARKER),
        shorten: true,
        links: [{ url: canonicalUrl }],
      }),
    })

    if (!res.ok) return canonicalUrl

    const data = await res.json() as {
      result?: { links?: Array<{ partner_url?: string; code?: string }> }
    }
    const link = data.result?.links?.[0]
    return (link?.code === 'success' && link?.partner_url)
      ? link.partner_url
      : canonicalUrl
  } catch {
    return canonicalUrl  // fallback: untracked link
  }
}

// Batch resolve up to 10 URLs in one API call
export async function resolveAffiliateBatch(
  urls: string[]
): Promise<string[]> {
  if (!TP_TOKEN || urls.length === 0) return urls

  try {
    const res = await fetch(TP_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': TP_TOKEN,
      },
      body: JSON.stringify({
        trs: Number(TRS),
        marker: Number(MARKER),
        shorten: true,
        links: urls.map(url => ({ url })),
      }),
    })

    if (!res.ok) return urls

    const data = await res.json() as {
      result?: { links?: Array<{ partner_url?: string; code?: string }> }
    }
    const links = data.result?.links || []
    return urls.map((url, i) => {
      const l = links[i]
      return (l?.code === 'success' && l?.partner_url) ? l.partner_url : url
    })
  } catch {
    return urls
  }
}

// ─── Lookup tables (from widgets.json) ───────────────────────

const VIATOR_IDS: Record<string, string> = {
  athens: '479', santorini: '773', mykonos: '732',
  crete: '343', rhodes: '517', corfu: '480',
  paros: '50333', naxos: '22498', milos: '23075',
  thessaloniki: '756',
}

const IATA_CODES: Record<string, string> = {
  athens: 'ATH', heraklion: 'HER', santorini: 'JTR',
  rhodes: 'RHO', mykonos: 'JMK', corfu: 'CFU',
  thessaloniki: 'SKG', kos: 'KGS', zakynthos: 'ZTH',
  kefalonia: 'EFL',
}

const DC_PLACES: Record<string, string> = {
  athens: 'athens-port', santorini: 'santorini-airport',
  heraklion: 'heraklion-airport', rhodes: 'rhodes-airport',
  mykonos: 'mykonos-airport', chania: 'chania-airport',
  corfu: 'corfu-airport', kos: 'kos-airport',
  zakynthos: 'zakynthos-airport',
}

// ─── Helpers ─────────────────────────────────────────────────

function sl(dest: string): string {
  return dest.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function enc(s: string): string {
  return encodeURIComponent(s)
}

// ─── Link builders (canonical URLs — resolved to affiliate at runtime) ────────
// Each returns an AffiliateLink with affiliateUrl = canonicalUrl initially.
// Call resolveAffiliateBatch() on all canonical URLs before publishing.

export function bookingLink(destination: string): AffiliateLink {
  const canonical = `https://www.booking.com/city/gr/${sl(destination)}.html`
  return {
    canonicalUrl: canonical,
    affiliateUrl: canonical,  // resolved by resolveAffiliateBatch() in publisher
    widget: `<script async src="https://tpwdgt.com/content?trs=${TRS}&shmarker=${MARKER}&locale=en&default_direction=${enc(destination)}&sustainable=false&deals=false&border_radius=3&plain=true&powered_by=true&promo_id=2693&campaign_id=84" charset="utf-8"></script>`,
    label: 'Booking.com', program: 'booking',
    cta: `Find hotels in ${destination}`,
    commission: '3-5%',
  }
}

export function agodaLink(destination: string): AffiliateLink {
  const canonical = `https://www.agoda.com/en-gb/city/${sl(destination)}-gr.html`
  return {
    canonicalUrl: canonical,
    affiliateUrl: canonical,
    widget: `<script async src="https://tpwdgt.com/content?trs=${TRS}&shmarker=${MARKER}&locale=en&default_destination=${enc(destination)}%2C%20Greece&powered_by=true&primary_override=%235392F9&color_button=%235392F9&color_icons=%235392F9&dark=%23262626&color_border=%235392F9&color_focused=%2332a8dd&border_radius=5&plain=false&promo_id=8303&campaign_id=104" charset="utf-8"></script>`,
    label: 'Agoda', program: 'agoda',
    cta: `Search ${destination} hotels on Agoda`,
    commission: '6%',
  }
}

export function getYourGuideLink(destination: string, activity?: string): AffiliateLink {
  const s = sl(destination)
  const iata = IATA_CODES[s] || 'ATH'
  const canonical = activity
    ? `https://www.getyourguide.com/s/?q=${enc(destination + ' ' + activity)}`
    : `https://www.getyourguide.com/${s}/`
  const widget = activity
    ? `<script async src="https://tpwdgt.com/content?trs=${TRS}&shmarker=${MARKER}&place=${enc(s + '+' + sl(activity))}&items=3&locale=en&powered_by=true&campaign_id=108&promo_id=4039" charset="utf-8"></script>`
    : `<script async src="https://tpwdgt.com/content?trs=${TRS}&shmarker=${MARKER}&iata=${iata}&locale=en&powered_by=true&campaign_id=108&promo_id=4040" charset="utf-8"></script>`
  return {
    canonicalUrl: canonical, affiliateUrl: canonical, widget,
    label: 'GetYourGuide', program: 'gyg',
    cta: activity ? `Book ${activity} in ${destination}` : `Explore tours in ${destination}`,
    commission: '8%',
  }
}

export function viatorLink(destination: string): AffiliateLink {
  const s = sl(destination)
  const destId = VIATOR_IDS[s] || '479'
  const canonical = `https://www.viator.com/${destination.replace(/\s+/g, '-')}/d${destId}-ttd`
  return {
    canonicalUrl: canonical, affiliateUrl: canonical,
    widget: `<script async src="https://tpwdgt.com/content?currency=usd&trs=${TRS}&shmarker=${MARKER}&powered_by=true&locale=en&destination=${destId}&lowest_price=&highest_price=&min_lines=3&color_button=%23346A6C&promo_id=5850&campaign_id=47" charset="utf-8"></script>`,
    label: 'Viator', program: 'viator',
    cta: `Browse experiences in ${destination}`,
    commission: '8%',
  }
}

export function discoverCarsLink(destination: string): AffiliateLink {
  const s = sl(destination)
  const place = DC_PLACES[s] || `${s}-airport`
  const canonical = `https://www.discovercars.com/car-hire/greece/${s}`
  return {
    canonicalUrl: canonical, affiliateUrl: canonical,
    widget: `<script async src="https://tpwdgt.com/content?trs=${TRS}&shmarker=${MARKER}&country=greece&city=${s}&place=${place}&locale=en&powered_by=true&bg_color=%23fad130&font_color=%23333333&button_color=%2300a200&button_font_color=%23ffffff&title_text=Discover%20Cars&button_text=Search&rounded_corners=false&benefits=false&dc_powered_by=false&supplier_logos=false&campaign_id=117&promo_id=3873" charset="utf-8"></script>`,
    label: 'DiscoverCars', program: 'discovercars',
    cta: `Compare car rentals in ${destination}`,
    commission: '23-54%',
  }
}

export function welcomePickupsLink(destination: string): AffiliateLink {
  const s = sl(destination)
  const canonical = `https://www.welcomepickups.com/transfer/${s}/`
  return {
    canonicalUrl: canonical, affiliateUrl: canonical,
    widget: `<script async src="https://tpwdgt.com/content?trs=${TRS}&shmarker=${MARKER}&locale=en&city=${enc(destination)}&show_header=true&powered_by=true&campaign_id=627&promo_id=8951" charset="utf-8"></script>`,
    label: 'Welcome Pickups', program: 'welcomepickups',
    cta: `Book airport transfer in ${destination}`,
    commission: '8-9%',
  }
}

export function kiwiLink(destination: string): AffiliateLink {
  const iata = IATA_CODES[sl(destination)] || 'ATH'
  // base_url MUST be /en/ — bare domain fails TP API
  const canonical = `https://www.kiwi.com/en/?to=${iata}`
  return {
    canonicalUrl: canonical, affiliateUrl: canonical,
    widget: `<script async src="https://tpwdgt.com/content?currency=usd&trs=${TRS}&shmarker=${MARKER}&locale=en&default_destination=${iata}&stops=any&show_hotels=false&powered_by=true&border_radius=5&plain=false&color_button=%23FF5635ff&color_button_text=%23ffffff&promo_id=3414&campaign_id=111" charset="utf-8"></script>`,
    label: 'Kiwi.com', program: 'kiwi',
    cta: `Search flights to ${destination}`,
    commission: '3%',
  }
}

export function airaloLink(): AffiliateLink {
  const canonical = 'https://www.airalo.com/greece-esim'
  return {
    canonicalUrl: canonical, affiliateUrl: canonical,
    widget: `<script async src="https://tpwdgt.com/content?trs=${TRS}&shmarker=${MARKER}&locale=en&country=Greece&powered_by=true&color_button=%23f2685f&color_focused=%23f2685f&secondary=%23FFFFFF&dark=%2311100f&light=%23FFFFFF&special=%23C4C4C4&border_radius=5&plain=false&no_labels=true&promo_id=8588&campaign_id=541" charset="utf-8"></script>`,
    label: 'Airalo', program: 'airalo',
    cta: 'Get a Greece eSIM — avoid roaming charges',
    commission: '12%',
  }
}

// EKTA: static affiliate URL — no TP API call needed (from programmes.json)
export function ektaLink(): AffiliateLink {
  const url = 'https://ektatraveling.tpx.lt/hiY0X1pM'
  return {
    canonicalUrl: url,
    affiliateUrl: url,  // already tracked — skip API resolution
    widget: `<a href="${url}" target="_blank" rel="noopener sponsored" style="display:inline-block;padding:10px 20px;background:#FF5635;color:white;border-radius:6px;font-weight:600;text-decoration:none;">Get Travel Insurance for Greece &rarr;</a>`,
    label: 'EKTA Travel Insurance', program: 'ekta',
    cta: 'Get travel insurance for Greece',
    commission: '20%',
  }
}

export function airhelpLink(): AffiliateLink {
  const canonical = 'https://www.airhelp.com/en/'
  return {
    canonicalUrl: canonical, affiliateUrl: canonical,
    widget: `<script async src="https://tpwdgt.com/content?trs=${TRS}&shmarker=${MARKER}&lang=en&powered_by=true&campaign_id=120&promo_id=8679" charset="utf-8"></script>`,
    label: 'AirHelp', program: 'airhelp',
    cta: 'Claim flight compensation — up to €600',
    commission: '15-16.6%',
  }
}

// Ferryhopper: enrollment pending — preserve links as-is (from programmes.json)
export function ferryhopperLink(origin?: string, destination?: string): AffiliateLink {
  const url = origin && destination
    ? `https://www.ferryhopper.com/en/search#/?origin=${sl(origin)}&destination=${sl(destination)}`
    : 'https://www.ferryhopper.com/en/'
  const cta = origin && destination
    ? `Book ferry: ${origin} to ${destination}`
    : 'Compare Greek ferry routes'
  return {
    canonicalUrl: url,
    affiliateUrl: url,  // pending enrollment — do not resolve through TP API
    widget: `<a href="${url}" target="_blank" rel="noopener">${cta}</a>`,
    label: 'Ferryhopper', program: 'ferryhopper',
    cta, commission: 'pending',
  }
}

// ─── Batch resolve all affiliate URLs before publishing ───────
// Call this in sanity-publisher.ts on all 3 affiliate links at once.
// Skips EKTA (already static) and Ferryhopper (pending enrollment).

export async function resolveArticleAffiliates(
  affiliates: ArticleAffiliates
): Promise<ArticleAffiliates> {
  const links = [affiliates.primary, affiliates.secondary, affiliates.tertiary]
    .filter((l): l is AffiliateLink => !!l)

  // Separate links that need API resolution from those that don't
  const needsResolution = links.filter(
    l => l.program !== 'ekta' && l.program !== 'ferryhopper'
  )
  const canonicalUrls = needsResolution.map(l => l.canonicalUrl)

  if (canonicalUrls.length > 0) {
    const resolved = await resolveAffiliateBatch(canonicalUrls)
    needsResolution.forEach((link, i) => {
      link.affiliateUrl = resolved[i]
    })
  }

  return affiliates
}

// ─── Article → Affiliate Mapping ─────────────────────────────

export function getAffiliatesForArticle(
  insightType: string,
  destination: string,
  tags: string[],
  titleLower: string,
  contentLower = '',
): ArticleAffiliates {
  const text = `${titleLower} ${contentLower} ${tags.join(' ')}`
  const dest = destination || 'Greece'

  const hasFerry    = /ferry|island.hop|sailing/.test(text)
  const hasFlight   = /flight|airline|airport|fly.to/.test(text)
  const hasCarRent  = /car.rent|hire.a.car|road.trip|driving/.test(text)
  const hasTransfer = /airport.transfer|pickup|taxi/.test(text)
  const hasInsure   = /insurance|travel.cover|ekta/.test(text)
  const hasComp     = /delay|cancel|compensation|airhelp/.test(text)
  const hasEsim     = /esim|roaming|sim.card/.test(text)
  const hasActivity = /tour|activity|experience|things.to.do|excursion/.test(text)
  const hasHotel    = /hotel|accommodation|resort|villa/.test(text)
  const hasNomad    = /digital.nomad|remote.work|long.stay/.test(text)

  if (hasFerry || insightType === 'cruise') return {
    primary: ferryhopperLink(), secondary: bookingLink(dest), tertiary: discoverCarsLink(dest)
  }
  if (hasFlight) return {
    primary: kiwiLink(dest), secondary: airaloLink(), tertiary: hasComp ? airhelpLink() : bookingLink(dest)
  }
  if (hasCarRent) return {
    primary: discoverCarsLink(dest), secondary: bookingLink(dest), tertiary: welcomePickupsLink(dest)
  }
  if (hasTransfer) return {
    primary: welcomePickupsLink(dest), secondary: discoverCarsLink(dest)
  }
  if (hasInsure || hasComp) return {
    primary: ektaLink(), secondary: airhelpLink()
  }
  if (hasEsim) return {
    primary: airaloLink(), secondary: ektaLink()
  }
  if (hasNomad) return {
    primary: airaloLink(), secondary: bookingLink(dest)
  }
  if (hasActivity || insightType === 'destination-performance') return {
    primary: getYourGuideLink(dest), secondary: viatorLink(dest), tertiary: bookingLink(dest)
  }
  if (hasHotel || insightType === 'accommodation') return {
    primary: bookingLink(dest), secondary: agodaLink(dest), tertiary: discoverCarsLink(dest)
  }
  if (['market-report', 'statistics', 'source-market', 'trend-analysis', 'policy-regulation'].includes(insightType)) return {
    primary: bookingLink(dest), secondary: getYourGuideLink(dest), tertiary: ferryhopperLink()
  }
  if (insightType === 'sustainability') return {
    primary: getYourGuideLink(dest, 'eco tours'), secondary: bookingLink(dest)
  }

  return {
    primary: bookingLink(dest), secondary: getYourGuideLink(dest), tertiary: discoverCarsLink(dest)
  }
}

// ─── HTML formatters ──────────────────────────────────────────

export function inlineAnchor(link: AffiliateLink, customText?: string): string {
  return `<a href="${link.affiliateUrl}" target="_blank" rel="noopener sponsored">${customText || link.cta}</a>`
}

export function widgetBlock(link: AffiliateLink, customText?: string): string {
  return link.widget || inlineAnchor(link, customText)
}
