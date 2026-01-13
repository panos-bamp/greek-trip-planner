"use client"

/**
 * Insurance CTA Component
 * High-converting travel insurance promotion box
 * 
 * Location: components/affiliate/InsuranceCta.tsx
 */

import React from 'react'

interface InsuranceCtaProps {
  title?: string
  description?: string
  testimonial?: string
  testimonialAuthor?: string
  features?: string[]
  priceFrom?: string
  pricePeriod?: string
  discountCode?: string
  discountPercent?: string
  bookingUrl: string
  ctaText?: string
}

export function InsuranceCta({
  title = "Don't Skip Travel Insurance",
  description = "Required for Greece + could save you thousands if ferries cancel (common in windy season).",
  testimonial,
  testimonialAuthor,
  features = [
    'Ferry cancellations covered',
    'Medical up to €250k',
    '24/7 English support',
    'COVID coverage included',
  ],
  priceFrom = '€45',
  pricePeriod = 'for 1 week',
  discountCode,
  discountPercent,
  bookingUrl,
  ctaText,
}: InsuranceCtaProps) {
  const buttonText = ctaText || (discountCode 
    ? `Get Quote - ${discountPercent} Off with Code ${discountCode} →`
    : 'Get Your Quote →')

  return (
    <div className="insurance-cta">
      <div className="cta-icon">🛡️</div>
      
      <div className="cta-content">
        <h3 className="cta-title">{title}</h3>
        <p className="cta-description" dangerouslySetInnerHTML={{ __html: description }} />
        
        {testimonial && (
          <div className="testimonial">
            <p className="testimonial-text">💬 <em>"{testimonial}"</em></p>
            {testimonialAuthor && (
              <p className="testimonial-author">- {testimonialAuthor}</p>
            )}
          </div>
        )}
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature">
              <span className="feature-check">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="cta-footer">
          <div className="price-badge">
            <span className="price-from">From</span>
            <span className="price-amount">{priceFrom}</span>
            <span className="price-period">{pricePeriod}</span>
          </div>
          
          <div className="cta-action">
            <a 
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="cta-button"
            >
              {buttonText}
            </a>
            <p className="cta-subtext">2-minute application • Instant coverage</p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .insurance-cta {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1.5rem;
          padding: 2rem;
          background: linear-gradient(135deg, #E3F2FD 0%, #F0F7FF 100%);
          border-radius: 16px;
          margin: 2.5rem 0;
          box-shadow: 0 4px 16px rgba(0, 102, 204, 0.1);
        }
        
        .cta-icon {
          font-size: 3rem;
          line-height: 1;
        }
        
        .cta-content {
          flex: 1;
        }
        
        .cta-title {
          margin: 0 0 0.75rem 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #004A99;
        }
        
        .cta-description {
          margin: 0 0 1.25rem 0;
          color: #1E40AF;
          line-height: 1.6;
        }
        
        .cta-description :global(strong) {
          color: #1E3A8A;
        }
        
        .testimonial {
          background: white;
          padding: 1rem 1.25rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }
        
        .testimonial-text {
          margin: 0;
          font-size: 0.9375rem;
          color: #374151;
          line-height: 1.6;
        }
        
        .testimonial-author {
          margin: 0.5rem 0 0 0;
          font-size: 0.8125rem;
          color: #6B7280;
          font-weight: 500;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        
        .feature {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9375rem;
          color: #1E40AF;
        }
        
        .feature-check {
          color: #059669;
          font-weight: 700;
        }
        
        .cta-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(0, 102, 204, 0.2);
        }
        
        .price-badge {
          display: flex;
          flex-direction: column;
          background: white;
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          text-align: center;
        }
        
        .price-from {
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
        
        .price-period {
          font-size: 0.75rem;
          color: #6B7280;
        }
        
        .cta-action {
          flex: 1;
          text-align: right;
        }
        
        .cta-button {
          display: inline-flex;
          align-items: center;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }
        
        .cta-subtext {
          margin: 0.75rem 0 0 0;
          font-size: 0.8125rem;
          color: #6B7280;
        }
        
        @media (max-width: 768px) {
          .insurance-cta {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 1.5rem;
          }
          
          .cta-icon {
            margin: 0 auto;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .feature {
            justify-content: center;
          }
          
          .cta-footer {
            flex-direction: column;
            gap: 1.25rem;
          }
          
          .price-badge {
            width: 100%;
          }
          
          .cta-action {
            width: 100%;
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

export default InsuranceCta
