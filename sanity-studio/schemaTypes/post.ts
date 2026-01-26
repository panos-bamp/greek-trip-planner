import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO & Meta'},
    {name: 'schema', title: 'Schema Markup'},
    {name: 'affiliate', title: 'Affiliate & Monetization'},
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'content',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Short description for SEO and previews (150-160 characters)',
    }),
    
    // ============================================
    // SEO & META GROUP
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
      description: 'Main keyword for this post (e.g., "Greece itinerary 10 days")',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      group: 'seo',
      description: 'Leave empty to use default URL. Use if republishing content.',
    }),
    
    // Open Graph
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
    
    // Twitter Card
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
    // ============================================
    
    // 1. ARTICLE SCHEMA (Primary)
    defineField({
      name: 'articleSchema',
      title: '📄 Article Schema',
      type: 'object',
      group: 'schema',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'enabled',
          title: 'Enable Article Schema',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'articleType',
          title: 'Article Type',
          type: 'string',
          options: {
            list: [
              {title: 'Blog Posting', value: 'BlogPosting'},
              {title: 'Article', value: 'Article'},
              {title: 'News Article', value: 'NewsArticle'},
              {title: 'Travel Guide', value: 'TravelGuide'},
              {title: 'Review', value: 'Review'},
            ],
          },
          initialValue: 'BlogPosting',
        },
        {
          name: 'authorName',
          title: 'Author Name',
          type: 'string',
          description: 'Full author name for schema markup',
        },
        {
          name: 'authorUrl',
          title: 'Author URL',
          type: 'url',
          description: 'Author profile or website URL',
        },
        {
          name: 'publisherName',
          title: 'Publisher Name',
          type: 'string',
          description: 'Your site/company name',
          initialValue: 'Greek Trip Planner',
        },
        {
          name: 'publisherLogo',
          title: 'Publisher Logo URL',
          type: 'url',
          description: 'URL to your logo (min 600x60px, PNG/JPG)',
        },
        {
          name: 'wordCount',
          title: 'Word Count',
          type: 'number',
          description: 'Approximate word count (improves ranking signals)',
        },
      ],
    }),
    
    // 2. FAQ SCHEMA
    defineField({
      name: 'faqSchema',
      title: '❓ FAQ Schema',
      type: 'object',
      group: 'schema',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'enabled',
          title: 'Enable FAQ Schema',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'faqs',
          title: 'FAQs',
          type: 'array',
          description: 'Add frequently asked questions for rich snippets',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'question', type: 'string', title: 'Question'},
                {name: 'answer', type: 'text', title: 'Answer', rows: 4},
              ],
              preview: {
                select: {
                  title: 'question',
                  subtitle: 'answer',
                },
              },
            },
          ],
        },
      ],
    }),
    
    // 3. HOW-TO SCHEMA
    defineField({
      name: 'howToSchema',
      title: '📋 How-To Schema',
      type: 'object',
      group: 'schema',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'enabled',
          title: 'Enable How-To Schema',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'name',
          type: 'string',
          title: 'How-To Title',
          description: 'e.g., "How to Plan a 10-Day Greece Trip"',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 2,
        },
        {
          name: 'totalTime',
          type: 'string',
          title: 'Total Time (ISO 8601)',
          description: 'e.g., "PT2H" (2 hours), "P10D" (10 days), "P3M" (3 months)',
        },
        {
          name: 'estimatedCost',
          type: 'string',
          title: 'Estimated Cost',
          description: 'e.g., "€2000" or "€1500-€3000"',
        },
        {
          name: 'steps',
          type: 'array',
          title: 'Steps',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'name', type: 'string', title: 'Step Name'},
                {name: 'text', type: 'text', title: 'Step Description', rows: 3},
                {name: 'url', type: 'url', title: 'Step URL (optional)'},
                {name: 'image', type: 'url', title: 'Step Image (optional)'},
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'text',
                },
              },
            },
          ],
        },
        {
          name: 'supply',
          type: 'array',
          title: 'Supplies/Tools Needed',
          of: [{type: 'string'}],
          description: 'e.g., "Passport", "Travel insurance", "Credit card"',
        },
      ],
    }),
    
    // 4. REVIEW SCHEMA (for destinations, hotels, tours)
    defineField({
      name: 'reviewSchema',
      title: '⭐ Review Schema',
      type: 'object',
      group: 'schema',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'enabled',
          title: 'Enable Review Schema',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'itemReviewed',
          type: 'object',
          title: 'Item Being Reviewed',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Place/Destination', value: 'Place'},
                  {title: 'Hotel', value: 'Hotel'},
                  {title: 'Tour/Activity', value: 'TouristAttraction'},
                  {title: 'Restaurant', value: 'Restaurant'},
                  {title: 'Product', value: 'Product'},
                ],
              },
            },
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'image', type: 'url', title: 'Image URL'},
            {name: 'address', type: 'string', title: 'Address (optional)'},
            {name: 'priceRange', type: 'string', title: 'Price Range (e.g., "€€-€€€")'},
          ],
        },
        {
          name: 'rating',
          type: 'object',
          title: 'Rating',
          fields: [
            {
              name: 'ratingValue',
              type: 'number',
              title: 'Rating Value (1-5)',
              validation: (Rule) => Rule.min(1).max(5),
            },
            {
              name: 'bestRating',
              type: 'number',
              title: 'Best Rating',
              initialValue: 5,
            },
            {
              name: 'worstRating',
              type: 'number',
              title: 'Worst Rating',
              initialValue: 1,
            },
          ],
        },
        {
          name: 'reviewBody',
          type: 'text',
          title: 'Review Summary',
          rows: 4,
          description: 'Brief summary of your review',
        },
      ],
    }),
    
    // 5. EVENT SCHEMA (festivals, activities)
    defineField({
      name: 'eventSchema',
      title: '🎉 Event Schema',
      type: 'object',
      group: 'schema',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'enabled',
          title: 'Enable Event Schema',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'events',
          type: 'array',
          title: 'Events',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'name', type: 'string', title: 'Event Name'},
                {name: 'description', type: 'text', title: 'Description', rows: 2},
                {name: 'startDate', type: 'datetime', title: 'Start Date'},
                {name: 'endDate', type: 'datetime', title: 'End Date (optional)'},
                {name: 'location', type: 'string', title: 'Location'},
                {name: 'image', type: 'url', title: 'Event Image'},
                {name: 'organizer', type: 'string', title: 'Organizer'},
                {name: 'url', type: 'url', title: 'Event URL'},
                {
                  name: 'eventStatus',
                  type: 'string',
                  title: 'Event Status',
                  options: {
                    list: [
                      {title: 'Scheduled', value: 'EventScheduled'},
                      {title: 'Cancelled', value: 'EventCancelled'},
                      {title: 'Postponed', value: 'EventPostponed'},
                    ],
                  },
                  initialValue: 'EventScheduled',
                },
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'location',
                },
              },
            },
          ],
        },
      ],
    }),
    
    // 6. PLACE SCHEMA (destinations)
    defineField({
      name: 'placeSchema',
      title: '📍 Place Schema',
      type: 'object',
      group: 'schema',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'enabled',
          title: 'Enable Place Schema',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'places',
          type: 'array',
          title: 'Places/Destinations',
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
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'address',
                },
              },
            },
          ],
        },
      ],
    }),
    
    // 7. VIDEO SCHEMA
    defineField({
      name: 'videoSchema',
      title: '🎥 Video Schema',
      type: 'object',
      group: 'schema',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'enabled',
          title: 'Enable Video Schema',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'videos',
          type: 'array',
          title: 'Videos',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'name', type: 'string', title: 'Video Title'},
                {name: 'description', type: 'text', title: 'Description', rows: 2},
                {name: 'thumbnailUrl', type: 'url', title: 'Thumbnail URL'},
                {name: 'contentUrl', type: 'url', title: 'Video URL'},
                {name: 'embedUrl', type: 'url', title: 'Embed URL (YouTube/Vimeo)'},
                {name: 'uploadDate', type: 'datetime', title: 'Upload Date'},
                {name: 'duration', type: 'string', title: 'Duration (ISO 8601)', description: 'e.g., "PT5M30S" for 5min 30sec'},
              ],
              preview: {
                select: {
                  title: 'name',
                },
              },
            },
          ],
        },
      ],
    }),
    
    // 8. RECIPE SCHEMA (for Greek food guides)
    defineField({
      name: 'recipeSchema',
      title: '🍽️ Recipe Schema',
      type: 'object',
      group: 'schema',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'enabled',
          title: 'Enable Recipe Schema',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'recipes',
          type: 'array',
          title: 'Recipes',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'name', type: 'string', title: 'Recipe Name'},
                {name: 'description', type: 'text', title: 'Description', rows: 2},
                {name: 'image', type: 'url', title: 'Image URL'},
                {name: 'prepTime', type: 'string', title: 'Prep Time (ISO 8601)', description: 'e.g., "PT30M"'},
                {name: 'cookTime', type: 'string', title: 'Cook Time (ISO 8601)'},
                {name: 'totalTime', type: 'string', title: 'Total Time (ISO 8601)'},
                {name: 'recipeYield', type: 'string', title: 'Servings', description: 'e.g., "4 servings"'},
                {name: 'recipeCategory', type: 'string', title: 'Category', description: 'e.g., "Main course"'},
                {name: 'recipeCuisine', type: 'string', title: 'Cuisine', description: 'e.g., "Greek"'},
                {
                  name: 'recipeIngredient',
                  type: 'array',
                  title: 'Ingredients',
                  of: [{type: 'string'}],
                },
                {
                  name: 'recipeInstructions',
                  type: 'array',
                  title: 'Instructions',
                  of: [{type: 'text'}],
                },
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'recipeCuisine',
                },
              },
            },
          ],
        },
      ],
    }),
    
    // 9. PRODUCT SCHEMA (travel gear recommendations)
    defineField({
      name: 'productSchema',
      title: '🛍️ Product Schema',
      type: 'object',
      group: 'schema',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'enabled',
          title: 'Enable Product Schema',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'products',
          type: 'array',
          title: 'Products',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'name', type: 'string', title: 'Product Name'},
                {name: 'description', type: 'text', title: 'Description', rows: 2},
                {name: 'image', type: 'url', title: 'Image URL'},
                {name: 'brand', type: 'string', title: 'Brand'},
                {name: 'sku', type: 'string', title: 'SKU (optional)'},
                {
                  name: 'offers',
                  type: 'object',
                  title: 'Offers',
                  fields: [
                    {name: 'price', type: 'string', title: 'Price', description: 'e.g., "29.99"'},
                    {name: 'priceCurrency', type: 'string', title: 'Currency', description: 'e.g., "EUR"'},
                    {name: 'url', type: 'url', title: 'Buy URL (Affiliate Link)'},
                    {
                      name: 'availability',
                      type: 'string',
                      title: 'Availability',
                      options: {
                        list: [
                          {title: 'In Stock', value: 'InStock'},
                          {title: 'Out of Stock', value: 'OutOfStock'},
                          {title: 'Pre-order', value: 'PreOrder'},
                        ],
                      },
                    },
                  ],
                },
                {
                  name: 'aggregateRating',
                  type: 'object',
                  title: 'Rating (optional)',
                  fields: [
                    {name: 'ratingValue', type: 'number', title: 'Rating (1-5)'},
                    {name: 'reviewCount', type: 'number', title: 'Review Count'},
                  ],
                },
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'brand',
                },
              },
            },
          ],
        },
      ],
    }),
    
    // 10. BREADCRUMB SCHEMA
    defineField({
      name: 'breadcrumbSchema',
      title: '🍞 Breadcrumb Schema',
      type: 'object',
      group: 'schema',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'enabled',
          title: 'Enable Breadcrumb Schema',
          type: 'boolean',
          initialValue: true,
          description: 'Auto-generated: Home > Blog > [Post Title]',
        },
        {
          name: 'customBreadcrumbs',
          type: 'array',
          title: 'Custom Breadcrumbs (optional)',
          description: 'Override auto-generated breadcrumbs',
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
    
    // ============================================
    // AFFILIATE & MONETIZATION GROUP
    // ============================================
    defineField({
      name: 'urgencyMessage',
      title: 'Urgency Alert Message',
      type: 'string',
      group: 'affiliate',
      description: 'Optional urgency message (e.g., "Peak season approaching!")',
    }),
    defineField({
      name: 'affiliateHotels',
      title: 'Affiliate Hotels',
      type: 'array',
      group: 'affiliate',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Hotel Name'},
            {name: 'location', type: 'string', title: 'Location'},
            {name: 'rating', type: 'number', title: 'Rating (1-10)'},
            {name: 'price', type: 'string', title: 'Price (e.g., "€120")'},
            {name: 'image', type: 'url', title: 'Image URL'},
            {name: 'affiliateLink', type: 'url', title: 'Affiliate Link'},
            {
              name: 'features',
              type: 'array',
              title: 'Features',
              of: [{type: 'string'}],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'affiliateTours',
      title: 'Affiliate Tours',
      type: 'array',
      group: 'affiliate',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Tour Title'},
            {name: 'description', type: 'text', title: 'Description'},
            {name: 'duration', type: 'string', title: 'Duration (e.g., "4 hours")'},
            {name: 'price', type: 'string', title: 'Price (e.g., "€50")'},
            {name: 'image', type: 'url', title: 'Image URL'},
            {name: 'affiliateLink', type: 'url', title: 'Affiliate Link'},
            {
              name: 'highlights',
              type: 'array',
              title: 'Tour Highlights',
              of: [{type: 'string'}],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'insuranceLink',
      title: 'Insurance Affiliate Link',
      type: 'url',
      group: 'affiliate',
    }),
    defineField({
      name: 'costBreakdown',
      title: 'Cost Breakdown',
      type: 'array',
      group: 'affiliate',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'category', type: 'string', title: 'Category'},
            {name: 'budget', type: 'string', title: 'Budget'},
            {name: 'mid', type: 'string', title: 'Mid-Range'},
            {name: 'luxury', type: 'string', title: 'Luxury'},
          ],
        },
      ],
    }),
    defineField({
      name: 'proTips',
      title: 'Pro Tips',
      type: 'array',
      group: 'affiliate',
      of: [{type: 'text'}],
    }),
    defineField({
      name: 'finalCtaBookingLink',
      title: 'Final CTA - Booking Link',
      type: 'url',
      group: 'affiliate',
      description: 'Main hotel booking affiliate link for bottom CTA',
    }),
    defineField({
      name: 'finalCtaToursLink',
      title: 'Final CTA - Tours Link',
      type: 'url',
      group: 'affiliate',
      description: 'Main tours affiliate link for bottom CTA',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
