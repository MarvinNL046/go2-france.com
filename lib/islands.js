const SITE_URL = 'https://go2-france.com';

// Ensure image path is an absolute URL
function toAbsoluteImageUrl(imgPath) {
  if (!imgPath) return `${SITE_URL}/og-default.webp`;
  if (imgPath.startsWith('http')) return imgPath;
  return `${SITE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
}

// Get all islands for static generation
function getAllIslands() {
  try {
    const islandsIndex = require('../data/islands/index.json');
    return islandsIndex;
  } catch (error) {
    console.error('Error loading islands index:', error.message);
    return [];
  }
}

// Get island data by slug (with enhanced content if available)
function getIslandBySlug(slug) {
  // Try enhanced version first
  try {
    const enhancedData = require(`../data/enhanced/islands/${slug}.json`);
    return enhancedData;
  } catch {}

  // Fall back to standard data
  try {
    const islandData = require(`../data/islands/${slug}.json`);
    return islandData;
  } catch (error) {
    console.error(`Error loading island data for ${slug}:`, error.message);
  }
  return null;
}

// Get all island slugs
function getIslandSlugs() {
  return getAllIslands().map(island => island.slug);
}

// Get static paths for Next.js
function getIslandStaticPaths() {
  const islands = getAllIslands();
  return islands.map(island => ({
    params: { slug: island.slug }
  }));
}

// Get islands by region (e.g., Mediterranean / Atlantic / Overseas)
function getIslandsByRegion(region) {
  const islands = getAllIslands();
  return islands.filter(island =>
    island.region && island.region.toLowerCase() === region.toLowerCase()
  );
}

// Get related islands (same region, excluding current)
function getRelatedIslands(currentIsland, limit = 3) {
  const islands = getAllIslands();
  return islands
    .filter(island =>
      island.region === currentIsland.region &&
      island.slug !== currentIsland.slug
    )
    .slice(0, limit);
}

// Generate island metadata for SEO
function generateIslandMetadata(island) {
  if (!island) return {};

  const islandName = island.name?.en || island.name || '';
  const desc = island.enhanced_description || island.description?.en || island.description || '';

  const title = `${islandName}: Travel Guide, Best Beaches & Tips (2026)`;
  const description = desc.length > 155 ? desc.substring(0, 155) + '...' : desc;

  return {
    title,
    description,
    keywords: [islandName, 'French islands', island.region, 'France travel'].filter(Boolean).join(', '),
    openGraph: {
      title,
      description,
      images: [
        {
          url: toAbsoluteImageUrl(island.image),
          width: 1200,
          height: 630,
          alt: islandName
        }
      ],
      type: 'website'
    }
  };
}

// Generate breadcrumbs for island pages
function generateIslandBreadcrumbs(island) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Islands', href: '/islands/' }
  ];

  if (island) {
    const islandName = island.name?.en || island.name || '';
    breadcrumbs.push({
      name: islandName,
      href: `/islands/${island.slug}/`
    });
  }

  return breadcrumbs;
}

// CommonJS exports
module.exports = {
  getAllIslands,
  getIslandBySlug,
  getIslandSlugs,
  getIslandStaticPaths,
  getIslandsByRegion,
  getRelatedIslands,
  generateIslandMetadata,
  generateIslandBreadcrumbs,
  toAbsoluteImageUrl
};
