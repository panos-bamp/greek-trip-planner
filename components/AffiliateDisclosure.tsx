"use client"

/**
 * Affiliate Disclosure Component
 * FTC-compliant disclosure for affiliate content
 * 
 * Location: components/affiliate/AffiliateDisclosure.tsx
 */

import React from 'react'

interface AffiliateDisclosureProps {
  position?: 'top' | 'bottom'
  customText?: string
}

export function AffiliateDisclosure({ 
  position = 'top', 
  customText 
}: AffiliateDisclosureProps) {
  const defaultText = position === 'top' 
    ? "This post contains affiliate links. We may earn a commission when you book through our links, at no extra cost to you. This helps support our site."
    : "Disclosure: This post contains affiliate links. When you book hotels, tours, or services through our links, we earn a commission that supports this website. Prices are the same for you – often cheaper with our exclusive discount codes. We only recommend services we've personally tested and trust."

  const text = customText || defaultText

  if (position === 'top') {
    return (
      <div className="affiliate-disclosure-top">
        <div className="disclosure-content">
          <span className="disclosure-icon">ℹ️</span>
          <p>{text}</p>
        </div>
        
        <style jsx>{`
          .affiliate-disclosure-top {
            background: linear-gradient(135deg, #E3F2FD 0%, #F0F7FF 100%);
            border-left: 4px solid #0066CC;
            border-radius: 0 8px 8px 0;
            padding: 1rem 1.5rem;
            margin: 1.5rem 0 2rem 0;
            font-size: 0.875rem;
          }
          
          .disclosure-content {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
          }
          
          .disclosure-icon {
            font-size: 1.25rem;
            flex-shrink: 0;
          }
          
          .disclosure-content p {
            margin: 0;
            color: #004A99;
            line-height: 1.5;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="affiliate-disclosure-bottom">
      <div className="disclosure-box">
        <p><strong>Disclosure:</strong> {text}</p>
        <a href="/disclosure" className="disclosure-link">
          Read our full disclosure policy →
        </a>
      </div>
      
      <style jsx>{`
        .affiliate-disclosure-bottom {
          margin: 3rem 0 2rem 0;
          padding-top: 2rem;
          border-top: 1px solid #E9ECEF;
        }
        
        .disclosure-box {
          background: #F8F9FA;
          border-radius: 8px;
          padding: 1.5rem;
        }
        
        .disclosure-box p {
          margin: 0 0 0.75rem 0;
          font-size: 0.875rem;
          color: #6C757D;
          line-height: 1.6;
        }
        
        .disclosure-box strong {
          color: #495057;
        }
        
        .disclosure-link {
          font-size: 0.875rem;
          color: #0066CC;
          text-decoration: none;
        }
        
        .disclosure-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}

export default AffiliateDisclosure
