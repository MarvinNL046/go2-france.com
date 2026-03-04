import { GetStaticProps, GetStaticPaths } from 'next';
import SEOHead from '../../components/SEOHead';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import CityCard from '../../components/CityCard';
import { getAllCities, toAbsoluteImageUrl } from '../../lib/cities';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { resolveI18n } from '../../utils/i18n';

interface Region {
  id: number;
  slug: string;
  name: {
    en: string;
    nl: string;
  };
  description: {
    en: string;
    nl: string;
  };
  highlights: string[];
  cities: string[];
  climate: string;
  bestTimeToVisit: string;
  image: string;
  geography?: string;
  culture?: string;
  cuisine?: string;
  transportation?: string;
  budgetInfo?: string;
  topActivities?: string[];
  hiddenGems?: string[];
  localFestivals?: string[];
  travelTips?: string[];
  whatToPack?: string[];
  statistics?: {
    area?: string;
    population?: string;
    provinces?: string;
    coastline?: string;
    highestPeak?: string;
    majorCity?: string;
  };
  categories?: {
    attractions?: {
      en: string;
      nl: string;
    };
    cities?: {
      en: string;
      nl: string;
    };
    climate?: {
      en: string;
      nl: string;
    };
  };
  tags?: string[];
  seo: {
    metaTitle: {
      en: string;
      nl: string;
    };
    metaDescription: {
      en: string;
      nl: string;
    };
  };
}

interface City {
  id?: number;
  slug: string;
  name: {
    en: string;
    nl?: string;
  };
  region: string;
  province?: string;
  image: string;
  highlights: any[];
  description?: any;
}

interface RegionPageProps {
  region: Region;
  cities: City[];
}

export default function RegionPage({ region, cities }: RegionPageProps) {
  const contentAnim = useScrollAnimation(0.05);
  const tipsAnim = useScrollAnimation(0.1);
  const planAnim = useScrollAnimation(0.1);
  const exploreAnim = useScrollAnimation(0.1);

  if (!region) {
    return <div>Region not found</div>;
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Regions', href: '/region/' },
    { name: region.name.en, href: `/region/${region.slug}/` }
  ];

  return (
    <>
      <SEOHead
        title={typeof region.seo.metaTitle === 'object' ? region.seo.metaTitle.en : region.seo.metaTitle}
        description={(typeof region.seo.metaDescription === 'object' ? region.seo.metaDescription.en : region.seo.metaDescription) || region.description.en}
        ogImage={toAbsoluteImageUrl(region.image)}
      >
        <meta name="keywords" content={`${region.name.en}, France, ${region.cities.join(', ')}, travel guide, attractions, culture`} />
        <meta property="og:type" content="website" />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="relative h-96 lg:h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={region.image}
              alt={`${region.name.en}, France`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </div>

          <div className="relative z-10 h-full flex items-end">
            <div className="container-custom pb-12 text-white">
              <div className="max-w-4xl">
                <div className="flex items-center mb-4">
                  <span className="bg-france-red text-white px-3 py-1 rounded-xl text-sm font-semibold mr-3">
                    {cities.length} Cities
                  </span>
                  <span className="text-gray-200 text-sm">
                    Best time: {region.bestTimeToVisit}
                  </span>
                </div>
                <span className="font-script text-france-red text-lg">Explore the region</span>
                <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-4">
                  {region.name.en}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl">
                  {region.description.en}
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Content */}
        <section className="bg-surface-cream" ref={contentAnim.ref}>
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Region Overview */}
                <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                    About {region.name.en}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {region.description.en}
                    </p>

                    <div className="grid grid-cols-2 gap-6 my-8 p-6 bg-white rounded-2xl shadow-sm">
                      <div>
                        <h4 className="font-semibold font-heading text-gray-900 mb-2">Cities</h4>
                        <p className="text-2xl font-bold text-france-blue">
                          {cities.length}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold font-heading text-gray-900 mb-2">Best Time</h4>
                        <p className="text-lg font-medium text-france-blue">
                          {region.bestTimeToVisit}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Geography & Culture */}
                {(region.geography || region.culture) && (
                  <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                      Geography & Culture
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {region.geography && (
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                              </svg>
                            </div>
                            <h3 className="text-lg font-semibold font-heading">Geography</h3>
                          </div>
                          <p className="text-gray-700">{resolveI18n(region.geography)}</p>
                        </div>
                      )}
                      {region.culture && (
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-france-red rounded-xl flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                            <h3 className="text-lg font-semibold font-heading">Culture</h3>
                          </div>
                          <p className="text-gray-700">{resolveI18n(region.culture)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Cuisine */}
                {region.cuisine && (
                  <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                      Regional Cuisine
                    </h2>
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                      <p className="text-gray-700">{resolveI18n(region.cuisine)}</p>
                    </div>
                  </div>
                )}

                {/* Top Activities */}
                {region.topActivities && region.topActivities.length > 0 && (
                  <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                      Top Activities
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {region.topActivities.map((activity, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-4 flex items-start">
                          <span className="bg-france-blue text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                            {index + 1}
                          </span>
                          <p className="text-gray-700">{resolveI18n(activity)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cities in this Region */}
                {cities.length > 0 && (
                  <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                      Cities in {region.name.en}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {cities.map((city) => (
                        <CityCard key={city.id} city={city} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Hidden Gems */}
                {region.hiddenGems && region.hiddenGems.length > 0 && (
                  <div className={`mb-12 scroll-fade-up ${contentAnim.isVisible ? 'is-visible' : ''}`}>
                    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
                      Hidden Gems
                    </h2>
                    <div className="space-y-3">
                      {region.hiddenGems.map((gem, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-4 flex items-start">
                          <span className="text-france-gold mr-3 text-xl">&#9733;</span>
                          <p className="text-gray-700">{resolveI18n(gem)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside>
                <div className="lg:sticky lg:top-4 space-y-6">
                  {/* Quick Stats */}
                  {region.statistics && (
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-4">Quick Facts</h3>
                      <dl className="space-y-3">
                        {region.statistics.area && (
                          <div className="flex justify-between">
                            <dt className="text-gray-500 text-sm">Area</dt>
                            <dd className="font-medium text-sm">{region.statistics.area}</dd>
                          </div>
                        )}
                        {region.statistics.population && (
                          <div className="flex justify-between">
                            <dt className="text-gray-500 text-sm">Population</dt>
                            <dd className="font-medium text-sm">{region.statistics.population}</dd>
                          </div>
                        )}
                        {region.statistics.majorCity && (
                          <div className="flex justify-between">
                            <dt className="text-gray-500 text-sm">Major City</dt>
                            <dd className="font-medium text-sm">{region.statistics.majorCity}</dd>
                          </div>
                        )}
                        {region.statistics.provinces && (
                          <div className="flex justify-between">
                            <dt className="text-gray-500 text-sm">Departments</dt>
                            <dd className="font-medium text-sm">{region.statistics.provinces}</dd>
                          </div>
                        )}
                        {region.statistics.highestPeak && (
                          <div className="flex justify-between">
                            <dt className="text-gray-500 text-sm">Highest Peak</dt>
                            <dd className="font-medium text-sm">{region.statistics.highestPeak}</dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  )}

                  {/* Highlights */}
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="text-lg font-bold font-heading text-gray-900 mb-4">Highlights</h3>
                    <ul className="space-y-2">
                      {region.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <svg className="w-4 h-4 text-france-blue mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {resolveI18n(highlight)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Travel Tips */}
                  {region.travelTips && region.travelTips.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-4">Travel Tips</h3>
                      <ul className="space-y-2">
                        {region.travelTips.map((tip, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="text-france-gold mr-2">&#8226;</span>
                            <span className="text-gray-700">{resolveI18n(tip)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* What to Pack */}
                  {region.whatToPack && region.whatToPack.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-4">What to Pack</h3>
                      <ul className="space-y-2">
                        {region.whatToPack.map((item, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="text-france-blue mr-2">&#8226;</span>
                            <span className="text-gray-700">{resolveI18n(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Book Hotels */}
                  <div className="bg-surface-dark text-white rounded-2xl p-6">
                    <h3 className="text-lg font-bold font-heading mb-3">Book Hotels in {region.name.en}</h3>
                    <p className="text-sm opacity-90 mb-4">Find the best deals on accommodation in {region.name.en}.</p>
                    <div className="space-y-3">
                      <a
                        href="https://booking.tpo.lv/2PT1kR82"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white text-france-blue text-center px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm"
                      >
                        Booking.com
                      </a>
                      <a
                        href="https://trip.tpo.lv/TmObooZ5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white text-france-blue text-center px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm"
                      >
                        Trip.com
                      </a>
                    </div>
                    <p className="text-xs opacity-70 mt-3 text-center">Affiliate links</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Explore More */}
        <section className="bg-surface-dark text-white section-padding" ref={exploreAnim.ref}>
          <div className="container-custom text-center">
            <span className="font-script text-france-gold text-lg">Keep exploring</span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6 mt-2">
              Discover More of France
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Continue your French adventure with more regions, cities, and experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/region/" className="bg-france-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors">
                All Regions
              </Link>
              <Link href="/city/" className="bg-white bg-opacity-20 text-white border-2 border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-france-blue transition-colors">
                Explore Cities
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fs = require('fs');
  const path = require('path');

  const regionsIndexPath = path.join(process.cwd(), 'data', 'regions', 'index.json');
  const regions = JSON.parse(fs.readFileSync(regionsIndexPath, 'utf8'));

  const paths = regions.map((region: Region) => ({
    params: { slug: region.slug }
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fs = require('fs');
  const path = require('path');
  const slug = params?.slug as string;

  // Try to load individual region file
  const regionFilePath = path.join(process.cwd(), 'data', 'regions', `${slug}.json`);

  let region: Region | null = null;

  if (fs.existsSync(regionFilePath)) {
    region = JSON.parse(fs.readFileSync(regionFilePath, 'utf8'));
  } else {
    // Fall back to index.json
    const regionsIndexPath = path.join(process.cwd(), 'data', 'regions', 'index.json');
    const regions = JSON.parse(fs.readFileSync(regionsIndexPath, 'utf8'));
    region = regions.find((r: Region) => r.slug === slug) || null;
  }

  if (!region) {
    return { notFound: true };
  }

  // Get cities in this region
  const allCities = getAllCities();
  const regionCities = allCities.filter(
    (city: City) => city.region === region!.name.en
  );

  return {
    props: {
      region,
      cities: regionCities,
    },
  };
};
