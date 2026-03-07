import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

const BASE_URL = 'https://greektriplanner.me'

// Revalidate every 24 hours — picks up new Sanity posts automatically
export const revalidate = 86400

// ─── Sanity fetchers ───────────────────────────────────────────────────────────

async function getBlogPosts(): Promise<Array<{ slug: string; updatedAt: string }>> {
  try {
    return await client.fetch(`
      *[_type == "post" && defined(slug.current)] | order(_updatedAt desc) {
        "slug": slug.current,
        "updatedAt": _updatedAt
      }
    `)
  } catch (error) {
    console.error('[sitemap] Failed to fetch blog posts:', error)
    return []
  }
}

async function getInsights(): Promise<Array<{ slug: string; updatedAt: string }>> {
  try {
    return await client.fetch(`
      *[_type == "insight" && defined(slug.current)] | order(_updatedAt desc) {
        "slug": slug.current,
        "updatedAt": _updatedAt
      }
    `)
  } catch (error) {
    console.error('[sitemap] Failed to fetch insights:', error)
    return []
  }
}

// ─── Sitemap ───────────────────────────────────────────────────────────────────

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogPosts, insights] = await Promise.all([
    getBlogPosts(),
    getInsights(),
  ])

  // ── Static pages ────────────────────────────────────────────────────────────
  // Priority logic:
  //   1.0  → homepage (most important signal for Google)
  //   0.9  → primary conversion page (AI planner) + blog index
  //   0.8  → insights index
  //   0.6  → supporting pages
  //   0.5  → informational / low-conversion pages

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/ai-trip-planner`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',   // index page updates whenever new posts publish
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // ── /blog/[slug] pages ───────────────────────────────────────────────────────
  // Priority 0.8 for island / destination guides (core content, high search intent)
  // You can segment further later (e.g. 0.7 for "best restaurants" articles)
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // ── /insights/[slug] pages ───────────────────────────────────────────────────
  // Slightly lower priority than blog guides — they're data/analysis pieces,
  // less evergreen than destination guides
  const insightEntries: MetadataRoute.Sitemap = insights.map((insight) => ({
    url: `${BASE_URL}/insights/${insight.slug}`,
    lastModified: new Date(insight.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...blogEntries,
    ...insightEntries,
  ]
}
