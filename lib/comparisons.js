const SITE_URL = 'https://go2-france.com';

// Ensure image path is an absolute URL
function toAbsoluteImageUrl(imgPath) {
  if (!imgPath) return `${SITE_URL}/og-default.webp`;
  if (imgPath.startsWith('http')) return imgPath;
  return `${SITE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
}

// Get all comparisons
function getAllComparisons() {
  try {
    const comparisonsIndex = require('../data/comparisons/index.json');
    return comparisonsIndex;
  } catch (error) {
    console.error('Error loading comparisons index:', error.message);
    return [];
  }
}

// Get comparison by slug
function getComparisonBySlug(slug) {
  // Try individual file first
  try {
    const compData = require(`../data/comparisons/${slug}.json`);
    return compData;
  } catch {}

  // Fallback to finding in index
  return getAllComparisons().find(c => c.slug === slug) || null;
}

// Get all comparison slugs
function getComparisonSlugs() {
  return getAllComparisons().map(c => c.slug);
}

// Get static paths for Next.js
function getComparisonStaticPaths() {
  return getAllComparisons().map(c => ({
    params: { slug: c.slug }
  }));
}

// Get comparisons by category
function getComparisonsByCategory(category) {
  return getAllComparisons().filter(c =>
    c.category && c.category.toLowerCase() === category.toLowerCase()
  );
}

// Get related comparisons
function getRelatedComparisons(currentComparison, limit = 3) {
  const all = getAllComparisons();
  return all
    .filter(c => c.slug !== currentComparison.slug)
    .filter(c => c.category === currentComparison.category)
    .slice(0, limit);
}

// Generate comparison metadata
function generateComparisonMetadata(comparison) {
  if (!comparison) return {};

  const title = comparison.title?.en || comparison.title || '';
  const desc = comparison.description?.en || comparison.description || '';

  return {
    title: `${title} | Go2France`,
    description: desc.length > 155 ? desc.substring(0, 155) + '...' : desc,
    keywords: [title, 'France', 'comparison', 'travel guide', comparison.category].filter(Boolean).join(', '),
    openGraph: {
      title,
      description: desc,
      images: [
        {
          url: toAbsoluteImageUrl(comparison.image),
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      type: 'website'
    }
  };
}

// Generate breadcrumbs for comparison pages
function generateComparisonBreadcrumbs(comparison) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Comparisons', href: '/compare/' }
  ];

  if (comparison) {
    const title = comparison.title?.en || comparison.title || '';
    breadcrumbs.push({
      name: title,
      href: `/compare/${comparison.slug}/`
    });
  }

  return breadcrumbs;
}

// CommonJS exports
module.exports = {
  getAllComparisons,
  getComparisonBySlug,
  getComparisonSlugs,
  getComparisonStaticPaths,
  getComparisonsByCategory,
  getRelatedComparisons,
  generateComparisonMetadata,
  generateComparisonBreadcrumbs,
  toAbsoluteImageUrl
};
