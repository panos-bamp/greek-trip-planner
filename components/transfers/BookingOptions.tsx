// components/transfers/BookingOptions.tsx

interface LocalOperator {
  name: string
  url: string
  price?: string
  ratingLabel?: string
}

interface BookingOptionsProps {
  routeLabel: string       // e.g. "ATH Airport → Your Hotel"
  bookingUrl: string       // Welcome Pickups route-specific deep link (Travelpayouts)
  price: string            // e.g. "€35"
  priceNote?: string       // e.g. "fixed, one-way"
  variant: 'hub' | 'spoke'
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

export default function BookingOptions({
  routeLabel,
  bookingUrl,
  price,
  priceNote = 'fixed price',
  variant,
  localOperators = [],
}: BookingOptionsProps) {
  const maxLocalSlots = variant === 'hub' ? 2 : 1
  const shownOperators = localOperators.slice(0, maxLocalSlots)
  const emptySlots = Math.max(0, (localOperators.length === 0 ? 1 : 0), maxLocalSlots - shownOperators.length)
  // Show exactly one placeholder while no operators exist yet, regardless
  // of maxLocalSlots — no need to show 2 empty ghost cards on hub pages.
  const showPlaceholder = localOperators.length === 0

  const containerClass =
    variant === 'hub'
      ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
      : 'flex flex-col gap-3'

  return (
    <div className={containerClass}>
      {/* Welcome Pickups — always first, real data */}
      <div className="border-[1.5px] border-[#1a1a2e] rounded-2xl p-5 bg-white">
        {variant === 'spoke' && (
          <div className="font-mono text-[10.5px] text-[#999] mb-1 tracking-wide uppercase">{routeLabel}</div>
        )}
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-[15px] text-[#180204]">Welcome Pickups</span>
          <span className="font-mono text-[9.5px] bg-[#1a1a2e] text-white px-2 py-1 rounded-full">Verified</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#777] mb-3.5">
          <span className="text-[#FF5635]">★★★★★</span> 4.8/5 · 48,000+ reviews
        </div>
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

      {/* Real local operators, once any exist */}
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

      {/* Placeholder — remove this branch once the first local operator ships */}
      {showPlaceholder && (
        <div className="border border-dashed border-[#E6DAD1] rounded-2xl flex items-center justify-center text-center text-[#bbb] font-mono text-[11px] p-5 min-h-[140px]">
          Local operator slot —<br />added once partnership is live
        </div>
      )}
    </div>
  )
}
