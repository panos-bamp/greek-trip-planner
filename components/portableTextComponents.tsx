'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PortableTextComponents } from '@portabletext/react'

// Helper function to build Sanity image URLs directly
function getSanityImageUrl(imageRef: string, width: number = 1200) {
  // Extract image ID, dimensions, and format from reference
  // Format: image-<assetId>-<width>x<height>-<format>
  const parts = imageRef.split('-')
  const assetId = parts[1]
  const dimensions = parts[2]
  const format = parts[3]
  
  // Build CDN URL
  return `https://cdn.sanity.io/images/puhk8qa7/production/${assetId}-${dimensions}.${format}?w=${width}&auto=format`
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    // Headings with GetYourGuide typography (preserved from original)
    h2: ({ children }: any) => (
      <h2 className="text-[2.375rem] leading-[1.1] font-bold text-gray-900 mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-[1.75rem] leading-[1.2] font-bold text-gray-900 mt-12 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-[1.25rem] leading-[1.2] font-semibold text-gray-900 mt-6 mb-4">
        {children}
      </h4>
    ),
    
    // Normal paragraph (preserved)
    normal: ({ children }: any) => (
      <p className="text-[1.125rem] leading-[1.5] text-gray-700 mb-4">
        {children}
      </p>
    ),
    
    // Blockquote (preserved)
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 italic text-gray-700 bg-blue-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  
  list: {
    // Bullet list (preserved)
    bullet: ({ children }: any) => (
      <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-[1.125rem] leading-[1.5] text-gray-700">
        {children}
      </ul>
    ),
    
    // Numbered list (preserved)
    number: ({ children }: any) => (
      <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-[1.125rem] leading-[1.5] text-gray-700">
        {children}
      </ol>
    ),
  },
  
  listItem: {
    // List items (preserved)
    bullet: ({ children }: any) => (
      <li className="pl-2">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="pl-2">{children}</li>
    ),
  },
  
  marks: {
    // Strong (bold) - preserved
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    
    // Emphasis (italic) - preserved
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    
    // Code - preserved
    code: ({ children }: any) => (
      <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    
    // Links - preserved with better internal/external handling
    link: ({ value, children }: any) => {
      const target = value?.href?.startsWith('http') ? '_blank' : undefined
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined
      
      // Internal link
      if (value?.href?.startsWith('/')) {
        return (
          <Link 
            href={value.href}
            className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors"
          >
            {children}
          </Link>
        )
      }
      
      // External link
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors"
        >
          {children}
        </a>
      )
    },
    
    // Underline - preserved
    underline: ({ children }: any) => (
      <u className="underline">{children}</u>
    ),
    
    // Strike-through - preserved
    strikethrough: ({ children }: any) => (
      <s className="line-through text-gray-500">{children}</s>
    ),
    
    // Highlights - preserved
    highlight: ({ children, value }: any) => {
      const colors: { [key: string]: string } = {
        yellow: 'bg-yellow-200',
        green: 'bg-green-200',
        blue: 'bg-blue-200',
        pink: 'bg-pink-200',
      }
      const bgColor = colors[value?.color] || 'bg-yellow-200'
      
      return (
        <span className={`${bgColor} px-1 py-0.5 rounded`}>
          {children}
        </span>
      )
    },
  },
  
  types: {
    // Images - STANDALONE VERSION (no urlForImage dependency)
    image: ({ value }: any) => {
      console.log('Image block detected:', value) // Debug log
      
      if (!value?.asset) {
        console.warn('Image block has no asset')
        return null
      }
      
      try {
        let imageUrl = ''
        
        // Case 1: Sanity reference (_ref)
        if (value.asset._ref) {
          imageUrl = getSanityImageUrl(value.asset._ref, 1200)
        }
        // Case 2: Direct URL
        else if (value.asset.url) {
          imageUrl = value.asset.url
        }
        // Case 3: Already a URL string
        else if (typeof value.asset === 'string') {
          imageUrl = value.asset
        }
        
        if (!imageUrl) {
          console.warn('Could not generate image URL from:', value.asset)
          return null
        }
        
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
      } catch (error) {
        console.error('Error rendering image:', error, value)
        return (
          <div className="my-8 p-4 bg-red-50 border border-red-200 rounded text-red-700">
            Error loading image
          </div>
        )
      }
    },
    
    // Callout boxes - preserved
    callout: ({ value }: any) => {
      const types: { [key: string]: { bg: string; border: string; icon: string } } = {
        info: {
          bg: 'bg-blue-50',
          border: 'border-blue-500',
          icon: 'ℹ️',
        },
        warning: {
          bg: 'bg-yellow-50',
          border: 'border-yellow-500',
          icon: '⚠️',
        },
        tip: {
          bg: 'bg-green-50',
          border: 'border-green-500',
          icon: '💡',
        },
        note: {
          bg: 'bg-purple-50',
          border: 'border-purple-500',
          icon: '📝',
        },
      }
      
      const style = types[value?.type] || types.info
      
      return (
        <div className={`${style.bg} border-l-4 ${style.border} rounded-r-lg p-6 my-8 shadow-md`}>
          <div className="flex items-start">
            <span className="text-2xl mr-3">{style.icon}</span>
            <div className="flex-1">
              {value?.title && (
                <h4 className="font-bold text-gray-900 mb-2">{value.title}</h4>
              )}
              <div className="text-gray-700">{value?.text}</div>
            </div>
          </div>
        </div>
      )
    },
  },
}
