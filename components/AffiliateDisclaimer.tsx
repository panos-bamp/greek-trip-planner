// components/AffiliateDisclaimer.tsx
// Hardcoded - same on every blog post. FTC + EU compliant.

import { ExternalLink } from 'lucide-react'

export default function AffiliateDisclaimer() {
  return (
    <div className="flex gap-3 items-start bg-[#FFF8F6] border border-[#FF5635]/20 rounded-2xl px-5 py-4 my-8 text-sm text-[#180204]/60 leading-relaxed">
      <ExternalLink className="w-4 h-4 text-[#FF5635] mt-0.5 flex-shrink-0" />
      <p>
        <span className="font-semibold text-[#180204]/80">Affiliate disclosure: </span>
        Some links in this article are affiliate links. If you book or buy through them, we may earn a small commission — at no extra cost to you. We only recommend services we genuinely trust and that we'd use ourselves for a trip to Greece.
      </p>
    </div>
  )
}
