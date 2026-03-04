import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SEOHead from '../../../components/SEOHead';
import { useTranslation } from '../../../hooks/useTranslation';
import { siteConfig } from '../../../site.config';

const { getAllDrinks, getDrinkCategories } = require('../../../lib/drinks');

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

interface CategoryPageProps {
  category: string;
  drinks: Drink[];
}

const categoryInfo: Record<string, { title: string; description: string; icon: string }> = {
  'wine': { title: 'French Wine', description: 'World-renowned wines from Bordeaux, Burgundy, Champagne and beyond', icon: '' },
  'champagne': { title: 'Champagne', description: 'The iconic sparkling wine from the Champagne region of France', icon: '' },
  'spirits': { title: 'French Spirits', description: 'Cognac, Armagnac, Calvados and other fine French spirits', icon: '' },
  'liqueur': { title: 'Liqueurs', description: 'Chartreuse, Cointreau, Grand Marnier and other French liqueurs', icon: '' },
  'beer': { title: 'French Beer', description: 'Craft beers and traditional brews from across France', icon: '' },
  'coffee': { title: 'French Coffee', description: 'From espresso to cafe au lait -- the French coffee tradition', icon: '' },
  'tea': { title: 'French Tea', description: 'Fine teas and herbal tisanes in the French tradition', icon: '' },
  'juice': { title: 'Fresh Juices', description: 'Fresh fruit juices and refreshing drinks made from French produce', icon: '' },
  'cocktail': { title: 'Cocktails', description: 'Classic French cocktails and aperitifs', icon: '' },
  'non-alcoholic': { title: 'Non-Alcoholic', description: 'Mineral waters, syrups and non-alcoholic French beverages', icon: '' },
};

export default function DrinkCategoryPage({ category, drinks }: CategoryPageProps) {
  const router = useRouter();
  const locale = router.locale || 'en';
  const { t } = useTranslation('common');
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const info = categoryInfo[category as keyof typeof categoryInfo] || {
    title: category.charAt(0).toUpperCase() + category.slice(1),
    description: `Browse all ${category} drinks`,
    icon: '',
  };

  const regions = Array.from(new Set(drinks.map(d => d.region).filter(Boolean)));

  const filteredDrinks = drinks.filter(drink => {
    return regionFilter === 'all' || drink.region === regionFilter;
  });

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'French Drinks', href: '/drinks/' },
    { name: 'Categories', href: '/drinks/category/' },
    { name: info.title, href: `/drinks/category/${category}/` }
  ];

  return (
    <>
      <SEOHead
        title={`${info.title} - French ${category} Drinks & Recipes | ${siteConfig.name}`}
        description={`Discover authentic French ${category} drinks and beverages. ${info.description}. Learn recipes and find where to try them in France.`}
      >
        <meta name="keywords" content={`French ${category}, ${category} drinks France, French beverages, ${info.title.toLowerCase()}`} />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        {/* Breadcrumbs */}
        <section className="bg-white py-4">
          <div className="container-custom">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative py-12 bg-surface-dark">
          <div className="container-custom text-center text-white">
            <div className="text-6xl mb-4">{info.icon}</div>
            <p className="font-script text-france-gold mb-2">French Beverages</p>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
              {info.title}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {info.description}
            </p>
          </div>
        </section>

        {/* Filters */}
        {regions.length > 1 && (
          <section className="bg-white py-6 border-b">
            <div className="container-custom">
              <div className="flex flex-wrap gap-4 justify-center">
                <div>
                  <label className="text-sm font-medium text-gray-700 mr-2">Region:</label>
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-france-blue"
                  >
                    <option value="all">All Regions</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="text-center mt-4 text-gray-600">
                Showing {filteredDrinks.length} {category} drinks
              </div>
            </div>
          </section>
        )}

        {/* Drinks Grid */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDrinks.map((drink) => {
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
                        <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-france-blue transition-colors">
                          {drinkName}
                        </h3>
                        {drinkFr && (
                          <p className="text-sm text-gray-500 mb-2">{drinkFr}</p>
                        )}
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {drinkDesc}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{drink.price_range}</span>
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

            {filteredDrinks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No drinks found with the selected filters. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 bg-surface-cream">
          <div className="container-custom">
            <div className="flex justify-center gap-4">
              <Link href="/drinks/category/" className="inline-block border-2 border-france-blue text-france-blue px-8 py-3 rounded-xl font-semibold hover:bg-france-blue hover:text-white transition-colors">
                &larr; All Categories
              </Link>
              <Link href="/drinks/" className="inline-block bg-france-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-france-red transition-colors">
                View All Drinks
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = getDrinkCategories();

  const paths = categories.map((category: string) => ({
    params: { category }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string;
  const allDrinks = getAllDrinks();

  const drinks = allDrinks.filter((drink: any) => drink.category === category);

  return {
    props: {
      category,
      drinks
    }
  };
};
