import { siteConfig } from '../site.config';

export type AffiliatePartner =
  | 'booking' | 'tripcom' | 'klook' | 'gyg' | 'transport'
  | 'airalo' | 'saily' | 'yesim' | 'nordvpn' | 'nordpass';

interface PartnerConfig {
  name: string;
  displayName: string;
  baseUrl: string;
  affiliateUrl: string;
  color: string;
  icon: string;
  category: 'activities' | 'hotels' | 'flights' | 'esim' | 'security' | 'transport';
}

const partnerConfigs: Record<AffiliatePartner, PartnerConfig> = {
  booking: {
    name: 'booking',
    displayName: 'Booking.com',
    baseUrl: 'https://www.booking.com',
    affiliateUrl: siteConfig.affiliateLinks.booking,
    color: '#003580',
    icon: '/images/partners/booking.svg',
    category: 'hotels',
  },
  tripcom: {
    name: 'tripcom',
    displayName: 'Trip.com',
    baseUrl: 'https://www.trip.com',
    affiliateUrl: siteConfig.affiliateLinks.tripcom,
    color: '#287DFA',
    icon: '/images/partners/tripcom.svg',
    category: 'flights',
  },
  klook: {
    name: 'klook',
    displayName: 'Klook',
    baseUrl: 'https://www.klook.com',
    affiliateUrl: siteConfig.affiliateLinks.klook,
    color: '#FF5722',
    icon: '/images/partners/klook.svg',
    category: 'activities',
  },
  gyg: {
    name: 'gyg',
    displayName: 'GetYourGuide',
    baseUrl: 'https://www.getyourguide.com',
    affiliateUrl: siteConfig.affiliateLinks.getYourGuide,
    color: '#FF4F17',
    icon: '/images/partners/gyg.svg',
    category: 'activities',
  },
  transport: {
    name: 'transport',
    displayName: '12Go',
    baseUrl: 'https://12go.asia',
    affiliateUrl: siteConfig.affiliateLinks.transport,
    color: '#00A651',
    icon: '/images/partners/12go.svg',
    category: 'transport',
  },
  airalo: {
    name: 'airalo',
    displayName: 'Airalo',
    baseUrl: 'https://www.airalo.com',
    affiliateUrl: 'https://www.airalo.com/france-esim',
    color: '#1A1A2E',
    icon: '/images/partners/airalo.svg',
    category: 'esim',
  },
  saily: {
    name: 'saily',
    displayName: 'Saily',
    baseUrl: 'https://saily.com',
    affiliateUrl: siteConfig.affiliateLinks.esim,
    color: '#6C5CE7',
    icon: '/images/partners/saily.svg',
    category: 'esim',
  },
  yesim: {
    name: 'yesim',
    displayName: 'Yesim',
    baseUrl: 'https://www.yesim.app',
    affiliateUrl: 'https://www.yesim.app',
    color: '#00C853',
    icon: '/images/partners/yesim.svg',
    category: 'esim',
  },
  nordvpn: {
    name: 'nordvpn',
    displayName: 'NordVPN',
    baseUrl: 'https://nordvpn.com',
    affiliateUrl: 'https://nordvpn.com',
    color: '#4687FF',
    icon: '/images/partners/nordvpn.svg',
    category: 'security',
  },
  nordpass: {
    name: 'nordpass',
    displayName: 'NordPass',
    baseUrl: 'https://nordpass.com',
    affiliateUrl: 'https://nordpass.com',
    color: '#00C853',
    icon: '/images/partners/nordpass.svg',
    category: 'security',
  },
};

export function buildAffiliateUrl(partner: AffiliatePartner, params?: Record<string, string>): string {
  const config = partnerConfigs[partner];
  if (!config) return '#';
  let url = config.affiliateUrl || config.baseUrl;
  if (params) {
    const searchParams = new URLSearchParams(params);
    const separator = url.includes('?') ? '&' : '?';
    url += separator + searchParams.toString();
  }
  return url;
}

export function getPartnerConfig(partner: AffiliatePartner): PartnerConfig {
  return partnerConfigs[partner];
}

export function getPartnersByCategory(category: PartnerConfig['category']): PartnerConfig[] {
  return Object.values(partnerConfigs).filter((p) => p.category === category);
}

export function getAllPartners(): PartnerConfig[] {
  return Object.values(partnerConfigs);
}

// Convenience getters for affiliate links
export function getBookingLink(): string {
  return siteConfig.affiliateLinks.booking;
}

export function getTripcomLink(): string {
  return siteConfig.affiliateLinks.tripcom;
}

export function getTransportLink(): string {
  return siteConfig.affiliateLinks.transport;
}

export function getEsimLink(): string {
  return siteConfig.affiliateLinks.esim;
}

export function getGetYourGuideLink(): string {
  return siteConfig.affiliateLinks.getYourGuide;
}

export function getKlookLink(): string {
  return siteConfig.affiliateLinks.klook;
}
