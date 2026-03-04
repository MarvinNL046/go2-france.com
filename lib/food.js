const SITE_URL = 'https://go2-france.com';

// Ensure image path is an absolute URL
function toAbsoluteImageUrl(imgPath) {
  if (!imgPath) return `${SITE_URL}/og-default.webp`;
  if (imgPath.startsWith('http')) return imgPath;
  return `${SITE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
}

// Get all dishes from the food index
function getAllDishes() {
  try {
    const foodIndex = require('../data/food/index.json');
    return foodIndex;
  } catch (error) {
    console.error('Error loading food index:', error.message);
    return [];
  }
}

// Get enhanced dishes from the enhanced food index
function getAllEnhancedDishes() {
  try {
    const enhancedIndex = require('../data/enhanced/food/index.json');
    return enhancedIndex;
  } catch (error) {
    console.error('Error loading enhanced food index:', error.message);
    return getAllDishes();
  }
}

// Get single dish by slug
function getDishBySlug(slug) {
  // Try enhanced first
  try {
    const enhancedData = require(`../data/enhanced/food/${slug}.json`);
    return enhancedData;
  } catch {}

  // Fallback to standard data
  try {
    const dishData = require(`../data/food/${slug}.json`);
    return dishData;
  } catch (error) {
    console.error(`Error loading dish data for ${slug}:`, error.message);
  }
  return null;
}

// Get enhanced dish by slug
function getEnhancedDishBySlug(slug) {
  try {
    const enhancedData = require(`../data/enhanced/food/${slug}.json`);
    return enhancedData;
  } catch {}

  // Fallback to regular dish data
  return getDishBySlug(slug);
}

// Get all dish slugs
function getDishSlugs() {
  return getAllDishes().map(dish => dish.slug);
}

// Get dishes by category
function getDishesByCategory(category) {
  const allDishes = getAllDishes();
  return allDishes.filter(dish => dish.category === category);
}

// Get all categories
function getAllCategories() {
  const dishes = getAllDishes();
  const categorySet = new Set(dishes.map(dish => dish.category).filter(Boolean));
  return Array.from(categorySet);
}

// Get dishes by region
function getDishesByRegion(region) {
  const allDishes = getAllDishes();
  return allDishes.filter(dish => dish.region === region);
}

// Get static paths for dish pages
function getDishStaticPaths() {
  const dishes = getAllDishes();
  return dishes.map(dish => ({
    params: { slug: dish.slug }
  }));
}

// Get static paths for category pages
function getCategoryStaticPaths() {
  const categories = getAllCategories();
  return categories.map(category => ({
    params: { category }
  }));
}

// Generate dish metadata for SEO
function generateDishMetadata(dish) {
  if (!dish) return {};

  const dishName = dish.name?.en || dish.name || '';
  const dishFr = dish.name?.fr || '';
  const desc = dish.enhanced_description || dish.description?.en || dish.description || '';

  const title = `${dishName}: Recipe, Best Spots & French Cuisine Guide (2026)`;
  const description = `${dishName}${dishFr ? ` (${dishFr})` : ''} - ${desc.substring(0, 120)}. Find recipes, best restaurants & where to try it!`;
  const keywords = [
    dishName,
    dishFr,
    'French food',
    'French cuisine',
    dish.category,
    dish.region,
    ...(dish.ingredients || []).slice(0, 5)
  ].filter(Boolean).join(', ');

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: toAbsoluteImageUrl(dish.image),
          width: 1200,
          height: 630,
          alt: dishName
        }
      ],
      type: 'website'
    }
  };
}

// Generate category metadata for SEO
function generateCategoryMetadata(category) {
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const title = `French ${categoryName} | Authentic French ${categoryName} Recipes`;
  const description = `Discover authentic French ${categoryName.toLowerCase()} recipes and cooking techniques. Learn about traditional ingredients and cultural significance.`;
  const keywords = `French ${categoryName.toLowerCase()}, French cuisine, French recipes, authentic French cooking, ${category}`;

  return {
    title,
    description,
    keywords
  };
}

// Search dishes by name or ingredients
function searchDishes(query) {
  const allDishes = getAllDishes();
  const searchTerm = query.toLowerCase();

  return allDishes.filter(dish => {
    const nameEn = (dish.name?.en || dish.name || '').toLowerCase();
    const nameFr = (dish.name?.fr || '').toLowerCase();
    const desc = (dish.description?.en || dish.description || '').toLowerCase();
    const ingredients = dish.ingredients || [];

    return nameEn.includes(searchTerm) ||
      nameFr.includes(searchTerm) ||
      ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm)) ||
      desc.includes(searchTerm);
  });
}

// Get related dishes (same category or region)
function getRelatedDishes(dish, limit = 4) {
  const allDishes = getAllDishes();

  const related = allDishes
    .filter(d => d.slug !== dish.slug)
    .filter(d => d.category === dish.category || d.region === dish.region)
    .slice(0, limit);

  if (related.length < limit) {
    const remaining = allDishes
      .filter(d => d.slug !== dish.slug && !related.includes(d))
      .slice(0, limit - related.length);
    related.push(...remaining);
  }

  return related;
}

// Get popular dishes
function getPopularDishes(limit = 6) {
  const allDishes = getAllDishes();
  const categories = getAllCategories();
  const popular = [];

  categories.forEach(category => {
    const categoryDishes = allDishes.filter(dish => dish.category === category);
    if (categoryDishes.length > 0) {
      popular.push(categoryDishes[0]);
    }
  });

  return popular.slice(0, limit);
}

// Generate breadcrumbs for food pages
function generateFoodBreadcrumbs(dish = null, category = null) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'French Food', href: '/food/' }
  ];

  if (category) {
    breadcrumbs.push({
      name: category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      href: `/food/category/${category}/`
    });
  }

  if (dish) {
    const dishName = dish.name?.en || dish.name || '';
    breadcrumbs.push({
      name: dishName,
      href: `/food/${dish.slug}/`
    });
  }

  return breadcrumbs;
}

// Check if dish has enhanced content
function hasEnhancedContent(slug) {
  try {
    require(`../data/enhanced/food/${slug}.json`);
    return true;
  } catch (error) {
    return false;
  }
}

// Alias: Get all food slugs formatted for getStaticPaths
function getAllFoodSlugs() {
  return getDishStaticPaths();
}

// Alias: Get food by slug (alias for getDishBySlug)
function getFoodBySlug(slug) {
  return getDishBySlug(slug);
}

// Alias: Get food by category (alias for getDishesByCategory)
function getFoodByCategory(category) {
  return getDishesByCategory(category);
}

// Alias: Get all food categories (alias for getAllCategories)
function getAllFoodCategories() {
  return getAllCategories();
}

// CommonJS exports
module.exports = {
  getAllDishes,
  getAllEnhancedDishes,
  getDishBySlug,
  getEnhancedDishBySlug,
  getDishSlugs,
  getDishesByCategory,
  getAllCategories,
  getDishesByRegion,
  getDishStaticPaths,
  getCategoryStaticPaths,
  generateDishMetadata,
  generateCategoryMetadata,
  searchDishes,
  getRelatedDishes,
  getPopularDishes,
  generateFoodBreadcrumbs,
  hasEnhancedContent,
  toAbsoluteImageUrl,
  // Aliases for consistent naming
  getAllFoodSlugs,
  getFoodBySlug,
  getFoodByCategory,
  getAllFoodCategories
};
