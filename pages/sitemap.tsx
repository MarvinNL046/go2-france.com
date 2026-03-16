import { GetStaticProps } from 'next';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import Link from 'next/link';
import { siteConfig } from '../site.config';

const sitemapSections = [
  {
    title: 'Main Pages',
    links: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about/' },
      { name: 'Contact', href: '/contact/' },
      { name: 'Blog', href: '/blog/' },
    ],
  },
  {
    title: 'Destinations',
    links: [
      { name: 'Cities', href: '/city/' },
      { name: 'Regions', href: '/region/' },
      { name: 'Compare Destinations', href: '/compare/' },
    ],
  },
  {
    title: 'Travel Planning',
    links: [
      { name: 'Visa Information', href: '/visa/' },
      { name: 'eSIM', href: '/esim/' },
      { name: 'Transport', href: '/transport/' },
      { name: 'Travel Insurance', href: '/travel-insurance/' },
      { name: 'Weather', href: '/weather/' },
      { name: 'Practical Info', href: '/practical-info/' },
      { name: 'Itineraries', href: '/itineraries/' },
      { name: 'Experiences', href: '/experiences/' },
      { name: 'Top 10', href: '/top-10/' },
    ],
  },
  {
    title: 'Food & Drink',
    links: [
      { name: 'Food Guide', href: '/food/' },
      { name: 'Food Categories', href: '/food/category/' },
      { name: 'Drinks Guide', href: '/drinks/' },
      { name: 'Drinks Categories', href: '/drinks/category/' },
    ],
  },
  {
    title: 'About Us',
    links: [
      { name: 'Editorial Policy', href: '/editorial-policy/' },
      { name: 'How We Research', href: '/how-we-research/' },
      { name: 'Affiliate Disclosure', href: '/affiliate-disclosure/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy/' },
      { name: 'Terms of Use', href: '/terms/' },
      { name: 'Cookie Policy', href: '/cookie-policy/' },
    ],
  },
];

export default function Sitemap() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Sitemap', href: '/sitemap/' },
  ];

  return (
    <>
      <SEOHead
        title={`Sitemap | ${siteConfig.name}`}
        description={`Complete sitemap of ${siteConfig.domain}. Find all pages and sections of our France travel guide.`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: `Sitemap - ${siteConfig.name}`,
              description: `Complete sitemap of ${siteConfig.domain}. Find all pages and sections of our France travel guide.`,
              url: `https://${siteConfig.domain}/sitemap/`,
              publisher: {
                '@type': 'Organization',
                name: siteConfig.name,
                url: `https://${siteConfig.domain}`,
              },
            }),
          }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <div className="text-center max-w-4xl mx-auto">
              <span className="font-script text-france-gold text-lg mb-2 block">Navigate</span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                Sitemap
              </h1>
              <p className="text-xl lg:text-2xl mb-4 opacity-90">
                Find all pages and sections of our France travel guide
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="container-custom py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sitemapSections.map((section) => (
                  <div key={section.title} className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-lg font-bold font-heading text-gray-900 mb-4 border-b border-gray-100 pb-3">
                      {section.title}
                    </h2>
                    <ul className="space-y-2">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-france-blue hover:underline"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
