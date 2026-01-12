/**
 * Enhanced Post Schema with Affiliate Fields
 * Location: sanity/schemas/post.ts
 * 
 * This schema extends the standard post with:
 * - Affiliate toggle and disclosure
 * - Hotel recommendations
 * - Tour recommendations
 * - Insurance CTA
 * - Custom CTA boxes
 */

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'affiliate', title: 'Affiliate Content' },
    { name: 'seo', title: 'SEO' },
    { name: 'meta', title: 'Meta' },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════
    // BASIC CONTENT FIELDS
    // ═══════════════════════════════════════════════════════════
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Short description for previews and SEO (150-160 characters)',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'meta',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'meta',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'meta',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Destination Guide', value: 'destination-guide' },
          { title: 'Itinerary', value: 'itinerary' },
          { title: 'Travel Tips', value: 'travel-tips' },
          { title: 'Hotels & Accommodation', value: 'hotels' },
          { title: 'Island Hopping', value: 'island-hopping' },
          { title: 'Food & Culture', value: 'food-culture' },
        ],
      },
    }),

    // ═══════════════════════════════════════════════════════════
    // AFFILIATE SETTINGS
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'isAffiliate',
      title: 'Enable Affiliate Content',
      type: 'boolean',
      group: 'affiliate',
      initialValue: false,
      description: 'Toggle to enable affiliate components and disclosure',
    }),
    defineField({
      name: 'showDisclosure',
      title: 'Show Affiliate Disclosure',
      type: 'boolean',
      group: 'affiliate',
      initialValue: true,
      hidden: ({ document }) => !document?.isAffiliate,
      description: 'Show FTC-compliant disclosure at top and bottom of post',
    }),
    defineField({
      name: 'disclosureText',
      title: 'Custom Disclosure Text',
      type: 'text',
      group: 'affiliate',
      rows: 3,
      hidden: ({ document }) => !document?.isAffiliate,
      description: 'Leave empty for default disclosure',
    }),

    // ═══════════════════════════════════════════════════════════
    // URGENCY ALERT (Top of Post)
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'urgencyAlert',
      title: 'Urgency Alert Box',
      type: 'object',
      group: 'affiliate',
      hidden: ({ document }) => !document?.isAffiliate,
      fields: [
        { name: 'enabled', title: 'Show Alert', type: 'boolean', initialValue: false },
        { name: 'title', title: 'Alert Title', type: 'string' },
        { name: 'message', title: 'Alert Message', type: 'text', rows: 2 },
        { name: 'primaryCta', title: 'Primary Button Text', type: 'string' },
        { name: 'primaryLink', title: 'Primary Button Link', type: 'url' },
        { name: 'secondaryCta', title: 'Secondary Button Text', type: 'string' },
        { name: 'secondaryLink', title: 'Secondary Button Link', type: 'url' },
      ],
    }),

    // ═══════════════════════════════════════════════════════════
    // COST SUMMARY CARDS
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'costSummary',
      title: 'Cost Summary Cards',
      type: 'object',
      group: 'affiliate',
      hidden: ({ document }) => !document?.isAffiliate,
      fields: [
        { name: 'enabled', title: 'Show Cost Summary', type: 'boolean', initialValue: false },
        {
          name: 'budgetTier',
          title: 'Budget Tier',
          type: 'object',
          fields: [
            { name: 'priceRange', title: 'Price Range', type: 'string', placeholder: '€330-510' },
            { name: 'includes', title: 'What\'s Included', type: 'array', of: [{ type: 'string' }] },
            { name: 'ctaLink', title: 'CTA Link', type: 'url' },
          ],
        },
        {
          name: 'midRangeTier',
          title: 'Mid-Range Tier (Featured)',
          type: 'object',
          fields: [
            { name: 'priceRange', title: 'Price Range', type: 'string', placeholder: '€690-1,110' },
            { name: 'includes', title: 'What\'s Included', type: 'array', of: [{ type: 'string' }] },
            { name: 'ctaLink', title: 'CTA Link', type: 'url' },
          ],
        },
        {
          name: 'luxuryTier',
          title: 'Luxury Tier',
          type: 'object',
          fields: [
            { name: 'priceRange', title: 'Price Range', type: 'string', placeholder: '€1,500-3,300' },
            { name: 'includes', title: 'What\'s Included', type: 'array', of: [{ type: 'string' }] },
            { name: 'ctaLink', title: 'CTA Link', type: 'url' },
          ],
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════
    // HOTEL RECOMMENDATIONS
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'hotelRecommendations',
      title: 'Hotel Recommendations',
      type: 'array',
      group: 'affiliate',
      hidden: ({ document }) => !document?.isAffiliate,
      of: [
        {
          type: 'object',
          name: 'hotelCard',
          title: 'Hotel Card',
          fields: [
            { name: 'name', title: 'Hotel Name', type: 'string' },
            { name: 'tier', title: 'Tier', type: 'string', options: { list: ['budget', 'mid-range', 'luxury'] } },
            { name: 'badge', title: 'Badge Text', type: 'string', placeholder: 'LUXURY PICK' },
            { name: 'stars', title: 'Star Rating', type: 'number', validation: (Rule) => Rule.min(1).max(5) },
            { name: 'image', title: 'Hotel Image', type: 'image', options: { hotspot: true } },
            { name: 'location', title: 'Location', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'priceFrom', title: 'Price From (per night)', type: 'string', placeholder: '€450' },
            { name: 'rating', title: 'Booking Rating', type: 'string', placeholder: '9.4' },
            { name: 'reviewCount', title: 'Review Count', type: 'string', placeholder: '1,247' },
            { 
              name: 'highlights', 
              title: 'Highlights', 
              type: 'array', 
              of: [{ type: 'string' }],
              description: 'Key features (e.g., "Private infinity pool", "Caldera view")'
            },
            { name: 'proTip', title: 'Pro Tip', type: 'text', rows: 2 },
            { name: 'bookingUrl', title: 'Booking URL (Affiliate)', type: 'url' },
            { name: 'ctaText', title: 'CTA Button Text', type: 'string', initialValue: 'Check Availability →' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'tier', media: 'image' },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════
    // TOUR RECOMMENDATIONS
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'tourRecommendations',
      title: 'Tour Recommendations',
      type: 'array',
      group: 'affiliate',
      hidden: ({ document }) => !document?.isAffiliate,
      of: [
        {
          type: 'object',
          name: 'tourCard',
          title: 'Tour Card',
          fields: [
            { name: 'name', title: 'Tour Name', type: 'string' },
            { name: 'badge', title: 'Badge Text', type: 'string', placeholder: 'TOP PICK' },
            { name: 'image', title: 'Tour Image', type: 'image', options: { hotspot: true } },
            { name: 'duration', title: 'Duration', type: 'string', placeholder: '5 hours' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'price', title: 'Price', type: 'string', placeholder: '€95' },
            { name: 'rating', title: 'Rating', type: 'string', placeholder: '4.9' },
            { name: 'reviewCount', title: 'Review Count', type: 'string', placeholder: '2,847' },
            { 
              name: 'includes', 
              title: 'What\'s Included', 
              type: 'array', 
              of: [{ type: 'string' }] 
            },
            { name: 'whyBook', title: 'Why We Recommend', type: 'text', rows: 2 },
            { name: 'bookingUrl', title: 'Booking URL (Affiliate)', type: 'url' },
            { name: 'ctaText', title: 'CTA Button Text', type: 'string', initialValue: 'Book This Tour →' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'price', media: 'image' },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════
    // INSURANCE CTA
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'insuranceCta',
      title: 'Travel Insurance CTA',
      type: 'object',
      group: 'affiliate',
      hidden: ({ document }) => !document?.isAffiliate,
      fields: [
        { name: 'enabled', title: 'Show Insurance CTA', type: 'boolean', initialValue: false },
        { name: 'title', title: 'Title', type: 'string', initialValue: "Don't Skip Travel Insurance" },
        { name: 'description', title: 'Description', type: 'text', rows: 2 },
        { name: 'testimonial', title: 'Testimonial Quote', type: 'text', rows: 2 },
        { name: 'testimonialAuthor', title: 'Testimonial Author', type: 'string' },
        { 
          name: 'features', 
          title: 'Features', 
          type: 'array', 
          of: [{ type: 'string' }],
          initialValue: ['Ferry cancellations covered', 'Medical up to €250k', '24/7 English support', 'COVID coverage included']
        },
        { name: 'priceFrom', title: 'Price From', type: 'string', placeholder: '€45' },
        { name: 'pricePeriod', title: 'Price Period', type: 'string', placeholder: 'for 1 week' },
        { name: 'discountCode', title: 'Discount Code', type: 'string' },
        { name: 'discountPercent', title: 'Discount Percentage', type: 'string', placeholder: '15%' },
        { name: 'bookingUrl', title: 'Booking URL (Affiliate)', type: 'url' },
        { name: 'ctaText', title: 'CTA Button Text', type: 'string' },
      ],
    }),

    // ═══════════════════════════════════════════════════════════
    // CUSTOM CTA BOXES (In-Content)
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'customCtaBoxes',
      title: 'Custom CTA Boxes',
      type: 'array',
      group: 'affiliate',
      hidden: ({ document }) => !document?.isAffiliate,
      description: 'Create custom affiliate boxes to insert in content',
      of: [
        {
          type: 'object',
          name: 'ctaBox',
          title: 'CTA Box',
          fields: [
            { name: 'id', title: 'Box ID', type: 'string', description: 'Use this ID in content to place the box' },
            { name: 'style', title: 'Style', type: 'string', options: { list: ['info', 'warning', 'success', 'promo'] } },
            { name: 'icon', title: 'Icon Emoji', type: 'string', placeholder: '💡' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'content', title: 'Content', type: 'text', rows: 3 },
            { name: 'ctaText', title: 'CTA Button Text', type: 'string' },
            { name: 'ctaUrl', title: 'CTA URL', type: 'url' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'id' },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════
    // FINAL CTA SECTION
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'finalCta',
      title: 'Final CTA Section',
      type: 'object',
      group: 'affiliate',
      hidden: ({ document }) => !document?.isAffiliate,
      fields: [
        { name: 'enabled', title: 'Show Final CTA', type: 'boolean', initialValue: true },
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        {
          name: 'pathways',
          title: 'CTA Pathways',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', title: 'Icon Emoji', type: 'string' },
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 2 },
                { name: 'ctaText', title: 'CTA Text', type: 'string' },
                { name: 'ctaUrl', title: 'CTA URL', type: 'url' },
                { name: 'isFeatured', title: 'Featured (Highlighted)', type: 'boolean' },
              ],
            },
          ],
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════
    // SEO FIELDS
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Override the default title for SEO (50-60 characters)',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'Meta description for search engines (150-160 characters)',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
      isAffiliate: 'isAffiliate',
    },
    prepare(selection) {
      const { title, author, media, isAffiliate } = selection
      return {
        title: `${isAffiliate ? '💰 ' : ''}${title}`,
        subtitle: author ? `by ${author}` : '',
        media,
      }
    },
  },
})
