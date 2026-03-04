const SITE_URL = 'https://go2-france.com';

// Ensure image path is an absolute URL
function toAbsoluteImageUrl(imgPath) {
  if (!imgPath) return `${SITE_URL}/og-default.webp`;
  if (imgPath.startsWith('http')) return imgPath;
  return `${SITE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
}

// Get all destinations
function getAllDestinations() {
  try {
    const destinationsIndex = require('../data/destinations/index.json');
    return destinationsIndex;
  } catch (error) {
    console.error('Error loading destinations index:', error.message);
    return [];
  }
}

// Get destination by slug
function getDestinationBySlug(slug) {
  // Try individual file first
  try {
    const destData = require(`../data/destinations/${slug}.json`);
    return destData;
  } catch {}

  // Fallback to finding in index
  return getAllDestinations().find(d => d.slug === slug) || null;
}

// Get all destination slugs
function getDestinationSlugs() {
  return getAllDestinations().map(d => d.slug);
}

// Get static paths for Next.js
function getDestinationStaticPaths() {
  return getAllDestinations().map(d => ({
    params: { slug: d.slug }
  }));
}

// Get destinations by region
function getDestinationsByRegion(region) {
  return getAllDestinations().filter(d => d.region === region);
}

// Get destinations by city
function getDestinationsByCity(citySlug) {
  return getAllDestinations().filter(d => d.city === citySlug);
}

// Get destinations by category
function getDestinationsByCategory(category) {
  return getAllDestinations().filter(d => d.category === category);
}

// Get related destinations
function getRelatedDestinations(currentDest, limit = 3) {
  const all = getAllDestinations();
  return all
    .filter(d => d.slug !== currentDest.slug)
    .filter(d => d.region === currentDest.region || d.category === currentDest.category)
    .slice(0, limit);
}

// Generate destination metadata
function generateDestinationMetadata(destination) {
  if (!destination) return {};

  const name = destination.name?.en || destination.name || '';
  const desc = destination.description?.en || destination.description || '';

  const title = `${name}: Travel Guide & Tips | Go2France`;
  const description = desc.length > 155 ? desc.substring(0, 155) + '...' : desc;

  return {
    title,
    description,
    keywords: [name, 'France', destination.region, destination.category, 'travel guide'].filter(Boolean).join(', '),
    openGraph: {
      title,
      description,
      images: [
        {
          url: toAbsoluteImageUrl(destination.image),
          width: 1200,
          height: 630,
          alt: name
        }
      ],
      type: 'website'
    }
  };
}

// Generate breadcrumbs
function generateDestinationBreadcrumbs(destination) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/destinations/' }
  ];

  if (destination) {
    const name = destination.name?.en || destination.name || '';
    breadcrumbs.push({
      name,
      href: `/destinations/${destination.slug}/`
    });
  }

  return breadcrumbs;
}

// Get destinations by type
function getDestinationsByType(type) {
  return getAllDestinations().filter(d =>
    d.type && d.type.toLowerCase() === type.toLowerCase()
  );
}

// CommonJS exports
module.exports = {
  getAllDestinations,
  getDestinationBySlug,
  getDestinationSlugs,
  getDestinationStaticPaths,
  getDestinationsByRegion,
  getDestinationsByCity,
  getDestinationsByCategory,
  getDestinationsByType,
  getRelatedDestinations,
  generateDestinationMetadata,
  generateDestinationBreadcrumbs,
  toAbsoluteImageUrl
};
