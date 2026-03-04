import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { getAllDishes } from '../../lib/food';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHead from '../../components/SEOHead';

interface Dish {
  id: number; slug: string; name: { en: string; nl: string; french: string; };
  category: string; region: string; spice_level: string; image: string;
  difficulty: string; preparation_time: string; price_range: string; ingredients: string[];
}

interface FoodIndexPageProps { dishes: Dish[]; categories: string[]; }

export default function FoodIndexPage({ dishes, categories }: FoodIndexPageProps) {
  const initialLoad = Math.min(12, dishes.length);
  const [visibleDishes, setVisibleDishes] = useState(initialLoad);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowMore = () => {
    setIsLoading(true);
    setTimeout(() => { setVisibleDishes(prev => Math.min(prev + 12, dishes.length)); setIsLoading(false); }, 300);
  };

  const remainingDishes = dishes.length - visibleDishes;

  return (
    <>
      <SEOHead title={`French Food Guide 2026 — ${dishes.length} Authentic Dishes & Recipes`} description={`Explore ${dishes.length} authentic French dishes with recipes, restaurant tips and local picks. From Croissants to Coq au Vin — your complete French cuisine guide.`}>
        <meta name="keywords" content="French food, French cuisine, French recipes, Croissant, Coq au Vin, Ratatouille, French dishes, authentic French cooking" />
      </SEOHead>
      <div className="bg-surface-cream min-h-screen">
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <div className="text-center">
              <p className="font-script text-france-gold mb-2">Authentic Flavors</p>
              <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">French Food Guide</h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">Discover the authentic flavors of France - from patisserie favorites to traditional regional recipes</p>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (<span key={category} className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">{category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>))}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white"><div className="container-custom py-6"><Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'French Food Guide', href: '/food' }]} /></div></section>
        <section className="section-padding">
          <div className="container-custom">
            <p className="section-label font-script text-france-gold text-center">Discover</p>
            <h2 className="text-3xl font-heading font-bold text-center mb-8">All French Dishes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dishes.slice(0, visibleDishes).map((dish) => (
                <Link key={dish.id} href={`/food/${dish.slug}`} className="group">
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image src={dish.image} alt={dish.name.en} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-3 right-3"><span className="bg-white bg-opacity-90 text-france-blue px-2 py-1 rounded-full text-xs font-medium">{dish.preparation_time}</span></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-heading font-bold text-gray-900 mb-2 group-hover:text-france-blue transition-colors">{dish.name.en}</h3>
                      <p className="text-gray-600 text-sm mb-3">{dish.name.french}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4"><span>{dish.preparation_time}</span><span>{dish.region}</span><span>{dish.price_range}</span></div>
                      <div className="flex flex-wrap gap-1">
                        {dish.ingredients.slice(0, 3).map((ingredient, index) => (<span key={index} className="bg-surface-cream text-gray-600 px-2 py-1 rounded-full text-xs">{ingredient}</span>))}
                        {dish.ingredients.length > 3 && (<span className="bg-surface-cream text-gray-600 px-2 py-1 rounded-full text-xs">+{dish.ingredients.length - 3} more</span>)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {visibleDishes < dishes.length && (
              <div className="text-center mt-12">
                <button onClick={handleShowMore} disabled={isLoading} className="bg-france-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-france-red transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-50">
                  {isLoading ? 'Loading...' : `Show More Dishes (${remainingDishes} remaining)`}
                </button>
              </div>
            )}
          </div>
        </section>
        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="text-center mb-10">
              <p className="section-label font-script text-france-gold">Experience</p>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">Book a French Cooking Class</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Learn to cook authentic French dishes with expert local chefs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Cooking Classes &amp; Food Tours</h3>
                <p className="text-gray-600 mb-6">Cooking classes and food tours across France</p>
                <a href="https://klook.tpo.lv/7Dt6WApj" target="_blank" rel="noopener noreferrer" className="inline-block bg-france-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-france-blue transition-colors">Browse on Klook</a>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Food Walking Tours</h3>
                <p className="text-gray-600 mb-6">Guided food walking tours</p>
                <a href="https://getyourguide.tpo.lv/6HngJ5FC" target="_blank" rel="noopener noreferrer" className="inline-block bg-france-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-france-red transition-colors">Browse on GetYourGuide</a>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">We may earn a commission when you book through our links, at no extra cost to you.</p>
          </div>
        </section>
        <section className="bg-surface-dark text-white section-padding">
          <div className="container-custom text-center">
            <p className="font-script text-france-gold mb-2">Explore More</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-6">Ready to Explore France?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">Discover the cities where these amazing dishes come from</p>
            <Link href="/city/" className="bg-white text-france-blue px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">Explore French Cities</Link>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const dishes = getAllDishes();
  const categorySet = new Set(dishes.map((dish: any) => dish.category));
  const categories = Array.from(categorySet) as string[];
  return { props: { dishes, categories } };
};
