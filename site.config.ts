// =============================================================================
// site.config.ts - Central configuration for Go2France
// =============================================================================

export interface SiteConfig {
  name: string;
  domain: string;
  destination: string;
  destinationFull: string;
  tagline: string;
  colors: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    accent: Record<string, string>;
  };
  locales: string[];
  defaultLocale: string;
  affiliateLinks: {
    booking: string;
    tripcom: string;
    transport: string;
    esim: string;
    getYourGuide: string;
    klook: string;
  };
  seo: {
    siteUrl: string;
    ogImage: string;
    twitterHandle: string;
    googleAnalyticsId: string;
    indexNowKey: string;
  };
  contentTypes: {
    cities: boolean;
    islands: boolean;
    food: boolean;
    drinks: boolean;
    transport: boolean;
    visa: boolean;
    regions: boolean;
    weather: boolean;
    blog: boolean;
    comparisons: boolean;
    top10: boolean;
    practicalInfo: boolean;
  };
  navigation: {
    mainLinks: Array<{ key: string; href: string }>;
    dropdowns: Array<{
      key: string;
      items: Array<{ key: string; href: string }>;
    }>;
  };
  sisterSites: Array<{
    name: string;
    domain: string;
    destination: string;
  }>;
}

const ALL_SISTER_SITES: SiteConfig['sisterSites'] = [
  { name: 'Go2Thailand', domain: 'go2-thailand.com', destination: 'Thailand' },
  { name: 'Go2Bali', domain: 'go2-bali.com', destination: 'Bali' },
  { name: 'Go2China', domain: 'go2-china.com', destination: 'China' },
  { name: 'Go2France', domain: 'go2-france.com', destination: 'France' },
  { name: 'Go2India', domain: 'go2-india.com', destination: 'India' },
  { name: 'Go2Japan', domain: 'go2-japan.com', destination: 'Japan' },
  { name: 'Go2Mexico', domain: 'go2-mexico.com', destination: 'Mexico' },
  { name: 'Go2Morocco', domain: 'go2-morocco.com', destination: 'Morocco' },
  { name: 'Go2Spain', domain: 'go2-spain.com', destination: 'Spain' },
  { name: 'Go2USA', domain: 'go2-usa.com', destination: 'USA' },
  { name: 'Go2Vietnam', domain: 'go2-vietnam.com', destination: 'Vietnam' },
];

export const siteConfig: SiteConfig = {
  name: 'Go2France',
  domain: 'go2-france.com',
  destination: 'France',
  destinationFull: 'France',
  tagline: 'Your Ultimate France Travel Guide',

  // French tricolore: bleu, blanc, rouge
  colors: {
    primary: {
      DEFAULT: '#002395',
      '50': '#EFF3FF',
      '100': '#DBE4FE',
      '200': '#BFCFFE',
      '300': '#93AEFC',
      '400': '#6083F8',
      '500': '#002395',
      '600': '#001D7A',
      '700': '#001660',
      '800': '#001047',
      '900': '#000B2E',
    },
    secondary: {
      DEFAULT: '#1E1E2E',
      '50': '#F8F8FA',
      '100': '#F0F0F4',
      '200': '#E0E0E8',
      '300': '#CCCCDA',
      '400': '#9999B0',
      '500': '#1E1E2E',
      '600': '#181826',
      '700': '#13131E',
      '800': '#0E0E17',
      '900': '#090910',
    },
    accent: {
      DEFAULT: '#ED2939',
      '50': '#FEF2F3',
      '100': '#FEE2E4',
      '200': '#FECACD',
      '300': '#FCA5AB',
      '400': '#F87179',
      '500': '#ED2939',
      '600': '#DC1E2E',
      '700': '#B91826',
      '800': '#99151F',
      '900': '#7F1219',
    },
  },

  locales: ['en', 'fr', 'nl', 'de', 'es', 'it', 'zh', 'ja'],
  defaultLocale: 'en',

  affiliateLinks: {
    booking: 'https://booking.tpo.lv/2PT1kR82',
    tripcom: 'https://trip.tpo.lv/TmObooZ5',
    transport: 'https://12go.tpo.lv/tNA80urD',
    esim: 'https://saily.tpo.lv/rf9lidnE',
    getYourGuide: 'https://getyourguide.tpo.lv/6HngJ5FC',
    klook: 'https://klook.tpo.lv/7Dt6WApj',
  },

  seo: {
    siteUrl: 'https://go2-france.com',
    ogImage: '/images/og-default.jpg',
    twitterHandle: 'go2france',
    googleAnalyticsId: '',
    indexNowKey: '',
  },

  contentTypes: {
    cities: true,
    islands: false,
    food: true,
    drinks: true,
    transport: true,
    visa: true,
    regions: true,
    weather: true,
    blog: true,
    comparisons: true,
    top10: true,
    practicalInfo: true,
  },

  navigation: {
    mainLinks: [
      { key: 'nav.home', href: '/' },
      { key: 'nav.cities', href: '/city/' },
      { key: 'nav.transport', href: '/transport/' },
      { key: 'nav.visa', href: '/visa/' },
      { key: 'nav.blog', href: '/blog/' },
    ],
    dropdowns: [
      {
        key: 'nav.foodDrinks',
        items: [
          { key: 'nav.food', href: '/food/' },
          { key: 'nav.drinks', href: '/drinks/' },
        ],
      },
      {
        key: 'nav.explore',
        items: [
          { key: 'nav.regions', href: '/region/' },
          { key: 'nav.weather', href: '/weather/' },
          { key: 'nav.top10', href: '/top-10/' },
          { key: 'nav.practicalInfo', href: '/practical-info/' },
        ],
      },
    ],
  },

  sisterSites: ALL_SISTER_SITES,
};

export function getSisterSiteUrl(destination: string): string | undefined {
  const site = ALL_SISTER_SITES.find(
    (s) => s.destination.toLowerCase() === destination.toLowerCase()
  );
  return site ? `https://${site.domain}` : undefined;
}

export function getOtherSisterSites(): SiteConfig['sisterSites'] {
  return ALL_SISTER_SITES.filter(
    (s) => s.domain !== siteConfig.domain
  );
}

export function getTailwindColors() {
  return {
    primary: siteConfig.colors.primary,
    secondary: siteConfig.colors.secondary,
    accent: siteConfig.colors.accent,
  };
}

export function isContentTypeEnabled(
  type: keyof SiteConfig['contentTypes']
): boolean {
  return siteConfig.contentTypes[type];
}

export function getActiveNavigation() {
  const contentTypeRouteMap: Record<string, keyof SiteConfig['contentTypes']> = {
    '/city/': 'cities',
    '/islands/': 'islands',
    '/food/': 'food',
    '/drinks/': 'drinks',
    '/transport/': 'transport',
    '/visa/': 'visa',
    '/region/': 'regions',
    '/weather/': 'weather',
    '/blog/': 'blog',
    '/top-10/': 'top10',
    '/practical-info/': 'practicalInfo',
    '/compare/': 'comparisons',
  };

  const isRouteActive = (href: string): boolean => {
    const contentType = contentTypeRouteMap[href];
    if (!contentType) return true;
    return siteConfig.contentTypes[contentType];
  };

  return {
    mainLinks: siteConfig.navigation.mainLinks.filter((link) =>
      isRouteActive(link.href)
    ),
    dropdowns: siteConfig.navigation.dropdowns
      .map((dropdown) => ({
        ...dropdown,
        items: dropdown.items.filter((item) => isRouteActive(item.href)),
      }))
      .filter((dropdown) => dropdown.items.length > 0),
  };
}

export default siteConfig;
