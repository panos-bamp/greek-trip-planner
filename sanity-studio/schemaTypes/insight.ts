import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'insight',
  title: '📊 Insight',
  type: 'document',
  groups: [
    { name: 'content', title: '📝 Content', default: true },
    { name: 'dataAndSources', title: '📊 Data & Sources' },
    { name: 'seo', title: '🔍 SEO & Meta' },
    { name: 'schema', title: '🏗️ Schema Markup' },
    { name: 'relatedContent', title: '🔗 Related Content' },
  ],

  fields: [
    // ============================================================
    // 📝 TAB 1: CONTENT
    // ============================================================

    // --- Core Fields ---
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'The main headline of the insight article',
      validation: (Rule) => Rule.required().max(120).warning('Keep under 120 characters'),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'URL path: greektriplanner.me/insights/[slug]',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'content',
      description: 'A secondary headline or tagline displayed below the title',
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Short summary (2-3 sentences) shown on the listing page and in social previews',
      validation: (Rule) => Rule.required().max(300),
    }),

    defineField({
      name: 'mainImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the image for accessibility and SEO',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional photo credit or caption',
        },
      ],
    }),

    // --- Article Metadata ---
    defineField({
      name: 'insightType',
      title: 'Insight Type',
      type: 'string',
      group: 'content',
      description: 'Categorize this content for filtering on the /insights page',
      options: {
        list: [
          { title: '📈 Market Report', value: 'market-report' },
          { title: '📊 Statistics & Data', value: 'statistics' },
          { title: '🔮 Trend Analysis', value: 'trend-analysis' },
          { title: '🏝️ Destination Performance', value: 'destination-performance' },
          { title: '✈️ Source Market Analysis', value: 'source-market' },
          { title: '🏨 Hotel & Accommodation', value: 'accommodation' },
          { title: '🚢 Cruise Industry', value: 'cruise' },
          { title: '📜 Policy & Regulation', value: 'policy-regulation' },
          { title: '🌱 Sustainability', value: 'sustainability' },
          { title: '💡 Industry Opinion', value: 'opinion' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'topics',
      title: 'Topics / Tags',
      type: 'array',
      group: 'content',
      description: 'Add relevant topic tags for filtering and internal linking',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'content',
      initialValue: 'Greek Trip Planner Research',
      description: 'Author name displayed on the article',
    }),

    defineField({
      name: 'authorBio',
      title: 'Author Short Bio',
      type: 'text',
      group: 'content',
      rows: 2,
      description: 'Brief author description for E-E-A-T (displayed in author card)',
      initialValue: 'The Greek Trip Planner research team analyzes tourism data, government statistics, and industry reports to provide actionable insights for travelers and travel professionals.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'updatedAt',
      title: 'Last Updated Date',
      type: 'datetime',
      group: 'content',
      description: 'Set this when you update the article with new data. Displayed on the page and used in schema markup.',
    }),

    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      group: 'content',
      description: 'Estimated reading time — displayed on listing cards and article page',
      validation: (Rule) => Rule.min(1).max(60),
    }),

    // --- Key Metrics Highlight Box ---
    defineField({
      name: 'keyMetrics',
      title: 'Key Metrics (Highlight Box)',
      type: 'array',
      group: 'content',
      description: 'Top 3-6 headline statistics displayed in a prominent card at the top of the article. These are the "at a glance" numbers.',
      of: [
        {
          type: 'object',
          name: 'metric',
          title: 'Metric',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g., "Tourism Revenue", "International Arrivals", "YoY Growth"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g., "€22.38B", "35.26M", "+8.9%"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'context',
              title: 'Context / Comparison',
              type: 'string',
              description: 'e.g., "Jan-Oct 2025", "vs €21.7B in 2024", "+4.4% YoY"',
            },
            {
              name: 'trend',
              title: 'Trend Direction',
              type: 'string',
              options: {
                list: [
                  { title: '📈 Up', value: 'up' },
                  { title: '📉 Down', value: 'down' },
                  { title: '➡️ Flat', value: 'flat' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),

    // --- Body Content ---
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'blockContent',
      group: 'content',
      description: 'Main article content — use headings (H2, H3), tables, images, and callout boxes',
    }),

    // --- Table of Contents ---
    defineField({
      name: 'showTableOfContents',
      title: 'Show Table of Contents',
      type: 'boolean',
      group: 'content',
      initialValue: true,
      description: 'Auto-generate a TOC from H2 headings in the article body',
    }),

    // --- Conclusion / Key Takeaways ---
    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      group: 'content',
      description: 'Bullet-point summary of the most important findings. Displayed in a styled card at the bottom of the article.',
      of: [{ type: 'string' }],
    }),

    // ============================================================
    // 📊 TAB 2: DATA & SOURCES
    // ============================================================

    defineField({
      name: 'dataTimePeriod',
      title: 'Data Time Period',
      type: 'object',
      group: 'dataAndSources',
      description: 'The time range this data covers',
      fields: [
        {
          name: 'startDate',
          title: 'Period Start',
          type: 'date',
        },
        {
          name: 'endDate',
          title: 'Period End',
          type: 'date',
        },
        {
          name: 'label',
          title: 'Display Label',
          type: 'string',
          description: 'e.g., "January - October 2025", "Full Year 2024", "Q3 2025"',
        },
      ],
    }),

    defineField({
      name: 'dataSources',
      title: 'Data Sources',
      type: 'array',
      group: 'dataAndSources',
      description: 'List all data sources cited in this article. Displayed in a "Sources" section at the bottom.',
      of: [
        {
          type: 'object',
          name: 'dataSource',
          title: 'Source',
          fields: [
            {
              name: 'name',
              title: 'Source Name',
              type: 'string',
              description: 'e.g., "Bank of Greece", "INSETE Intelligence", "Fraport Greece"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'e.g., "Tourism receipts and balance of payments data"',
            },
            {
              name: 'url',
              title: 'Source URL',
              type: 'url',
              description: 'Direct link to the source data or report',
            },
            {
              name: 'accessDate',
              title: 'Date Accessed',
              type: 'date',
              description: 'When you last accessed or verified this source',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description',
            },
          },
        },
      ],
    }),

    defineField({
      name: 'methodology',
      title: 'Methodology Note',
      type: 'text',
      group: 'dataAndSources',
      rows: 4,
      description: 'Optional: Explain how data was collected, calculated, or aggregated. Builds credibility and E-E-A-T.',
    }),

    defineField({
      name: 'dataDisclaimer',
      title: 'Data Disclaimer',
      type: 'text',
      group: 'dataAndSources',
      rows: 3,
      description: 'Any caveats about the data. e.g., "Preliminary figures subject to revision by the Bank of Greece."',
    }),

    defineField({
      name: 'downloadableAssets',
      title: 'Downloadable Assets',
      type: 'array',
      group: 'dataAndSources',
      description: 'Attach PDF reports, CSV datasets, or infographics that users can download (great for lead generation)',
      of: [
        {
          type: 'object',
          name: 'asset',
          title: 'Asset',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g., "Download Full Report (PDF)", "Greece Tourism Data 2025 (CSV)"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'file',
              title: 'File',
              type: 'file',
              options: {
                accept: '.pdf,.csv,.xlsx,.png,.jpg',
              },
            },
            {
              name: 'requiresEmail',
              title: 'Require Email to Download',
              type: 'boolean',
              initialValue: false,
              description: 'Gate this download behind an email capture form (lead generation)',
            },
          ],
          preview: {
            select: {
              title: 'label',
            },
          },
        },
      ],
    }),

    // ============================================================
    // 🔍 TAB 3: SEO & META
    // ============================================================

    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      description: 'SEO title tag (50-60 characters ideal). Falls back to article title if empty.',
      validation: (Rule) =>
        Rule.max(70).warning('Google truncates titles over ~60 characters'),
    }),

    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'SEO meta description (150-160 characters ideal). Falls back to excerpt if empty.',
      validation: (Rule) =>
        Rule.max(170).warning('Google truncates descriptions over ~160 characters'),
    }),

    defineField({
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      group: 'seo',
      description: 'Primary keyword this article targets. e.g., "greece tourism statistics 2025"',
    }),

    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary Keywords',
      type: 'array',
      group: 'seo',
      description: 'Additional keywords to target. Used for internal reference and content optimization.',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),

    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      group: 'seo',
      description: 'Only set if this content is republished from another source. Leave blank for original content.',
    }),

    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      group: 'seo',
      initialValue: false,
      description: 'Prevent search engines from indexing this page. Use for drafts or private content.',
    }),

    // --- Open Graph ---
    defineField({
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
      group: 'seo',
      description: 'Title shown when shared on Facebook/LinkedIn. Falls back to Meta Title → Title.',
    }),

    defineField({
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'text',
      group: 'seo',
      rows: 2,
      description: 'Description shown when shared on social. Falls back to Meta Description → Excerpt.',
    }),

    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'seo',
      description: 'Image shown when shared on social (1200x630px recommended). Falls back to Featured Image.',
      options: { hotspot: true },
    }),

    // --- Twitter Card ---
    defineField({
      name: 'twitterCardType',
      title: 'Twitter Card Type',
      type: 'string',
      group: 'seo',
      initialValue: 'summary_large_image',
      options: {
        list: [
          { title: 'Summary with Large Image', value: 'summary_large_image' },
          { title: 'Summary', value: 'summary' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),

    // ============================================================
    // 🏗️ TAB 4: SCHEMA MARKUP
    // ============================================================

    // --- Article Schema (always enabled for insights) ---
    defineField({
      name: 'schemaArticleType',
      title: 'Article Schema Type',
      type: 'string',
      group: 'schema',
      initialValue: 'Article',
      description: 'Which Article schema type to use. "Article" is the safe default. Use "ResearchArticle" for data-heavy pieces.',
      options: {
        list: [
          { title: '📄 Article (default — always recognized by Google)', value: 'Article' },
          { title: '📊 Report/NewsArticle (for timely market reports)', value: 'NewsArticle' },
          { title: '🔬 ScholarlyArticle (academic-style research)', value: 'ScholarlyArticle' },
        ],
        layout: 'radio',
      },
    }),

    // --- FAQ Schema ---
    defineField({
      name: 'enableFaqSchema',
      title: '❓ Enable FAQ Schema',
      type: 'boolean',
      group: 'schema',
      initialValue: false,
      description: 'Generates FAQ rich snippets in Google. Add FAQ items below.',
    }),

    defineField({
      name: 'faqItems',
      title: 'FAQ Items',
      type: 'array',
      group: 'schema',
      hidden: ({ parent }) => !parent?.enableFaqSchema,
      description: 'Questions and answers that will appear as FAQ rich results in Google.',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
    }),

    // --- Dataset Schema ---
    defineField({
      name: 'enableDatasetSchema',
      title: '📊 Enable Dataset Schema',
      type: 'boolean',
      group: 'schema',
      initialValue: false,
      description: 'Adds Dataset structured data — helps this content appear in Google Dataset Search. Great for statistical articles.',
    }),

    defineField({
      name: 'datasetInfo',
      title: 'Dataset Information',
      type: 'object',
      group: 'schema',
      hidden: ({ parent }) => !parent?.enableDatasetSchema,
      fields: [
        {
          name: 'datasetName',
          title: 'Dataset Name',
          type: 'string',
          description: 'e.g., "Greece Tourism Statistics 2025"',
        },
        {
          name: 'datasetDescription',
          title: 'Dataset Description',
          type: 'text',
          rows: 3,
          description: 'Describe what data is included',
        },
        {
          name: 'temporalCoverage',
          title: 'Temporal Coverage',
          type: 'string',
          description: 'ISO 8601 format. e.g., "2025-01/2025-10" or "2024/2025"',
        },
        {
          name: 'spatialCoverage',
          title: 'Spatial Coverage',
          type: 'string',
          description: 'e.g., "Greece", "Cyclades Islands, Greece"',
          initialValue: 'Greece',
        },
        {
          name: 'license',
          title: 'License',
          type: 'string',
          description: 'e.g., "https://creativecommons.org/licenses/by/4.0/"',
        },
      ],
    }),

    // --- Speakable Schema ---
    defineField({
      name: 'enableSpeakableSchema',
      title: '🔊 Enable Speakable Schema',
      type: 'boolean',
      group: 'schema',
      initialValue: false,
      description: 'Marks sections suitable for text-to-speech / Google Assistant. Best for key findings summaries.',
    }),

    defineField({
      name: 'speakableSections',
      title: 'Speakable CSS Selectors',
      type: 'array',
      group: 'schema',
      hidden: ({ parent }) => !parent?.enableSpeakableSchema,
      description: 'CSS selectors for speakable sections. e.g., ".key-metrics", ".key-takeaways", "h1"',
      of: [{ type: 'string' }],
    }),

    // --- Breadcrumb Schema ---
    defineField({
      name: 'enableBreadcrumbSchema',
      title: '🍞 Enable Breadcrumb Schema',
      type: 'boolean',
      group: 'schema',
      initialValue: true,
      description: 'Auto-generates: Home > Insights > [Article Title]. Recommended: always on.',
    }),

    // --- About/Mentions Schema (for entity linking) ---
    defineField({
      name: 'aboutEntities',
      title: '🏷️ About Entities (Schema "about")',
      type: 'array',
      group: 'schema',
      description: 'Link this article to known entities (organizations, places, concepts) using schema.org "about" property. Strengthens topical authority.',
      of: [
        {
          type: 'object',
          name: 'entity',
          title: 'Entity',
          fields: [
            {
              name: 'name',
              title: 'Entity Name',
              type: 'string',
              description: 'e.g., "Greece", "Tourism in Greece", "Bank of Greece"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'entityType',
              title: 'Entity Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Country', value: 'Country' },
                  { title: 'Place', value: 'Place' },
                  { title: 'Organization', value: 'Organization' },
                  { title: 'Event', value: 'Event' },
                  { title: 'Thing', value: 'Thing' },
                ],
              },
            },
            {
              name: 'sameAs',
              title: 'Same As (Wikipedia/Wikidata URL)',
              type: 'url',
              description: 'e.g., "https://en.wikipedia.org/wiki/Tourism_in_Greece"',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'entityType',
            },
          },
        },
      ],
    }),

    // ============================================================
    // 🔗 TAB 5: RELATED CONTENT
    // ============================================================

    defineField({
      name: 'relatedBlogPosts',
      title: 'Related Blog Posts',
      type: 'array',
      group: 'relatedContent',
      description: 'Link to relevant /blog articles. Creates cross-linking between insights and blog content.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
        },
      ],
    }),

    defineField({
      name: 'relatedInsights',
      title: 'Related Insights',
      type: 'array',
      group: 'relatedContent',
      description: 'Link to other /insights articles for internal linking.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'insight' }],
        },
      ],
    }),

    defineField({
      name: 'externalReferences',
      title: 'External References / Further Reading',
      type: 'array',
      group: 'relatedContent',
      description: 'Links to external reports, studies, or articles referenced in this insight',
      of: [
        {
          type: 'object',
          name: 'externalRef',
          title: 'External Reference',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'source',
              title: 'Source / Publisher',
              type: 'string',
              description: 'e.g., "WTTC", "Bank of Greece", "INSETE"',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'source',
            },
          },
        },
      ],
    }),

    // --- Call to Action ---
    defineField({
      name: 'ctaType',
      title: 'Bottom CTA Type',
      type: 'string',
      group: 'relatedContent',
      description: 'What call-to-action to display at the bottom of the article',
      options: {
        list: [
          { title: '🗺️ Plan Your Trip (link to quiz/planner)', value: 'plan-trip' },
          { title: '📧 Subscribe to Insights (email capture)', value: 'subscribe' },
          { title: '📥 Download Report (gated content)', value: 'download' },
          { title: '📊 Explore More Data (link to insights listing)', value: 'more-insights' },
          { title: '🚫 None', value: 'none' },
        ],
      },
      initialValue: 'subscribe',
    }),

    defineField({
      name: 'ctaCustomText',
      title: 'Custom CTA Text',
      type: 'string',
      group: 'relatedContent',
      description: 'Override the default CTA button text',
    }),
  ],

  // ============================================================
  // PREVIEW CONFIGURATION
  // ============================================================

  preview: {
    select: {
      title: 'title',
      subtitle: 'insightType',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare({ title, subtitle, media, date }) {
      const typeLabels: Record<string, string> = {
        'market-report': '📈 Market Report',
        'statistics': '📊 Statistics',
        'trend-analysis': '🔮 Trend Analysis',
        'destination-performance': '🏝️ Destination',
        'source-market': '✈️ Source Market',
        'accommodation': '🏨 Accommodation',
        'cruise': '🚢 Cruise',
        'policy-regulation': '📜 Policy',
        'sustainability': '🌱 Sustainability',
        'opinion': '💡 Opinion',
      }
      const formattedDate = date
        ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'No date'
      return {
        title,
        subtitle: `${typeLabels[subtitle] || subtitle || 'No type'} · ${formattedDate}`,
        media,
      }
    },
  },

  // ============================================================
  // ORDERING
  // ============================================================

  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date (Oldest)',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Insight Type',
      name: 'insightTypeAsc',
      by: [{ field: 'insightType', direction: 'asc' }],
    },
  ],
})
