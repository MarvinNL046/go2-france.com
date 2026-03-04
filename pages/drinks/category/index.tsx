import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { useTranslation } from '../../../hooks/useTranslation';
import { siteConfig } from '../../../site.config';

const { getAllDrinks } = require('../../../lib/drinks');

interface DrinkCategoriesPageProps {
  categoryCounts: Record<string, number>;
}

const categoryInfo: Record<string, { title: string; description: string; icon: string }> = {
  'wine': {
    title: 'French Wine',
    description: 'World-renowned wines from Bordeaux, Burgundy, Champagne and beyond',
    icon: '',
  },
  'champagne': {
    title: 'Champagne',
    description: 'The iconic sparkling wine from the Champagne region of France',
    icon: '',
  },
  'spirits': {
    title: 'French Spirits',
    description: 'Cognac, Armagnac, Calvados and other fine French spirits',
    icon: '',
  },
  'liqueur': {
    title: 'Liqueurs',
    description: 'Chartreuse, Cointreau, Grand Marnier and other French liqueurs',
    icon: '',
  },
  'beer': {
    title: 'French Beer',
    description: 'Craft beers and traditional brews from across France',
    icon: '',
  },
  'coffee': {
    title: 'French Coffee',
    description: 'From espresso to cafe au lait -- the French coffee tradition',
    icon: '',
  },
  'tea': {
    title: 'French Tea',
    description: 'Fine teas and herbal tisanes in the French tradition',
    icon: '',
  },
  'juice': {
    title: 'Fresh Juices',
    description: 'Fresh fruit juices and refreshing drinks made from French produce',
    icon: '',
  },
  'cocktail': {
    title: 'Cocktails',
    description: 'Classic French cocktails and aperitifs',
    icon: '',
  },
  'non-alcoholic': {
    title: 'Non-Alcoholic',
    description: 'Mineral waters, syrups and non-alcoholic French beverages',
    icon: '',
  }
};

export default function DrinkCategoriesIndex({ categoryCounts }: DrinkCategoriesPageProps) {
  const router = useRouter();
  const locale = router.locale || 'en';
  const { t } = useTranslation('common');

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'French Drinks', href: '/drinks/' },
    { name: 'Categories', href: '/drinks/category/' }
  ];

  return (
    <>
      <SEOHead
        title={`French Drink Categories - Browse by Type | ${siteConfig.name}`}
        description="Explore French drinks by category. From world-famous wines and Champagne to fine spirits, coffee and non-alcoholic beverages. Find your perfect French drink."
      >
        <meta name="keywords" content="French drink categories, French beverages, French wine, Champagne, cognac, French coffee, French drinks by type" />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        {/* Hero Section */}
        <section className="relative py-16 bg-surface-dark">
          <div className="container-custom text-center text-white">
            <p className="font-script text-france-gold mb-2">Browse by Type</p>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
              French Drink Categories
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover the diverse world of French beverages. From renowned wines to artisan spirits, fine coffees and refreshing non-alcoholic drinks.
            </p>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white py-4">
          <div className="container-custom">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(categoryInfo).map(([slug, info]) => (
                <Link key={slug} href={`/drinks/category/${slug}/`}>
                  <div className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                    <div className="text-center">
                      <div className="text-5xl mb-4">{info.icon}</div>
                      <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">{info.title}</h2>
                      <p className="text-gray-600 mb-4">{info.description}</p>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <span className="text-sm font-medium text-gray-500">
                          {categoryCounts[slug] || 0} Beverages
                        </span>
                      </div>
                      <div className="mt-4">
                        <span className="text-france-blue font-medium hover:text-france-red transition-colors">
                          Explore {info.title} &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* French Beverage Culture */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p className="section-label font-script text-france-gold">Culture</p>
              <h2 className="text-3xl font-heading font-bold mb-4">French Beverage Culture</h2>
              <p className="text-gray-600 mb-8">
                Beverages play a central role in French culture and the art of living. From morning coffee rituals
                to the aperitif hour and dinner wine pairings, each category represents different
                aspects of French lifestyle and centuries-old traditions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md">
                  <h3 className="font-heading font-semibold mb-2">Terroir</h3>
                  <p className="text-sm text-gray-600">
                    French drinks reflect the unique character of their region of origin
                  </p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md">
                  <h3 className="font-heading font-semibold mb-2">Savoir-Faire</h3>
                  <p className="text-sm text-gray-600">
                    Centuries of expertise in winemaking, distillation and brewing
                  </p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md">
                  <h3 className="font-heading font-semibold mb-2">Art de Vivre</h3>
                  <p className="text-sm text-gray-600">
                    Drinks are integral to the French art of living and socializing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-8 bg-white">
          <div className="container-custom text-center">
            <Link href="/drinks/" className="inline-block bg-france-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-france-red transition-colors">
              &larr; Back to All French Drinks
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const drinks = getAllDrinks();

  const categoryCounts = drinks.reduce((acc: Record<string, number>, drink: any) => {
    if (!acc[drink.category]) acc[drink.category] = 0;
    acc[drink.category]++;
    return acc;
  }, {} as Record<string, number>);

  return {
    props: {
      categoryCounts
    }
  };
};
