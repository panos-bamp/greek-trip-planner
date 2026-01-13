"use client"

/**
 * Final CTA Section Component
 * Multiple pathway CTAs at the end of post
 * 
 * Location: components/affiliate/FinalCtaSection.tsx
 */

import React from 'react'
import Link from 'next/link'

interface Pathway {
  icon: string
  title: string
  description: string
  ctaText: string
  ctaUrl: string
  isFeatured?: boolean
}

interface FinalCtaSectionProps {
  title?: string
  subtitle?: string
  pathways: Pathway[]
}

export function FinalCtaSection({
  title = 'Ready to Plan Your Trip?',
  subtitle = 'Choose where to begin:',
  pathways,
}: FinalCtaSectionProps) {
  return (
    <div className="final-cta-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
      </div>

      <div className="pathway-grid">
        {pathways.map((pathway, index) => (
          <div
            key={index}
            className={`pathway-card ${pathway.isFeatured ? 'featured' : ''}`}
          >
            {pathway.isFeatured && (
              <div className="ribbon">Most Popular</div>
            )}
            
            <div className="pathway-icon">{pathway.icon}</div>
            <h3 className="pathway-title">{pathway.title}</h3>
            <p className="pathway-description">{pathway.description}</p>
            
            <a
              href={pathway.ctaUrl}
              target={pathway.ctaUrl.startsWith('http') ? '_blank' : undefined}
              rel={pathway.ctaUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`pathway-cta ${pathway.isFeatured ? 'primary' : ''}`}
            >
              {pathway.ctaText}
            </a>
          </div>
        ))}
      </div>

      <style jsx>{`
        .final-cta-section {
          background: linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%);
          border-radius: 24px;
          padding: 3rem 2rem;
          margin: 3rem 0;
          text-align: center;
        }

        .section-header {
          margin-bottom: 2.5rem;
        }

        .section-title {
          margin: 0 0 0.75rem 0;
          font-size: 2rem;
          font-weight: 700;
          color: #1F2937;
        }

        .section-subtitle {
          margin: 0;
          font-size: 1.125rem;
          color: #6B7280;
        }

        .pathway-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .pathway-card {
          position: relative;
          background: white;
          border-radius: 16px;
          padding: 2rem 1.5rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.3s ease;
        }

        .pathway-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        }

        .pathway-card.featured {
          transform: scale(1.05);
          z-index: 1;
          border: 2px solid #0066CC;
          box-shadow: 0 8px 32px rgba(0, 102, 204, 0.2);
        }

        .pathway-card.featured:hover {
          transform: scale(1.05) translateY(-4px);
        }

        .ribbon {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #0066CC 0%, #3385DB 100%);
          color: white;
          padding: 0.375rem 1rem;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          border-radius: 20px;
          white-space: nowrap;
        }

        .pathway-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1;
        }

        .pathway-title {
          margin: 0 0 0.75rem 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1F2937;
        }

        .pathway-description {
          margin: 0 0 1.5rem 0;
          font-size: 0.9375rem;
          color: #6B7280;
          line-height: 1.6;
          flex: 1;
        }

        .pathway-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0.875rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .pathway-cta:not(.primary) {
          background: transparent;
          color: #0066CC;
          border: 2px solid #0066CC;
        }

        .pathway-cta:not(.primary):hover {
          background: #0066CC;
          color: white;
        }

        .pathway-cta.primary {
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8FB3 100%);
          color: white;
          border: none;
          box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
        }

        .pathway-cta.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
        }

        @media (max-width: 992px) {
          .pathway-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .pathway-card.featured {
            transform: none;
            order: -1;
          }

          .pathway-card.featured:hover {
            transform: translateY(-4px);
          }
        }

        @media (max-width: 576px) {
          .final-cta-section {
            padding: 2rem 1.25rem;
          }

          .section-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default FinalCtaSection
