"use client"

/**
 * Hotel Recommendation Card Component
 * Conversion-optimized hotel card with affiliate link
 * 
 * Location: components/affiliate/HotelCard.tsx
 */

import React from 'react'
import Link from 'next/link'

interface HotelCardProps {
  name: string
  tier: 'budget' | 'mid-range' | 'luxury'
  badge?: string
  stars: number
  image?: string
  location: string
  description: string
  priceFrom: string
  rating?: string
  reviewCount?: string
  highlights?: string[]
  proTip?: string
  bookingUrl: string
  ctaText?: string
}

export function HotelCard({
  name,
  tier,
  badge,
  stars,
  image,
  location,
  description,
  priceFrom,
  rating,
  reviewCount,
  highlights = [],
  proTip,
  bookingUrl,
  ctaText = 'Check Availability →',
}: HotelCardProps) {
  const tierColors = {
    budget: { bg: '#E8F5E9', border: '#4CAF50', badge: '#2E7D32' },
    'mid-range': { bg: '#E3F2FD', border: '#2196F3', badge: '#1565C0' },
    luxury: { bg: '#F3E5F5', border: '#9C27B0', badge: '#7B1FA2' },
  }
  
  const colors = tierColors[tier]
  const starDisplay = '⭐'.repeat(stars)

  return (
    <div className="hotel-card" style={{ '--tier-bg': colors.bg, '--tier-border': colors.border } as React.CSSProperties}>
      {badge && (
        <div className="hotel-badge" style={{ background: colors.badge }}>
          <span className="badge-text">{badge}</span>
          <span className="stars">{starDisplay}</span>
        </div>
      )}
      
      <div className="card-layout">
        {/* Image Section */}
        <div className="hotel-image">
          {image ? (
            <img src={image} alt={name} />
          ) : (
            <div className="image-placeholder">
              <span>🏨</span>
            </div>
          )}
          {rating && (
            <div className="rating-badge">
              <span className="rating-score">{rating}</span>
              <span className="rating-text">Excellent</span>
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="hotel-content">
          <div className="hotel-header">
            <h3 className="hotel-name">{name}</h3>
            <p className="hotel-location">📍 {location}</p>
          </div>
          
          <p className="hotel-description">{description}</p>
          
          {highlights.length > 0 && (
            <div className="hotel-highlights">
              {highlights.map((highlight, index) => (
                <span key={index} className="highlight-tag">
                  ✓ {highlight}
                </span>
              ))}
            </div>
          )}
          
          {proTip && (
            <div className="pro-tip">
              <span className="tip-icon">💡</span>
              <p className="tip-text"><strong>Pro Tip:</strong> {proTip}</p>
            </div>
          )}
          
          {/* Pricing & CTA */}
          <div className="hotel-footer">
            <div className="pricing">
              <span className="price-from">From</span>
              <span className="price-amount">{priceFrom}</span>
              <span className="price-period">/night</span>
              {reviewCount && (
                <span className="review-count">({reviewCount} reviews)</span>
              )}
            </div>
            
            <a 
              href={bookingUrl} 
              target="_blank" 
              rel="noopener noreferrer sponsored"
              className="cta-button"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .hotel-card {
          position: relative;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          margin: 2rem 0;
          transition: all 0.3s ease;
        }
        
        .hotel-card:hover {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          transform: translateY(-4px);
        }
        
        .hotel-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          color: white;
        }
        
        .badge-text {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        
        .stars {
          font-size: 0.625rem;
          margin-top: 0.25rem;
        }
        
        .card-layout {
          display: grid;
          grid-template-columns: 40% 60%;
          min-height: 400px;
        }
        
        .hotel-image {
          position: relative;
          overflow: hidden;
        }
        
        .hotel-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
          font-size: 4rem;
        }
        
        .rating-badge {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          background: #0066CC;
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .rating-score {
          font-size: 1.25rem;
          font-weight: 700;
        }
        
        .rating-text {
          font-size: 0.625rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .hotel-content {
          padding: 1.5rem 2rem;
          display: flex;
          flex-direction: column;
        }
        
        .hotel-header {
          margin-bottom: 1rem;
        }
        
        .hotel-name {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1F2937;
        }
        
        .hotel-location {
          margin: 0;
          color: #6B7280;
          font-size: 0.875rem;
        }
        
        .hotel-description {
          margin: 0 0 1rem 0;
          color: #4B5563;
          line-height: 1.6;
        }
        
        .hotel-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .highlight-tag {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.75rem;
          background: #E8F5E9;
          color: #2E7D32;
          font-size: 0.75rem;
          font-weight: 500;
          border-radius: 20px;
        }
        
        .pro-tip {
          display: flex;
          gap: 0.75rem;
          padding: 1rem;
          background: linear-gradient(135deg, #FFF9E6 0%, #FFFBF0 100%);
          border-left: 3px solid #F59E0B;
          border-radius: 0 8px 8px 0;
          margin-bottom: 1.5rem;
        }
        
        .tip-icon {
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        
        .tip-text {
          margin: 0;
          font-size: 0.875rem;
          color: #92400E;
          line-height: 1.5;
        }
        
        .tip-text :global(strong) {
          color: #78350F;
        }
        
        .hotel-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px solid #E5E7EB;
        }
        
        .pricing {
          display: flex;
          flex-direction: column;
        }
        
        .price-from {
          font-size: 0.75rem;
          color: #6B7280;
          text-transform: uppercase;
        }
        
        .price-amount {
          font-size: 2rem;
          font-weight: 700;
          color: #0066CC;
          line-height: 1;
        }
        
        .price-period {
          font-size: 0.875rem;
          color: #6B7280;
        }
        
        .review-count {
          font-size: 0.75rem;
          color: #9CA3AF;
          margin-top: 0.25rem;
        }
        
        .cta-button {
          display: inline-flex;
          align-items: center;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8FB3 100%);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
        }
        
        @media (max-width: 768px) {
          .card-layout {
            grid-template-columns: 1fr;
          }
          
          .hotel-image {
            height: 200px;
          }
          
          .hotel-content {
            padding: 1.25rem;
          }
          
          .hotel-footer {
            flex-direction: column;
            gap: 1rem;
          }
          
          .pricing {
            align-items: center;
            text-align: center;
          }
          
          .cta-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default HotelCard
