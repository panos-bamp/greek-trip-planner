'use client';

// components/affiliate/AffiliateLink.tsx
// Place this file at: c:\ai-greek-trip-planner\components\affiliate\AffiliateLink.tsx
// REPLACES the existing AffiliateLink if one exists, or add as new file.

import { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  getPartnerName,
  trackAffiliateClick,
  trackAffiliateVisible,
} from '@/lib/trackAffiliate';

interface AffiliateLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  // Optional: override the auto-detected partner name
  partner?: string;
}

export function AffiliateLink({ href, children, className, partner }: AffiliateLinkProps) {
  const pathname = usePathname();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const detectedPartner = getPartnerName(href);
  const resolvedPartner = (partner as ReturnType<typeof getPartnerName>) ?? detectedPartner;

  // Track when the link enters the viewport (fires once per page load)
  useEffect(() => {
    const el = linkRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackAffiliateVisible({
            partner: resolvedPartner,
            pagePath: pathname,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [resolvedPartner, pathname]);

  const handleClick = () => {
    trackAffiliateClick({
      partner: resolvedPartner,
      linkUrl: href,
      pagePath: pathname,
    });
  };

  return (
    <a
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
