// lib/transferSchemaMarkup.ts
// Generates JSON-LD structured data for /transfers pages.
//
// Deliberately thin: Article, FAQ, Place, Breadcrumb and ItemList
// schema logic is NOT reimplemented here — it's imported from the
// existing lib/schemaMarkup.ts generators, which are already proven
// on /blog. Only two things are genuinely new:
//   1. Reading transferPage's field shape (destination, pageType,
//      priceRangeEUR, durationLabel, etc.)
//   2. Building the hub↔spoke breadcrumb, since the URL structure
//      is flat and the breadcrumb is what conveys the hierarchy.

import {
  generateArticleSchema,
  generateFAQSchema,
  generatePlaceSchema,
  generateBreadcrumbSchema,
  generateItemListSchema,
} from './schemaMarkup'

const SITE_URL = 'https://greektriplanner.me'

// ============================================
// REQUIRED GROQ SHAPE
// ============================================
// parentHub must be dereferenced in the query for spoke breadcrumbs
// to resolve correctly, e.g.:
//
//   *[_type == "transferPage" && slug.current == $slug][0]{
//     ...,
//     parentHub->{title, "slug": slug.current}
//   }
//
// Without that arrow expansion, parentHub is just a { _ref, _type }
// stub and the breadcrumb will fall back to "Transfers" only.

interface TransferPage {
  title: string
  slug: {current: string}
  excerpt?: string
  metaTitle?: string
  metaDescription?: string
  pageType: 'hub' | 'spoke'
  destination: string
  parentHub?: {title: string; slug: string}
  routeFrom?: string
  routeTo?: string
  priceRangeEUR?: string
  durationLabel?: string
  publishedAt: string
  updatedAt?: string
  mainImage?: {asset?: {url?: string}; alt?: string}
  articleSchema?: {
    enabled?: boolean
    articleType?: string
    authorName?: string
    authorUrl?: string
    publisherName?: string
    publisherLogo?: string
    wordCount?: number
  }
  faqSchema?: {enabled?: boolean; faqs?: Array<{question: string; answer: string}>}
  placeSchema?: {enabled?: boolean; places?: any[]}
  breadcrumbSchema?: {enabled?: boolean; customBreadcrumbs?: Array<{name: string; url: string}>}
  itemListSchema?: {enabled?: boolean; name?: string; description?: string; items?: any[]}
}

function pageUrl(page: TransferPage): string {
  return `${SITE_URL}/transfers/${page.slug.current}`
}

// --- Breadcrumb: the one piece of real hierarchy logic ---
function buildTransferBreadcrumb(page: TransferPage): Array<{name: string; url: string}> {
  const crumbs = [
    {name: 'Home', url: SITE_URL},
    {name: 'Transfers', url: `${SITE_URL}/transfers`},
  ]

  if (page.pageType === 'hub') {
    crumbs.push({name: page.title, url: pageUrl(page)})
    return crumbs
  }

  // Spoke: insert the parent hub between "Transfers" and the spoke itself
  if (page.parentHub?.title && page.parentHub?.slug) {
    crumbs.push({
      name: page.parentHub.title,
      url: `${SITE_URL}/transfers/${page.parentHub.slug}`,
    })
  }
  crumbs.push({name: page.title, url: pageUrl(page)})
  return crumbs
}

// ============================================
// MAIN EXPORT
// ============================================
export function generateTransferSchemas(page: TransferPage): object[] {
  const schemas: object[] = []
  const url = pageUrl(page)

  // 1. Article
  if (page.articleSchema?.enabled !== false) {
    schemas.push(
      generateArticleSchema({
        title: page.metaTitle || page.title,
        description: page.metaDescription || page.excerpt || '',
        url,
        image: page.mainImage?.asset?.url,
        publishedAt: page.publishedAt,
        modifiedAt: page.updatedAt || page.publishedAt,
        author: {
          name: page.articleSchema?.authorName || 'Greek Trip Planner',
          url: page.articleSchema?.authorUrl,
        },
        publisher: {
          name: page.articleSchema?.publisherName || 'Greek Trip Planner',
          logo: page.articleSchema?.publisherLogo,
        },
        articleType: page.articleSchema?.articleType || 'TravelGuide',
        wordCount: page.articleSchema?.wordCount,
      })
    )
  }

  // 2. FAQ
  if (page.faqSchema?.enabled && page.faqSchema?.faqs?.length) {
    const faq = generateFAQSchema(page.faqSchema.faqs)
    if (faq) schemas.push(faq)
  }

  // 3. Place — one entry per configured place (origin/destination points)
  if (page.placeSchema?.enabled && page.placeSchema?.places?.length) {
    page.placeSchema.places.forEach((place: any) => {
      schemas.push(generatePlaceSchema(place))
    })
  }

  // 4. Breadcrumb — hub/spoke-aware, built here rather than
  //    hardcoded in the schema field
  if (page.breadcrumbSchema?.enabled !== false) {
    const crumbs = page.breadcrumbSchema?.customBreadcrumbs?.length
      ? page.breadcrumbSchema.customBreadcrumbs
      : buildTransferBreadcrumb(page)
    schemas.push(generateBreadcrumbSchema(crumbs))
  }

  // 5. ItemList — hubs listing their spokes
  if (page.itemListSchema?.enabled && page.itemListSchema?.items?.length) {
    const itemList = generateItemListSchema({
      name: page.itemListSchema.name || page.title,
      description: page.itemListSchema.description,
      url,
      items: page.itemListSchema.items,
    })
    if (itemList) schemas.push(itemList)
  }

  return schemas.filter(Boolean)
}
