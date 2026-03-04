import Head from 'next/head';
import { ReactNode } from 'react';
import { siteConfig } from '../site.config';

interface SEOHeadProps {
  title: string;
  description: string;
  ogImage?: string;
  children?: ReactNode;
}

/**
 * SEOHead - Wraps Next.js Head with automatic OG + Twitter meta tags.
 * Title and description are mirrored to og:title, og:description,
 * twitter:title, and twitter:description.
 *
 * The global Hreflang component (in _app.tsx) already provides:
 * - og:url, og:site_name, og:type, og:locale, og:image (default)
 * - twitter:card, twitter:site, twitter:image (default)
 * - canonical, hreflang tags
 *
 * Pages can override og:image/twitter:image via the ogImage prop
 * or by adding their own meta tags in children.
 */
export default function SEOHead({ title, description, ogImage, children }: SEOHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage} />
          <meta name="twitter:image" content={ogImage} />
        </>
      )}
      <link rel="alternate" type="application/rss+xml" title={`${siteConfig.name} Blog RSS Feed`} href={`${siteConfig.seo.siteUrl}/feed.xml`} />
      {children}
    </Head>
  );
}
