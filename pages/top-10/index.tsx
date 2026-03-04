import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllCities } from '../../lib/cities';
import { siteConfig } from '../../site.config';

interface Top10IndexProps {
  totalGuides: {
    attractions: number;
    restaurants: number;
    hotels: number;
  };
  cityCount: number;
}

export default function Top10Index({ totalGuides, cityCount }: Top10IndexProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Top 10 Guides', href: '/top-10/' },
  ];

  const categories = [
    {
      slug: 'restaurants',
      title: 'Top 10 Restaurants',
      description: 'Discover the finest dining experiences and local culinary gems across France',
      count: totalGuides.restaurants,
      color: 'bg-france-red',
      hoverColor: 'hover:bg-france-red-600',
    },
    {
      slug: 'hotels',
      title: 'Top 10 Hotels',
      description: 'Find the best accommodation options for every budget and travel style',
      count: totalGuides.hotels,
      color: 'bg-france-blue',
      hoverColor: 'hover:bg-france-blue-600',
    },
    {
      slug: 'attractions',
      title: 'Top 10 Attractions',
      description: 'Explore the must-see landmarks, museums, and cultural treasures in each city',
      count: totalGuides.attractions,
      color: 'bg-france-gold',
      hoverColor: 'hover:bg-france-gold-600',
    },
  ];

  return (
    <>
      <SEOHead
        title={`Top 10 France Guides 2026 | ${siteConfig.name}`}
        description="Comprehensive Top 10 guides for France's best restaurants, hotels, and attractions. Current prices, opening hours, and insider tips for every major French destination."
      >
        <meta name="keywords" content="France top 10, best restaurants France, top hotels France, best attractions France, France travel guides" />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <div className="text-center max-w-4xl mx-auto">
              <span className="font-script text-france-gold text-lg mb-2 block">Curated Guides</span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                Top 10 Guides
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                Discover France's best restaurants, hotels, and attractions with our comprehensive Top 10 guides. Current prices, hours, and insider tips included.
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

        {/* Categories Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {categories.map((category) => (
                <Link key={category.slug} href={`/top-10/${category.slug}/`}>
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className="bg-surface-dark transition-all duration-300 p-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-sm font-semibold">{category.count} Guides</span>
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold font-heading mb-2">{category.title}</h2>
                      <p className="text-white text-opacity-90">{category.description}</p>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between text-gray-600">
                        <span className="text-sm">View all guides</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* What Makes Our Guides Special */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6 text-center">
                What Makes Our Top 10 Guides Special?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-surface-cream rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-france-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold font-heading text-gray-900 mb-2">Current Information</h3>
                  <p className="text-gray-600 text-sm">Up-to-date prices, hours, and contact details verified against official sources</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-surface-cream rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-france-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold font-heading text-gray-900 mb-2">Locally Verified</h3>
                  <p className="text-gray-600 text-sm">Recommendations tested and verified by local experts and residents</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-surface-cream rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-france-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold font-heading text-gray-900 mb-2">Insider Tips</h3>
                  <p className="text-gray-600 text-sm">Hidden gems and local secrets beyond the typical tourist recommendations</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-surface-cream rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-france-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold font-heading text-gray-900 mb-2">City Specific</h3>
                  <p className="text-gray-600 text-sm">Tailored guides for each French destination, not generic lists</p>
                </div>
              </div>
            </div>

            {/* Popular Destinations */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6 text-center">
                Popular Destination Guides
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {['Paris', 'Lyon', 'Marseille', 'Nice', 'Bordeaux', 'Strasbourg', 'Toulouse', 'Lille', 'Nantes', 'Montpellier'].map((city) => (
                  <Link key={city} href={`/city/${city.toLowerCase()}/`}>
                    <div className="bg-surface-cream hover:bg-white rounded-2xl shadow-sm p-4 text-center transition-colors cursor-pointer">
                      <h3 className="font-medium text-gray-900 text-sm">{city}</h3>
                      <p className="text-gray-500 text-xs mt-1">View guides</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Book Your France Experience - Affiliate Section */}
            <div className="bg-surface-dark rounded-2xl p-8">
              <h2 className="text-3xl font-bold font-heading text-white mb-4 text-center">
                Book Your France Experience
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto text-center mb-8">
                Ready to experience the best of France? Book hotels, tours, and activities now.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <a
                  href={siteConfig.affiliateLinks.tripcom}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-4 bg-france-red text-white font-semibold rounded-xl hover:bg-france-red-600 transition-colors shadow-lg hover:shadow-xl text-center"
                >
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Search Hotels on Trip.com
                </a>

                <a
                  href={siteConfig.affiliateLinks.klook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-4 bg-france-blue text-white font-semibold rounded-xl hover:bg-france-blue-600 transition-colors shadow-lg hover:shadow-xl text-center"
                >
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  Book Activities on Klook
                </a>

                <a
                  href={siteConfig.affiliateLinks.getYourGuide}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl text-center"
                >
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Tours on GetYourGuide
                </a>
              </div>

              <p className="text-xs text-gray-400 text-center mt-6">
                Affiliate disclosure: We may earn a commission when you book through our partner links, at no extra cost to you.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fs = require('fs');
  const path = require('path');

  const cities = getAllCities();

  const totalGuides = {
    attractions: 0,
    restaurants: 0,
    hotels: 0,
  };

  try {
    const top10Dir = path.join(process.cwd(), 'data', 'top10');
    if (fs.existsSync(top10Dir)) {
      const files = fs.readdirSync(top10Dir);
      files.forEach((file: string) => {
        if (file.endsWith('-attractions.json')) totalGuides.attractions++;
        if (file.endsWith('-restaurants.json')) totalGuides.restaurants++;
        if (file.endsWith('-hotels.json')) totalGuides.hotels++;
      });
    }
  } catch (error) {
    // Could not count top10 guides
  }

  return {
    props: {
      totalGuides,
      cityCount: cities.length,
    },
  };
};
