// lib/insightSchemaMarkup.ts
// Generates JSON-LD structured data for /insights articles

const SITE_URL = 'https://greektriplanner.me'
const SITE_NAME = 'Greek Trip Planner'
const LOGO_URL = `${SITE_URL}/logo.png`

interface InsightPost {
  title: string
  slug: { current: string }
  excerpt?: string
  metaTitle?: string
  metaDescription?: string
  author?: string
  publishedAt?: string
  updatedAt?: string
  mainImage?: {
    asset?: { url?: string }
    alt?: string
  }
  schemaArticleType?: string
  enableFaqSchema?: boolean
  faqItems?: Array<{ question: string; answer: string }>
  enableDatasetSchema?: boolean
  datasetInfo?: {
    datasetName?: string
    datasetDescription?: string
    temporalCoverage?: string
    spatialCoverage?: string
    license?: string
  }
  enableSpeakableSchema?: boolean
  speakableSections?: string[]
  enableBreadcrumbSchema?: boolean
  aboutEntities?: Array<{
    name: string
    entityType?: string
    sameAs?: string
  }>
  dataSources?: Array<{
    name: string
    url?: string
  }>
  keyTakeaways?: string[]
}

// --- Article Schema ---
function generateArticleSchema(post: InsightPost): object {
  const articleUrl = `${SITE_URL}/insights/${post.slug.current}`
  const schemaType = post.schemaArticleType || 'Article'

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || '',
    url: articleUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    author: {
      '@type': 'Person',
      name: post.author || 'Greek Trip Planner Research',
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }

  if (post.publishedAt) {
    schema.datePublished = post.publishedAt
  }
  if (post.updatedAt) {
    schema.dateModified = post.updatedAt
  } else if (post.publishedAt) {
    schema.dateModified = post.publishedAt
  }
  if (post.mainImage?.asset?.url) {
    schema.image = {
      '@type': 'ImageObject',
      url: post.mainImage.asset.url,
      ...(post.mainImage.alt && { caption: post.mainImage.alt }),
    }
  }

  // About entities — links article to known concepts/places
  if (post.aboutEntities && post.aboutEntities.length > 0) {
    schema.about = post.aboutEntities.map((entity) => {
      const entityObj: Record<string, any> = {
        '@type': entity.entityType || 'Thing',
        name: entity.name,
      }
      if (entity.sameAs) {
        entityObj.sameAs = entity.sameAs
      }
      return entityObj
    })
  }

  // Citation — links to data sources
  if (post.dataSources && post.dataSources.length > 0) {
    schema.citation = post.dataSources
      .filter((s) => s.url)
      .map((source) => ({
        '@type': 'CreativeWork',
        name: source.name,
        url: source.url,
      }))
  }

  return schema
}

// --- FAQ Schema ---
function generateFaqSchema(post: InsightPost): object | null {
  if (!post.enableFaqSchema || !post.faqItems || post.faqItems.length === 0) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

// --- Dataset Schema ---
function generateDatasetSchema(post: InsightPost): object | null {
  if (!post.enableDatasetSchema || !post.datasetInfo) {
    return null
  }

  const dataset: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: post.datasetInfo.datasetName || post.title,
    description: post.datasetInfo.datasetDescription || post.excerpt || '',
    url: `${SITE_URL}/insights/${post.slug.current}`,
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }

  if (post.datasetInfo.temporalCoverage) {
    dataset.temporalCoverage = post.datasetInfo.temporalCoverage
  }
  if (post.datasetInfo.spatialCoverage) {
    dataset.spatialCoverage = {
      '@type': 'Place',
      name: post.datasetInfo.spatialCoverage,
    }
  }
  if (post.datasetInfo.license) {
    dataset.license = post.datasetInfo.license
  }
  if (post.publishedAt) {
    dataset.datePublished = post.publishedAt
  }
  if (post.updatedAt) {
    dataset.dateModified = post.updatedAt
  }

  return dataset
}

// --- Breadcrumb Schema ---
function generateBreadcrumbSchema(post: InsightPost): object | null {
  if (post.enableBreadcrumbSchema === false) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Insights',
        item: `${SITE_URL}/insights`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/insights/${post.slug.current}`,
      },
    ],
  }
}

// --- Speakable Schema ---
function generateSpeakableSchema(post: InsightPost): object | null {
  if (!post.enableSpeakableSchema || !post.speakableSections || post.speakableSections.length === 0) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: post.title,
    url: `${SITE_URL}/insights/${post.slug.current}`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: post.speakableSections,
    },
  }
}

// --- Main Export: Generate All Schemas ---
export function generateInsightSchemas(post: InsightPost): object[] {
  const schemas: object[] = []

  // Article schema — always included
  schemas.push(generateArticleSchema(post))

  // FAQ schema — conditional
  const faq = generateFaqSchema(post)
  if (faq) schemas.push(faq)

  // Dataset schema — conditional
  const dataset = generateDatasetSchema(post)
  if (dataset) schemas.push(dataset)

  // Breadcrumb schema — on by default
  const breadcrumb = generateBreadcrumbSchema(post)
  if (breadcrumb) schemas.push(breadcrumb)

  // Speakable schema — conditional
  const speakable = generateSpeakableSchema(post)
  if (speakable) schemas.push(speakable)

  return schemas
}
