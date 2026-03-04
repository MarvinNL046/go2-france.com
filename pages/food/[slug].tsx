import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { getEnhancedDishBySlug, getDishStaticPaths, generateDishMetadata, getRelatedDishes, generateFoodBreadcrumbs } from '../../lib/food';
import SEOHead from '../../components/SEOHead';

interface DishPageProps { dish: any; relatedDishes: any[]; }

export default function DishPage({ dish, relatedDishes }: DishPageProps) {
  if (!dish) return <div>Dish not found</div>;
  const metadata = generateDishMetadata(dish);
  const seoTitle = `${dish.name.en} — Authentic Recipe, Restaurants & Where to Eat`;
  const descriptionBase = (dish.enhanced_description || dish.description.en).substring(0, 100);
  const seoDescription = `${dish.name.en} (${dish.name.french || ''}) — ${descriptionBase}. Recipe, best restaurants and local prices in France.`;

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription} ogImage={dish.image?.startsWith('http') ? dish.image : `https://go2-france.com${dish.image}`}>
        <meta name="keywords" content={metadata.keywords} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Recipe", "name": dish.name.en,
          "description": dish.enhanced_description || dish.description.en,
          "author": { "@type": "Organization", "name": "Go2France.com", "url": "https://go2-france.com" },
          "recipeCuisine": "French", "recipeCategory": dish.category.replace('-', ' '),
          "image": dish.image.startsWith('http') ? dish.image : `https://go2-france.com${dish.image}`,
          ...(dish.ingredients && { "recipeIngredient": dish.ingredients }),
          "keywords": `${dish.name.en}, ${dish.name.french || ''}, French food, ${dish.category}`
        }) }} />
      </SEOHead>
      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-4">
            <nav className="text-sm text-gray-600">
              <Link href="/" className="hover:text-france-blue">Home</Link><span className="mx-2">&#8250;</span>
              <Link href="/food/" className="hover:text-france-blue">French Food</Link><span className="mx-2">&#8250;</span>
              <span className="text-gray-900">{dish.name.en}</span>
            </nav>
          </div>
        </section>
        <section className="bg-white">
          <div className="container-custom py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-france-blue/10 text-france-blue capitalize">{dish.category.replace('-', ' ')}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">{dish.name.en}</h1>
                <p className="text-2xl text-gray-600 mb-6">{dish.name.french}</p>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">{dish.enhanced_description || dish.description.en}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-surface-cream rounded-xl p-4"><div className="text-sm text-gray-600">Prep Time</div><div className="font-semibold">{dish.preparation_time}</div></div>
                  <div className="bg-surface-cream rounded-xl p-4"><div className="text-sm text-gray-600">Region</div><div className="font-semibold capitalize">{dish.region}</div></div>
                  <div className="bg-surface-cream rounded-xl p-4"><div className="text-sm text-gray-600">Price Range</div><div className="font-semibold capitalize">{dish.price_range}</div></div>
                  <div className="bg-surface-cream rounded-xl p-4"><div className="text-sm text-gray-600">Difficulty</div><div className="font-semibold capitalize">{dish.difficulty}</div></div>
                </div>
              </div>
              <div className="relative">
                <img src={dish.image} alt={dish.name.en} className="w-full h-96 object-cover rounded-2xl shadow-md" onError={(e) => { e.currentTarget.src = '/images/placeholder-food.jpg'; }} />
              </div>
            </div>
          </div>
        </section>
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Ingredients</h2>
                  {dish.detailed_ingredients ? (
                    <div className="space-y-4">{dish.detailed_ingredients.map((ingredient: any, index: number) => (
                      <div key={index} className="border-l-4 border-france-blue pl-4">
                        <h3 className="font-heading font-semibold text-gray-900 capitalize">{ingredient.name}</h3>
                        <p className="text-gray-600 text-sm">{ingredient.purpose}</p>
                        {ingredient.substitutes.length > 0 && <p className="text-gray-500 text-xs mt-1">Substitutes: {ingredient.substitutes.join(', ')}</p>}
                      </div>
                    ))}</div>
                  ) : (
                    <div className="flex flex-wrap gap-2">{dish.ingredients.map((ingredient: string, index: number) => (<span key={index} className="bg-surface-cream text-gray-700 px-3 py-2 rounded-xl capitalize">{ingredient}</span>))}</div>
                  )}
                </div>
                {dish.cooking_method && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Cooking Method</h2>
                    <div className="space-y-4">
                      <div><h3 className="font-heading font-semibold text-gray-900 mb-2">Technique</h3><p className="text-gray-700">{dish.cooking_method.technique}</p></div>
                      <div><h3 className="font-heading font-semibold text-gray-900 mb-2">Overview</h3><p className="text-gray-700">{dish.cooking_method.steps_overview}</p></div>
                      {dish.cooking_method.cooking_tips && dish.cooking_method.cooking_tips.length > 0 && (
                        <div><h3 className="font-heading font-semibold text-gray-900 mb-2">Cooking Tips</h3><ul className="list-disc list-inside space-y-1 text-gray-700">{dish.cooking_method.cooking_tips.map((tip: string, index: number) => (<li key={index}>{tip}</li>))}</ul></div>
                      )}
                    </div>
                  </div>
                )}
                {dish.cultural_significance && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Cultural Significance</h2>
                    <div className="space-y-4">
                      {dish.cultural_significance.origin_story && <div><h3 className="font-heading font-semibold text-gray-900 mb-2">Origin Story</h3><p className="text-gray-700">{dish.cultural_significance.origin_story}</p></div>}
                      {dish.cultural_significance.cultural_importance && <div><h3 className="font-heading font-semibold text-gray-900 mb-2">Cultural Importance</h3><p className="text-gray-700">{dish.cultural_significance.cultural_importance}</p></div>}
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-8">
                {dish.where_to_find && (
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Where to Find</h3>
                    <div className="space-y-4">
                      {dish.where_to_find.best_restaurants && dish.where_to_find.best_restaurants.length > 0 && (
                        <div><h4 className="font-heading font-semibold text-gray-900 mb-2">Best Restaurants</h4><ul className="text-gray-700 text-sm space-y-1">{dish.where_to_find.best_restaurants.map((r: string, i: number) => (<li key={i}>&#8226; {r}</li>))}</ul></div>
                      )}
                    </div>
                  </div>
                )}
                {dish.nutritional_info && (
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Nutritional Info</h3>
                    <div className="space-y-3">
                      <div><span className="font-semibold text-gray-900">Calories per serving:</span><p className="text-gray-700">{dish.nutritional_info.calories_per_serving}</p></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        {relatedDishes.length > 0 && (
          <section className="bg-white section-padding">
            <div className="container-custom">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">Related Dishes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedDishes.map((rd: any) => (
                  <Link key={rd.id} href={`/food/${rd.slug}`} className="group">
                    <div className="bg-surface-cream rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <img src={rd.image} alt={rd.name.en} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.currentTarget.src = '/images/placeholder-food.jpg'; }} />
                      <div className="p-4"><h3 className="font-heading font-semibold text-gray-900 group-hover:text-france-blue transition-colors">{rd.name.en}</h3><p className="text-gray-600 text-sm">{rd.name.french}</p></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="bg-surface-dark text-white section-padding">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">Explore More French Cuisine</h2>
            <Link href="/food/" className="bg-white text-france-blue px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">Browse All Dishes</Link>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getDishStaticPaths();
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const dish = getEnhancedDishBySlug(slug);
  if (!dish) return { notFound: true };
  const relatedDishes = getRelatedDishes(dish, 4);
  return { props: { dish, relatedDishes }, revalidate: 86400 };
};
