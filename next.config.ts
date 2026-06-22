import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },

  async redirects() {
    return [
      // ───────────────────────────────────────────────
      // SEO CONSOLIDATION — 301 redirects
      // Both target keyword-cannibalization cleanup
      // ───────────────────────────────────────────────

      // Cruise pages: older hub → newer 2026 hub
      // The newer URL ranks better (pos 7.9 vs 23.6) and has the year baked in
      {
        source: '/blog/best-greek-islands-cruise-guide',
        destination: '/blog/greece-cruise-guide-2026',
        permanent: true, // 301 — preserves link equity
      },

      // Family pages: islands-only sibling → broader hub (mainland + islands)
      {
        source: '/blog/best-greek-islands-for-families',
        destination: '/blog/best-places-to-visit-in-greece-with-family',
        permanent: true,
      },

      // Mykonos guide: duplicate guide → canonical keyword-aligned slug (in nav)
      // Consolidating the two competing "Mykonos travel guide" pages.
      // NOTE: port any unique/ranking sections from the source page into the
      // destination BEFORE unpublishing the source in Sanity (source had the
      // higher impressions — 655 vs 160 — so keep its query coverage).
      {
        source: '/blog/trip-to-mykonos-greece',
        destination: '/blog/mykonos-travel-guide',
        permanent: true,
      },

      // Pelion: things-to-do sibling → main travel guide (cannibalization fix)
      // things-to-do-in-pelion: 2,793 impr, pos 11.38
      // pelion-travel-guide:    5,313 impr, pos  8.76
      // Consolidating authority into the stronger URL. Port any unique
      // sections from things-to-do-in-pelion into pelion-travel-guide
      // in Sanity BEFORE unpublishing the source page.
      {
        source: '/blog/things-to-do-in-pelion',
        destination: '/blog/pelion-travel-guide',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
