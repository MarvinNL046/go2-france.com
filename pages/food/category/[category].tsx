import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { useTranslation } from '../../../hooks/useTranslation';
import { siteConfig } from '../../../site.config';

const { getAllDishes, getAllCategories } = require('../../../lib/food');

interface Dish {
  id: number;
  slug: string;
  name: { en: string; fr?: string } | string;
  category: string;
  region: string;
  spice_level?: string;
  image: string;
  description?: { en: string; fr?: string } | string;
  difficulty: string;
  preparation_time: string;
  price_range: string;
  ingredients: string[];
}

interface CategoryPageProps {
  category: string;
  dishes: Dish[];
}

const categoryInfo: Record<string, { title: string; description: string; icon: string }> = {
  'appetizer': {
    title: 'Appetizers',
    description: 'Classic French starters and hors d\'oeuvres that set the stage for an unforgettable meal',
    icon: '',
  },
  'main-course': {
    title: 'Main Courses',
    description: 'Hearty and refined French main dishes from coq au vin to duck confit',
    icon: '',
  },
  'dessert': {
    title: 'Desserts',
    description: 'Exquisite French desserts from creme brulee to tarte tatin and macarons',
    icon: '',
  },
  'pastry': {
    title: 'Pastries',
    description: 'Iconic French pastries and baked goods -- croissants, pain au chocolat and more',
    icon: '',
  },
  'cheese': {
    title: 'Cheese',
    description: 'France\'s legendary cheese varieties from soft Brie to pungent Roquefort',
    icon: '',
  },
  'sauce': {
    title: 'Sauces',
    description: 'The mother sauces and classic French preparations that define the cuisine',
    icon: '',
  },
  'soup': {
    title: 'Soups',
    description: 'Classic French soups from French onion soup to bouillabaisse',
    icon: '',
  },
  'salad': {
    title: 'Salads',
    description: 'Fresh French salads featuring seasonal ingredients and classic vinaigrettes',
    icon: '',
  }
};

export default function FoodCategoryPage({ category, dishes }: CategoryPageProps) {
  const router = useRouter();
  const locale = router.locale || 'en';
  const { t } = useTranslation('common');
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const info = categoryInfo[category as keyof typeof categoryInfo] || {
    title: category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' '),
    description: `Explore French ${category.replace(/-/g, ' ')} dishes`,
    icon: '',
  };

  // Get unique regions from dishes
  const regions = Array.from(new Set(dishes.map(d => d.region).filter(Boolean)));

  // Filter dishes
  const filteredDishes = dishes.filter(dish => {
    return regionFilter === 'all' || dish.region === regionFilter;
  });

  // Group dishes by region
  const dishesByRegion = filteredDishes.reduce((acc, dish) => {
    const region = dish.region || 'general';
    if (!acc[region]) acc[region] = [];
    acc[region].push(dish);
    return acc;
  }, {} as Record<string, Dish[]>);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'French Food', href: '/food/' },
    { name: 'Categories', href: '/food/category/' },
    { name: info.title, href: `/food/category/${category}/` }
  ];

  return (
    <>
      <SEOHead
        title={`${info.title} - Authentic French ${category.replace(/-/g, ' ')} Recipes | ${siteConfig.name}`}
        description={`Discover authentic French ${category.replace(/-/g, ' ')} recipes. ${info.description}. Learn to cook traditional dishes from all regions of France.`}
      >
        <meta name="keywords" content={`French ${category}, ${category} recipes, French cooking, authentic French food, ${info.title.toLowerCase()}`} />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        {/* Hero Section */}
        <section className="relative py-16 bg-surface-dark">
          <div className="container-custom text-center text-white">
            <div className="text-6xl mb-4">{info.icon}</div>
            <p className="font-script text-france-gold mb-2">French Cuisine</p>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
              {info.title}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {info.description}
            </p>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white py-4">
          <div className="container-custom">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Filters */}
        {regions.length > 1 && (
          <section className="py-8 border-b bg-white">
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
                Showing {filteredDishes.length} {category.replace(/-/g, ' ')} recipes
              </div>
            </div>
          </section>
        )}

        {/* Dishes Grid */}
        <section className="py-12">
          <div className="container-custom">
            {Object.entries(dishesByRegion).map(([region, regionDishes]) => (
              <div key={region} className="mb-12">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 capitalize">
                  {region === 'general' ? 'Classic French' : region}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regionDishes.map((dish) => {
                    const dishName = typeof dish.name === 'object' ? dish.name.en : dish.name;
                    const dishFr = typeof dish.name === 'object' ? dish.name.fr : '';
                    const dishDesc = typeof dish.description === 'object'
                      ? dish.description.en
                      : (dish.description || 'Traditional French dish');
                    return (
                      <Link key={dish.slug} href={`/food/${dish.slug}/`}>
                        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                          <div className="relative h-48 mb-4 rounded-t-2xl overflow-hidden">
                            {dish.image && (
                              <Image
                                src={dish.image}
                                alt={dishName}
                                fill
                                className="object-cover"
                              />
                            )}
                            <div className="absolute top-3 right-3">
                              <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-france-blue text-white">
                                {dish.preparation_time}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-xl font-heading font-bold text-gray-900 mb-1">
                              {dishName}
                            </h3>
                            {dishFr && (
                              <p className="text-sm text-gray-500 mb-2">
                                {dishFr}
                              </p>
                            )}
                            <p className="text-gray-600 mb-3 line-clamp-2">
                              {dishDesc}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className={`text-sm font-medium ${
                                dish.difficulty === 'easy' ? 'text-france-blue' :
                                dish.difficulty === 'medium' ? 'text-france-gold' : 'text-france-red'
                              }`}>
                                {dish.difficulty} difficulty
                              </span>
                              <span className="text-france-blue font-medium">
                                View Recipe &rarr;
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

            {filteredDishes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No dishes found with the selected filters. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Back to Food Index */}
        <section className="py-8 bg-surface-cream">
          <div className="container-custom text-center">
            <Link href="/food/" className="inline-block bg-france-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-france-red transition-colors">
              &larr; Back to All French Dishes
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = getAllCategories();

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
  const allDishes = getAllDishes();

  const dishes = allDishes.filter((dish: any) => dish.category === category);

  return {
    props: {
      category,
      dishes
    }
  };
};
