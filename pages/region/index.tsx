import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

const { getAllRegions } = require('../../lib/regions');

interface Region {
  slug: string;
  name: string | { en: string; fr?: string };
  image?: string;
  description?: string | { en: string; fr?: string };
  highlights?: (string | { en: string })[];
  cities?: string[];
}

interface RegionsIndexProps {
  regions: Region[];
}

export default function RegionsIndex({ regions }: RegionsIndexProps) {
  const router = useRouter();
  const locale = router.locale || 'en';
  const { t } = useTranslation('common');

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Regions', href: '/region/' }
  ];

  return (
    <>
      <SEOHead
        title={`French Regions Travel Guide - Explore All Regions | ${siteConfig.name}`}
        description="Discover the diverse regions of France. From the vineyards of Bordeaux to the lavender fields of Provence, explore each region's unique character, cities and attractions."
      >
        <meta name="keywords" content="French regions, France travel guide, Provence, Brittany, Normandy, Alsace, Loire Valley, French regions guide" />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        {/* Hero Section */}
        <section className="relative bg-surface-dark py-20">
          <div className="relative container-custom text-center text-white">
            <p className="font-script text-france-gold mb-2">Explore France</p>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
              Regions of France
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              France is a mosaic of diverse regions, each with its own culture, cuisine, landscapes and traditions. Discover your perfect French destination.
            </p>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white py-4">
          <div className="container-custom">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Regions Grid */}
        <section className="py-12">
          <div className="container-custom">
            {regions.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg font-medium mb-2">Content coming soon!</p>
                <p className="text-gray-400 text-sm">We are working on adding detailed region guides.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regions.map((region) => {
                  const regionName = typeof region.name === 'object'
                    ? ((region.name as any)[locale] || region.name.en)
                    : (region.name || region.slug);
                  const regionDesc = typeof region.description === 'object'
                    ? ((region.description as any)[locale] || region.description.en)
                    : region.description;

                  return (
                    <Link key={region.slug} href={`/region/${region.slug}/`} className="group">
                      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="relative h-56">
                          {region.image ? (
                            <Image
                              src={region.image}
                              alt={regionName}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-france-blue to-france-red flex items-center justify-center">
                              <span className="text-white text-4xl font-heading font-bold">{regionName.charAt(0)}</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h2 className="text-2xl font-heading font-bold text-white">
                              {regionName}
                            </h2>
                          </div>
                        </div>
                        <div className="p-6">
                          {regionDesc && (
                            <p className="text-gray-600 mb-4 line-clamp-2">{regionDesc}</p>
                          )}
                          {region.highlights && region.highlights.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {region.highlights.slice(0, 3).map((highlight, index) => (
                                <span key={index} className="bg-france-blue/10 text-france-blue px-2 py-1 rounded-full text-xs font-medium">
                                  {typeof highlight === 'object' ? ((highlight as any)[locale] || (highlight as any).en) : highlight}
                                </span>
                              ))}
                            </div>
                          )}
                          {region.cities && region.cities.length > 0 && (
                            <p className="text-sm text-gray-500">
                              {region.cities.length} {region.cities.length === 1 ? 'city' : 'cities'} to explore
                            </p>
                          )}
                          <div className="mt-4">
                            <span className="text-france-blue font-medium group-hover:text-france-red transition-colors">
                              Explore {regionName} &rarr;
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* About French Regions */}
        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p className="section-label font-script text-france-gold">About</p>
              <h2 className="text-3xl font-heading font-bold mb-4">About French Regions</h2>
              <p className="text-gray-600 mb-8">
                Metropolitan France is divided into 13 administrative regions, each with a distinct identity shaped by geography,
                history and culture. From the sun-drenched south to the rugged Atlantic coast and the alpine east,
                every region offers unique experiences for travelers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <h3 className="font-heading font-semibold mb-2">Diverse Landscapes</h3>
                  <p className="text-sm text-gray-600">Mountains, coastlines, vineyards, forests and rolling countryside</p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <h3 className="font-heading font-semibold mb-2">Regional Cuisine</h3>
                  <p className="text-sm text-gray-600">Each region has its own distinctive culinary traditions and specialties</p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <h3 className="font-heading font-semibold mb-2">Rich Heritage</h3>
                  <p className="text-sm text-gray-600">Castles, churches, museums and historic towns throughout the country</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Affiliate Banner */}
        <section className="bg-surface-dark py-8">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold font-heading mb-1">Plan Your France Trip</h2>
                <p className="opacity-90 text-sm">Book hotels, transport, activities, and get connected with an eSIM</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={siteConfig.affiliateLinks.booking} target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Booking.com</a>
                <a href={siteConfig.affiliateLinks.getYourGuide} target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Activities</a>
                <a href={siteConfig.affiliateLinks.transport} target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Transport</a>
                <a href={siteConfig.affiliateLinks.esim} target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">eSIM</a>
              </div>
            </div>
            <p className="text-white/70 text-xs text-center mt-4">Some links are affiliate links. We may earn a commission at no extra cost to you.</p>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const regions = getAllRegions();
  return {
    props: { regions }
  };
};
