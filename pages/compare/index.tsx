import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllComparisons } from '../../lib/comparisons';
import { siteConfig } from '../../site.config';

interface Comparison {
  slug: string;
  item1: string;
  item2: string;
  type: string;
  name1: { en: string };
  name2: { en: string };
  popular?: boolean;
}

interface CompareIndexProps {
  comparisons: Comparison[];
  popularComparisons: Comparison[];
}

export default function CompareIndexPage({ comparisons, popularComparisons }: CompareIndexProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Compare', href: '/compare/' },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "France City Comparisons 2026",
    "description": `Compare ${comparisons.length} French destinations side by side to help you choose the perfect city for your trip.`,
    "url": `${siteConfig.seo.siteUrl}/compare/`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `${siteConfig.seo.siteUrl}${crumb.href}`,
      })),
    },
  };

  return (
    <>
      <SEOHead
        title={`France City Comparisons 2026 | ${siteConfig.name}`}
        description={`Compare French cities side by side. Paris vs Lyon, Nice vs Marseille, and ${comparisons.length} more detailed comparisons to help you choose the right destination.`}
      >
        <meta name="keywords" content="France comparisons, Paris vs Lyon, Nice vs Marseille, French cities comparison, France travel planning" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white py-16">
          <div className="container-custom text-center">
            <span className="font-script text-france-gold text-lg mb-2 block">Choose Your Destination</span>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4">
              France Destination Comparisons
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto mb-3">
              Compare {comparisons.length} French destinations side by side
            </p>
            <p className="text-lg opacity-75 max-w-2xl mx-auto">
              Cities compared on culture, gastronomy, nightlife, budget, weather, and more -- so you can pick the right destination for your trip.
            </p>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="container-custom py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Popular Comparisons */}
        {popularComparisons.length > 0 && (
          <section className="py-12">
            <div className="container-custom">
              <div className="mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2">Popular Comparisons</h2>
                <p className="text-gray-600">The most searched France destination comparisons</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {popularComparisons.map((comparison) => (
                  <Link
                    key={comparison.slug}
                    href={`/compare/${comparison.slug}/`}
                    className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border-l-4 border-france-red"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg text-gray-900">{comparison.name1.en}</span>
                      <span className="text-gray-400 font-bold mx-4 text-sm uppercase tracking-widest">VS</span>
                      <span className="font-bold text-lg text-gray-900">{comparison.name2.en}</span>
                    </div>
                    <div className="mt-2">
                      <span className="inline-block text-xs font-medium text-france-blue bg-surface-cream px-2 py-1 rounded-full capitalize">
                        {comparison.type} comparison
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Comparisons */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="mb-8">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2">All City Comparisons</h2>
              <p className="text-gray-600">{comparisons.length} city-to-city comparisons</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {comparisons.map((comparison) => (
                <Link
                  key={comparison.slug}
                  href={`/compare/${comparison.slug}/`}
                  className="block bg-surface-cream rounded-2xl shadow-sm hover:shadow-md hover:bg-white transition-all p-4"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900 truncate">{comparison.name1.en}</span>
                    <span className="text-gray-400 text-xs mx-2 flex-shrink-0">vs</span>
                    <span className="font-medium text-gray-900 truncate text-right">{comparison.name2.en}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
              How to Choose Your French Destination
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Choosing between France's many incredible destinations can be challenging. Each city offers a unique character -- from the artistic energy of Paris and the gastronomic traditions of Lyon to the Mediterranean glamour of Nice and the wine heritage of Bordeaux. Our side-by-side comparisons help you understand the key differences so you can choose the destination that best matches your travel style, interests, and budget.
              </p>
              <h3 className="text-xl font-semibold font-heading text-gray-900 mt-6 mb-3">City vs City</h3>
              <p>
                France's cities each have a distinct personality. Paris offers world-class museums and iconic architecture. Lyon is the undisputed gastronomic capital. Marseille brings Mediterranean energy and cultural diversity. Nice combines seaside relaxation with Belle Epoque elegance. Bordeaux pairs stunning 18th-century architecture with world-famous wine. Our comparisons cover food scene, cost of living, cultural attractions, nightlife, weather, and practical considerations like transport connections.
              </p>
            </div>
          </div>
        </section>

        {/* Affiliate Banner */}
        <section className="bg-surface-dark">
          <div className="container-custom py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold font-heading mb-1">Ready to Book Your Trip?</h2>
                <p className="opacity-90 text-sm">Find the best deals on hotels, transport, and tours in France</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={siteConfig.affiliateLinks.booking} target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Booking.com</a>
                <a href={siteConfig.affiliateLinks.tripcom} target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Trip.com</a>
                <a href={siteConfig.affiliateLinks.klook} target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Tours & Activities</a>
                <a href={siteConfig.affiliateLinks.esim} target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">eSIM</a>
              </div>
            </div>
            <p className="text-white/70 text-xs text-center mt-4">
              Some links are affiliate links. We may earn a commission at no extra cost to you.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = getAllComparisons();

  // Handle both array and object formats from the comparisons lib
  let comparisons: Comparison[] = [];
  let popularSlugs: string[] = [];

  if (Array.isArray(data)) {
    comparisons = data;
    popularSlugs = data.filter((c: any) => c.popular).map((c: any) => c.slug);
  } else if (data && data.comparisons) {
    comparisons = data.comparisons;
    popularSlugs = data.popular || [];
  }

  const popularComparisons = popularSlugs
    .map((slug: string) => comparisons.find((c: Comparison) => c.slug === slug))
    .filter((c: Comparison | undefined): c is Comparison => c !== undefined);

  return {
    props: {
      comparisons,
      popularComparisons,
    },
  };
};
