// app/transfers/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { generateTransferSchemas } from '@/lib/transferSchemaMarkup'
import TransferHub from '@/components/transfers/TransferHub'
import TransferSpoke from '@/components/transfers/TransferSpoke'

const BASE_URL = 'https://greektriplanner.me'

// ─── GROQ query ───
// One query serves both page types. `spokes` is only meaningful for hubs;
// `siblingSpokes` only for spokes (matched via the shared parentHub ref).
// Both simply return empty on the "wrong" pageType — harmless, avoids
// a second round-trip or a branch at the fetch layer.
const transferPageQuery = `*[_type == "transferPage" && slug.current == $slug][0]{
  ...,
  parentHub->{title, "slug": slug.current},
  mainImage{..., asset->{url, metadata{dimensions}}},
  faqSchema,
  "spokes": *[_type == "transferPage" && pageType == "spoke" && references(^._id)]
    | order(title asc){
      title, "slug": slug.current, transferType, priceRangeEUR, durationLabel
    },
  "siblingSpokes": *[
    _type == "transferPage" && pageType == "spoke"
    && parentHub._ref == ^.parentHub._ref
    && slug.current != ^.slug.current
  ] | order(title asc)[0...3]{
    title, "slug": slug.current
  },
  "otherHubs": *[_type == "transferPage" && pageType == "hub" && slug.current != $slug]
    | order(coalesce(displayOrder, 999) asc)[0...4]{
      title, "slug": slug.current, destination
    }
}`

async function getTransferPage(slug: string) {
  try {
    return await client.fetch(transferPageQuery, { slug })
  } catch (error) {
    console.error('Error fetching transfer page:', error)
    return null
  }
}

// ─── Metadata ───
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = await getTransferPage(slug)
  if (!page) return { title: 'Page Not Found' }

  const title = page.metaTitle || page.title
  const description = page.metaDescription || page.excerpt || ''
  const ogImageUrl = page.ogImage?.asset?.url || page.mainImage?.asset?.url
  const canonicalUrl = page.canonicalUrl || `${BASE_URL}/transfers/${page.slug.current}`

  return {
    title: `${title} | Greek Trip Planner`,
    description,
    openGraph: {
      title: page.ogTitle || title,
      description: page.ogDescription || description,
      url: canonicalUrl,
      siteName: 'Greek Trip Planner',
      type: 'article',
      publishedTime: page.publishedAt,
      modifiedTime: page.updatedAt || page.publishedAt,
      ...(ogImageUrl && { images: [{ url: ogImageUrl, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: page.twitterCard || 'summary_large_image',
      title: page.ogTitle || title,
      description: page.ogDescription || description,
    },
    alternates: { canonical: canonicalUrl },
  }
}

// ─── Static params ───
export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "transferPage" && defined(slug.current)]{ "slug": slug.current }`)
  return slugs.map((s: any) => ({ slug: s.slug }))
}

export const revalidate = 86400

// ─── Page ───
export default async function TransferPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getTransferPage(slug)

  if (!page) notFound()

  let schemas: object[] = []
  try {
    schemas = generateTransferSchemas(page)
  } catch (error) {
    console.error('Transfer schema generation error:', error)
  }

  // Same Organization schema block used on every /blog post — identical
  // here, not duplicated logic-wise, just pushed the same way.
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Greek Trip Planner',
    url: BASE_URL,
    description: 'AI-powered Greece travel planner built by 5 Greek tourism experts with 50+ years of combined field experience.',
    member: [
      { '@type': 'Person', name: 'Panos', jobTitle: 'Founder & Lead Author', url: `${BASE_URL}/about`, knowsAbout: ['Athens travel', 'Saronic Islands', 'Greece trip planning'] },
      { '@type': 'Person', name: 'Vaggelis', jobTitle: 'Tour Operator — Peloponnese', url: `${BASE_URL}/about`, knowsAbout: ['Peloponnese', 'Epidaurus', 'Nafplio', 'Monemvasia', 'Mani'] },
      { '@type': 'Person', name: 'Panagiotis', jobTitle: 'Transfer & Logistics Specialist', url: `${BASE_URL}/about`, knowsAbout: ['Athens transfers', 'Mykonos', 'Santorini', 'Greek ferry routes'] },
      { '@type': 'Person', name: 'Kostas', jobTitle: 'Hotel Owner & Tour Operator — Crete', url: `${BASE_URL}/about`, knowsAbout: ['Crete', 'Chania', 'Heraklion', 'Samaria Gorge', 'Elafonissi'] },
      { '@type': 'Person', name: 'Tasos', jobTitle: 'Hotel Supplier — Northern Greece', url: `${BASE_URL}/about`, knowsAbout: ['Thessaloniki', 'Meteora', 'Zagori', 'Pelion', 'Halkidiki'] },
    ],
  }
  schemas.push(organizationSchema)

  return (
    <main className="min-h-screen bg-white">
      {schemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
          suppressHydrationWarning
        />
      )}

      {page.pageType === 'hub' ? (
        <TransferHub page={page} />
      ) : (
        <TransferSpoke page={page} />
      )}
    </main>
  )
}
