import Link from 'next/link';
import { useRouter } from 'next/router';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { useTranslation } from '../../../hooks/useTranslation';
import { siteConfig } from '../../../site.config';

const categoryInfo: Record<string, { title: string; description: string; icon: string; count: number }> = {
  'appetizer': {
    title: 'Appetizers',
    description: 'Classic French starters and hors d\'oeuvres that set the stage for an unforgettable meal',
    icon: '',
    count: 10
  },
  'main-course': {
    title: 'Main Courses',
    description: 'Hearty and refined French main dishes from coq au vin to duck confit',
    icon: '',
    count: 15
  },
  'dessert': {
    title: 'Desserts',
    description: 'Exquisite French desserts from creme brulee to tarte tatin and macarons',
    icon: '',
    count: 12
  },
  'pastry': {
    title: 'Pastries',
    description: 'Iconic French pastries and baked goods -- croissants, pain au chocolat and more',
    icon: '',
    count: 10
  },
  'cheese': {
    title: 'Cheese',
    description: 'France\'s legendary cheese varieties from soft Brie to pungent Roquefort',
    icon: '',
    count: 8
  },
  'sauce': {
    title: 'Sauces',
    description: 'The mother sauces and classic French preparations that define the cuisine',
    icon: '',
    count: 6
  }
};

export default function FoodCategoriesIndex() {
  const router = useRouter();
  const locale = router.locale || 'en';
  const { t } = useTranslation('common');

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'French Food', href: '/food/' },
    { name: 'Categories', href: '/food/category/' }
  ];

  return (
    <>
      <SEOHead
        title={`French Food Categories - Explore Dishes by Type | ${siteConfig.name}`}
        description="Browse French dishes by category. Explore appetizers, main courses, desserts, pastries, cheese and sauces. Find authentic recipes from all regions of France."
      >
        <meta name="keywords" content="French food categories, French dishes, French recipes, French cuisine types, French appetizers, French desserts, French cheese" />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        {/* Hero Section */}
        <section className="relative py-16 bg-surface-dark">
          <div className="container-custom text-center text-white">
            <p className="font-script text-france-gold mb-2">Explore by Type</p>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
              French Food Categories
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Explore the diverse world of French cuisine organized by dish type. From elegant appetizers to decadent desserts and legendary cheeses.
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
                <Link key={slug} href={`/food/category/${slug}/`}>
                  <div className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                    <div className="text-center">
                      <div className="text-5xl mb-4">{info.icon}</div>
                      <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">{info.title}</h2>
                      <p className="text-gray-600 mb-4">{info.description}</p>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <span className="text-sm font-medium text-gray-500">
                          {info.count} Traditional Dishes
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

        {/* Additional Info */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p className="section-label font-script text-france-gold">About</p>
              <h2 className="text-3xl font-heading font-bold mb-4">About French Food Categories</h2>
              <p className="text-gray-600 mb-8">
                French cuisine is one of the most celebrated in the world, with each category offering unique flavors, techniques and traditions.
                From the delicate artistry of pastry-making to the rich complexity of sauces, each category represents an essential pillar
                of French culinary heritage. UNESCO recognized French gastronomy as an Intangible Cultural Heritage of Humanity in 2010.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md">
                  <h3 className="font-heading font-semibold mb-2">Regional Traditions</h3>
                  <p className="text-sm text-gray-600">
                    Each region has its own unique specialties and cooking traditions
                  </p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md">
                  <h3 className="font-heading font-semibold mb-2">Classic Techniques</h3>
                  <p className="text-sm text-gray-600">
                    French cooking techniques form the foundation of Western cuisine
                  </p>
                </div>
                <div className="bg-surface-cream p-6 rounded-2xl shadow-md">
                  <h3 className="font-heading font-semibold mb-2">Fresh Ingredients</h3>
                  <p className="text-sm text-gray-600">
                    Quality seasonal ingredients are at the heart of French cooking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Affiliate: Book a French Cooking Class */}
        <section className="bg-white py-16">
          <div className="container-custom">
            <div className="text-center mb-10">
              <p className="section-label font-script text-france-gold">Experience</p>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
                Book a French Cooking Class
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn to cook authentic French dishes with expert local chefs -- from classic bistro fare to haute cuisine
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Cooking Classes &amp; Food Tours</h3>
                <p className="text-gray-600 mb-6">
                  Cooking classes and food tours across France
                </p>
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
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Food Walking Tours</h3>
                <p className="text-gray-600 mb-6">
                  Guided food walking tours in Paris, Lyon and beyond
                </p>
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

        {/* Call to Action */}
        <section className="py-8 bg-white">
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
