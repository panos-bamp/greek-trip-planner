// components/transfers/TransferSpoke.tsx

import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { portableTextComponents } from '@/components/portableTextComponents'
import BookingOptions from './BookingOptions'

// Same fix as TransferHub — the shared components object doesn't register
// a renderer for "htmlEmbed", confirmed from the live page output.
const transferBodyComponents = {
  ...portableTextComponents,
  types: {
    ...(portableTextComponents as any).types,
    htmlEmbed: ({ value }: any) => (
      <div
        className="html-embed-container overflow-x-auto max-w-[560px] my-5"
        dangerouslySetInnerHTML={{ __html: value.html }}
      />
    ),
  },
}

interface Props {
  page: any // shaped by transferPageQuery in app/transfers/[slug]/page.tsx
}

export default function TransferSpoke({ page }: Props) {
  const hub = page.parentHub

  return (
    <>
      {/* Breadcrumb — carries the hub↔spoke hierarchy since the URL itself
          is flat (see the URL-structure decision earlier in this project).
          pt-[82px] clears the 64px fixed nav with 18px of visible breathing room. */}
      <div className="max-w-[1120px] mx-auto px-5 sm:px-8 pt-[82px] pb-[18px] font-mono text-[11px] text-[#999]">
        <Link href="/" className="hover:text-[#2C73FF]">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/transfers" className="hover:text-[#2C73FF]">Transfers</Link>
        {hub && (
          <>
            <span className="mx-1.5">/</span>
            <Link href={`/transfers/${hub.slug}`} className="hover:text-[#2C73FF]">{hub.title}</Link>
          </>
        )}
        <span className="mx-1.5">/</span>
        <span className="text-[#180204]">{page.title}</span>
      </div>

      {/* Two-column layout — the structural difference from the hub.
          Left: lean transactional content. Right: sticky booking panel
          that stays visible through the scroll, since a spoke visitor
          already knows their route and is close to booking. */}
      <div className="max-w-[1120px] mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-[1fr_340px] gap-12 items-start pb-16">

        <div className="min-w-0">
          <h1 className="font-serif text-[28px] sm:text-[30px] leading-[1.2] mb-3">{page.title}</h1>
          {page.excerpt && (
            <p className="text-[15px] text-[#444] max-w-lg leading-relaxed mb-6">{page.excerpt}</p>
          )}

          <div className="flex border border-[#E6DAD1] rounded-[10px] overflow-hidden mb-9 max-w-[520px]">
            {page.routeFrom && page.routeTo && (
              <div className="flex-1 px-4 py-[13px] border-r border-[#E6DAD1]">
                <div className="font-mono text-[9.5px] uppercase tracking-wide text-[#999] mb-0.5">Route</div>
                <div className="font-mono text-[13px] font-medium">{page.routeFrom} → {page.routeTo}</div>
              </div>
            )}
            {page.durationLabel && (
              <div className="flex-1 px-4 py-[13px] border-r border-[#E6DAD1] last:border-r-0">
                <div className="font-mono text-[9.5px] uppercase tracking-wide text-[#999] mb-0.5">Duration</div>
                <div className="font-mono text-sm font-medium">{page.durationLabel}</div>
              </div>
            )}
            {page.priceRangeEUR && (
              <div className="flex-1 px-4 py-[13px]">
                <div className="font-mono text-[9.5px] uppercase tracking-wide text-[#999] mb-0.5">Price</div>
                <div className="font-mono text-sm font-medium">{page.priceRangeEUR}</div>
              </div>
            )}
          </div>

          {/* Body — short, practical content authored in Sanity. Typography
              matches the hub exactly (headings/paragraphs/lists) — no
              separate smaller scale for spokes; only the page layout
              differs, not the prose styling. */}
          {page.body && (
            <div
              className="max-w-[560px] mb-2
                [&_h2]:font-serif [&_h2]:text-[22px] [&_h2]:sm:text-2xl [&_h2]:text-[#180204] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:first:mt-0
                [&_p]:text-[15px] [&_p]:text-[#444] [&_p]:leading-[1.7] [&_p]:mb-4
                [&_ul]:mb-5 [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:list-disc
                [&_li]:text-[15px] [&_li]:text-[#444] [&_li]:leading-[1.7]"
            >
              <PortableText value={page.body} components={transferBodyComponents} />
            </div>
          )}

          {/* Compact trust line — NOT the full checklist. Full checklist
              lives on the hub; repeating it on every spoke would be
              redundant within the same cluster. */}
          <div className="flex items-center gap-2 text-[12.5px] text-[#666] bg-[#FAF6F3] rounded-lg px-3.5 py-[11px] my-7 max-w-[520px]">
            <span className="w-4 h-4 rounded-full bg-[#5C2A2E] text-white flex items-center justify-center text-[9px] flex-shrink-0">✓</span>
            Every operator shown here is licensed, insured, and flight-tracked — see the full{' '}
            {hub && (
              <Link href={`/transfers/${hub.slug}`} className="underline font-semibold text-[#180204]">
                vetting criteria
              </Link>
            )}
          </div>

          {/* Short FAQ — 2–4 route-specific questions, not the hub's
              general set */}
          {page.faqSchema?.enabled && page.faqSchema?.faqs?.length > 0 && (
            <div className="mt-8">
              <h2 className="font-sans font-bold text-lg mb-3">Common questions</h2>
              {page.faqSchema.faqs.map((faq: any, i: number) => (
                <details key={i} className="border-b border-[#E6DAD1] py-3.5 max-w-[560px]" open={i === 0}>
                  <summary className="font-semibold text-[13.5px] cursor-pointer list-none flex justify-between items-center">
                    {faq.question}
                    <ChevronRight className="w-3.5 h-3.5 text-[#2C73FF] flex-shrink-0 ml-3" />
                  </summary>
                  <p className="mt-2 text-[13px] text-[#666] leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          )}

          {/* Related — back to hub + sibling spokes */}
          <div className="mt-8 pt-6 border-t border-[#E6DAD1]">
            {hub && (
              <Link href={`/transfers/${hub.slug}`} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2C73FF] mb-3.5">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to {hub.title}
              </Link>
            )}
            {page.siblingSpokes?.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {page.siblingSpokes.map((s: any) => (
                  <Link
                    key={s.slug}
                    href={`/transfers/${s.slug}`}
                    className="border border-[#E6DAD1] rounded-full px-3.5 py-[7px] text-[12.5px] hover:border-[#2C73FF] hover:text-[#2C73FF] transition-colors"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sticky booking panel — top-[88px] = 64px fixed nav + 24px gap, so it doesn't stick under the header */}
        <div className="md:sticky md:top-[88px]">
          {page.bookingUrl ? (
            <>
              <BookingOptions
                routeLabel={page.routeFrom && page.routeTo ? `${page.routeFrom} → ${page.routeTo}` : page.title}
                bookingUrl={page.bookingUrl}
                price={page.priceRangeEUR || '—'}
                priceNote="fixed, one-way"
                variant="spoke"
                localOperators={page.localOperators}
              />
              {/* Same real disclosure copy as the hub template — see note there */}
              <div className="flex items-start gap-2 bg-[#F7F4F1] border border-[#E6DAD1] rounded-xl px-3.5 py-3 mt-3">
                <span className="text-sm leading-none mt-0.5 flex-shrink-0">ℹ️</span>
                <p className="text-[11.5px] text-[#666] leading-relaxed">
                  <strong className="text-[#180204] font-semibold">Affiliate disclosure:</strong> Some links here are affiliate links — booking through them may earn us a small commission at no extra cost to you. We only recommend services we'd genuinely use ourselves.
                </p>
              </div>
            </>
          ) : (
            <div className="border border-dashed border-[#E6DAD1] rounded-2xl p-5 text-center text-[#bbb] font-mono text-[11px]">
              No booking link set for this route yet
            </div>
          )}
        </div>
      </div>
    </>
  )
}
