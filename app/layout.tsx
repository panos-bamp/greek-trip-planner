import type { Metadata } from 'next'
import Script from 'next/script'
import { headers } from 'next/headers'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'AI Greek Trip Planner - Your Perfect Greece Adventure',
  description: 'AI-powered trip planning for Greece with personalized itineraries, insider tips, and realistic logistics.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/favicon-180x180.png', sizes: '180x180' },
    other: [
      { url: '/favicon-192x192.png', sizes: '192x192', rel: 'icon' },
    ],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Detect if the current URL is a PDF-oriented route so we can skip the
  // shared Navbar/Footer chrome when Puppeteer (or a human) navigates there.
  // The x-pathname header is set by Next.js middleware convention; if it's
  // not present, we fall back to x-invoke-path which Next.js also populates
  // for App Router requests. Neither is guaranteed — safe default is to
  // render the chrome.
  const h = await headers()
  const pathname =
    h.get('x-pathname') ||
    h.get('x-invoke-path') ||
    h.get('next-url') ||
    ''
  // Match routes that end in /pdf (e.g. /results/xxx/pdf) — these are
  // print-only pages that render themselves without site chrome.
  const isPrintRoute = /\/pdf(?:\/|$|\?)/.test(pathname)
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R61V7TG5HF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R61V7TG5HF');
          `}
        </Script>

        {/* Travelpayouts verification */}
        <Script
          id="travelpayouts-verify"
          data-noptimize="1"
          data-cfasync="false"
          data-wpfc-render="false"
          strategy="afterInteractive"
        >
          {`(function(){var script=document.createElement("script");script.async=1;script.src='https://emrld.ltd/NTA1MDI3.js?t=505027';document.head.appendChild(script);})();`}
        </Script>

        {/* ─────────────────────────────────────────────────────────────
            Affiliate click tracking — document-level event delegation.

            Covers ALL affiliate links regardless of how they were injected:
            - Links inside htmlEmbed blocks (dangerouslySetInnerHTML)
            - Travelpayouts widget links injected by emrld.ltd script
            - Any future affiliate links added anywhere on the page

            portableTextComponents handles Sanity body links via React onClick.
            This listener acts as the catch-all for everything else.
        ───────────────────────────────────────────────────────────── */}
        <Script id="affiliate-tracking" strategy="afterInteractive">
          {`
            (function() {
              var AFFILIATE_DOMAINS = [
                '.tpx.lt', '.tp.lt',
                'emrld.ltd', 'tp.media', 'travelpayouts.com',
                'fas.st',                              // Travelpayouts short link (ferryscanner etc.)
                'tidd.ly',                             // Awin/SimLocal affiliate short link
                'booking.com', 'getyourguide.com', 'viator.com',
                'discovercars.com', 'welcomepickups.com', 'airalo.com',
                'yesim.app', 'klook.com', 'agoda.com', 'kiwi.com',
                'airhelp.com', 'ekta.life', 'nordvpn.com',
                'ferryhopper.com'
              ];

              // Partners whose links must NEVER pass PageRank (nofollow).
              // These are editorial/directory partners, not commission affiliates.
              var NOFOLLOW_DOMAINS = [
                'musicofourdesire.com'
              ];

              function isNofollow(href) {
                return NOFOLLOW_DOMAINS.some(function(d) {
                  return href.indexOf(d) !== -1;
                });
              }

              function isAffiliate(href) {
                return AFFILIATE_DOMAINS.some(function(d) {
                  return href.indexOf(d) !== -1;
                });
              }

              function getPartner(href) {
                // Decode once to catch partner names inside encoded URLs (emrld.ltd)
                var decoded = '';
                try { decoded = decodeURIComponent(href); } catch(e) { decoded = href; }
                var combined = href + ' ' + decoded;

                // fas.st — Travelpayouts short link (ferryscanner, etc.)
                if (href.indexOf('fas.st') !== -1) {
                  if (combined.indexOf('ferryscanner') !== -1) return 'ferryscanner';
                  if (combined.indexOf('ferryhopper')  !== -1) return 'ferryhopper';
                  return 'travelpayouts';
                }

                // tidd.ly — Awin short link (simlocal, etc.)
                if (href.indexOf('tidd.ly') !== -1) {
                  if (combined.indexOf('simlocal') !== -1) return 'simlocal';
                  return 'awin';
                }

                // Travelpayouts short links — subdomain is the partner
                if (href.indexOf('.tpx.lt') !== -1 || href.indexOf('.tp.lt') !== -1) {
                  if (combined.indexOf('getyourguide') !== -1) return 'getyourguide';
                  if (combined.indexOf('booking')      !== -1) return 'booking';
                  if (combined.indexOf('viator')       !== -1) return 'viator';
                  if (combined.indexOf('discovercars') !== -1) return 'discovercars';
                  if (combined.indexOf('welcomepickups') !== -1) return 'welcome_pickups';
                  if (combined.indexOf('airalo')       !== -1) return 'airalo';
                  if (combined.indexOf('yesim')        !== -1) return 'yesim';
                  if (combined.indexOf('klook')        !== -1) return 'klook';
                  if (combined.indexOf('agoda')        !== -1) return 'agoda';
                  if (combined.indexOf('kiwi')         !== -1) return 'kiwi';
                  if (combined.indexOf('airhelp')      !== -1) return 'airhelp';
                  if (combined.indexOf('ekta')         !== -1) return 'ekta';
                  if (combined.indexOf('nordvpn')      !== -1) return 'nordvpn';
                  return 'travelpayouts';
                }

                // Widget redirect domains — partner is in the encoded destination
                if (href.indexOf('emrld.ltd') !== -1 || href.indexOf('tp.media') !== -1) {
                  if (combined.indexOf('getyourguide') !== -1) return 'getyourguide';
                  if (combined.indexOf('viator')       !== -1) return 'viator';
                  if (combined.indexOf('booking.com')  !== -1) return 'booking';
                  if (combined.indexOf('discovercars') !== -1) return 'discovercars';
                  if (combined.indexOf('airalo')       !== -1) return 'airalo';
                  if (combined.indexOf('klook')        !== -1) return 'klook';
                  if (combined.indexOf('agoda')        !== -1) return 'agoda';
                  return 'travelpayouts';
                }

                // Direct partner domains
                if (href.indexOf('booking.com')        !== -1) return 'booking';
                if (href.indexOf('getyourguide.com')   !== -1) return 'getyourguide';
                if (href.indexOf('viator.com')         !== -1) return 'viator';
                if (href.indexOf('discovercars.com')   !== -1) return 'discovercars';
                if (href.indexOf('welcomepickups.com') !== -1) return 'welcome_pickups';
                if (href.indexOf('airalo.com')         !== -1) return 'airalo';
                if (href.indexOf('yesim.app')          !== -1) return 'yesim';
                if (href.indexOf('klook.com')          !== -1) return 'klook';
                if (href.indexOf('agoda.com')          !== -1) return 'agoda';
                if (href.indexOf('kiwi.com')           !== -1) return 'kiwi';
                if (href.indexOf('airhelp.com')        !== -1) return 'airhelp';
                if (href.indexOf('ekta.life')          !== -1) return 'ekta';
                if (href.indexOf('nordvpn.com')        !== -1) return 'nordvpn';
                if (href.indexOf('ferryhopper.com')    !== -1) return 'ferryhopper';

                return 'unknown';
              }

              document.addEventListener('click', function(e) {
                var link = e.target.closest('a');
                if (!link || !link.href) return;

                // Skip links already handled by React onClick in portableTextComponents
                // (those have data-tracked attribute set — see note below)
                if (link.dataset.tracked) return;

                // Nofollow partners — not affiliates, no tracking needed
                if (isNofollow(link.href)) return;

                if (!isAffiliate(link.href)) return;

                if (typeof window.gtag !== 'function') return;

                window.gtag('event', 'affiliate_click', {
                  affiliate_partner: getPartner(link.href),
                  affiliate_url:     link.href,
                  page_path:         window.location.pathname,
                  event_category:    'affiliate',
                  event_label:       getPartner(link.href),
                });
              });
            })();
          `}
        </Script>
      </head>
      <body className="antialiased">
        {!isPrintRoute && (
          <div className="site-navbar-wrapper">
            <Navbar />
          </div>
        )}
        {children}
        {!isPrintRoute && (
          <div className="site-footer-wrapper">
            <Footer />
          </div>
        )}
      </body>
    </html>
  )
}
