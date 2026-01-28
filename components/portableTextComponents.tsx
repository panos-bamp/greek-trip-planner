'use client'

import { PortableTextComponents } from '@portabletext/react'
import Link from 'next/link'

export const portableTextComponents: PortableTextComponents = {
  block: {
    // Headings with GetYourGuide typography
    h2: ({ children }) => (
      <h2 className="text-[2.375rem] leading-[1.1] font-bold text-gray-900 mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[1.75rem] leading-[1.2] font-bold text-gray-900 mt-12 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-[1.25rem] leading-[1.2] font-semibold text-gray-900 mt-6 mb-4">
        {children}
      </h4>
    ),
    
    // Normal paragraph
    normal: ({ children }) => (
      <p className="text-[1.125rem] leading-[1.5] text-gray-700 mb-4">
        {children}
      </p>
    ),
    
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 italic text-gray-700 bg-blue-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  
  list: {
    // Bullet list
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-[1.125rem] leading-[1.5] text-gray-700">
        {children}
      </ul>
    ),
    
    // Numbered list
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-[1.125rem] leading-[1.5] text-gray-700">
        {children}
      </ol>
    ),
  },
  
  listItem: {
    bullet: ({ children }) => (
      <li className="pl-2">{children}</li>
    ),
    number: ({ children }) => (
      <li className="pl-2">{children}</li>
    ),
  },
  
  marks: {
    // Strong (bold)
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    
    // Emphasis (italic)
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    
    // Code
    code: ({ children }) => (
      <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    
    // Links
    link: ({ value, children }) => {
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
    
    // Underline
    underline: ({ children }) => (
      <u className="underline">{children}</u>
    ),
    
    // Strike-through
    strikethrough: ({ children }) => (
      <s className="line-through text-gray-500">{children}</s>
    ),
    
    // Highlights
    highlight: ({ children, value }) => {
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
    // Images
    image: ({ value }) => {
      if (!value?.asset) return null
      
      return (
        <figure className="my-8">
          <img
            src={value.asset.url}
            alt={value.alt || 'Image'}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          {value.caption && (
            <figcaption className="mt-3 text-sm text-gray-600 text-center italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    
    // Callout boxes
    callout: ({ value }) => {
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
