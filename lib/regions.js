const SITE_URL = 'https://go2-france.com';

// Ensure image path is an absolute URL
function toAbsoluteImageUrl(imgPath) {
  if (!imgPath) return `${SITE_URL}/og-default.webp`;
  if (imgPath.startsWith('http')) return imgPath;
  return `${SITE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
}

// Get all regions from the index file
function getAllRegions() {
  try {
    const regionsIndex = require('../data/regions/index.json');
    return regionsIndex;
  } catch (error) {
    console.error('Error loading regions index:', error.message);
    return [];
  }
}

// Get a specific region by slug
function getRegionBySlug(slug) {
  try {
    const regionData = require(`../data/regions/${slug}.json`);
    return regionData;
  } catch (error) {
    console.error(`Error loading region data for ${slug}:`, error.message);
  }
  return null;
}

// Get all region slugs
function getRegionSlugs() {
  return getAllRegions().map(region => region.slug);
}

// Get all region static paths for Next.js
function getRegionStaticPaths() {
  const regions = getAllRegions();
  return regions.map(region => ({
    params: { slug: region.slug }
  }));
}

// Generate metadata for a region
function generateRegionMetadata(region) {
  if (!region) return {};

  const title = region.seo?.metaTitle?.en || `${region.name?.en || region.name} Travel Guide | Go2France`;
  const description = region.seo?.metaDescription?.en || `Explore ${region.name?.en || region.name}, France. Discover cities, attractions, culture and travel tips.`;
  const regionName = region.name?.en || region.name || '';

  return {
    title,
    description,
    keywords: `${regionName}, France, ${(region.cities || []).join(', ')}, travel guide, attractions, culture`,
    openGraph: {
      title,
      description,
      images: [
        {
          url: toAbsoluteImageUrl(region.image),
          width: 1200,
          height: 630,
          alt: `${regionName}, France`,
        },
      ],
      type: 'website',
    },
  };
}

// Generate breadcrumbs for a region
function generateRegionBreadcrumbs(region) {
  const regionName = region?.name?.en || region?.name || '';
  return [
    { name: 'Home', href: '/' },
    { name: 'Regions', href: '/region/' },
    { name: regionName, href: `/region/${region.slug}/` }
  ];
}

// Get related regions (excluding current)
function getRelatedRegions(currentRegion, limit = 3) {
  const allRegions = getAllRegions();
  return allRegions
    .filter(r => r.slug !== currentRegion.slug)
    .slice(0, limit);
}

// Get all region slugs formatted for getStaticPaths
function getAllRegionSlugs() {
  return getRegionSlugs().map(slug => ({
    params: { slug }
  }));
}

// Get cities that belong to a region
function getCitiesByRegion(regionSlug) {
  try {
    const allCities = require('../data/cities/index.json');
    return allCities.filter(city =>
      city.region && city.region.toLowerCase() === regionSlug.toLowerCase()
    );
  } catch (error) {
    console.error(`Error loading cities for region ${regionSlug}:`, error.message);
    return [];
  }
}

// CommonJS exports
module.exports = {
  getAllRegions,
  getRegionBySlug,
  getRegionSlugs,
  getAllRegionSlugs,
  getRegionStaticPaths,
  generateRegionMetadata,
  generateRegionBreadcrumbs,
  getRelatedRegions,
  getCitiesByRegion,
  toAbsoluteImageUrl
};
