// lib/trackAffiliate.ts
// Place this file at: c:\ai-greek-trip-planner\lib\trackAffiliate.ts

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type AffiliatePartner =
  | 'booking'
  | 'getyourguide'
  | 'viator'
  | 'discovercars'
  | 'welcome_pickups'
  | 'airalo'
  | 'yesim'
  | 'klook'
  | 'agoda'
  | 'kiwi'
  | 'airhelp'
  | 'ekta'
  | 'nordvpn'
  | 'unknown';

export function getPartnerName(url: string): AffiliatePartner {
  if (url.includes('booking.com'))        return 'booking';
  if (url.includes('getyourguide.com'))   return 'getyourguide';
  if (url.includes('viator.com'))         return 'viator';
  if (url.includes('discovercars.com'))   return 'discovercars';
  if (url.includes('welcomepickups.com')) return 'welcome_pickups';
  if (url.includes('airalo.com'))         return 'airalo';
  if (url.includes('yesim.app'))          return 'yesim';
  if (url.includes('klook.com'))          return 'klook';
  if (url.includes('agoda.com'))          return 'agoda';
  if (url.includes('kiwi.com'))           return 'kiwi';
  if (url.includes('airhelp.com'))        return 'airhelp';
  if (url.includes('ekta.life'))          return 'ekta';
  if (url.includes('nordvpn.com'))        return 'nordvpn';
  return 'unknown';
}

interface TrackClickParams {
  partner: AffiliatePartner;
  linkUrl: string;
  pagePath: string;
}

export function trackAffiliateClick({ partner, linkUrl, pagePath }: TrackClickParams): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'affiliate_click', {
    affiliate_partner: partner,
    affiliate_url: linkUrl,
    page_path: pagePath,
    event_category: 'affiliate',
    event_label: partner,
  });
}

interface TrackVisibleParams {
  partner: AffiliatePartner;
  pagePath: string;
}

export function trackAffiliateVisible({ partner, pagePath }: TrackVisibleParams): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'affiliate_visible', {
    affiliate_partner: partner,
    page_path: pagePath,
    event_category: 'affiliate',
    event_label: `${partner}_visible`,
  });
}
