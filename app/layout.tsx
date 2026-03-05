import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'AI Greek Trip Planner - Your Perfect Greece Adventure',
  description: 'AI-powered trip planning for Greece with personalized itineraries, insider tips, and realistic logistics.',
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
      </head>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
