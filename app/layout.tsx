import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
                'booking.com', 'getyourguide.com', 'viator.com',
                'discovercars.com', 'welcomepickups.com', 'airalo.com',
                'yesim.app', 'klook.com', 'agoda.com', 'kiwi.com',
                'airhelp.com', 'ekta.life', 'nordvpn.com'
              ];

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

                return 'unknown';
              }

              document.addEventListener('click', function(e) {
                var link = e.target.closest('a');
                if (!link || !link.href) return;

                // Skip links already handled by React onClick in portableTextComponents
                // (those have data-tracked attribute set — see note below)
                if (link.dataset.tracked) return;

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
        <Navbar />
        {children}
      </body>
    </html>
  )
}
