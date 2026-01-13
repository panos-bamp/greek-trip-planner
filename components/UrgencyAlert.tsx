"use client"

/**
 * Urgency Alert Component
 * High-visibility alert box for time-sensitive information
 * 
 * Location: components/affiliate/UrgencyAlert.tsx
 */

import React from 'react'
import Link from 'next/link'

interface UrgencyAlertProps {
  title: string
  message: string
  primaryCta?: string
  primaryLink?: string
  secondaryCta?: string
  secondaryLink?: string
}

export function UrgencyAlert({
  title,
  message,
  primaryCta,
  primaryLink,
  secondaryCta,
  secondaryLink,
}: UrgencyAlertProps) {
  return (
    <div className="urgency-alert">
      <div className="alert-icon">⚠️</div>
      <div className="alert-content">
        <h3 className="alert-title">{title}</h3>
        <p 
          className="alert-message" 
          dangerouslySetInnerHTML={{ __html: message }}
        />
        
        {(primaryCta || secondaryCta) && (
          <div className="alert-buttons">
            {primaryCta && primaryLink && (
              <Link href={primaryLink} className="btn-primary">
                {primaryCta}
              </Link>
            )}
            {secondaryCta && secondaryLink && (
              <Link href={secondaryLink} className="btn-secondary">
                {secondaryCta}
              </Link>
            )}
          </div>
        )}
      </div>
      
      <style jsx>{`
        .urgency-alert {
          background: linear-gradient(135deg, #FFF3F3 0%, #FFEBEB 100%);
          border: 2px solid #FF6B6B;
          border-radius: 12px;
          padding: 1.5rem;
          margin: 2rem 0;
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }
        
        .alert-icon {
          font-size: 2rem;
          flex-shrink: 0;
          line-height: 1;
        }
        
        .alert-content {
          flex: 1;
        }
        
        .alert-title {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #C53030;
        }
        
        .alert-message {
          margin: 0 0 1rem 0;
          color: #742A2A;
          line-height: 1.6;
        }
        
        .alert-message :global(strong) {
          color: #C53030;
        }
        
        .alert-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .alert-buttons :global(.btn-primary) {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8FB3 100%);
          color: white;
          font-weight: 600;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
        }
        
        .alert-buttons :global(.btn-primary:hover) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
        }
        
        .alert-buttons :global(.btn-secondary) {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          background: white;
          color: #0066CC;
          font-weight: 600;
          border: 2px solid #0066CC;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .alert-buttons :global(.btn-secondary:hover) {
          background: #0066CC;
          color: white;
        }
        
        @media (max-width: 768px) {
          .urgency-alert {
            flex-direction: column;
            text-align: center;
            padding: 1.25rem;
          }
          
          .alert-icon {
            align-self: center;
          }
          
          .alert-buttons {
            justify-content: center;
          }
          
          .alert-buttons :global(.btn-primary),
          .alert-buttons :global(.btn-secondary) {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default UrgencyAlert
