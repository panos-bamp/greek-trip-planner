import Link from 'next/link'

/* Header and footer of the Greek Trip Planner engine (Sea State design), for the planner pages when they are
 * served through the engine (html.seastate, see app/globals.css). Mirrors trip-planner-template
 * sites/greece/site.config.ts nav and footer; update both together. Hidden unless html.seastate. */

const NAV = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Blog', href: '/blog' },
  { label: 'Insights', href: '/insights' },
  { label: 'Transfers', href: '/transfers' },
  { label: 'Contact', href: '/contact' },
  { label: 'My Trips', href: '/my-trips' },
]
const FOOTER = [
  { heading: 'Plan', links: [['How it works', '/how-it-works'], ['Destinations', '/destinations'], ['Transfers', '/transfers'], ['My trips', '/my-trips']] },
  { heading: 'Read', links: [['Blog', '/blog'], ['Insights', '/insights'], ['Itineraries', '/blog']] },
  { heading: 'About', links: [['About us', '/about'], ['Editorial policy', '/editorial-policy'], ['Partners', '/partners'], ['Contact', '/contact'], ['Privacy', '/privacy'], ['panos@greektriplanner.me', 'mailto:panos@greektriplanner.me']] },
]

function Mark() {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <rect x=".5" y=".5" width="29" height="29" fill="#FFFFFF" stroke="#0B1D2C" />
      <g fill="none" strokeWidth={2} strokeLinecap="round">
        <path d="M4 11c4-3 7 3 11 0s7-3 11 0" stroke="#1D2463" />
        <path d="M4 17c4-3 7 3 11 0s7-3 11 0" stroke="#138F8F" />
        <path d="M4 23c4-3 7 3 11 0s7-3 11 0" stroke="#EF8A3B" />
      </g>
    </svg>
  )
}

const Arrow = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
    <path d="M0 6h14M9 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export function SeaStateHeader() {
  return (
    <header className="ssc ssc-h">
      <div className="in">
        <a className="ssc-brand" href="/">
          <Mark /> Greek Trip Planner
        </a>
        <nav className="ssc-nav" aria-label="Main">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
          <Link className="ssc-cta" href="/ai-trip-planner">
            Start planning <Arrow />
          </Link>
        </nav>
        <details className="ssc-menu">
          <summary>Menu</summary>
          <nav aria-label="Main">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
            <Link className="ssc-cta" href="/ai-trip-planner">
              Start planning <Arrow />
            </Link>
          </nav>
        </details>
      </div>
    </header>
  )
}

export function SeaStateFooter() {
  return (
    <footer className="ssc ssc-f">
      <div className="scale" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </div>
      <div className="in">
        <div>
          <a className="ssc-brand" href="/">
            <Mark /> Greek Trip Planner
          </a>
          <p>Trip planning and guides for Greece and its islands, checked by people who work in Greek tourism.</p>
        </div>
        {FOOTER.map((c) => (
          <div key={c.heading}>
            <h4>{c.heading}</h4>
            <ul>
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="base">© {new Date().getFullYear()} Greek Trip Planner</div>
    </footer>
  )
}
