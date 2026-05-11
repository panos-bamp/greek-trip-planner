// components/AffiliateDisclaimer.tsx
// Hardcoded - same on every blog post. FTC + EU compliant.
//
// Changes from previous version:
// - Added `h-full` so the component fills its parent wrapper (needed for
//   equal-height alignment with the author card that now sits beside it).
// - Removed `my-8`. The parent row on the blog page now handles vertical
//   spacing. Keeping my-8 would push the disclaimer down relative to the
//   author card, breaking visual alignment.
// - items-start → items-center on the flex container, so the icon stays
//   visually aligned with the text even when the card stretches taller.

import { ExternalLink } from 'lucide-react'

export default function AffiliateDisclaimer() {
  return (
    <div className="h-full flex gap-3 items-center bg-[#FFF8F6] border border-[#FF5635]/20 rounded-2xl px-5 py-4 text-sm text-[#180204]/60 leading-relaxed">
      <ExternalLink className="w-4 h-4 text-[#FF5635] flex-shrink-0" />
      <p>
        <span className="font-semibold text-[#180204]/80">Affiliate disclosure: </span>
        Some links in this article are affiliate links. If you book or buy through them, we may earn a small commission — at no extra cost to you. We only recommend services we genuinely trust and that we&apos;d use ourselves for a trip to Greece.
      </p>
    </div>
  )
}
