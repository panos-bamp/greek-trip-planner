import Link from 'next/link'
import Image from 'next/image'

/**
 * Global Footer component — rendered once in app/layout.tsx after {children}.
 *
 * Do not duplicate inline in individual page files. If a page needs a different
 * footer (e.g. /ai-trip-planner suppresses it), handle that at the route level
 * by conditionally rendering this component from layout.tsx, NOT by re-adding
 * inline footers.
 *
 * Link list is the single source of truth for footer navigation. Update here
 * to update everywhere.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#180204] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Greek Trip Planner"
            width={70}
            height={21}
            className="brightness-0 invert mb-6"
          />

          <nav
            aria-label="Footer"
            className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8"
          >
            <Link
              href="/how-it-works"
              className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans"
            >
              How it Works
            </Link>
            <Link
              href="/destinations"
              className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans"
            >
              Destinations
            </Link>
            <Link
              href="/blog"
              className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans"
            >
              Blog
            </Link>
            <Link
              href="/insights"
              className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans"
            >
              Insights
            </Link>
            <Link
              href="/about"
              className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans"
            >
              About
            </Link>
            <Link
              href="/editorial-policy"
              className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans"
            >
              Editorial Policy
            </Link>
            <Link
              href="/partners"
              className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans"
            >
              Partners
            </Link>
            <Link
              href="/contact"
              className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans"
            >
              Contact
            </Link>
          </nav>

          <div className="border-t border-white/10 w-full pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm font-sans">
              © {currentYear} Greek Trip Planner. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://traveltourismdirectory.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/60 transition-colors text-sm font-sans"
              >
                Travel and Tourism Directory
              </a>
              <a
                href="https://bookmarktravel.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://bookmarktravel.com/images/bookmarktravel-234.jpg"
                  alt="Bookmark Travel"
                  width={117}
                  height={20}
                  className="opacity-50 hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
