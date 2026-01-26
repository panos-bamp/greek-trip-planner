/**
 * Comprehensive Schema Markup Generator
 * Generates JSON-LD structured data for all schema types
 * Place in: lib/schemaMarkup.ts
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

interface BaseSchema {
  '@context': string
  '@type': string
}

interface ArticleSchemaProps {
  title: string
  description: string
  url: string
  image?: string
  publishedAt: string
  modifiedAt?: string
  author?: {
    name: string
    url?: string
  }
  publisher: {
    name: string
    logo?: string
  }
  articleType?: string
  wordCount?: number
}

interface FAQItem {
  question: string
  answer: string
}

interface HowToStep {
  name: string
  text: string
  url?: string
  image?: string
}

interface HowToSchemaProps {
  name: string
  description?: string
  totalTime?: string
  estimatedCost?: string
  steps?: HowToStep[]
  supply?: string[]
}

interface ReviewSchemaProps {
  itemReviewed: {
    type: string
    name: string
    image?: string
    address?: string
    priceRange?: string
  }
  rating: {
    ratingValue: number
    bestRating?: number
    worstRating?: number
  }
  reviewBody?: string
  author: string
  datePublished: string
}

interface EventSchemaProps {
  name: string
  description?: string
  startDate: string
  endDate?: string
  location: string
  image?: string
  organizer?: string
  url?: string
  eventStatus?: string
}

interface PlaceSchemaProps {
  name: string
  description?: string
  address: string
  latitude?: number
  longitude?: number
  image?: string
  telephone?: string
  url?: string
}

interface VideoSchemaProps {
  name: string
  description: string
  thumbnailUrl: string
  contentUrl?: string
  embedUrl?: string
  uploadDate: string
  duration?: string
}

interface RecipeSchemaProps {
  name: string
  description: string
  image: string
  prepTime?: string
  cookTime?: string
  totalTime?: string
  recipeYield?: string
  recipeCategory?: string
  recipeCuisine?: string
  recipeIngredient?: string[]
  recipeInstructions?: string[]
}

interface ProductSchemaProps {
  name: string
  description: string
  image: string
  brand?: string
  sku?: string
  offers: {
    price: string
    priceCurrency: string
    url: string
    availability?: string
  }
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
}

// ============================================
// SCHEMA GENERATORS
// ============================================

/**
 * 1. ARTICLE SCHEMA
 */
export function generateArticleSchema({
  title,
  description,
  url,
  image,
  publishedAt,
  modifiedAt,
  author,
  publisher,
  articleType = 'BlogPosting',
  wordCount,
}: ArticleSchemaProps): BaseSchema {
  return {
    '@context': 'https://schema.org',
    '@type': articleType,
    headline: title,
    description: description,
    image: image || '',
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: author
      ? {
          '@type': 'Person',
          name: author.name,
          url: author.url || '',
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: publisher.name,
      logo: publisher.logo
        ? {
            '@type': 'ImageObject',
            url: publisher.logo,
          }
        : undefined,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    wordCount: wordCount,
  } as BaseSchema
}

/**
 * 2. FAQ SCHEMA
 */
export function generateFAQSchema(faqs: FAQItem[]): BaseSchema | null {
  if (!faqs || faqs.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } as BaseSchema
}

/**
 * 3. HOW-TO SCHEMA
 */
export function generateHowToSchema({
  name,
  description,
  totalTime,
  estimatedCost,
  steps = [],
  supply = [],
}: HowToSchemaProps): BaseSchema | null {
  if (!name || steps.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    totalTime: totalTime,
    estimatedCost: estimatedCost
      ? {
          '@type': 'MonetaryAmount',
          currency: 'EUR',
          value: estimatedCost,
        }
      : undefined,
    supply: supply.map((item) => ({
      '@type': 'HowToSupply',
      name: item,
    })),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url,
      image: step.image,
    })),
  } as BaseSchema
}

/**
 * 4. REVIEW SCHEMA
 */
export function generateReviewSchema({
  itemReviewed,
  rating,
  reviewBody,
  author,
  datePublished,
}: ReviewSchemaProps): BaseSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': itemReviewed.type,
      name: itemReviewed.name,
      image: itemReviewed.image,
      address: itemReviewed.address,
      priceRange: itemReviewed.priceRange,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating.ratingValue,
      bestRating: rating.bestRating || 5,
      worstRating: rating.worstRating || 1,
    },
    reviewBody: reviewBody,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished: datePublished,
  } as BaseSchema
}

/**
 * 5. EVENT SCHEMA
 */
export function generateEventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  image,
  organizer,
  url,
  eventStatus = 'EventScheduled',
}: EventSchemaProps): BaseSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: name,
    description: description,
    startDate: startDate,
    endDate: endDate,
    location: {
      '@type': 'Place',
      name: location,
    },
    image: image,
    organizer: organizer
      ? {
          '@type': 'Organization',
          name: organizer,
        }
      : undefined,
    url: url,
    eventStatus: `https://schema.org/${eventStatus}`,
  } as BaseSchema
}

/**
 * 6. PLACE SCHEMA
 */
export function generatePlaceSchema({
  name,
  description,
  address,
  latitude,
  longitude,
  image,
  telephone,
  url,
}: PlaceSchemaProps): BaseSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: name,
    description: description,
    address: address,
    geo:
      latitude && longitude
        ? {
            '@type': 'GeoCoordinates',
            latitude: latitude,
            longitude: longitude,
          }
        : undefined,
    image: image,
    telephone: telephone,
    url: url,
  } as BaseSchema
}

/**
 * 7. VIDEO SCHEMA
 */
export function generateVideoSchema({
  name,
  description,
  thumbnailUrl,
  contentUrl,
  embedUrl,
  uploadDate,
  duration,
}: VideoSchemaProps): BaseSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: name,
    description: description,
    thumbnailUrl: thumbnailUrl,
    contentUrl: contentUrl,
    embedUrl: embedUrl,
    uploadDate: uploadDate,
    duration: duration,
  } as BaseSchema
}

/**
 * 8. RECIPE SCHEMA
 */
export function generateRecipeSchema({
  name,
  description,
  image,
  prepTime,
  cookTime,
  totalTime,
  recipeYield,
  recipeCategory,
  recipeCuisine,
  recipeIngredient,
  recipeInstructions,
}: RecipeSchemaProps): BaseSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: name,
    description: description,
    image: image,
    prepTime: prepTime,
    cookTime: cookTime,
    totalTime: totalTime,
    recipeYield: recipeYield,
    recipeCategory: recipeCategory,
    recipeCuisine: recipeCuisine,
    recipeIngredient: recipeIngredient,
    recipeInstructions: recipeInstructions?.map((instruction, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: instruction,
    })),
  } as BaseSchema
}

/**
 * 9. PRODUCT SCHEMA
 */
export function generateProductSchema({
  name,
  description,
  image,
  brand,
  sku,
  offers,
  aggregateRating,
}: ProductSchemaProps): BaseSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    description: description,
    image: image,
    brand: brand
      ? {
          '@type': 'Brand',
          name: brand,
        }
      : undefined,
    sku: sku,
    offers: {
      '@type': 'Offer',
      price: offers.price,
      priceCurrency: offers.priceCurrency,
      url: offers.url,
      availability: offers.availability
        ? `https://schema.org/${offers.availability}`
        : undefined,
    },
    aggregateRating: aggregateRating
      ? {
          '@type': 'AggregateRating',
          ratingValue: aggregateRating.ratingValue,
          reviewCount: aggregateRating.reviewCount,
        }
      : undefined,
  } as BaseSchema
}

/**
 * 10. BREADCRUMB SCHEMA
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
): BaseSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  } as BaseSchema
}

/**
 * ============================================
 * MASTER FUNCTION: Combine All Schemas
 * ============================================
 */
export function generateAllSchemas(post: any, baseUrl: string) {
  const schemas: BaseSchema[] = []
  const postUrl = `${baseUrl}/blog/${post.slug.current}`

  // 1. Article Schema (always include)
  if (post.articleSchema?.enabled !== false) {
    schemas.push(
      generateArticleSchema({
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        url: postUrl,
        image: post.mainImage?.asset?.url,
        publishedAt: post.publishedAt,
        modifiedAt: post._updatedAt,
        author: {
          name: post.articleSchema?.authorName || post.author,
          url: post.articleSchema?.authorUrl,
        },
        publisher: {
          name: post.articleSchema?.publisherName || 'Greek Trip Planner',
          logo: post.articleSchema?.publisherLogo,
        },
        articleType: post.articleSchema?.articleType || 'BlogPosting',
        wordCount: post.articleSchema?.wordCount,
      })
    )
  }

  // 2. FAQ Schema
  if (post.faqSchema?.enabled && post.faqSchema?.faqs?.length > 0) {
    const faqSchema = generateFAQSchema(post.faqSchema.faqs)
    if (faqSchema) schemas.push(faqSchema)
  }

  // 3. How-To Schema
  if (post.howToSchema?.enabled && post.howToSchema?.name) {
    const howToSchema = generateHowToSchema(post.howToSchema)
    if (howToSchema) schemas.push(howToSchema)
  }

  // 4. Review Schema
  if (post.reviewSchema?.enabled && post.reviewSchema?.itemReviewed) {
    schemas.push(
      generateReviewSchema({
        itemReviewed: post.reviewSchema.itemReviewed,
        rating: post.reviewSchema.rating,
        reviewBody: post.reviewSchema.reviewBody,
        author: post.author,
        datePublished: post.publishedAt,
      })
    )
  }

  // 5. Event Schema (multiple events)
  if (post.eventSchema?.enabled && post.eventSchema?.events?.length > 0) {
    post.eventSchema.events.forEach((event: any) => {
      schemas.push(generateEventSchema(event))
    })
  }

  // 6. Place Schema (multiple places)
  if (post.placeSchema?.enabled && post.placeSchema?.places?.length > 0) {
    post.placeSchema.places.forEach((place: any) => {
      schemas.push(generatePlaceSchema(place))
    })
  }

  // 7. Video Schema (multiple videos)
  if (post.videoSchema?.enabled && post.videoSchema?.videos?.length > 0) {
    post.videoSchema.videos.forEach((video: any) => {
      schemas.push(generateVideoSchema(video))
    })
  }

  // 8. Recipe Schema (multiple recipes)
  if (post.recipeSchema?.enabled && post.recipeSchema?.recipes?.length > 0) {
    post.recipeSchema.recipes.forEach((recipe: any) => {
      schemas.push(generateRecipeSchema(recipe))
    })
  }

  // 9. Product Schema (multiple products)
  if (post.productSchema?.enabled && post.productSchema?.products?.length > 0) {
    post.productSchema.products.forEach((product: any) => {
      schemas.push(generateProductSchema(product))
    })
  }

  // 10. Breadcrumb Schema
  if (post.breadcrumbSchema?.enabled !== false) {
    const breadcrumbItems = post.breadcrumbSchema?.customBreadcrumbs || [
      { name: 'Home', url: baseUrl },
      { name: 'Blog', url: `${baseUrl}/blog` },
      { name: post.title, url: postUrl },
    ]
    schemas.push(generateBreadcrumbSchema(breadcrumbItems))
  }

  return schemas.filter(Boolean)
}
