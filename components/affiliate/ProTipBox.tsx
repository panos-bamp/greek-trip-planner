"use client"

/**
 * Pro Tip Box Component
 * Highlighted tip/callout box
 * 
 * Location: components/affiliate/ProTipBox.tsx
 */

import React from 'react'

interface ProTipBoxProps {
  icon?: string
  title?: string
  children: React.ReactNode
  variant?: 'tip' | 'info' | 'warning' | 'success'
}

export function ProTipBox({
  icon,
  title,
  children,
  variant = 'tip',
}: ProTipBoxProps) {
  const variants = {
    tip: {
      bg: 'linear-gradient(135deg, #FFF9E6 0%, #FFFBF0 100%)',
      border: '#F59E0B',
      titleColor: '#92400E',
      textColor: '#78350F',
      defaultIcon: '💡',
      defaultTitle: 'Pro Tip',
    },
    info: {
      bg: 'linear-gradient(135deg, #E3F2FD 0%, #F0F7FF 100%)',
      border: '#0066CC',
      titleColor: '#004A99',
      textColor: '#1E40AF',
      defaultIcon: 'ℹ️',
      defaultTitle: 'Good to Know',
    },
    warning: {
      bg: 'linear-gradient(135deg, #FFF3F3 0%, #FFEBEB 100%)',
      border: '#FF6B6B',
      titleColor: '#C53030',
      textColor: '#742A2A',
      defaultIcon: '⚠️',
      defaultTitle: 'Important',
    },
    success: {
      bg: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
      border: '#10B981',
      titleColor: '#065F46',
      textColor: '#047857',
      defaultIcon: '✅',
      defaultTitle: 'Confirmed',
    },
  }

  const style = variants[variant]
  const displayIcon = icon || style.defaultIcon
  const displayTitle = title || style.defaultTitle

  return (
    <div 
      className="pro-tip-box"
      style={{
        '--tip-bg': style.bg,
        '--tip-border': style.border,
        '--tip-title': style.titleColor,
        '--tip-text': style.textColor,
      } as React.CSSProperties}
    >
      <div className="tip-icon">{displayIcon}</div>
      <div className="tip-content">
        <h4 className="tip-title">{displayTitle}</h4>
        <div className="tip-text">{children}</div>
      </div>

      <style jsx>{`
        .pro-tip-box {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--tip-bg);
          border-left: 4px solid var(--tip-border);
          border-radius: 0 12px 12px 0;
          margin: 2rem 0;
        }

        .tip-icon {
          font-size: 1.75rem;
          line-height: 1;
        }

        .tip-content {
          flex: 1;
        }

        .tip-title {
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
          font-weight: 700;
          color: var(--tip-title);
        }

        .tip-text {
          font-size: 0.9375rem;
          color: var(--tip-text);
          line-height: 1.6;
        }

        .tip-text :global(p) {
          margin: 0 0 0.75rem 0;
        }

        .tip-text :global(p:last-child) {
          margin-bottom: 0;
        }

        .tip-text :global(strong) {
          color: var(--tip-title);
        }

        .tip-text :global(a) {
          color: var(--tip-border);
          font-weight: 500;
        }

        @media (max-width: 576px) {
          .pro-tip-box {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .tip-icon {
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  )
}

export default ProTipBox
