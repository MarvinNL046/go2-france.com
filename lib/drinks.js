const SITE_URL = 'https://go2-france.com';

// Ensure image path is an absolute URL
function toAbsoluteImageUrl(imgPath) {
  if (!imgPath) return `${SITE_URL}/og-default.webp`;
  if (imgPath.startsWith('http')) return imgPath;
  return `${SITE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
}

// Get drink data by slug
function getDrinkData(slug, enhanced = false) {
  try {
    if (enhanced) {
      return require(`../data/enhanced/drinks/${slug}.json`);
    }
    return require(`../data/drinks/${slug}.json`);
  } catch {
    return null;
  }
}

// Get all drinks
function getAllDrinks(enhanced = false) {
  try {
    let index;
    if (enhanced) {
      index = require('../data/enhanced/drinks/index.json');
    } else {
      index = require('../data/drinks/index.json');
    }
    // Support both { drinks: [...] } and [...] formats
    const drinksList = Array.isArray(index) ? index : (index.drinks || []);
    return drinksList.map(drinkRef => {
      const slug = typeof drinkRef === 'string' ? drinkRef : drinkRef.slug;
      return getDrinkData(slug, enhanced);
    }).filter(Boolean);
  } catch (error) {
    console.error('Error loading drinks index:', error.message);
    return [];
  }
}

// Get drink by slug (tries enhanced first, falls back to regular)
function getDrinkBySlug(slug) {
  let drink = getDrinkData(slug, true);

  if (!drink || !drink.enhanced_description) {
    const regularDrink = getDrinkData(slug, false);
    if (regularDrink) {
      drink = regularDrink;
    }
  }

  return drink;
}

// Get all drink slugs
function getDrinkSlugs() {
  try {
    const index = require('../data/drinks/index.json');
    const drinksList = Array.isArray(index) ? index : (index.drinks || []);
    return drinksList.map(d => typeof d === 'string' ? d : d.slug);
  } catch (error) {
    console.error('Error loading drink slugs:', error.message);
    return [];
  }
}

// Get drinks by category
function getDrinksByCategory(category, enhanced = false) {
  const allDrinks = getAllDrinks(enhanced);
  return allDrinks.filter(drink => drink.category === category);
}

// Get drinks by type
function getDrinksByType(type, enhanced = false) {
  const allDrinks = getAllDrinks(enhanced);
  return allDrinks.filter(drink => drink.type === type);
}

// Get all drink categories (typical for French drinks)
function getDrinkCategories() {
  return ['wine', 'champagne', 'spirits', 'liqueur', 'beer', 'coffee', 'tea', 'juice', 'cocktail', 'non-alcoholic'];
}

// Get all drink types
function getDrinkTypes() {
  return ['hot', 'cold', 'both', 'neat', 'mixed', 'room'];
}

// Get static paths for Next.js
function getDrinkStaticPaths() {
  const slugs = getDrinkSlugs();
  return slugs.map(slug => ({
    params: { slug }
  }));
}

// Generate drink metadata for SEO
function generateDrinkMetadata(drink) {
  if (!drink) return {};

  const drinkName = drink.name?.en || drink.name || '';
  const drinkFr = drink.name?.fr || '';
  const desc = drink.enhanced_description || drink.description?.en || drink.description || '';

  const title = `${drinkName}: French Drink Guide & Where to Try It (2026)`;
  const description = `${drinkName}${drinkFr ? ` (${drinkFr})` : ''} - ${desc.substring(0, 120)}. Discover the best places to enjoy this classic French drink!`;

  return {
    title,
    description,
    keywords: [drinkName, drinkFr, 'French drinks', 'French beverages', drink.category, drink.region].filter(Boolean).join(', '),
    openGraph: {
      title,
      description,
      images: [
        {
          url: toAbsoluteImageUrl(drink.image),
          width: 1200,
          height: 630,
          alt: drinkName
        }
      ],
      type: 'website'
    }
  };
}

// Generate breadcrumbs for drink pages
function generateDrinkBreadcrumbs(drink = null, category = null) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'French Drinks', href: '/drinks/' }
  ];

  if (category) {
    breadcrumbs.push({
      name: category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      href: `/drinks/category/${category}/`
    });
  }

  if (drink) {
    const drinkName = drink.name?.en || drink.name || '';
    breadcrumbs.push({
      name: drinkName,
      href: `/drinks/${drink.slug}/`
    });
  }

  return breadcrumbs;
}

// Get related drinks (same category)
function getRelatedDrinks(currentDrink, limit = 4) {
  const allDrinks = getAllDrinks();
  const related = allDrinks
    .filter(d => d.slug !== currentDrink.slug)
    .filter(d => d.category === currentDrink.category || d.region === currentDrink.region)
    .slice(0, limit);

  if (related.length < limit) {
    const remaining = allDrinks
      .filter(d => d.slug !== currentDrink.slug && !related.includes(d))
      .slice(0, limit - related.length);
    related.push(...remaining);
  }

  return related;
}

// Get all drink slugs formatted for getStaticPaths
function getAllDrinkSlugs() {
  return getDrinkSlugs().map(slug => ({
    params: { slug }
  }));
}

// Get all unique drink categories from data
function getAllDrinkCategories() {
  const drinks = getAllDrinks();
  const categorySet = new Set(drinks.map(drink => drink.category).filter(Boolean));
  return Array.from(categorySet);
}

// CommonJS exports
module.exports = {
  getDrinkBySlug,
  getDrinkData,
  getAllDrinks,
  getDrinkSlugs,
  getAllDrinkSlugs,
  getDrinksByCategory,
  getDrinksByType,
  getDrinkCategories,
  getAllDrinkCategories,
  getDrinkTypes,
  getDrinkStaticPaths,
  generateDrinkMetadata,
  generateDrinkBreadcrumbs,
  getRelatedDrinks,
  toAbsoluteImageUrl
};
