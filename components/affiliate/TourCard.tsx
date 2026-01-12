/**
 * Tour Recommendation Card Component
 * Conversion-optimized tour card with affiliate link
 * 
 * Location: components/affiliate/TourCard.tsx
 */

import React from 'react'

interface TourCardProps {
  name: string
  badge?: string
  image?: string
  duration: string
  description: string
  price: string
  rating?: string
  reviewCount?: string
  includes?: string[]
  whyBook?: string
  bookingUrl: string
  ctaText?: string
}

export function TourCard({
  name,
  badge,
  image,
  duration,
  description,
  price,
  rating,
  reviewCount,
  includes = [],
  whyBook,
  bookingUrl,
  ctaText = 'Book This Tour →',
}: TourCardProps) {
  return (
    <div className="tour-card">
      {badge && (
        <div className="tour-badge">
          <span>{badge}</span>
        </div>
      )}
      
      {/* Image Section */}
      <div className="tour-image">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="image-placeholder">
            <span>🎯</span>
          </div>
        )}
        
        <div className="tour-meta">
          <span className="duration">⏱️ {duration}</span>
          {rating && (
            <span className="rating">
              ⭐ {rating} {reviewCount && `(${reviewCount})`}
            </span>
          )}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="tour-content">
        <h3 className="tour-name">{name}</h3>
        <p className="tour-description">{description}</p>
        
        {includes.length > 0 && (
          <div className="tour-includes">
            <h4>What's Included:</h4>
            <ul>
              {includes.map((item, index) => (
                <li key={index}>✓ {item}</li>
              ))}
            </ul>
          </div>
        )}
        
        {whyBook && (
          <div className="why-book">
            <span className="why-icon">💡</span>
            <p><strong>Why we recommend:</strong> {whyBook}</p>
          </div>
        )}
        
        {/* Footer */}
        <div className="tour-footer">
          <div className="tour-price">
            <span className="price-label">From</span>
            <span className="price-amount">{price}</span>
            <span className="price-person">/person</span>
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
      
      <style jsx>{`
        .tour-card {
          position: relative;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          margin: 2rem 0;
          transition: all 0.3s ease;
        }
        
        .tour-card:hover {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          transform: translateY(-4px);
        }
        
        .tour-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 10;
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8FB3 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .tour-image {
          position: relative;
          height: 240px;
          overflow: hidden;
        }
        
        .tour-image img {
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
        
        .tour-meta {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          display: flex;
          justify-content: space-between;
          color: white;
        }
        
        .duration, .rating {
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .tour-content {
          padding: 1.5rem;
        }
        
        .tour-name {
          margin: 0 0 0.75rem 0;
          font-size: 1.375rem;
          font-weight: 700;
          color: #1F2937;
        }
        
        .tour-description {
          margin: 0 0 1.25rem 0;
          color: #4B5563;
          line-height: 1.6;
        }
        
        .tour-includes {
          margin-bottom: 1.25rem;
        }
        
        .tour-includes h4 {
          margin: 0 0 0.75rem 0;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .tour-includes ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }
        
        .tour-includes li {
          font-size: 0.875rem;
          color: #059669;
        }
        
        .why-book {
          display: flex;
          gap: 0.75rem;
          padding: 1rem;
          background: linear-gradient(135deg, #E3F2FD 0%, #F0F7FF 100%);
          border-left: 3px solid #0066CC;
          border-radius: 0 8px 8px 0;
          margin-bottom: 1.5rem;
        }
        
        .why-icon {
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        
        .why-book p {
          margin: 0;
          font-size: 0.875rem;
          color: #004A99;
          line-height: 1.5;
        }
        
        .why-book :global(strong) {
          color: #003D80;
        }
        
        .tour-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px solid #E5E7EB;
        }
        
        .tour-price {
          display: flex;
          flex-direction: column;
        }
        
        .price-label {
          font-size: 0.75rem;
          color: #6B7280;
          text-transform: uppercase;
        }
        
        .price-amount {
          font-size: 1.75rem;
          font-weight: 700;
          color: #0066CC;
          line-height: 1;
        }
        
        .price-person {
          font-size: 0.75rem;
          color: #6B7280;
        }
        
        .cta-button {
          display: inline-flex;
          align-items: center;
          padding: 0.875rem 1.75rem;
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
          .tour-includes ul {
            grid-template-columns: 1fr;
          }
          
          .tour-footer {
            flex-direction: column;
            gap: 1rem;
          }
          
          .tour-price {
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

export default TourCard
