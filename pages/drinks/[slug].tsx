import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHead from '../../components/SEOHead';
import AffiliateWidget from '../../components/AffiliateWidget';
import { useTranslation } from '../../hooks/useTranslation';
import { siteConfig } from '../../site.config';

const { getDrinkBySlug, getDrinkSlugs, getRelatedDrinks } = require('../../lib/drinks');

interface DrinkPageProps {
  drink: any;
  relatedDrinks: any[];
}

export default function DrinkPage({ drink, relatedDrinks }: DrinkPageProps) {
  const router = useRouter();
  const locale = router.locale || 'en';
  const { t } = useTranslation('common');

  if (!drink) return <div>Drink not found</div>;

  const drinkName = typeof drink.name === 'object' ? drink.name.en : drink.name;
  const drinkFr = typeof drink.name === 'object' ? (drink.name.fr || '') : '';
  const drinkDesc = drink.enhanced_description || (typeof drink.description === 'object' ? drink.description.en : drink.description) || '';

  const getTemperatureDisplay = (temp: string) => {
    const displays: Record<string, string> = {
      'hot': 'Served Hot',
      'cold': 'Served Cold',
      'both': 'Hot or Cold',
      'room': 'Room Temperature',
      'neat': 'Served Neat',
      'mixed': 'Mixed Drink'
    };
    return displays[temp] || temp;
  };

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'French Drinks', href: '/drinks/' },
    { name: drink.category, href: `/drinks/category/${drink.category}/` },
    { name: drinkName, href: `/drinks/${drink.slug}/` }
  ];

  return (
    <>
      <SEOHead
        title={`${drinkName} -- Recipe, Where to Try & History | ${siteConfig.name}`}
        description={`${drinkName}${drinkFr ? ` (${drinkFr})` : ''} -- learn how it's made, where to find it and what makes this French ${drink.category} drink special.`}
      >
        <meta name="keywords" content={`${drinkName}, ${drinkFr}, French ${drink.category}, French drinks, France beverages`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Recipe",
              "name": drinkName,
              "description": drinkDesc,
              "author": {
                "@type": "Organization",
                "name": "Go2France",
                "url": "https://go2-france.com"
              },
              "recipeCuisine": "French",
              "recipeCategory": drink.category,
              "image": drink.image?.startsWith('http') ? drink.image : `https://go2-france.com${drink.image}`,
              ...(drink.ingredients && { "recipeIngredient": drink.ingredients }),
              ...(drink.preparation_method?.steps && {
                "recipeInstructions": drink.preparation_method.steps.map((step: string, i: number) => ({
                  "@type": "HowToStep",
                  "name": `Step ${i + 1}`,
                  "text": step
                }))
              }),
              "keywords": `${drinkName}, ${drinkFr}, French ${drink.category}`
            })
          }}
        />
      </SEOHead>

      <div className="min-h-screen bg-surface-cream">
        {/* Breadcrumbs */}
        <section className="bg-white py-4">
          <div className="container-custom">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-white pb-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image */}
              <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden">
                {drink.image && (
                  <Image
                    src={drink.image}
                    alt={drinkName}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {drink.alcohol_content && drink.alcohol_content !== 'none' && (
                    <span className="bg-france-red text-white px-3 py-1 rounded-full text-sm font-medium">
                      {drink.alcohol_content} alcohol
                    </span>
                  )}
                  {drink.caffeine && drink.caffeine !== 'none' && (
                    <span className="bg-france-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                      {drink.caffeine} caffeine
                    </span>
                  )}
                  {drink.temperature && (
                    <span className="bg-france-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                      {getTemperatureDisplay(drink.temperature)}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div>
                <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
                  {drinkName}
                </h1>
                {drinkFr && (
                  <p className="text-2xl text-gray-500 mb-4">
                    {drinkFr}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-surface-cream px-3 py-1 rounded-full text-sm capitalize">
                    {drink.category}
                  </span>
                  {drink.price_range && (
                    <span className="bg-surface-cream px-3 py-1 rounded-full text-sm">
                      {drink.price_range}
                    </span>
                  )}
                  {drink.region && (
                    <span className="bg-surface-cream px-3 py-1 rounded-full text-sm">
                      {drink.region === 'all' ? 'All France' : `${drink.region} region`}
                    </span>
                  )}
                </div>

                <p className="text-lg text-gray-700 mb-6">
                  {drinkDesc}
                </p>

                {/* Quick Info */}
                <div className="bg-surface-cream p-6 rounded-2xl">
                  <h3 className="font-heading font-semibold mb-4">Quick Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {drink.occasions && drink.occasions.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600">Best Occasions</p>
                        <p className="font-medium">{drink.occasions.join(', ')}</p>
                      </div>
                    )}
                    {drink.type && (
                      <div>
                        <p className="text-sm text-gray-600">Type</p>
                        <p className="font-medium capitalize">{drink.type}</p>
                      </div>
                    )}
                    {drink.allergens && drink.allergens.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600">Allergens</p>
                        <p className="font-medium">{drink.allergens.join(', ')}</p>
                      </div>
                    )}
                    {drink.dietary && drink.dietary.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600">Dietary</p>
                        <p className="font-medium">{drink.dietary.join(', ')}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ingredients Section */}
        {drink.ingredients && drink.ingredients.length > 0 && (
          <section className="bg-white py-12 border-t">
            <div className="container-custom">
              <p className="section-label font-script text-france-gold">Recipe</p>
              <h2 className="text-2xl font-heading font-bold mb-6">Ingredients</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {drink.detailed_ingredients ? (
                  drink.detailed_ingredients.map((ing: any, index: number) => (
                    <div key={index} className="bg-surface-cream p-4 rounded-2xl">
                      <h4 className="font-heading font-semibold mb-2">{ing.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{ing.purpose}</p>
                      {ing.substitutes && ing.substitutes.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Substitutes:</p>
                          <ul className="text-xs text-gray-600">
                            {ing.substitutes.map((sub: string, i: number) => (
                              <li key={i}>&#8226; {sub}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  drink.ingredients.map((ing: string, index: number) => (
                    <div key={index} className="bg-surface-cream p-3 rounded-2xl">
                      <p className="font-medium">{ing}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        )}

        {/* Preparation Method */}
        {drink.preparation_method && (
          <section className="bg-surface-cream py-12">
            <div className="container-custom">
              <p className="section-label font-script text-france-gold">How To</p>
              <h2 className="text-2xl font-heading font-bold mb-6">How to Make {drinkName}</h2>
              <div className="bg-white p-8 rounded-2xl">
                {drink.preparation_method.overview && (
                  <p className="text-gray-700 mb-6">{drink.preparation_method.overview}</p>
                )}
                {drink.preparation_method.steps && (
                  <div>
                    <h3 className="font-heading font-semibold mb-4">Steps:</h3>
                    <ol className="space-y-3">
                      {drink.preparation_method.steps.map((step: string, index: number) => (
                        <li key={index} className="flex">
                          <span className="bg-france-red text-white w-6 h-6 rounded-xl flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                {drink.preparation_method.tips && (
                  <div className="mt-6 bg-surface-cream p-4 rounded-2xl">
                    <h4 className="font-heading font-semibold mb-2">Pro Tips:</h4>
                    <ul className="text-sm space-y-1">
                      {drink.preparation_method.tips.map((tip: string, index: number) => (
                        <li key={index}>&#8226; {tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Inline Cooking Class CTA */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-gray-700 text-sm">
                    Want to experience French drink culture firsthand?{' '}
                    <a
                      href={siteConfig.affiliateLinks.klook}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="text-france-blue font-semibold hover:underline"
                    >
                      Book a wine tasting or cooking class
                    </a>
                    {' '}and learn to make {drinkName} and more.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Cultural Significance */}
        {drink.cultural_significance && (
          <section className="bg-white py-12">
            <div className="container-custom">
              <p className="section-label font-script text-france-gold">Heritage</p>
              <h2 className="text-2xl font-heading font-bold mb-6">Cultural Background</h2>
              <div className="prose max-w-none">
                {drink.cultural_significance.history && (
                  <p className="text-gray-700">{drink.cultural_significance.history}</p>
                )}
                {drink.cultural_significance.occasions && (
                  <div className="mt-6">
                    <h3 className="font-heading font-semibold mb-3">Traditional Occasions:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {drink.cultural_significance.occasions.map((occasion: any, index: number) => (
                        <div key={index} className="bg-surface-cream p-4 rounded-2xl">
                          <h4 className="font-heading font-medium">{typeof occasion === 'string' ? occasion : occasion.name}</h4>
                          {typeof occasion !== 'string' && occasion.description && (
                            <p className="text-sm text-gray-600">{occasion.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Where to Find */}
        {drink.where_to_find && (
          <section className="bg-surface-cream py-12">
            <div className="container-custom">
              <p className="section-label font-script text-france-gold">Discover</p>
              <h2 className="text-2xl font-heading font-bold mb-6">Where to Try {drinkName}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {drink.where_to_find.best_locations && (
                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="font-heading font-semibold mb-3">Best Locations</h3>
                    <ul className="space-y-2">
                      {drink.where_to_find.best_locations.map((location: string, index: number) => (
                        <li key={index} className="text-gray-700">&#8226; {location}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {drink.where_to_find.popular_venues && (
                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="font-heading font-semibold mb-3">Popular Venues</h3>
                    <ul className="space-y-2">
                      {drink.where_to_find.popular_venues.map((venue: string, index: number) => (
                        <li key={index} className="text-gray-700">&#8226; {venue}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {drink.where_to_find.price_ranges && (
                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="font-heading font-semibold mb-3">Price Range</h3>
                    <div className="space-y-2">
                      {drink.where_to_find.price_ranges.street && (
                        <p className="text-gray-700">Cafe/Bistro: {drink.where_to_find.price_ranges.street}</p>
                      )}
                      {drink.where_to_find.price_ranges.restaurant && (
                        <p className="text-gray-700">Restaurant: {drink.where_to_find.price_ranges.restaurant}</p>
                      )}
                      {drink.where_to_find.price_ranges.hotel && (
                        <p className="text-gray-700">Hotel/Bar: {drink.where_to_find.price_ranges.hotel}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* Inline Food Tour CTA */}
              <div className="mt-4 p-3 bg-orange-50 rounded-xl border border-orange-200">
                <p className="text-gray-700 text-sm">
                  <a
                    href={siteConfig.affiliateLinks.getYourGuide}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="text-orange-700 font-semibold hover:underline"
                  >
                    Join a food &amp; wine tour
                  </a>
                  {' '}to discover the best local drinks and cuisine with a guide.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Related Drinks */}
        {relatedDrinks && relatedDrinks.length > 0 && (
          <section className="bg-white py-12">
            <div className="container-custom">
              <h2 className="text-2xl font-heading font-bold mb-6">Related French Drinks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedDrinks.map((rd: any) => {
                  const rdName = typeof rd.name === 'object' ? rd.name.en : rd.name;
                  return (
                    <Link key={rd.slug} href={`/drinks/${rd.slug}/`} className="group">
                      <div className="bg-surface-cream rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        {rd.image && (
                          <div className="relative h-32">
                            <Image src={rd.image} alt={rdName} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-heading font-semibold text-gray-900 group-hover:text-france-blue transition-colors">
                            {rdName}
                          </h3>
                          <p className="text-gray-600 text-sm capitalize">{rd.category}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="text-center mt-8">
                <Link
                  href={`/drinks/category/${drink.category}/`}
                  className="inline-block bg-france-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-france-red transition-colors"
                >
                  View All {drink.category} Drinks
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getDrinkSlugs();
  const paths = slugs.map((slug: string) => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const drink = getDrinkBySlug(slug);

  if (!drink) {
    return { notFound: true };
  }

  const relatedDrinks = getRelatedDrinks(drink, 4);

  return {
    props: {
      drink,
      relatedDrinks
    }
  };
};
