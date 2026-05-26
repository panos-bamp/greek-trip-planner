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
    ];
  },
};

export default nextConfig;
