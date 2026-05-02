'use client'

/**
 * CredentialStrip — top-of-itinerary trust signal.
 *
 * A slim, single-line credential strip that sits just below the Overview
 * heading. Reframes the entire AI itinerary from "algorithmic suggestion"
 * → "human-curated recommendation that AI helped personalize."
 *
 * Why position 1: by the time the reader evaluates a single recommendation,
 * they've already seen who's behind it. Lifts trust on every affiliate
 * link below.
 *
 * Static content (no per-trip variants) since Vaggelis covers all of Greece.
 * The user's first name is folded in for personalization.
 */

interface CredentialStripProps {
  userData: any
}

export default function CredentialStrip({ userData }: CredentialStripProps) {
  const firstName = userData?.firstName || ''

  return (
    <div
      className="my-6 px-5 py-4 rounded-xl border flex items-start gap-3"
      style={{
        background: '#FFFCF8',
        borderColor: '#E0D8D3',
      }}
    >
      {/* Verification icon — column motif, matches Guide's Corner style */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0 mt-0.5"
        style={{
          background: '#EDE9FE',
          boxShadow: '0 0 0 1.5px #E0D8D3',
        }}
        aria-hidden="true"
      >
        🏛️
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-bold tracking-wider uppercase m-0 mb-1 text-[#FF5635]"
          style={{ letterSpacing: '0.06em' }}>
          {firstName ? `${firstName}, this route is reviewed by Greek experts` : 'Reviewed by Greek travel experts'}
        </p>
        <p className="text-[13px] text-[#180204]/70 m-0 leading-relaxed">
          Curated by{' '}
          <span className="font-semibold text-[#180204]">Vaggelis</span> (Certified Greek Tourist Guide) and{' '}
          <span className="font-semibold text-[#180204]">Panos</span> (Founder, Greek Trip Planner) — using a database of 133 destinations and field-tested operators.
        </p>
      </div>
    </div>
  )
}
