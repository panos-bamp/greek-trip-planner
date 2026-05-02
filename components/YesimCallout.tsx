'use client'

/**
 * YesimCallout — compact inline eSIM affiliate callout.
 *
 * Static content, always renders. Targets the universal need every
 * international visitor has but nobody plans for: data connectivity
 * on arrival.
 *
 * URL is the static, pre-tracked TravelPayouts short link:
 *   https://yesim.tpx.lt/4ToQX48u
 *
 * Placement: just after the Overview / Route section, before Day 1.
 * Catches readers in the planning mindset, before they're deep in
 * day-by-day mode.
 */

import { ExternalLink } from 'lucide-react'

export default function YesimCallout() {
  return (
    <div
      className="my-6 px-5 py-4 rounded-xl border flex items-start gap-3"
      style={{
        background: '#F0F7FF',
        borderColor: '#C9E0FB',
      }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0 mt-0.5"
        style={{
          background: '#FFFFFF',
          boxShadow: '0 0 0 1.5px #C9E0FB',
        }}
        aria-hidden="true"
      >
        📱
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-bold tracking-wider uppercase m-0 mb-1 text-[#2C73FF]"
          style={{ letterSpacing: '0.06em' }}>
          Before you fly · eSIM connectivity
        </p>
        <p className="text-[13px] text-[#180204]/75 m-0 leading-relaxed mb-2">
          Roaming charges in Greece add up fast. A Yesim eSIM activates instantly when you land — €5 for 1GB, €15 for unlimited week. No SIM swap, no airport queue.
        </p>
        <a
          href="https://yesim.tpx.lt/4ToQX48u"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#2C73FF] hover:underline"
        >
          <span>Compare Yesim plans for Greece</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}
