// components/transfers/BookingOptions.tsx

interface LocalOperator {
  name: string
  url: string
  price?: string
  ratingLabel?: string
}

interface BookingOptionsProps {
  routeLabel: string       // e.g. "ATH Airport → Your Hotel"
  bookingUrl: string       // Primary affiliate deep link — usually Welcome Pickups, but not
                            // always (e.g. helicopter/niche pages route through GetYourGuide
                            // or Viator instead, since Welcome Pickups has no matching product)
  price: string            // e.g. "€35"
  priceNote?: string       // e.g. "fixed, one-way"
  variant: 'hub' | 'spoke'
  // Explicit override for the primary card's provider name/rating line. Leave
  // unset and it's inferred from bookingUrl's domain (see inferProvider below) —
  // only pass this when the URL doesn't clearly identify the provider.
  providerName?: string
  providerRating?: string
  // Real local operators go here once partnerships are live. Until then
  // this stays empty and a placeholder slot renders instead — remove the
  // placeholder branch entirely once the first operator is added.
  localOperators?: LocalOperator[]
}

// Welcome Pickups is an affiliate link — same rel treatment as every other
// outbound affiliate link on the site (see AFFILIATE_DOMAINS in the blog
// post template). Kept explicit here since this is a component, not
// PortableText, so it doesn't pass through that shared link renderer.
const AFFILIATE_REL = 'noopener sponsored'

// The primary card is *usually* Welcome Pickups, but a handful of pages
// (helicopter transfers, other niche services) route bookingUrl through a
// different affiliate — e.g. https://getyourguide.tpx.lt/xxxxx instead of
// the plain https://tpx.lt/xxxxx Welcome Pickups uses. Infer the provider
// from the URL so the card never shows the wrong name, without requiring
// every call site to pass it explicitly. The "4.8/5 · 48,000+ reviews" line
// is Welcome Pickups' own real number — it's real data, not a generic
// placeholder, so it must not be shown for any other provider.
function inferProvider(bookingUrl: string): { name: string; rating: string | null } {
  const url = bookingUrl.toLowerCase()
  if (url.includes('getyourguide') || url.includes('gyg.')) {
    return { name: 'GetYourGuide', rating: null }
  }
  if (url.includes('viator')) {
    return { name: 'Viator', rating: null }
  }
  return { name: 'Welcome Pickups', rating: '4.8/5 · 48,000+ reviews' }
}

export default function BookingOptions({
  routeLabel,
  bookingUrl,
  price,
  priceNote = 'fixed price',
  variant,
  providerName,
  providerRating,
  localOperators = [],
}: BookingOptionsProps) {
  const inferred = inferProvider(bookingUrl)
  const primaryName = providerName ?? inferred.name
  const primaryRating = providerRating ?? inferred.rating
  const maxLocalSlots = variant === 'hub' ? 2 : 1
  const shownOperators = localOperators.slice(0, maxLocalSlots)
  const totalCards = 1 + shownOperators.length

  // Grid only kicks in once there's actually more than one card to show —
  // otherwise a lone Welcome Pickups card in a 2-column grid leaves an
  // awkward empty half. Single card gets a sensible max-width instead.
  const containerClass =
    variant === 'hub'
      ? totalCards > 1
        ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
        : 'max-w-md'
      : 'flex flex-col gap-3'

  return (
    <div className={containerClass}>
      {/* Primary provider — Welcome Pickups by default, inferred otherwise */}
      <div className="border-[1.5px] border-[#1a1a2e] rounded-2xl p-5 bg-white">
        {variant === 'spoke' && (
          <div className="font-mono text-[10.5px] text-[#999] mb-1 tracking-wide uppercase">{routeLabel}</div>
        )}
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-[15px] text-[#180204]">{primaryName}</span>
          <span className="font-mono text-[9.5px] bg-[#1a1a2e] text-white px-2 py-1 rounded-full">Verified</span>
        </div>
        {primaryRating && (
          <div className="flex items-center gap-1.5 text-xs text-[#777] mb-3.5">
            <span className="text-[#FF5635]">★★★★★</span> {primaryRating}
          </div>
        )}
        <div className="font-mono text-xl sm:text-2xl text-[#180204] mb-1">
          {price} <span className="text-[11px] text-[#999] font-normal">{priceNote}</span>
        </div>
        <a
          href={bookingUrl}
          target="_blank"
          rel={AFFILIATE_REL}
          data-tracked="true"
          className="block text-center bg-[#180204] hover:bg-[#1a1a2e] text-white text-[13.5px] font-semibold rounded-[10px] py-3 mt-3 transition-colors"
        >
          Book this route →
        </a>
      </div>

      {/* Real local operators, once any exist — no placeholder card while
          the list is empty; a single Welcome Pickups card reads as
          intentional, not unfinished. */}
      {shownOperators.map((op) => (
        <div key={op.name} className="border border-[#E6DAD1] rounded-2xl p-5 bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-[15px] text-[#180204]">{op.name}</span>
            <span className="font-mono text-[9.5px] bg-[#E6DAD1] text-[#666] px-2 py-1 rounded-full">Verified</span>
          </div>
          {op.ratingLabel && <div className="text-xs text-[#777] mb-3.5">{op.ratingLabel}</div>}
          {op.price && <div className="font-mono text-xl text-[#180204] mb-1">{op.price}</div>}
          <a
            href={op.url}
            target="_blank"
            rel={AFFILIATE_REL}
            data-tracked="true"
            className="block text-center border border-[#180204] text-[#180204] hover:bg-[#180204] hover:text-white text-[13.5px] font-semibold rounded-[10px] py-3 mt-3 transition-colors"
          >
            Book this route →
          </a>
        </div>
      ))}
    </div>
  )
}
