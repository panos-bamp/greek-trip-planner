'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PortableTextComponents } from '@portabletext/react'

// Helper function to build Sanity image URLs without external dependency
function getSanityImageUrl(ref: string): string {
  if (!ref) return ''
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/puhk8qa7/production/${id}-${dimensions}.${format}`
}

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null

      const imageUrl = getSanityImageUrl(value.asset._ref)

      return (
        <figure className="my-8">
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={value.alt || 'Blog post image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-gray-600 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    // ✅ HTML EMBED SERIALIZER - Renders pasted HTML (tables, embeds, etc.)
    htmlEmbed: ({ value }: any) => {
      if (!value?.html) return null

      return (
        <div
          className="my-8 html-embed-container overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: value.html }}
        />
      )
    },
  },

  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 mt-12 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-[38px] font-bold text-gray-900 mb-5 mt-10 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-4 mt-8 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl md:text-[20px] font-semibold text-gray-900 mb-3 mt-6">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 text-gray-600 italic text-lg">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg text-gray-700">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },

  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => {
      const href = value?.href || '#'
      const isExternal = href.startsWith('http')

      if (isExternal) {
        return (
          <a
            href={href}
            target={value?.blank ? '_blank' : undefined}
            rel={value?.blank ? 'noopener noreferrer' : undefined}
            className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600 transition-colors"
          >
            {children}
          </a>
        )
      }

      return (
        <Link
          href={href}
          className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600 transition-colors"
        >
          {children}
        </Link>
      )
    },
  },
}
