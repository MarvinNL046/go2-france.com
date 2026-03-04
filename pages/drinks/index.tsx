import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHead from '../../components/SEOHead';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

const { getAllDrinks } = require('../../lib/drinks');

interface Drink {
  id: number;
  slug: string;
  name: { en: string; fr?: string } | string;
  category: string;
  type: string;
  description: { en: string; fr?: string } | string;
  image: string;
  temperature?: string;
  alcohol_content?: string;
  caffeine?: string;
  price_range?: string;
  occasions?: string[];
  region?: string;
}

interface DrinksPageProps {
  drinks: Drink[];
}

function getCategoryIcon(category: string) {
  const icons: Record<string, string> = {
    'wine': '',
    'champagne': '',
    'spirits': '',
    'liqueur': '',
    'beer': '',
    'coffee': '',
    'tea': '',
    'juice': '',
    'cocktail': '',
    'non-alcoholic': '',
    'aperitif': '',
    'water': '',
  };
  return icons[category] || '';
}

export default function DrinksPage({ drinks }: DrinksPageProps) {
  const router = useRouter();
  const locale = router.locale || 'en';
  const { t } = useTranslation('common');

  // Group drinks by category
  const drinksByCategory = drinks.reduce((acc, drink) => {
    if (!acc[drink.category]) acc[drink.category] = [];
    acc[drink.category].push(drink);
    return acc;
  }, {} as Record<string, Drink[]>);

  const categories = Object.keys(drinksByCategory);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'French Drinks', href: '/drinks/' }
  ];

  return (
    <>
      <SEOHead
        title={`French Drinks Guide 2026 -- ${drinks.length} Beverages You Must Try | ${siteConfig.name}`}
        description={`Discover ${drinks.length} authentic French drinks from Bordeaux wine to Champagne, pastis and cafe au lait. Recipes, prices and where to find them across France.`}
      >
        <meta name="keywords" content="French drinks, French wine, Champagne, Bordeaux, pastis, cognac, French coffee, French beverages" />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        {/* Hero Section */}
        <section className="relative bg-surface-dark py-20">
          <div className="relative container-custom text-center text-white">
            <p className="font-script text-france-gold mb-2">Savoir-Faire</p>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
              French Drinks &amp; Beverages
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              From world-renowned wines and Champagne to aromatic coffees and herbal tisanes, explore the diverse world of French beverages
            </p>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white py-4">
          <div className="container-custom">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Category Navigation */}
        <section className="bg-white py-8 border-b">
          <div className="container-custom">
            <p className="section-label font-script text-france-gold text-center">Categories</p>
            <h2 className="text-2xl font-heading font-bold text-center mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.slice(0, 5).map(category => (
                <Link key={category} href={`/drinks/category/${category}/`} className="group">
                  <div className="bg-surface-cream p-4 rounded-2xl text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div className="text-3xl mb-2">{getCategoryIcon(category)}</div>
                    <h3 className="font-heading font-semibold group-hover:text-france-red capitalize">{category}</h3>
                    <p className="text-sm text-gray-600">{drinksByCategory[category]?.length || 0} drinks</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Drinks by Category */}
        <section className="py-12">
          <div className="container-custom">
            {categories.map((category) => (
              <div key={category} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold capitalize flex items-center gap-2">
                    {getCategoryIcon(category)} {category} Drinks
                  </h2>
                  <Link
                    href={`/drinks/category/${category}/`}
                    className="text-france-blue hover:text-france-red font-medium"
                  >
                    View all {category} &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {drinksByCategory[category].slice(0, 4).map((drink) => {
                    const drinkName = typeof drink.name === 'object' ? drink.name.en : drink.name;
                    const drinkFr = typeof drink.name === 'object' ? drink.name.fr : '';
                    const drinkDesc = typeof drink.description === 'object' ? drink.description.en : (drink.description || '');
                    return (
                      <Link key={drink.slug} href={`/drinks/${drink.slug}/`}>
                        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                          <div className="relative h-48">
                            {drink.image && (
                              <Image
                                src={drink.image}
                                alt={drinkName}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            )}
                            <div className="absolute top-2 left-2 flex gap-2">
                              {drink.alcohol_content && drink.alcohol_content !== 'none' && (
                                <span className="bg-france-red text-white px-2 py-1 rounded-full text-xs font-medium">
                                  {drink.alcohol_content}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-france-red transition-colors">
                              {drinkName}
                            </h3>
                            {drinkFr && (
                              <p className="text-sm text-gray-500 mb-2">{drinkFr}</p>
                            )}
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {drinkDesc}
                            </p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">
                                {drink.price_range}
                              </span>
                              <span className="text-france-blue group-hover:text-france-red font-medium">
                                Learn more &rarr;
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Affiliate: Experience French Food & Drink Culture */}
        <section className="bg-white py-16">
          <div className="container-custom">
            <div className="text-center mb-10">
              <p className="section-label font-script text-france-gold">Experience</p>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
                Experience French Food &amp; Drink Culture
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Taste the best of France with guided wine tours, market visits, and hands-on cooking experiences
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Wine Tours &amp; Tastings</h3>
                <p className="text-gray-600 mb-6">Wine tours and tastings across France</p>
                <a
                  href={siteConfig.affiliateLinks.klook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-france-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-france-blue transition-colors"
                >
                  Browse on Klook
                </a>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Cooking &amp; Tasting Experiences</h3>
                <p className="text-gray-600 mb-6">French cooking and tasting experiences</p>
                <a
                  href={siteConfig.affiliateLinks.getYourGuide}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-france-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-france-red transition-colors"
                >
                  Browse on GetYourGuide
                </a>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">
              We may earn a commission when you book through our links, at no extra cost to you. This helps us keep Go2France running.
            </p>
          </div>
        </section>

        {/* French Drinking Culture Section */}
        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p className="section-label font-script text-france-gold">Culture</p>
              <h2 className="text-3xl font-heading font-bold mb-4">French Drinking Culture</h2>
              <p className="text-gray-600 mb-8">
                France's beverage culture is deeply woven into daily life and social traditions. From the morning cafe au lait
                to afternoon wine with lunch and an evening aperitif, drinks are central to the French art of living.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <h3 className="font-heading font-semibold mb-2">L'Aperitif</h3>
                  <p className="text-sm text-gray-600">The pre-dinner drink is a cherished French social ritual</p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <h3 className="font-heading font-semibold mb-2">Wine Regions</h3>
                  <p className="text-sm text-gray-600">France boasts world-famous wine regions like Bordeaux, Burgundy and Champagne</p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <h3 className="font-heading font-semibold mb-2">Le Digestif</h3>
                  <p className="text-sm text-gray-600">After-dinner spirits like cognac and armagnac are a tradition</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const drinks = getAllDrinks();

  return {
    props: {
      drinks
    }
  };
};
