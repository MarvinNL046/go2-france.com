import { GetStaticProps } from 'next';
import SEOHead from '../components/SEOHead';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getAllCities } from '../lib/cities';
import { getPopularDishes } from '../lib/food';
import CityCard from '../components/CityCard';
import TripcomWidget from '../components/TripcomWidget';
import AnimatedCounter from '../components/AnimatedCounter';
import { AirplaneDecoration, CloudDecoration } from '../components/decorations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../hooks/useTranslation';

interface City {
  id: number;
  slug: string;
  name: {
    en: string;
    nl: string;
  };
  region: string;
  province: string;
  image: string;
  highlights: string[];
}

interface Dish {
  id: number;
  slug: string;
  name: {
    en: string;
    nl: string;
    french: string;
  };
  category: string;
  region: string;
  spice_level: string;
  image: string;
  difficulty: string;
  preparation_time: string;
  price_range: string;
  ingredients: string[];
}

interface HomeProps {
  cities: City[];
  featuredCities: City[];
  popularDishes: Dish[];
}

export default function Home({ cities, featuredCities, popularDishes }: HomeProps) {
  const { t } = useTranslation('common');

  const heroImages = [
    '/images/homepageHero/eiffel-tower-paris.webp',
    '/images/homepageHero/provence-lavender.webp',
    '/images/homepageHero/french-riviera.webp',
    '/images/homepageHero/mont-saint-michel.webp'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5500);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Scroll animation refs
  const statsAnim = useScrollAnimation(0.2);
  const featuredAnim = useScrollAnimation(0.1);
  const top10Anim = useScrollAnimation(0.1);
  const foodAnim = useScrollAnimation(0.1);
  const regionsAnim = useScrollAnimation(0.1);
  const planAnim = useScrollAnimation(0.1);

  return (
    <>
      <SEOHead
        title={t('meta.mainTitle')}
        description={t('meta.mainDescription')}
      >
        <meta name="keywords" content={t('meta.mainKeywords')} />
        <meta property="og:type" content="website" />
        <link
          rel="preload"
          as="image"
          href="/images/homepageHero/eiffel-tower-paris.webp"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Go2 France",
              "url": "https://go2-france.com",
              "description": "Your complete France travel guide with city guides, food, transport, and booking.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://go2-france.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </SEOHead>

      {/* ============================================
          HERO -- Split layout with image slider right
          ============================================ */}
      <section className="relative bg-surface-cream overflow-hidden">
        {/* Decorative elements */}
        <div className="hidden lg:block absolute top-16 right-1/3 z-10 opacity-20">
          <AirplaneDecoration className="w-16 h-16 text-france-red" />
        </div>
        <div className="hidden lg:block absolute top-8 left-12 z-10 opacity-10">
          <CloudDecoration className="w-24 h-24 text-gray-400" />
        </div>

        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[85vh] sm:min-h-[70vh] lg:min-h-[600px] py-12 lg:py-0">
            {/* Left -- Text */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <span className="section-label">{t('hero.landOfSmiles') || 'La Belle France'}</span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-4 max-w-xl mx-auto lg:mx-0">
                {t('hero.subtitle')}
              </p>
              <p className="text-base text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0">
                {t('hero.seoIntro')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/city/" className="btn-primary">
                  {t('buttons.exploreCities')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link href="#featured" className="btn-secondary">
                  {t('hero.featuredDestinations')}
                </Link>
              </div>
            </div>

            {/* Right -- Image slider */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Beautiful France scenery ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      quality={75}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                ))}
              </div>
              {/* Indicator dots */}
              <div className="flex justify-center gap-2 mt-4">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-france-red w-6'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Show image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          STATS COUNTER BAR -- Dark background
          ============================================ */}
      <section className="bg-surface-dark py-12 lg:py-16" ref={statsAnim.ref}>
        <div className="container-custom">
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 text-center scroll-fade-up ${statsAnim.isVisible ? 'is-visible' : ''}`}>
            <div>
              <div className="text-3xl lg:text-5xl font-heading font-bold text-white mb-2">
                <AnimatedCounter target={cities.length} suffix="+" />
              </div>
              <div className="text-gray-400 text-sm">{t('stats.citiesCovered')}</div>
            </div>
            <div>
              <div className="text-3xl lg:text-5xl font-heading font-bold text-white mb-2">
                <AnimatedCounter target={5} />
              </div>
              <div className="text-gray-400 text-sm">{t('stats.regions')}</div>
            </div>
            <div>
              <div className="text-3xl lg:text-5xl font-heading font-bold text-white mb-2">
                <AnimatedCounter target={100} suffix="+" />
              </div>
              <div className="text-gray-400 text-sm">{t('stats.attractions')}</div>
            </div>
            <div>
              <div className="text-3xl lg:text-5xl font-heading font-bold text-france-red mb-2">
                24/7
              </div>
              <div className="text-gray-400 text-sm">{t('stats.travelTips')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SEARCH WIDGET -- Trip.com
          ============================================ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="section-label">{t('search.findPerfectStay')}</span>
            <h2 className="section-title mb-3">
              {t('search.searchCompareHotels')}
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <TripcomWidget
              city="France"
              type="searchbox"
              className="shadow-xl rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURED DESTINATIONS -- CityCard grid
          ============================================ */}
      <section id="featured" className="section-padding bg-surface-cream" ref={featuredAnim.ref}>
        <div className="container-custom">
          <div className={`text-center mb-14 scroll-fade-up ${featuredAnim.isVisible ? 'is-visible' : ''}`}>
            <span className="section-label">{t('hero.featuredDestinations') || 'Featured Destinations'}</span>
            <h2 className="section-title mb-4">
              {t('sections.featuredDestinations')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('sections.featuredDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredCities.slice(0, 3).map((city, i) => (
              <div key={city.id} className={`scroll-fade-up stagger-${i + 1} ${featuredAnim.isVisible ? 'is-visible' : ''}`}>
                <CityCard city={city} />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCities.slice(3, 6).map((city, i) => (
              <div key={city.id} className={`scroll-fade-up stagger-${i + 1} ${featuredAnim.isVisible ? 'is-visible' : ''}`}>
                <CityCard city={city} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/city/" className="btn-primary">
              {t('buttons.viewAllCities')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          TOP 10 GUIDES
          ============================================ */}
      <section id="top10" className="section-padding bg-white" ref={top10Anim.ref}>
        <div className="container-custom">
          <div className={`text-center mb-14 scroll-fade-up ${top10Anim.isVisible ? 'is-visible' : ''}`}>
            <span className="section-label">{t('sections.top10Guides')}</span>
            <h2 className="section-title mb-4">
              {t('sections.top10Guides')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              {t('sections.top10Description')}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
              <span className="bg-green-50 text-green-700 px-4 py-2 rounded-full font-medium border border-green-200">
                {t('badges.current2026Data')}
              </span>
              <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium border border-blue-200">
                {t('badges.expertCurated')}
              </span>
              <span className="bg-purple-50 text-purple-700 px-4 py-2 rounded-full font-medium border border-purple-200">
                {t('badges.localPrices')}
              </span>
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {/* Restaurants */}
            <Link href="/top-10/restaurants/" className="group">
              <div className={`bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 scroll-fade-up stagger-1 ${top10Anim.isVisible ? 'is-visible' : ''}`}>
                <div className="w-14 h-14 bg-france-red/10 rounded-2xl flex items-center justify-center mb-5">
                  <span className="text-3xl">🥐</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2 group-hover:text-france-red transition-colors">
                  {t('nav.restaurantGuides')}
                </h3>
                <p className="text-gray-600 text-sm mb-5">
                  {t('categories.restaurantGuidesDesc')}
                </p>
                <span className="inline-flex items-center gap-2 text-france-red font-medium text-sm">
                  {t('buttons.viewRestaurantGuides')}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Hotels */}
            <Link href="/top-10/hotels/" className="group">
              <div className={`bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 scroll-fade-up stagger-2 ${top10Anim.isVisible ? 'is-visible' : ''}`}>
                <div className="w-14 h-14 bg-france-blue/10 rounded-2xl flex items-center justify-center mb-5">
                  <span className="text-3xl">🏨</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2 group-hover:text-france-blue transition-colors">
                  {t('nav.hotelGuides')}
                </h3>
                <p className="text-gray-600 text-sm mb-5">
                  {t('categories.hotelGuidesDesc')}
                </p>
                <span className="inline-flex items-center gap-2 text-france-blue font-medium text-sm">
                  {t('buttons.viewHotelGuides')}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Attractions */}
            <Link href="/top-10/attractions/" className="group">
              <div className={`bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 scroll-fade-up stagger-3 ${top10Anim.isVisible ? 'is-visible' : ''}`}>
                <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-5">
                  <span className="text-3xl">🏛️</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {t('nav.attractionGuides')}
                </h3>
                <p className="text-gray-600 text-sm mb-5">
                  {t('categories.attractionGuidesDesc')}
                </p>
                <span className="inline-flex items-center gap-2 text-green-600 font-medium text-sm">
                  {t('buttons.viewAttractionGuides')}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>

          {/* Trending */}
          <div className="bg-surface-cream rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                {t('trending.trendingNow')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('trending.trendingDescription')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/city/paris/top-10-restaurants/" className="bg-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-france-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🥐</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-gray-900 group-hover:text-france-red transition-colors text-sm">
                      Top 10 Restaurants in Paris
                    </h4>
                    <p className="text-xs text-gray-500">Current prices, local favorites</p>
                  </div>
                </div>
              </Link>

              <Link href="/city/nice/top-10-hotels/" className="bg-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-france-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🏨</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-gray-900 group-hover:text-france-blue transition-colors text-sm">
                      Top 10 Hotels in Nice
                    </h4>
                    <p className="text-xs text-gray-500">Riviera stays, updated rates</p>
                  </div>
                </div>
              </Link>

              <Link href="/city/lyon/top-10-attractions/" className="bg-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🏛️</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-gray-900 group-hover:text-green-600 transition-colors text-sm">
                      Top 10 Attractions in Lyon
                    </h4>
                    <p className="text-xs text-gray-500">History, gastronomy, culture</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FRENCH CUISINE
          ============================================ */}
      <section className="section-padding bg-surface-cream" ref={foodAnim.ref}>
        <div className="container-custom">
          <div className={`text-center mb-14 scroll-fade-up ${foodAnim.isVisible ? 'is-visible' : ''}`}>
            <span className="section-label">{t('sections.authenticThaiCuisine') || 'Authentic French Cuisine'}</span>
            <h2 className="section-title mb-4">
              {t('sections.authenticThaiCuisine') || 'Authentic French Cuisine'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('sections.cuisineDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {popularDishes.slice(0, 6).map((dish, i) => (
              <Link key={dish.id} href={`/food/${dish.slug}/`} className="group">
                <div className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 scroll-fade-up stagger-${(i % 3) + 1} ${foodAnim.isVisible ? 'is-visible' : ''}`}>
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={dish.image}
                      alt={dish.name.en}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 text-xs font-medium rounded-full">
                        {dish.preparation_time}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-gray-900 mb-0.5 group-hover:text-france-red transition-colors">
                      {dish.name.en}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">{dish.name.french}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-france-blue font-medium capitalize bg-france-blue/5 px-2.5 py-1 rounded-full">
                        {dish.category.replace('-', ' ')}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">{dish.region} France</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {dish.ingredients.slice(0, 3).map((ingredient, index) => (
                        <span key={index} className="text-xs bg-surface-cream text-gray-600 px-2.5 py-1 rounded-full">
                          {ingredient}
                        </span>
                      ))}
                      {dish.ingredients.length > 3 && (
                        <span className="text-xs text-france-red font-medium">
                          +{dish.ingredients.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className={`text-xs font-medium ${
                        dish.difficulty === 'easy' ? 'text-green-600' :
                        dish.difficulty === 'medium' ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {dish.difficulty}
                      </span>
                      <span className="text-france-red font-medium text-sm group-hover:text-france-red-600 transition-colors inline-flex items-center gap-1">
                        {t('labels.learnRecipe')}
                        <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/food/" className="btn-primary">
              {t('buttons.exploreAllThaiDishes') || 'Explore All French Dishes'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          EXPLORE BY REGION -- With image overlays
          ============================================ */}
      <section className="section-padding bg-white" ref={regionsAnim.ref}>
        <div className="container-custom">
          <div className={`text-center mb-14 scroll-fade-up ${regionsAnim.isVisible ? 'is-visible' : ''}`}>
            <span className="section-label">{t('sections.exploreByRegion')}</span>
            <h2 className="section-title mb-4">
              {t('sections.exploreByRegion')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('sections.regionDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { slug: 'ile-de-france', image: '/images/regions/ile-de-france.webp', name: 'Ile-de-France', desc: 'Paris and its surrounding region, the heart of France.', cta: 'Explore Ile-de-France' },
              { slug: 'provence', image: '/images/regions/provence.webp', name: 'Provence', desc: 'Lavender fields, Mediterranean coast, and timeless villages.', cta: 'Explore Provence' },
              { slug: 'french-riviera', image: '/images/regions/french-riviera.webp', name: 'French Riviera', desc: 'Glamorous coastline from Nice to Saint-Tropez.', cta: 'Explore the Riviera' },
              { slug: 'loire-valley', image: '/images/regions/loire-valley.webp', name: 'Loire Valley', desc: 'Fairy-tale chateaux and world-class vineyards.', cta: 'Explore Loire Valley' },
            ].map((region, i) => (
              <Link key={region.slug} href={`/region/${region.slug}/`} className="group">
                <div className={`relative rounded-2xl overflow-hidden h-80 scroll-fade-up stagger-${i + 1} ${regionsAnim.isVisible ? 'is-visible' : ''}`}>
                  <Image
                    src={region.image}
                    alt={region.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-xl font-bold text-white mb-1">{region.name}</h3>
                    <p className="text-white/80 text-sm mb-3 line-clamp-2">{region.desc}</p>
                    <span className="inline-flex items-center gap-1 text-white text-sm font-medium group-hover:text-france-red transition-colors">
                      {region.cta}
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          PLAN YOUR TRIP -- Affiliate cards
          ============================================ */}
      <section className="section-padding bg-surface-cream" ref={planAnim.ref}>
        <div className="container-custom">
          <div className={`text-center mb-14 scroll-fade-up ${planAnim.isVisible ? 'is-visible' : ''}`}>
            <span className="section-label">Plan Your Trip</span>
            <h2 className="section-title mb-4">
              {t('sections.planPerfectTrip') || 'Plan Your Complete France Trip'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('sections.planTripDescription') || 'Everything you need to book, from hotels and tours to transport and connectivity.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* Hotels */}
            <div className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 scroll-fade-up stagger-1 ${planAnim.isVisible ? 'is-visible' : ''}`}>
              <div className="w-12 h-12 bg-france-blue/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🏨</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Hotels &amp; Accommodation</h3>
              <p className="text-gray-600 text-sm mb-5">
                Compare prices on thousands of hotels, B&amp;Bs, and chateaux across France.
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href="https://trip.tpo.lv/TmObooZ5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-france-blue text-white px-4 py-2.5 rounded-xl font-medium hover:bg-france-blue-600 transition-colors text-sm"
                >
                  Search on Trip.com
                </a>
                <a
                  href="https://booking.tpo.lv/2PT1kR82"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-800 transition-colors text-sm"
                >
                  Search on Booking.com
                </a>
              </div>
            </div>

            {/* Activities */}
            <div className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 scroll-fade-up stagger-2 ${planAnim.isVisible ? 'is-visible' : ''}`}>
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Activities &amp; Tours</h3>
              <p className="text-gray-600 text-sm mb-5">
                Book wine tours, museum visits, cooking classes, and unforgettable experiences.
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href="https://klook.tpo.lv/7Dt6WApj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-orange-500 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-orange-600 transition-colors text-sm"
                >
                  Browse on Klook
                </a>
                <a
                  href="https://getyourguide.tpo.lv/6HngJ5FC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm"
                >
                  Browse on GetYourGuide
                </a>
              </div>
            </div>

            {/* Transport */}
            <div className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 scroll-fade-up stagger-3 ${planAnim.isVisible ? 'is-visible' : ''}`}>
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🚂</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Transport</h3>
              <p className="text-gray-600 text-sm mb-5">
                TGV trains, buses, and flights between cities — book your routes in advance.
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href="https://12go.tpo.lv/tNA80urD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-purple-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-purple-700 transition-colors text-sm"
                >
                  Book on 12Go
                </a>
              </div>
            </div>

            {/* eSIM */}
            <div className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 scroll-fade-up stagger-1 ${planAnim.isVisible ? 'is-visible' : ''}`}>
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">eSIM &amp; Data</h3>
              <p className="text-gray-600 text-sm mb-5">
                Stay connected with affordable eSIM plans — no physical SIM swap needed.
              </p>
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/esim/"
                  className="block text-center bg-cyan-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-cyan-700 transition-colors text-sm"
                >
                  Compare eSIM Plans
                </Link>
              </div>
            </div>

            {/* Travel Insurance */}
            <div className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 scroll-fade-up stagger-2 ${planAnim.isVisible ? 'is-visible' : ''}`}>
              <div className="w-12 h-12 bg-france-red/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Travel Insurance</h3>
              <p className="text-gray-600 text-sm mb-5">
                Protect yourself while traveling. Compare the best travel insurance options.
              </p>
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/travel-insurance/"
                  className="block text-center bg-france-red text-white px-4 py-2.5 rounded-xl font-medium hover:bg-france-red-600 transition-colors text-sm"
                >
                  Compare Insurance
                </Link>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center max-w-2xl mx-auto">
            Some of the links above are affiliate links. If you make a booking through these links, we may earn a small commission at no extra cost to you. This helps us keep Go2France free and up-to-date.
          </p>
        </div>
      </section>

      {/* ============================================
          BOTTOM CTA
          ============================================ */}
      <section className="bg-surface-dark py-16 lg:py-20">
        <div className="container-custom text-center">
          <span className="font-script text-france-gold text-lg mb-3 block">Start Your Adventure</span>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-white mb-4">
            {t('sections.planPerfectTrip') || 'Plan Your Perfect Trip'}
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
            {t('sections.planTripDescription') || 'Discover the best of France with our comprehensive travel guides.'}
          </p>
          <Link href="/city/" className="btn-primary text-lg px-8 py-4">
            {t('buttons.startExploringThailand') || 'Start Exploring France'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const cities = getAllCities();
  const popularDishes = getPopularDishes(6);

  const featuredCities = cities.slice(0, 6);

  return {
    props: {
      cities,
      featuredCities,
      popularDishes,
    },
  };
};
