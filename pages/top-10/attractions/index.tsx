import { GetStaticProps } from 'next';
import SEOHead from '../../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { getAllCities } from '../../../lib/cities';
import { siteConfig } from '../../../site.config';
import fs from 'fs';
import path from 'path';

interface City {
  slug: string;
  name: { en: string };
  region: string;
  image: string;
}

interface Top10Guide {
  city: City;
  title: string;
  meta_description: string;
  last_updated?: string;
  item_count: number;
  has_current_data: boolean;
}

interface Top10AttractionsIndexProps {
  availableGuides: Top10Guide[];
}

export default function Top10AttractionsIndex({ availableGuides }: Top10AttractionsIndexProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Top 10 Guides', href: '/top-10/' },
    { name: 'Attractions', href: '/top-10/attractions/' },
  ];

  return (
    <>
      <SEOHead
        title={`Top 10 Attraction Guides | Must-See Places in France | ${siteConfig.name}`}
        description="Discover France's must-see attractions with our comprehensive Top 10 guides. Current entrance fees, opening hours, and visitor tips for Paris, Lyon, Nice, and more."
      >
        <meta name="keywords" content="France attractions, top 10 attractions, sightseeing France, Eiffel Tower, Louvre, Versailles, French museums, France tourism" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Top 10 Attraction Guides France",
              "description": "Comprehensive attraction guides for France's top destinations",
              "publisher": { "@type": "Organization", "name": siteConfig.name },
              "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": availableGuides.length,
                "itemListElement": availableGuides.map((guide, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "url": `${siteConfig.seo.siteUrl}/city/${guide.city.slug}/top-10-attractions/`,
                  "name": guide.title,
                })),
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
              <span className="font-script text-france-gold text-lg mb-2 block">Curated Guides</span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                Top 10 Attraction Guides
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                Discover France's must-see places. Current entrance fees, opening hours, and insider visitor tips.
              </p>
              <div className="flex justify-center items-center gap-4 text-sm flex-wrap">
                <span className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full font-medium">Current Info</span>
                <span className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full font-medium">Expert Curated</span>
                <span className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full font-medium">Updated Prices</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="container-custom py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Stats */}
        <section className="bg-surface-dark py-12">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl lg:text-4xl font-bold font-heading text-white mb-2">{availableGuides.length}</div>
                <div className="text-gray-400">City Guides</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold font-heading text-white mb-2">{availableGuides.reduce((sum, g) => sum + g.item_count, 0)}+</div>
                <div className="text-gray-400">Attractions</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold font-heading text-white mb-2">{availableGuides.filter(g => g.has_current_data).length}</div>
                <div className="text-gray-400">With Current Info</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold font-heading text-white mb-2">24/7</div>
                <div className="text-gray-400">Updated Info</div>
              </div>
            </div>
          </div>
        </section>

        {/* Visitor Tips */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold font-heading text-gray-900 mb-4">Smart Visitor Tips</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Make the most of your sightseeing in France</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-surface-cream rounded-2xl p-6">
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Book Online</h3>
                <p className="text-gray-600 text-sm">Major attractions like the Eiffel Tower, Louvre, and Versailles sell out. Book timed-entry tickets online days or weeks in advance.</p>
              </div>
              <div className="bg-surface-cream rounded-2xl p-6">
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Museum Pass</h3>
                <p className="text-gray-600 text-sm">The Paris Museum Pass covers 50+ attractions and lets you skip ticket lines. Worth it if you plan to visit 3+ museums over 2-4 days.</p>
              </div>
              <div className="bg-surface-cream rounded-2xl p-6">
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Free Days</h3>
                <p className="text-gray-600 text-sm">Many French national museums are free on the first Sunday of the month. Arrive early as they get very busy on these days.</p>
              </div>
              <div className="bg-surface-cream rounded-2xl p-6">
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Closed Days</h3>
                <p className="text-gray-600 text-sm">Most French museums close one day per week (usually Monday or Tuesday). Always check specific closing days before your visit.</p>
              </div>
            </div>
          </div>
        </section>

        {/* All Guides */}
        <section className="section-padding bg-surface-cream">
          <div className="container-custom">
            {availableGuides.length > 0 ? (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold font-heading text-gray-900 mb-4">All Attraction Guides</h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">Complete collection of attraction guides across France</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableGuides.map((guide) => (
                    <Link key={guide.city.slug} href={`/city/${guide.city.slug}/top-10-attractions/`} className="group">
                      <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-france-red transition-colors">{guide.city.name.en}</h3>
                            {guide.has_current_data && (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Current Info</span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{guide.city.region}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{guide.item_count} attractions</span>
                            {guide.last_updated && <span>{new Date(guide.last_updated).toLocaleDateString()}</span>}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Attraction Guides Coming Soon</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                  We are currently researching and creating Top 10 attraction guides for France's most visited destinations. Check back soon for comprehensive guides to the Eiffel Tower, Louvre, chateaux, and more.
                </p>
                <Link href="/city/" className="btn-primary">Explore French Cities</Link>
              </div>
            )}
          </div>
        </section>

        {/* Affiliate CTA */}
        <section className="py-12 bg-surface-cream">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold font-heading text-gray-900 mb-3">Book Tickets & Tours in France</h3>
              <p className="text-gray-600 mb-6">Skip the queues and book skip-the-line tickets, guided tours, and unique experiences across France.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                <a href={siteConfig.affiliateLinks.klook} target="_blank" rel="noopener noreferrer" className="inline-block bg-france-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-france-red-600 transition-colors">Book on Klook</a>
                <a href={siteConfig.affiliateLinks.getYourGuide} target="_blank" rel="noopener noreferrer" className="inline-block bg-france-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-france-blue-600 transition-colors">Book on GetYourGuide</a>
              </div>
              <p className="text-xs text-gray-500">We earn a commission at no extra cost to you</p>
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">Explore More Top 10 Guides</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/top-10/restaurants/" className="bg-france-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-france-red-600 transition-colors">Restaurant Guides</Link>
                <Link href="/top-10/hotels/" className="bg-france-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-france-blue-600 transition-colors">Hotel Guides</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const cities = getAllCities();
  const availableGuides: Top10Guide[] = [];

  for (const city of cities) {
    try {
      const dataPath = path.join(process.cwd(), 'data', 'top10', `${city.slug}-attractions.json`);
      if (fs.existsSync(dataPath)) {
        const fileContent = fs.readFileSync(dataPath, 'utf8');
        const data = JSON.parse(fileContent);
        availableGuides.push({
          city,
          title: data.title,
          meta_description: data.meta_description,
          last_updated: data.last_perplexity_update || data.generated_at,
          item_count: data.items?.length || 10,
          has_current_data: !!(data.data_sources && data.data_sources.length > 0),
        });
      }
    } catch (error) {
      // Skip this city
    }
  }

  return { props: { availableGuides } };
};
