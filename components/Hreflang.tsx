import Head from 'next/head';
import { useRouter } from 'next/router';
import { siteConfig } from '../site.config';

const SITE_URL = siteConfig.seo.siteUrl;

// Map Next.js locale codes to hreflang language codes
const LOCALE_TO_HREFLANG: Record<string, string> = {
  en: 'en',
  fr: 'fr',
  nl: 'nl',
  de: 'de',
  es: 'es',
  it: 'it',
  zh: 'zh-Hans',
  ja: 'ja',
};

export default function Hreflang() {
  const { asPath, locales, locale: currentLocale } = useRouter();

  if (!locales) return null;

  // Remove query string and hash from path
  const cleanPath = asPath.split('?')[0].split('#')[0];

  // Determine active locales based on page type
  const isComparePage = cleanPath.startsWith('/compare/') && cleanPath !== '/compare/';
  const isTransportRoute = cleanPath.startsWith('/transport/') && cleanPath !== '/transport/';

  let activeLocales = locales;
  if (isComparePage) {
    activeLocales = locales.filter(l => l === 'en' || l === 'fr');
  } else if (isTransportRoute) {
    activeLocales = locales.filter(l => l === 'en');
  }

  const canonicalUrl =
    currentLocale === 'en'
      ? `${SITE_URL}${cleanPath}`
      : `${SITE_URL}/${currentLocale}${cleanPath}`;

  return (
    <Head>
      {activeLocales.map((locale) => {
        const hreflang = LOCALE_TO_HREFLANG[locale] || locale;
        const href =
          locale === 'en'
            ? `${SITE_URL}${cleanPath}`
            : `${SITE_URL}/${locale}${cleanPath}`;

        return (
          <link
            key={locale}
            rel="alternate"
            hrefLang={hreflang}
            href={href}
          />
        );
      })}
      {/* x-default points to the English (default) version */}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${cleanPath}`} />
      {/* Canonical always points to current locale version */}
      <link key="canonical" rel="canonical" href={canonicalUrl} />
      {/* Open Graph defaults - pages can override these with their own Head tags */}
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${SITE_URL}/og-default.webp`} />
      <meta property="og:locale" content={currentLocale === 'en' ? 'en_US' : currentLocale} />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${siteConfig.seo.twitterHandle}`} />
      <meta name="twitter:image" content={`${SITE_URL}/og-default.webp`} />
    </Head>
  );
}
