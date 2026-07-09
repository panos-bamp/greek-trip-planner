'use client'

/**
 * /results/[id]/pdf — Print-optimized rendering of an itinerary.
 *
 * This page exists specifically for Puppeteer to navigate to when generating
 * PDFs. It renders the SAME content as /results/[id]/page.tsx but in a clean
 * single-column, print-friendly layout with:
 *   - No sticky header, no day tabs, no TripMap
 *   - No affiliate cards (CredentialStrip, DiscoverCars, etc.) — the PDF is a
 *     personal keepsake, not a re-sell surface. Every inline affiliate link
 *     inside the itinerary body IS preserved.
 *   - Server-side data fetch (Supabase) so it works even without localStorage
 *   - Print-friendly typography, page-break hints, cleaner spacing
 *   - All markdown links, bold, tables render normally — Puppeteer preserves
 *     clickable <a href> in the exported PDF
 *
 * URL: https://greektriplanner.me/results/[id]/pdf
 *
 * Reachable directly by users too (e.g. "print this page" from browser),
 * so it's a valid standalone view — just optimized for print.
 */

import { useState, useEffect, useMemo, type ReactNode } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { extractLocationsFromText, getLocationData } from '@/lib/greece-locations'
import CredentialStrip from '@/components/CredentialStrip'
import YesimCallout from '@/components/YesimCallout'
import DiscoverCarsCard from '@/components/DiscoverCarsCard'
import FerryscannerCard from '@/components/FerryscannerCard'
import GuidesCornerInline from '@/components/GuidesCornerInline'

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */

export default function ResultsPdfPage() {
  const params = useParams()
  const [itinerary, setItinerary] = useState('')
  const [userData, setUserData] = useState<any>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'notfound' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      if (!supabase) {
        if (!cancelled) setStatus('error')
        return
      }
      try {
        const { data, error } = await supabase
          .from('itineraries')
          .select('itinerary_markdown, answers_json')
          .eq('id', params.id)
          .maybeSingle()
        if (cancelled) return
        if (error) {
          setStatus('error')
          return
        }
        if (!data) {
          setStatus('notfound')
          return
        }
        setItinerary(data.itinerary_markdown || '')
        setUserData(data.answers_json)
        setStatus('ready')
      } catch {
        if (!cancelled) setStatus('error')
      }
    }
    load()
    return () => { cancelled = true }
  }, [params.id])

  // Extract locations from itinerary — needed by DiscoverCarsCard, FerryscannerCard, GuidesCornerInline
  const locations = useMemo(() => {
    if (!itinerary) return []
    const extractedNames = extractLocationsFromText(itinerary)
    const lines = itinerary.split('\n')
    const locationObjects: any[] = []
    let currentDay = 1
    lines.forEach((line) => {
      const dayMatch = line.match(/Day (\d+)|DAY (\d+)/i)
      if (dayMatch) currentDay = parseInt(dayMatch[1] || dayMatch[2])
      extractedNames.forEach((locationName) => {
        if (
          line.toLowerCase().includes(locationName) &&
          !locationObjects.find((loc) => loc.name === locationName && loc.day === currentDay)
        ) {
          const locData = getLocationData(locationName)
          if (locData) {
            locationObjects.push({
              name: locationName.charAt(0).toUpperCase() + locationName.slice(1),
              lat: locData.lat,
              lng: locData.lng,
              day: currentDay,
              type: locData.type,
            })
          }
        }
      })
    })
    return locationObjects
  }, [itinerary])

  // The PDF generator waits for this element to appear before printing.
  // See /api/generate-pdf/[id]/route.ts — it uses `waitForSelector('[data-pdf-ready="true"]')`
  const readyAttr = status === 'ready' ? 'true' : 'false'

  return (
    <div
      data-pdf-ready={readyAttr}
      className="min-h-screen bg-white text-[#180204]"
      style={{
        fontFamily: "'DM Sans', -apple-system, sans-serif",
      }}
    >
      {/* Print-specific CSS: page size, margins, avoid breaks in weird places */}
      <style>{`
        @page {
          size: A4;
          margin: 20mm 15mm;
        }
        @media print {
          html, body { background: white !important; }
          a { color: #2C73FF !important; text-decoration: underline !important; }
          .pdf-day-block, .pdf-block-avoid-break {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          h1, h2, h3 { break-after: avoid; page-break-after: avoid; }
          table { break-inside: avoid; page-break-inside: avoid; }
        }
        /* Belt-and-suspenders: forcibly hide the shared Navbar/Footer if
           the layout header detection failed to skip them for this route.
           These wrappers are added by app/layout.tsx. */
        .site-navbar-wrapper, .site-footer-wrapper { display: none !important; }
        /* Screen preview mimics A4 for consistency */
        @media screen {
          .pdf-container {
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm 15mm;
          }
        }
      `}</style>

      <div className="pdf-container">
        {status === 'loading' && (
          <div className="text-center text-[#180204]/50 py-20">
            <p style={{ fontFamily: "'DM Serif Display', Georgia, serif" }} className="text-lg">
              Preparing itinerary…
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center text-[#180204]/50 py-20">
            <p>Something went wrong loading this itinerary.</p>
          </div>
        )}

        {status === 'notfound' && (
          <div className="text-center text-[#180204]/50 py-20">
            <p>Itinerary not found.</p>
          </div>
        )}

        {status === 'ready' && (
          <>
            {/* Header — logo + prepared-for line */}
            <header className="mb-6 pb-4 border-b border-[#E6DAD1]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p
                    className="text-[10px] font-bold tracking-widest uppercase text-[#FF5635]"
                    style={{ letterSpacing: '0.15em' }}
                  >
                    Greek Trip Planner
                  </p>
                  <p className="text-[9px] text-[#180204]/50 mt-1">
                    greektriplanner.me
                  </p>
                </div>
                {userData?.firstName && (
                  <div className="text-right">
                    <p className="text-[9px] text-[#180204]/50 uppercase tracking-wider">
                      Prepared for
                    </p>
                    <p
                      className="text-sm font-semibold text-[#180204]"
                      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                      {userData.firstName}
                    </p>
                  </div>
                )}
              </div>
            </header>

            {/* Itinerary body */}
            <article className="space-y-3">
              {(() => {
                const lines = itinerary.split('\n')
                const out: ReactNode[] = []
                // Track which components have been injected — same pattern as main results page
                const flags = {
                  credentialStrip: false,
                  yesim: false,
                  discoverCars: false,
                  ferryscanner: false,
                  guidesCorner: false,
                }
                let i = 0
                while (i < lines.length) {
                  const line = lines[i]
                  const trimmed = line.trim()

                  // Anchor 4 (PRE): Guide's Corner just before Final Tips
                  if (!flags.guidesCorner && /^##\s*Final\s+[Tt]ips\b/.test(trimmed)) {
                    flags.guidesCorner = true
                    out.push(
                      <GuidesCornerInline
                        key={`gc-${i}`}
                        userData={userData}
                        itinerary={itinerary}
                        locations={locations}
                      />
                    )
                  }

                  // Multi-line table detection
                  if (trimmed.startsWith('|') && trimmed.includes('|')) {
                    const tableRes = tryConsumeTable(lines, i)
                    if (tableRes) {
                      out.push(tableRes.node)
                      i += tableRes.advance
                      continue
                    }
                  }

                  out.push(renderPdfLine(line, i))

                  // Anchor 1 (POST): CredentialStrip after Overview heading
                  if (!flags.credentialStrip && /^##\s*Overview\s*$/i.test(trimmed)) {
                    flags.credentialStrip = true
                    out.push(<CredentialStrip key={`cs-${i}`} userData={userData} />)
                  }

                  // Anchor 2 (POST): Yesim after "Your Route" heading
                  if (!flags.yesim && /^##\s*Your Route\s*$/i.test(trimmed)) {
                    flags.yesim = true
                    out.push(<YesimCallout key={`ys-${i}`} />)
                  }

                  // Anchor 3 (POST): DiscoverCars after "Transport Between Destinations"
                  if (
                    !flags.discoverCars &&
                    /^##\s*Transport Between Destinations\s*$/i.test(trimmed)
                  ) {
                    flags.discoverCars = true
                    out.push(
                      <DiscoverCarsCard
                        key={`dc-${i}`}
                        userData={userData}
                        itinerary={itinerary}
                        locations={locations}
                      />
                    )
                  }

                  // Anchor 5 (POST): Ferryscanner immediately after DiscoverCars
                  if (
                    !flags.ferryscanner &&
                    /^##\s*Transport Between Destinations\s*$/i.test(trimmed)
                  ) {
                    flags.ferryscanner = true
                    out.push(
                      <FerryscannerCard
                        key={`fs-${i}`}
                        userData={userData}
                        itinerary={itinerary}
                        locations={locations}
                      />
                    )
                  }

                  i++
                }
                return out
              })()}
            </article>

            {/* Footer */}
            <footer className="mt-10 pt-4 border-t border-[#E6DAD1]">
              <p className="text-[9px] text-[#180204]/40 text-center">
                Generated by Greek Trip Planner · greektriplanner.me · Itinerary ID: {params.id}
              </p>
              <p className="text-[9px] text-[#180204]/40 text-center mt-1">
                Some links in this document are affiliate links — we may earn a commission if you book, at no cost to you.
              </p>
            </footer>
          </>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   LINE RENDERER — Simplified for print
   Same markdown patterns as the main results page, but styled
   for A4 print output. No badges, no interactive elements,
   no fixed positioning. Everything flows top-to-bottom.
   ───────────────────────────────────────────────────────────── */

function renderPdfLine(line: string, index: number): ReactNode {
  const trimmed = line.trim()

  // Sign-off — italic single-line ending with emoji
  const signoffMatch = line.match(/^\s*\*([^*].*?[^*])\*\s*$/)
  if (
    signoffMatch &&
    (/\p{Extended_Pictographic}/u.test(signoffMatch[1]) ||
     /happy travels|safe travels|enjoy|καλό ταξίδι/i.test(signoffMatch[1])) &&
    signoffMatch[1].length > 20
  ) {
    return (
      <div key={index} className="my-6 text-center">
        <p
          className="text-lg font-bold text-[#180204]"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          {signoffMatch[1]}
        </p>
      </div>
    )
  }

  // H1 — Main title
  if (line.startsWith('# ')) {
    return (
      <h1
        key={index}
        className="text-2xl leading-tight mt-2 mb-3 text-[#180204]"
        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
      >
        {line.replace('# ', '')}
      </h1>
    )
  }

  // H2 — Section
  if (line.startsWith('## ')) {
    return (
      <h2
        key={index}
        className="text-lg mt-6 mb-2 pb-1 border-b border-[#E6DAD1] text-[#180204] pdf-block-avoid-break"
        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
      >
        {line.replace('## ', '')}
      </h2>
    )
  }

  // H3 — Day header
  if (line.startsWith('### ')) {
    return (
      <h3
        key={index}
        className="text-base font-bold mt-5 mb-2 text-[#FF5635] pdf-block-avoid-break"
        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
      >
        {line.replace('### ', '')}
      </h3>
    )
  }

  // Section blocks: Morning/Afternoon/Evening/Where to Stay/Insider Tip/Daily Budget
  const sectionPatterns = [
    { re: /^\*\*Morning:\*\*\s*/, label: 'Morning', color: '#F59E0B' },
    { re: /^\*\*Afternoon:\*\*\s*/, label: 'Afternoon', color: '#0EA5E9' },
    { re: /^\*\*Evening:\*\*\s*/, label: 'Evening', color: '#8B5CF6' },
    { re: /^\*\*Where to Stay:\*\*\s*/, label: 'Where to Stay', color: '#10B981' },
    { re: /^\*\*Insider Tip:\*\*\s*/, label: 'Insider Tip', color: '#FF5635' },
    { re: /^\*\*Daily Budget:\*\*\s*/, label: 'Daily Budget', color: '#2C73FF' },
  ]
  for (const p of sectionPatterns) {
    if (p.re.test(trimmed)) {
      const content = trimmed.replace(p.re, '')
      return (
        <div key={index} className="my-2 pdf-block-avoid-break">
          <span
            className="text-[10px] font-bold uppercase tracking-wider mr-2"
            style={{ color: p.color, letterSpacing: '0.06em' }}
          >
            {p.label}
          </span>
          <span className="text-[13px] text-[#180204] leading-relaxed">
            {renderInlineForPdf(content)}
          </span>
        </div>
      )
    }
  }

  // Bullets
  if (line.startsWith('- ')) {
    return (
      <div key={index} className="flex items-start gap-2 my-1 text-[13px] text-[#180204] leading-relaxed">
        <span className="text-[#FF5635] mt-1">•</span>
        <span>{renderInlineForPdf(line.replace('- ', ''))}</span>
      </div>
    )
  }

  // Numbered lists — "1. Text"
  const numMatch = line.match(/^(\d+)\.\s+(.+)$/)
  if (numMatch) {
    return (
      <div key={index} className="flex items-start gap-2 my-2 text-[13px] text-[#180204] leading-relaxed">
        <span className="font-bold text-[#FF5635] min-w-[16px]">{numMatch[1]}.</span>
        <span>{renderInlineForPdf(numMatch[2])}</span>
      </div>
    )
  }

  // Blockquote — > text
  if (line.startsWith('> ')) {
    return (
      <div
        key={index}
        className="my-3 pl-3 border-l-2 border-[#FF5635] text-[12px] italic text-[#180204]/70"
      >
        {renderInlineForPdf(line.replace('> ', ''))}
      </div>
    )
  }

  // Horizontal rule — treat as spacer
  if (trimmed === '---') {
    return <div key={index} className="my-4 border-t border-[#E6DAD1]/50" />
  }

  // Blank line
  if (!trimmed) {
    return <div key={index} className="h-1" />
  }

  // Regular paragraph
  return (
    <p key={index} className="text-[13px] text-[#180204] leading-relaxed my-1">
      {renderInlineForPdf(line)}
    </p>
  )
}

/* ─────────────────────────────────────────────────────────────
   INLINE PARSER — Preserves bold + affiliate links as <a>
   All links become plain colored <a> tags in the PDF (Puppeteer
   preserves href attributes). No badges or special styling —
   the goal is readable, clickable, and clean when printed.
   ───────────────────────────────────────────────────────────── */

function renderInlineForPdf(text: string): ReactNode {
  if (!text) return null

  // Same defensive collapse of nested links [[X](u1)](u2) as the main page
  let cleaned = text
  let prev = ''
  while (prev !== cleaned) {
    prev = cleaned
    cleaned = cleaned.replace(/\[\[([^\[\]]+?)\]\(([^)]+?)\)\]\(([^)]+?)\)/g, '[$1]($3)')
  }

  type Token =
    | { kind: 'bold'; value: string }
    | { kind: 'link'; text: string; url: string }
    | { kind: 'text'; value: string }

  const tokens: Token[] = []
  let i = 0
  while (i < cleaned.length) {
    if (cleaned[i] === '*' && cleaned[i + 1] === '*') {
      const end = cleaned.indexOf('**', i + 2)
      if (end !== -1) {
        const inner = cleaned.slice(i + 2, end)
        if (inner.length > 0) {
          tokens.push({ kind: 'bold', value: inner })
          i = end + 2
          continue
        }
      }
    }
    if (cleaned[i] === '[') {
      const closeBracket = cleaned.indexOf(']', i + 1)
      if (closeBracket !== -1 && cleaned[closeBracket + 1] === '(') {
        const closeParen = cleaned.indexOf(')', closeBracket + 2)
        if (closeParen !== -1) {
          const linkText = cleaned.slice(i + 1, closeBracket)
          const url = cleaned.slice(closeBracket + 2, closeParen)
          if (linkText && url && !url.includes('[')) {
            tokens.push({ kind: 'link', text: linkText, url })
            i = closeParen + 1
            continue
          }
        }
      }
    }
    const last = tokens[tokens.length - 1]
    if (last && last.kind === 'text') {
      last.value += cleaned[i]
    } else {
      tokens.push({ kind: 'text', value: cleaned[i] })
    }
    i++
  }

  return tokens.map((tok, idx) => {
    if (tok.kind === 'bold') {
      return (
        <strong key={idx} className="font-bold text-[#180204]">
          {tok.value}
        </strong>
      )
    }
    if (tok.kind === 'link') {
      return (
        <a
          key={idx}
          href={tok.url}
          className="text-[#2C73FF] underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {tok.text}
        </a>
      )
    }
    return <span key={idx}>{tok.value}</span>
  })
}

/* ─────────────────────────────────────────────────────────────
   TABLE RENDERER — Simplified for PDF
   ───────────────────────────────────────────────────────────── */

function tryConsumeTable(
  lines: string[],
  startIdx: number
): { node: ReactNode; advance: number } | null {
  const headerLine = lines[startIdx]?.trim()
  const sepLine = lines[startIdx + 1]?.trim()
  if (!headerLine || !sepLine) return null
  if (!headerLine.includes('|')) return null
  if (!/^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?\s*$/.test(sepLine)) return null

  const splitRow = (raw: string) =>
    raw.replace(/^\||\|$/g, '').split('|').map((c) => c.trim())

  const headers = splitRow(headerLine)
  const bodyRows: string[][] = []
  let i = startIdx + 2
  while (i < lines.length) {
    const t = lines[i]?.trim() ?? ''
    if (!t || !t.includes('|')) break
    bodyRows.push(splitRow(t))
    i++
  }
  if (bodyRows.length === 0) return null

  const isTotalRow = (cells: string[]) =>
    cells.some((c) => /^\s*\*\*?\s*total/i.test(c))

  const node = (
    <table
      key={`tbl-${startIdx}`}
      className="my-3 w-full border-collapse text-[11px] pdf-block-avoid-break"
      style={{ border: '1px solid #E6DAD1' }}
    >
      <thead>
        <tr style={{ background: '#180204' }}>
          {headers.map((h, hi) => (
            <th
              key={hi}
              className="text-left px-2 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white"
              style={{ letterSpacing: '0.04em' }}
            >
              {h.replace(/^\*\*|\*\*$/g, '')}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyRows.map((row, ri) => {
          const totalRow = isTotalRow(row)
          return (
            <tr
              key={ri}
              style={{
                background: totalRow ? '#180204' : ri % 2 === 1 ? '#FDFBF9' : '#FFFFFF',
                borderBottom: '1px solid #F0E8E2',
              }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-2 py-1.5 leading-relaxed"
                  style={{
                    color: totalRow ? '#fff' : '#374151',
                    fontWeight: totalRow ? 700 : 400,
                    verticalAlign: 'top',
                  }}
                >
                  {renderInlineForPdf(cell)}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
  return { node, advance: i - startIdx }
}
