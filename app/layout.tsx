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
      </head>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
