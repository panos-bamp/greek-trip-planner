'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { PortableTextComponents } from '@portabletext/react'
import { getPartnerName, trackAffiliateClick } from '@/lib/trackAffiliate'
import { usePathname } from 'next/navigation'

// Helper function to build Sanity image URLs without external dependency
function getSanityImageUrl(ref: string): string {
  if (!ref) return ''
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/puhk8qa7/production/${id}-${dimensions}.${format}`
}

// All domains that should fire affiliate_click when clicked.
const AFFILIATE_DOMAINS = [
  // Travelpayouts short link domains — check first
  '.tpx.lt',
  '.tp.lt',
  'emrld.ltd',
  'tp.media',
  'travelpayouts.com',
  // Direct partner domains
  'booking.com',
  'getyourguide.com',
  'viator.com',
  'discovercars.com',
  'welcomepickups.com',
  'airalo.com',
  'yesim.app',
  'klook.com',
  'agoda.com',
  'kiwi.com',
  'airhelp.com',
  'ekta.life',
  'nordvpn.com',
]

function isAffiliateLink(href: string): boolean {
  return AFFILIATE_DOMAINS.some(domain => href.includes(domain))
}

// ─────────────────────────────────────────────────────────────────────────────
// HtmlEmbedBlock
// Renders raw HTML from Sanity and attaches a scoped click listener after mount.
// This catches affiliate links inside dangerouslySetInnerHTML that bypass React's
// event system. Uses useRef so it works even if the widget script re-renders links.
// ─────────────────────────────────────────────────────────────────────────────
function HtmlEmbedBlock({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      const link = target.closest('a') as HTMLAnchorElement | null
      if (!link || !link.href) return
      if (!isAffiliateLink(link.href)) return

      trackAffiliateClick({
        partner: getPartnerName(link.href),
        linkUrl: link.href,
        pagePath: pathname,
      })
    }

    container.addEventListener('click', handleClick)

    // Re-attach if the widget script mutates the DOM after initial render.
    // MutationObserver watches for new <a> tags injected by Travelpayouts widgets.
    const observer = new MutationObserver(() => {
      // Nothing to do — the click listener on the container catches all clicks
      // including on dynamically injected children. Observer exists only to
      // log widget activity during debugging if needed.
    })
    observer.observe(container, { childList: true, subtree: true })

    return () => {
      container.removeEventListener('click', handleClick)
      observer.disconnect()
    }
  }, [pathname])

  return (
    <div
      ref={containerRef}
      className="my-8 html-embed-container overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TrackedExternalLink
// Handles affiliate links written directly in the Sanity body (marks.link).
// Separate component so usePathname() hook can be called inside it.
// data-tracked="true" prevents the layout.tsx document listener from
// double-firing on the same click.
// ─────────────────────────────────────────────────────────────────────────────
function TrackedExternalLink({
  href,
  blank,
  children,
  className,
}: {
  href: string
  blank?: boolean
  children: React.ReactNode
  className: string
}) {
  const pathname = usePathname()

  const handleClick = () => {
    if (isAffiliateLink(href)) {
      trackAffiliateClick({
        partner: getPartnerName(href),
        linkUrl: href,
        pagePath: pathname,
      })
    }
  }

  return (
    <a
      href={href}
      target={blank ? '_blank' : undefined}
      rel={blank ? 'noopener noreferrer sponsored' : 'sponsored'}
      data-tracked="true"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  )
}

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null

      const imageUrl = getSanityImageUrl(value.asset._ref)

      return (
        <figure className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || 'Blog post image'}
            width={1200}
            height={800}
            className="w-full h-auto rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-gray-600 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    // HTML EMBED — tracked via HtmlEmbedBlock ref+useEffect
    htmlEmbed: ({ value }: any) => {
      if (!value?.html) return null
      return <HtmlEmbedBlock html={value.html} />
    },
  },

  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 mt-12 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-[38px] font-bold text-gray-900 mb-5 mt-10 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-4 mt-8 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl md:text-[20px] font-semibold text-gray-900 mb-3 mt-6">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 text-gray-600 italic text-lg">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg text-gray-700">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },

  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => {
      const href = value?.href || '#'
      const isExternal = href.startsWith('http')

      const linkClass =
        'text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600 transition-colors'

      if (isExternal) {
        return (
          <TrackedExternalLink
            href={href}
            blank={value?.blank}
            className={linkClass}
          >
            {children}
          </TrackedExternalLink>
        )
      }

      return (
        <Link href={href} className={linkClass}>
          {children}
        </Link>
      )
    },
  },
}
