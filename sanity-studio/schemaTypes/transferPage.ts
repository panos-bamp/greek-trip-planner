import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'transferPage',
  title: '🚐 Transfer Page',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO & Meta'},
    {name: 'schema', title: 'Schema Markup'},
  ],
  fields: [
    // ============================================
    // CONTENT GROUP
    // ============================================
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'On-page H1. For hubs, lead with the highest-value keyword (e.g. "Athens Airport Transfer & Transportation Guide"), not the broader slug topic — see the Athens hub note from the keyword research.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'Flat URL: greektriplanner.me/transfers/[slug] — matches the site\'s existing /blog and /insights pattern. Hub example: athens-transfer. Spoke example: athens-airport-to-hotel-transfer.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      group: 'content',
      description: 'Drives which template renders and which fields below are required.',
      options: {
        list: [
          {title: '🏛️  Hub — destination overview', value: 'hub'},
          {title: '🔀  Spoke — specific route', value: 'spoke'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'string',
      group: 'content',
      description: 'Controlled list — keeps grouping/filtering typo-proof without needing a separate reference document type.',
      options: {
        list: [
          {title: 'Athens', value: 'athens'},
          {title: 'Santorini', value: 'santorini'},
          {title: 'Mykonos', value: 'mykonos'},
          {title: 'Heraklion', value: 'heraklion'},
          {title: 'Chania', value: 'chania'},
          {title: 'Rethymno', value: 'rethymno'},
          {title: 'Rhodes', value: 'rhodes'},
          {title: 'Corfu', value: 'corfu'},
          {title: 'Kos', value: 'kos'},
          {title: 'Thessaloniki', value: 'thessaloniki'},
          {title: 'Paros', value: 'paros'},
          {title: 'Zakynthos', value: 'zakynthos'},
          {title: 'Kalamata', value: 'kalamata'},
          {title: 'Karpathos', value: 'karpathos'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parentHub',
      title: 'Parent Hub',
      type: 'reference',
      group: 'content',
      description: 'Required for spokes. This is what conveys the hub↔spoke hierarchy — the URL stays flat, this field (plus the breadcrumb it drives) does the structural work.',
      to: [{type: 'transferPage'}],
      options: {
        filter: 'pageType == "hub"',
      },
      hidden: ({parent}) => parent?.pageType !== 'spoke',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.pageType === 'spoke' && !value) {
            return 'Spokes must reference a parent hub'
          }
          return true
        }),
    }),
    defineField({
      name: 'transferType',
      title: 'Transfer Type',
      type: 'array',
      group: 'content',
      description: 'Tag this route/page so it can be queried across destinations later (e.g. "show all VIP spokes").',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Airport', value: 'airport'},
          {title: 'Port / Ferry', value: 'port'},
          {title: 'Inter-city / Day trip', value: 'intercity'},
          {title: 'VIP / Private', value: 'vip'},
          {title: 'Helicopter', value: 'helicopter'},
          {title: 'Boat', value: 'boat'},
        ],
        layout: 'tags',
      },
    }),
    defineField({
      name: 'routeFrom',
      title: 'Route From',
      type: 'string',
      group: 'content',
      description: 'Spokes only, e.g. "Athens International Airport"',
      hidden: ({parent}) => parent?.pageType !== 'spoke',
    }),
    defineField({
      name: 'routeTo',
      title: 'Route To',
      type: 'string',
      group: 'content',
      description: 'Spokes only, e.g. "Piraeus Port"',
      hidden: ({parent}) => parent?.pageType !== 'spoke',
    }),
    defineField({
      name: 'priceRangeEUR',
      title: 'Price Range',
      type: 'string',
      group: 'content',
      description: 'Free text, e.g. "€35–55". Feeds the quick-facts box. Keep current — this is reader-facing, not just metadata.',
    }),
    defineField({
      name: 'durationLabel',
      title: 'Duration',
      type: 'string',
      group: 'content',
      description: 'Free text, e.g. "30–40 min". Directly answers the "transfer time" query pattern found in the keyword research.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      group: 'content',
      description: 'Set this when prices/routes are re-verified. Feeds dateModified in Article schema and any "updated for [year]" trust copy on the page.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alternative Text'}],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Short description for SEO and previews (150–160 characters). Falls back to meta description if that field is empty.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content',
      description: 'Comparison tables and FAQ content stay affiliate-link-free per the sitewide placement rules — this field is for the editorial content, not booking widgets.',
    }),

    // ============================================
    // SEO & META GROUP
    // (identical field set to post.ts — nothing to remap)
    // ============================================
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      description: 'SEO title (50-60 characters). Leave empty to use post title.',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'SEO description (150-160 characters). Leave empty to use excerpt.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      group: 'seo',
      description: 'Main keyword for this page (e.g., "athens airport transfer")',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      group: 'seo',
      description: 'Leave empty to use default URL.',
    }),
    defineField({
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
      group: 'seo',
      description: 'Social media title. Leave empty to use Meta Title.',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: 'Social media description. Leave empty to use Meta Description.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image URL',
      type: 'url',
      group: 'seo',
      description: 'Social media image (1200x630px). Leave empty to use Main Image.',
    }),
    defineField({
      name: 'twitterCard',
      title: 'Twitter Card Type',
      type: 'string',
      group: 'seo',
      options: {
        list: [
          {title: 'Summary', value: 'summary'},
          {title: 'Summary Large Image', value: 'summary_large_image'},
        ],
      },
      initialValue: 'summary_large_image',
    }),
    defineField({
      name: 'twitterTitle',
      title: 'Twitter Title',
      type: 'string',
      group: 'seo',
      description: 'Leave empty to use OG Title.',
    }),
    defineField({
      name: 'twitterDescription',
      title: 'Twitter Description',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: 'Leave empty to use OG Description.',
    }),

    // ============================================
    // SCHEMA MARKUP GROUP
    // Trimmed to what's relevant for transfer pages —
    // HowTo / Review / Event / Video / Recipe / Product
    // deliberately excluded to keep Studio fast to fill in
    // across 18+ pages. All object shapes below match
    // post.ts exactly so the existing generator functions
    // in lib/schemaMarkup.ts work unmodified.
    // ============================================

    // 1. ARTICLE SCHEMA
    defineField({
      name: 'articleSchema',
      title: '📄 Article Schema',
      type: 'object',
      group: 'schema',
      options: {collapsible: true, collapsed: false},
      fields: [
        {name: 'enabled', title: 'Enable Article Schema', type: 'boolean', initialValue: true},
        {
          name: 'articleType',
          title: 'Article Type',
          type: 'string',
          options: {
            list: [
              {title: 'Blog Posting', value: 'BlogPosting'},
              {title: 'Article', value: 'Article'},
              {title: 'Travel Guide', value: 'TravelGuide'},
            ],
          },
          initialValue: 'TravelGuide',
        },
        {name: 'authorName', title: 'Author Name', type: 'string'},
        {name: 'authorUrl', title: 'Author URL', type: 'url'},
        {name: 'publisherName', title: 'Publisher Name', type: 'string', initialValue: 'Greek Trip Planner'},
        {name: 'publisherLogo', title: 'Publisher Logo URL', type: 'url'},
        {name: 'wordCount', title: 'Word Count', type: 'number'},
      ],
    }),

    // 2. FAQ SCHEMA — on by default here, unlike post.ts.
    // The keyword research showed "transfer time" / price questions
    // are a large share of real search intent, so every transfer
    // page should ship with FAQ content, not opt in later.
    defineField({
      name: 'faqSchema',
      title: '❓ FAQ Schema',
      type: 'object',
      group: 'schema',
      options: {collapsible: true, collapsed: false},
      fields: [
        {name: 'enabled', title: 'Enable FAQ Schema', type: 'boolean', initialValue: true},
        {
          name: 'faqs',
          title: 'FAQs',
          type: 'array',
          description: 'Hubs: 4-6 general questions. Spokes: 2-4 route-specific questions (e.g. "How long does it take from Chania to Rethymno?"). Never place affiliate links inside answers — sitewide hard rule.',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'question', type: 'string', title: 'Question'},
                {name: 'answer', type: 'text', title: 'Answer', rows: 4},
              ],
              preview: {select: {title: 'question', subtitle: 'answer'}},
            },
          ],
        },
      ],
    }),

    // 3. PLACE SCHEMA — the origin/destination points of the route
    defineField({
      name: 'placeSchema',
      title: '📍 Place Schema',
      type: 'object',
      group: 'schema',
      options: {collapsible: true, collapsed: true},
      fields: [
        {name: 'enabled', title: 'Enable Place Schema', type: 'boolean', initialValue: false},
        {
          name: 'places',
          type: 'array',
          title: 'Places',
          description: 'Add the route endpoints as Place entities, e.g. "Athens International Airport", "Piraeus Port".',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'name', type: 'string', title: 'Place Name'},
                {name: 'description', type: 'text', title: 'Description', rows: 2},
                {name: 'address', type: 'string', title: 'Address'},
                {name: 'latitude', type: 'number', title: 'Latitude'},
                {name: 'longitude', type: 'number', title: 'Longitude'},
                {name: 'image', type: 'url', title: 'Image URL'},
                {name: 'telephone', type: 'string', title: 'Phone (optional)'},
                {name: 'url', type: 'url', title: 'Website URL (optional)'},
              ],
              preview: {select: {title: 'name', subtitle: 'address'}},
            },
          ],
        },
      ],
    }),

    // 4. BREADCRUMB SCHEMA
    // Auto-generation logic (Home > Transfers > Hub > Spoke) lives in
    // lib/transferSchemaMarkup.ts, not here — it needs the resolved
    // parentHub title/slug, which only the query layer has.
    defineField({
      name: 'breadcrumbSchema',
      title: '🍞 Breadcrumb Schema',
      type: 'object',
      group: 'schema',
      options: {collapsible: true, collapsed: true},
      fields: [
        {
          name: 'enabled',
          title: 'Enable Breadcrumb Schema',
          type: 'boolean',
          initialValue: true,
          description: 'Auto-generated: Home > Transfers > [Hub] for hubs, Home > Transfers > [Hub] > [Spoke] for spokes.',
        },
        {
          name: 'customBreadcrumbs',
          type: 'array',
          title: 'Custom Breadcrumbs (optional)',
          description: 'Override the auto-generated breadcrumb.',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'name', type: 'string', title: 'Name'},
                {name: 'url', type: 'url', title: 'URL'},
              ],
            },
          ],
        },
      ],
    }),

    // 5. ITEM LIST SCHEMA — hubs use this to list their spokes
    // (rich list result), e.g. "Athens Transfer Routes"
    defineField({
      name: 'itemListSchema',
      title: '📋 Item List Schema',
      type: 'object',
      group: 'schema',
      description: 'Hub pages: use this to list your spoke pages for carousel/list rich results. Leave off on spokes.',
      options: {collapsible: true, collapsed: true},
      fields: [
        {name: 'enabled', title: 'Enable Item List Schema', type: 'boolean', initialValue: false},
        {name: 'name', type: 'string', title: 'List Title', description: 'Leave empty to use page title'},
        {name: 'description', type: 'text', title: 'List Description (optional)', rows: 2},
        {
          name: 'items',
          type: 'array',
          title: 'List Items',
          description: 'Consider populating this from your spoke pages via GROQ instead of hand-entering — see build notes.',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'position', type: 'number', title: 'Position', validation: (Rule: any) => Rule.required().min(1)},
                {name: 'name', type: 'string', title: 'Item Name', validation: (Rule: any) => Rule.required()},
                {name: 'url', type: 'string', title: 'Item URL', validation: (Rule: any) => Rule.required()},
                {name: 'image', type: 'url', title: 'Image URL (optional)'},
                {name: 'description', type: 'text', title: 'Short Description (optional)', rows: 2},
              ],
              preview: {
                select: {title: 'name', subtitle: 'position'},
                prepare({title, subtitle}: {title: string; subtitle: number}) {
                  return {title, subtitle: `#${subtitle}`}
                },
              },
            },
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      pageType: 'pageType',
      destination: 'destination',
      media: 'mainImage',
    },
    prepare({title, pageType, destination, media}) {
      const typeLabel = pageType === 'hub' ? '🏛️ Hub' : pageType === 'spoke' ? '🔀 Spoke' : undefined
      const subtitle = [typeLabel, destination].filter(Boolean).join(' · ')
      return {title, subtitle: subtitle || undefined, media}
    },
  },

  orderings: [
    {
      title: 'Destination',
      name: 'destinationAsc',
      by: [{field: 'destination', direction: 'asc'}, {field: 'pageType', direction: 'asc'}],
    },
  ],
})
