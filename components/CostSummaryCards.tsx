"use client"

/**
 * Cost Summary Cards Component
 * Budget tier comparison cards
 * 
 * Location: components/affiliate/CostSummaryCards.tsx
 */

import React from 'react'
import Link from 'next/link'

interface Tier {
  priceRange: string
  includes: string[]
  ctaLink?: string
}

interface CostSummaryCardsProps {
  budgetTier: Tier
  midRangeTier: Tier
  luxuryTier: Tier
  destination?: string
}

export function CostSummaryCards({
  budgetTier,
  midRangeTier,
  luxuryTier,
  destination = '3 days',
}: CostSummaryCardsProps) {
  return (
    <div className="cost-summary-cards">
      {/* Budget Tier */}
      <div className="cost-card budget">
        <div className="card-header">
          <span className="badge">Budget</span>
          <h3 className="price">{budgetTier.priceRange}</h3>
          <p className="subtitle">total for {destination}</p>
        </div>
        <ul className="included">
          {budgetTier.includes.map((item, index) => (
            <li key={index}>✓ {item}</li>
          ))}
        </ul>
        {budgetTier.ctaLink && (
          <a href={budgetTier.ctaLink} className="card-link">
            See breakdown →
          </a>
        )}
      </div>

      {/* Mid-Range Tier (Featured) */}
      <div className="cost-card mid-range featured">
        <div className="ribbon">MOST POPULAR</div>
        <div className="card-header">
          <span className="badge">Mid-Range</span>
          <h3 className="price">{midRangeTier.priceRange}</h3>
          <p className="subtitle">total for {destination}</p>
        </div>
        <ul className="included">
          {midRangeTier.includes.map((item, index) => (
            <li key={index}>✓ {item}</li>
          ))}
        </ul>
        {midRangeTier.ctaLink && (
          <a href={midRangeTier.ctaLink} className="card-link-primary">
            Book This Experience →
          </a>
        )}
      </div>

      {/* Luxury Tier */}
      <div className="cost-card luxury">
        <div className="card-header">
          <span className="badge">Luxury</span>
          <h3 className="price">{luxuryTier.priceRange}</h3>
          <p className="subtitle">total for {destination}</p>
        </div>
        <ul className="included">
          {luxuryTier.includes.map((item, index) => (
            <li key={index}>✓ {item}</li>
          ))}
        </ul>
        {luxuryTier.ctaLink && (
          <a href={luxuryTier.ctaLink} className="card-link">
            Explore luxury →
          </a>
        )}
      </div>

      <style jsx>{`
        .cost-summary-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .cost-card {
          position: relative;
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .cost-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        }

        .cost-card.budget {
          border-top: 4px solid #10B981;
        }

        .cost-card.mid-range {
          border-top: 4px solid #0066CC;
        }

        .cost-card.luxury {
          border-top: 4px solid #9333EA;
        }

        .cost-card.featured {
          transform: scale(1.05);
          z-index: 1;
          box-shadow: 0 8px 32px rgba(0, 102, 204, 0.2);
        }

        .cost-card.featured:hover {
          transform: scale(1.05) translateY(-4px);
        }

        .ribbon {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8FB3 100%);
          color: white;
          padding: 0.375rem 1rem;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          border-radius: 20px;
          white-space: nowrap;
        }

        .card-header {
          text-align: center;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #E5E7EB;
          margin-bottom: 1.25rem;
        }

        .badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 20px;
          margin-bottom: 0.75rem;
        }

        .budget .badge {
          background: #D1FAE5;
          color: #065F46;
        }

        .mid-range .badge {
          background: #DBEAFE;
          color: #1E40AF;
        }

        .luxury .badge {
          background: #F3E8FF;
          color: #6B21A8;
        }

        .price {
          margin: 0;
          font-size: 1.75rem;
          font-weight: 700;
          color: #1F2937;
        }

        .subtitle {
          margin: 0.25rem 0 0 0;
          font-size: 0.875rem;
          color: #6B7280;
        }

        .included {
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
        }

        .included li {
          padding: 0.5rem 0;
          font-size: 0.9375rem;
          color: #374151;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .budget .included li::before {
          color: #10B981;
        }

        .mid-range .included li::before {
          color: #0066CC;
        }

        .luxury .included li::before {
          color: #9333EA;
        }

        .card-link,
        .card-link-primary {
          display: block;
          text-align: center;
          padding: 0.875rem 1.25rem;
          margin-top: 1.25rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .card-link {
          background: transparent;
          color: #0066CC;
          border: 2px solid #0066CC;
        }

        .card-link:hover {
          background: #0066CC;
          color: white;
        }

        .card-link-primary {
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8FB3 100%);
          color: white;
          border: none;
          box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
        }

        .card-link-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
        }

        @media (max-width: 992px) {
          .cost-summary-cards {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .cost-card.featured {
            transform: none;
            order: -1;
          }

          .cost-card.featured:hover {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  )
}

export default CostSummaryCards
