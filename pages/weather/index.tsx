import React from 'react';
import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';
import citiesData from '../../data/cities/index.json';

interface WeatherIndexProps {
  cities: Array<{
    slug: string;
    name: { en: string };
    region: string;
  }>;
}

const seasonalInfo = [
  {
    season: 'Spring (March - May)',
    emoji: '🌸',
    temp: '10-20 C',
    description: 'Mild temperatures, blooming gardens, and increasing sunshine. An excellent time to visit before the summer crowds. Cherry blossoms in Paris, wildflowers in Provence. Rain showers are possible but short-lived.',
    bestFor: 'Paris, Loire Valley, Provence, Normandy'
  },
  {
    season: 'Summer (June - August)',
    emoji: '☀️',
    temp: '20-35 C',
    description: 'Peak tourist season with long sunny days and warm temperatures. The Riviera and southern regions can be very hot (35 C+). Perfect beach weather on the coasts. Major festivals and outdoor events across the country. July and August are vacation months when many Parisians leave the city.',
    bestFor: 'French Riviera, Brittany, Alps, Corsica, Atlantic Coast'
  },
  {
    season: 'Autumn (September - November)',
    emoji: '🍂',
    temp: '8-20 C',
    description: 'A magical time in France with grape harvest season (vendanges), stunning foliage, and fewer tourists. September is still warm and sunny in the south. Wine regions are at their most active and beautiful. Excellent food season with mushrooms, truffles, and new wines.',
    bestFor: 'Burgundy, Bordeaux, Alsace, Dordogne, Loire Valley'
  },
  {
    season: 'Winter (December - February)',
    emoji: '❄️',
    temp: '-2 to 10 C',
    description: 'Cold but charming. Paris sparkles with Christmas lights, Alsace hosts famous Christmas markets, and the Alps offer world-class skiing. The Riviera remains mild (10-15 C). Fewer tourists and lower prices everywhere except ski resorts. Short days but cozy bistros and vin chaud make up for it.',
    bestFor: 'Alps (skiing), Alsace (Christmas markets), Paris, French Riviera'
  }
];

const weatherFaqs = [
  {
    question: 'What is the best time to visit France?',
    answer: 'The best months to visit France are May, June, and September. These months offer pleasant weather across the country, fewer crowds than peak summer, and lower prices. However, France is a year-round destination — skiing in winter, Christmas markets in December, and wine harvest in autumn all have their appeal.'
  },
  {
    question: 'Is it too hot in the south of France in summer?',
    answer: 'July and August can be very hot in Provence, the Riviera, and Languedoc, with temperatures regularly reaching 35 C (95 F) and occasionally exceeding 40 C during heat waves. The coast offers sea breezes, but inland areas like Avignon can be scorching. Consider visiting the south in May-June or September-October instead.'
  },
  {
    question: 'Does it rain a lot in Paris?',
    answer: 'Paris receives rain spread fairly evenly throughout the year, averaging about 111 rainy days annually. However, rainfall is usually light — Paris actually gets less total rainfall than London, Sydney, or New York. Always carry a light jacket or umbrella. The rainiest months are typically May and October.'
  },
  {
    question: 'When is the best time for the French Riviera?',
    answer: 'The French Riviera enjoys a Mediterranean climate with over 300 sunny days per year. The best months are May-June and September-October for warm weather without extreme heat or crowds. July and August are peak season with higher prices and temperatures. Even winter is mild (10-15 C), making it a good escape from northern European cold.'
  },
  {
    question: 'What should I pack for France?',
    answer: 'Pack layers year-round, as temperatures can vary significantly between morning and afternoon. A light rain jacket is essential. In summer, bring sun protection and light, breathable clothing. In winter, pack warm layers, a good coat, and waterproof shoes. For restaurants, smart casual attire is appreciated — the French dress well.'
  },
  {
    question: 'When is ski season in the French Alps?',
    answer: 'The French Alps ski season typically runs from mid-December to mid-April, with the best snow conditions in January and February. The three main ski areas are Les Trois Vallees (Courchevel, Meribel), Portes du Soleil, and Espace Killy (Val d\'Isere, Tignes). Spring skiing in March offers longer days and softer snow.'
  }
];

const WeatherIndex: React.FC<WeatherIndexProps> = ({ cities }) => {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Weather Guide', href: '/weather' }
  ];

  const citiesByRegion = cities.reduce((acc, city) => {
    if (!acc[city.region]) {
      acc[city.region] = [];
    }
    acc[city.region].push(city);
    return acc;
  }, {} as Record<string, typeof cities>);

  return (
    <div className="min-h-screen bg-surface-cream">
      <SEOHead
        title="France Weather Guide 2026 | Best Time to Visit by Region | Go2France"
        description="Complete France weather guide. Seasonal information, best times to visit Paris, Provence, the Riviera, Alps and more. Monthly climate data and packing tips for your France trip."
      >
        <meta name="keywords" content="France weather, best time visit France, Paris weather, French Riviera climate, France seasons, France temperature, when to visit France" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": weatherFaqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </SEOHead>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <p className="font-script text-france-gold mb-2">Climate Guide</p>
        <h1 className="text-4xl font-bold font-heading text-gray-900 mb-8">
          France Weather Guide
        </h1>

        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            France spans a diverse range of climates — from the oceanic north and west to the Mediterranean south, the continental east, and the Alpine mountains. Understanding regional weather patterns is essential for planning the perfect trip. Generally, the south is warmer and drier, the north cooler and wetter, and the mountains cold with heavy snowfall in winter.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Seasonal Overview */}
            <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold font-heading mb-6">France Weather by Season</h2>
              <div className="space-y-6">
                {seasonalInfo.map((season) => (
                  <div key={season.season} className="border-0 bg-surface-cream rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{season.emoji}</span>
                      <div>
                        <h3 className="font-semibold font-heading text-lg">{season.season}</h3>
                        <p className="text-sm text-france-blue font-medium">{season.temp}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{season.description}</p>
                    <p className="text-sm"><strong className="text-gray-800">Best destinations:</strong> <span className="text-gray-600">{season.bestFor}</span></p>
                  </div>
                ))}
              </div>
            </section>

            {/* Cities by Region */}
            <section className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold font-heading mb-6">City Weather Guides</h2>
              {Object.entries(citiesByRegion).map(([region, regionCities]) => (
                <div key={region} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-semibold font-heading text-gray-800 mb-4">
                    {region}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {regionCities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/city/${city.slug}/`}
                        className="flex items-center justify-between p-3 bg-surface-cream rounded-xl hover:bg-france-blue/5 transition-colors group"
                      >
                        <span className="font-medium text-gray-700 group-hover:text-france-blue">
                          {city.name.en}
                        </span>
                        <span className="text-france-blue group-hover:translate-x-1 transition-transform">
                          &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* FAQ Section */}
            <section className="bg-white rounded-2xl shadow-md p-6 mt-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {weatherFaqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                    <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="lg:sticky lg:top-4 space-y-6">
              {/* Quick Tips */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold font-heading mb-4">Quick Weather Tips</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">🌸</span>
                    <div><strong>Spring (Mar-May):</strong> Mild, blooming, fewer crowds</div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">☀️</span>
                    <div><strong>Summer (Jun-Aug):</strong> Hot south, warm north, peak prices</div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">🍂</span>
                    <div><strong>Autumn (Sep-Nov):</strong> Wine harvest, foliage, ideal weather</div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-300 mr-2">❄️</span>
                    <div><strong>Winter (Dec-Feb):</strong> Skiing, Christmas markets, mild Riviera</div>
                  </li>
                </ul>
              </div>

              {/* Best Times */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold font-heading mb-4">Best Times to Visit</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-800">For Perfect Weather:</h4>
                    <p className="text-gray-600">May - June, September</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">For Fewer Crowds:</h4>
                    <p className="text-gray-600">October - November, March - April</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">For Beaches:</h4>
                    <p className="text-gray-600">June - September (Riviera & Atlantic)</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">For Skiing:</h4>
                    <p className="text-gray-600">January - March (French Alps)</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">For Wine Harvest:</h4>
                    <p className="text-gray-600">September - October (Bordeaux, Burgundy)</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">For Christmas Markets:</h4>
                    <p className="text-gray-600">Late November - December (Alsace)</p>
                  </div>
                </div>
              </div>

              {/* Regional Climate */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold font-heading mb-4">Regional Climates</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong className="text-gray-800">North & Paris:</strong> <span className="text-gray-600">Oceanic — mild, rainy, cool winters</span></li>
                  <li><strong className="text-gray-800">Atlantic Coast:</strong> <span className="text-gray-600">Oceanic — mild year-round, rainy</span></li>
                  <li><strong className="text-gray-800">South & Riviera:</strong> <span className="text-gray-600">Mediterranean — hot summers, mild winters</span></li>
                  <li><strong className="text-gray-800">East & Alsace:</strong> <span className="text-gray-600">Continental — hot summers, cold winters</span></li>
                  <li><strong className="text-gray-800">Alps & Pyrenees:</strong> <span className="text-gray-600">Mountain — snowy winters, cool summers</span></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* Ready to Book Section */}
        <section className="bg-surface-dark rounded-2xl p-8 text-white mt-12">
          <p className="font-script text-france-gold text-center mb-2">Plan Ahead</p>
          <h2 className="text-2xl font-bold font-heading text-center mb-4">Ready to Book Your France Trip?</h2>
          <p className="text-center mb-8 opacity-90 max-w-2xl mx-auto">
            Now that you know the best time to visit, start planning your perfect French getaway.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <a href={siteConfig.affiliateLinks.tripcom} target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
              <div className="text-3xl mb-3">🏨</div>
              <h3 className="font-semibold font-heading text-lg mb-1">Find Hotels</h3>
              <p className="text-sm text-gray-600">Compare deals on Trip.com</p>
            </a>
            <Link href="/esim/" className="bg-white text-france-blue rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold font-heading text-lg mb-1">Stay Connected</h3>
              <p className="text-sm text-gray-600">Get an eSIM for France</p>
            </Link>
            <Link href="/travel-insurance/" className="bg-white text-france-blue rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-semibold font-heading text-lg mb-1">Travel Insurance</h3>
              <p className="text-sm text-gray-600">Protect your trip</p>
            </Link>
          </div>
          <p className="text-xs text-center opacity-75">
            External links are affiliate links. We may earn a small commission at no extra cost to you.
          </p>
        </section>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<WeatherIndexProps> = async () => {
  return {
    props: {
      cities: citiesData as WeatherIndexProps['cities']
    }
  };
};

export default WeatherIndex;
