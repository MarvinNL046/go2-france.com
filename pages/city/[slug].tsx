import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getCityBySlug, getCityStaticPaths, generateCityMetadata, generateBreadcrumbs, getRelatedCities, getCityImageForSection, getAllCities, toAbsoluteImageUrl } from '../../lib/cities';
import Breadcrumbs from '../../components/Breadcrumbs';
import CityCard from '../../components/CityCard';
import Sidebar from '../../components/Sidebar';
import TripcomWidget from '../../components/TripcomWidget';
import FeedbackForm from '../../components/FeedbackForm';
import SEOHead from '../../components/SEOHead';
import { useEffect, useState } from 'react';
import { useTranslatedContent } from '../../hooks/useTranslatedContent';
import { useRouter } from 'next/router';
import { formatNumber, formatPopulation } from '../../utils/formatNumber';
import AffiliateWidget from '../../components/AffiliateWidget';
import { resolveI18n } from '../../utils/i18n';

interface CityPageProps {
  city: any;
  relatedCities: any[];
}

export default function CityPage({ city, relatedCities }: CityPageProps) {
  const router = useRouter();
  if (!city) return <div>City not found</div>;

  const metadata = generateCityMetadata(city);
  const breadcrumbs = generateBreadcrumbs(city);

  return (
    <>
      <SEOHead
        title={metadata.title}
        description={metadata.description}
        ogImage={city.image?.startsWith('http') ? city.image : `https://go2-france.com${city.image}`}
      >
        <meta name="keywords" content={metadata.keywords} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristDestination",
              "name": city.name.en,
              "description": city.enhanced_description || city.description?.en,
              "image": city.image?.startsWith('http') ? city.image : `https://go2-france.com${city.image}`,
              "url": `https://go2-france.com/city/${city.slug}/`,
              "geo": city.location ? {
                "@type": "GeoCoordinates",
                "latitude": city.location.lat,
                "longitude": city.location.lng
              } : undefined,
              "containedInPlace": {
                "@type": "Country",
                "name": "France"
              }
            })
          }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Breadcrumbs */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-white">
          <div className="container-custom py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
                  {city.name.en}
                </h1>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-france-blue/10 text-france-blue px-3 py-1 rounded-full text-sm font-medium">
                    {city.region}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {city.province}
                  </span>
                </div>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {city.enhanced_description || city.description?.en}
                </p>
                {city.highlights && city.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {city.highlights.map((highlight: any, index: number) => (
                      <span key={index} className="bg-surface-cream text-gray-700 px-3 py-1.5 rounded-full text-sm">
                        {resolveI18n(highlight)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <img
                  src={city.image}
                  alt={city.name.en}
                  className="w-full h-96 object-cover rounded-2xl shadow-md"
                  onError={(e) => { e.currentTarget.src = '/images/placeholder-city.jpg'; }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                {/* Top Attractions */}
                {city.top_attractions && city.top_attractions.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Top Attractions</h2>
                    <div className="space-y-4">
                      {city.top_attractions.map((attraction: any, index: number) => (
                        <div key={index} className="border-l-4 border-france-blue pl-4">
                          <h3 className="font-heading font-semibold text-gray-900">{resolveI18n(attraction.name)}</h3>
                          <p className="text-gray-600 text-sm">{resolveI18n(attraction.description)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top Restaurants */}
                {city.top_restaurants && city.top_restaurants.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Top Restaurants</h2>
                    <div className="space-y-4">
                      {city.top_restaurants.map((restaurant: any, index: number) => (
                        <div key={index} className="border-l-4 border-france-red pl-4">
                          <h3 className="font-heading font-semibold text-gray-900">{resolveI18n(restaurant.name)}</h3>
                          {restaurant.cuisine && <span className="text-xs text-france-blue font-medium">{resolveI18n(restaurant.cuisine)}</span>}
                          <p className="text-gray-600 text-sm">{resolveI18n(restaurant.description)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Travel Tips */}
                {city.travel_tips && city.travel_tips.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Travel Tips</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {city.travel_tips.map((tip: any, index: number) => (
                        <li key={index}>{resolveI18n(tip)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <TripcomWidget city={city.name.en} type="searchbox" customTitle={`Find Hotels in ${city.name.en}`} />
                <AffiliateWidget />
                <FeedbackForm context={`City: ${city.name.en}`} />
              </div>
            </div>
          </div>
        </section>

        {/* Related Cities */}
        {relatedCities.length > 0 && (
          <section className="bg-white section-padding">
            <div className="container-custom">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">Related Cities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedCities.map((relatedCity: any) => (
                  <CityCard key={relatedCity.id} city={relatedCity} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getCityStaticPaths();
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const city = getCityBySlug(slug);
  if (!city) return { notFound: true };

  const relatedCities = getRelatedCities(city, 3);

  return {
    props: { city, relatedCities },
    revalidate: 86400
  };
};
