const SITE_URL = 'https://go2-france.com';

// Ensure image path is an absolute URL
function toAbsoluteImageUrl(imgPath) {
  if (!imgPath) return `${SITE_URL}/og-default.webp`;
  if (imgPath.startsWith('http')) return imgPath;
  return `${SITE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
}

// Get all cities for static generation
function getAllCities() {
  try {
    const citiesIndex = require('../data/cities/index.json');
    return citiesIndex;
  } catch (error) {
    console.error('Error loading cities index:', error.message);
    return [];
  }
}

// Get city data by slug (with enhanced content if available)
function getCityBySlug(slug) {
  // Try enhanced version first
  try {
    const enhancedData = require(`../data/enhanced/${slug}.json`);
    return enhancedData;
  } catch {}

  // Fall back to standard data
  try {
    const cityData = require(`../data/cities/${slug}.json`);
    return cityData;
  } catch (error) {
    console.error(`Error loading city data for ${slug}:`, error.message);
  }

  return null;
}

// Get original city data (without enhancements)
function getOriginalCityBySlug(slug) {
  try {
    const cityData = require(`../data/cities/${slug}.json`);
    return cityData;
  } catch (error) {
    console.error(`Error loading original city data for ${slug}:`, error.message);
  }
  return null;
}

// Get enhanced city data specifically
function getEnhancedCityBySlug(slug) {
  try {
    const enhancedData = require(`../data/enhanced/${slug}.json`);
    return enhancedData;
  } catch (error) {
    console.error(`Error loading enhanced city data for ${slug}:`, error.message);
  }
  return null;
}

// Get all city slugs
function getCitySlugs() {
  return getAllCities().map(city => city.slug);
}

// Get static paths for Next.js
function getCityStaticPaths() {
  const cities = getAllCities();
  return cities.map(city => ({
    params: { slug: city.slug }
  }));
}

// Get image for specific section (manual control)
function getCityImageForSection(city, section = 'hero') {
  if (!city) return city?.image || '';

  // Check if city has images object with section-specific images
  if (city.images && city.images[section]) {
    return city.images[section];
  }

  // Fallback to main image
  return city.image || '';
}

// Generate SEO metadata with enhanced support
function generateCityMetadata(city, category = '') {
  if (!city) return {};

  const rawCityDesc = city.enhanced_description || city.seo?.metaDescription?.en || city.description?.en || '';
  const description = rawCityDesc.length > 155 ? rawCityDesc.substring(0, 155) + '...' : rawCityDesc;

  const baseTitle = `${city.name.en} 2026: Top Things to Do, Hotels & Tips`;
  const title = category ?
    `${city.categories?.[category]?.en || baseTitle}` :
    baseTitle;

  const optimizedDescription = `Complete ${city.name.en} travel guide 2026. Best attractions, hotels, restaurants & insider tips. Plan your trip to France now!`;

  return {
    title,
    description: optimizedDescription,
    keywords: [...(city.tags || []), city.name.en, city.region, city.province].filter(Boolean).join(', '),
    openGraph: {
      title,
      description,
      images: [
        {
          url: toAbsoluteImageUrl(getCityImageForSection(city, 'hero')),
          width: 1200,
          height: 630,
          alt: `${city.name.en}, France`
        }
      ],
      type: 'website'
    }
  };
}

// Generate breadcrumbs
function generateBreadcrumbs(city, category = '') {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Cities', href: '/city/' }
  ];

  if (city) {
    breadcrumbs.push({
      name: city.name.en,
      href: `/city/${city.slug}/`
    });

    if (category) {
      breadcrumbs.push({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        href: `/city/${city.slug}/${category}/`
      });
    }
  }

  return breadcrumbs;
}

// Get cities by region
function getCitiesByRegion(region) {
  const cities = getAllCities();
  return cities.filter(city =>
    city.region && city.region.toLowerCase() === region.toLowerCase()
  );
}

// Get related cities (same region)
function getRelatedCities(currentCity, limit = 3) {
  const cities = getAllCities();
  return cities
    .filter(city =>
      city.region === currentCity.region &&
      city.slug !== currentCity.slug
    )
    .slice(0, limit);
}

// Check if city has enhanced content
function hasEnhancedContent(slug) {
  try {
    require(`../data/enhanced/${slug}.json`);
    return true;
  } catch (error) {
    return false;
  }
}

// === ATTRACTIONS FUNCTIONS ===

// Get all attractions for a city
function getAttractionsByCity(citySlug) {
  try {
    const attractionsIndex = require(`../data/attractions/${citySlug}/index.json`);
    return attractionsIndex.attractions || [];
  } catch (error) {
    console.error(`Error loading attractions for ${citySlug}:`, error.message);
    return [];
  }
}

// Get enhanced attractions for a city
function getEnhancedAttractionsByCity(citySlug) {
  try {
    const enhancedIndex = require(`../data/enhanced/attractions/${citySlug}/index.json`);
    return enhancedIndex.attractions || [];
  } catch (error) {
    console.error(`Error loading enhanced attractions for ${citySlug}:`, error.message);
    return getAttractionsByCity(citySlug);
  }
}

// Get single attraction by slug (with enhanced content if available)
function getAttractionBySlug(citySlug, attractionSlug) {
  // Try enhanced first
  try {
    const enhancedData = require(`../data/enhanced/attractions/${citySlug}/${attractionSlug}.json`);
    return enhancedData;
  } catch {}

  // Fallback to original
  try {
    const attractionData = require(`../data/attractions/${citySlug}/${attractionSlug}.json`);
    return attractionData;
  } catch (error) {
    console.error(`Error loading attraction data for ${citySlug}/${attractionSlug}:`, error.message);
  }

  return null;
}

// Get static paths for attractions
function getAttractionStaticPaths(citySlug = 'paris') {
  const attractions = getAttractionsByCity(citySlug);
  return attractions.map(attraction => ({
    params: {
      slug: citySlug,
      attraction: attraction.slug
    }
  }));
}

// Get all attraction static paths (all cities)
function getAllAttractionStaticPaths() {
  const paths = [];
  const allCities = getAllCities();

  allCities.forEach(city => {
    const attractions = getAttractionsByCity(city.slug);
    attractions.forEach(attraction => {
      paths.push({
        params: {
          slug: city.slug,
          attraction: attraction.slug
        }
      });
    });
  });

  return paths;
}

// Generate attraction metadata
function generateAttractionMetadata(attraction, city) {
  if (!attraction) return {};

  const rawDesc = attraction.enhanced_description || attraction.description?.en || '';
  const description = rawDesc.length > 155 ? rawDesc.substring(0, 155) + '...' : rawDesc;

  const cityName = city?.name?.en || 'Paris';
  let title = attraction.seo?.metaTitle?.en ||
    `${attraction.name.en}, ${cityName} | Go2France`;
  if (title.length > 60) {
    title = `${attraction.name.en} | Go2France`;
  }

  return {
    title,
    description,
    keywords: [...(attraction.tags || []), attraction.name.en, attraction.type, city?.name?.en || 'Paris'].join(', '),
    openGraph: {
      title,
      description,
      images: [
        {
          url: toAbsoluteImageUrl(attraction.image),
          width: 1200,
          height: 630,
          alt: attraction.name.en
        }
      ],
      type: 'website'
    }
  };
}

// Generate breadcrumbs for attractions
function generateAttractionBreadcrumbs(city, attraction) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Cities', href: '/city/' }
  ];

  if (city) {
    breadcrumbs.push({
      name: city.name.en,
      href: `/city/${city.slug}/`
    });

    breadcrumbs.push({
      name: 'Attractions',
      href: `/city/${city.slug}/attractions/`
    });

    if (attraction) {
      breadcrumbs.push({
        name: attraction.name.en,
        href: `/city/${city.slug}/attractions/${attraction.slug}/`
      });
    }
  }

  return breadcrumbs;
}

// Alias: Get all city slugs formatted for getStaticPaths
function getAllCitySlugs() {
  return getCityStaticPaths();
}

// CommonJS exports
module.exports = {
  getAllCities,
  getCityBySlug,
  getOriginalCityBySlug,
  getEnhancedCityBySlug,
  getCitySlugs,
  getAllCitySlugs,
  getCityStaticPaths,
  getCityImageForSection,
  generateCityMetadata,
  generateBreadcrumbs,
  getCitiesByRegion,
  getRelatedCities,
  hasEnhancedContent,
  toAbsoluteImageUrl,
  // Attractions functions
  getAttractionsByCity,
  getEnhancedAttractionsByCity,
  getAttractionBySlug,
  getAttractionStaticPaths,
  getAllAttractionStaticPaths,
  generateAttractionMetadata,
  generateAttractionBreadcrumbs
};
