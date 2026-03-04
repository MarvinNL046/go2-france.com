const SITE_URL = 'https://go2-france.com';

// Ensure image path is an absolute URL
function toAbsoluteImageUrl(imgPath) {
  if (!imgPath) return `${SITE_URL}/og-default.webp`;
  if (imgPath.startsWith('http')) return imgPath;
  return `${SITE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
}

// Get all practical info pages for static generation
function getAllPracticalInfo() {
  try {
    const practicalInfoIndex = require('../data/practical-info/index.json');
    return practicalInfoIndex;
  } catch (error) {
    console.error('Error loading practical-info index:', error.message);
    return [];
  }
}

// Get practical info data by slug
function getPracticalInfoBySlug(slug) {
  try {
    const infoData = require(`../data/practical-info/${slug}.json`);
    return infoData;
  } catch (error) {
    console.error(`Error loading practical-info data for ${slug}:`, error.message);
  }
  return null;
}

// Get all practical info slugs
function getPracticalInfoSlugs() {
  return getAllPracticalInfo().map(item => item.slug);
}

// Get static paths for Next.js
function getPracticalInfoStaticPaths() {
  const items = getAllPracticalInfo();
  return items.map(item => ({
    params: { slug: item.slug }
  }));
}

// Get practical info by category
function getPracticalInfoByCategory(category) {
  const allInfo = getAllPracticalInfo();
  return allInfo.filter(info =>
    info.category && info.category.toLowerCase() === category.toLowerCase()
  );
}

// Generate metadata for SEO
function generatePracticalInfoMetadata(info) {
  if (!info) return {};

  const title = info.seo?.metaTitle?.en || info.title?.en || info.title || '';
  const desc = info.seo?.metaDescription?.en || info.description?.en || info.description || '';

  return {
    title: `${title} | France Practical Guide`,
    description: desc.length > 155 ? desc.substring(0, 155) + '...' : desc,
    keywords: [title, 'France', 'practical info', 'travel tips', info.category].filter(Boolean).join(', '),
    openGraph: {
      title,
      description: desc,
      images: [
        {
          url: toAbsoluteImageUrl(info.image),
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      type: 'website'
    }
  };
}

// Generate breadcrumbs for practical info pages
function generatePracticalInfoBreadcrumbs(info) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Practical Info', href: '/practical-info/' }
  ];

  if (info) {
    const title = info.title?.en || info.title || '';
    breadcrumbs.push({
      name: title,
      href: `/practical-info/${info.slug}/`
    });
  }

  return breadcrumbs;
}

// Get related practical info items
function getRelatedPracticalInfo(currentInfo, limit = 3) {
  const allInfo = getAllPracticalInfo();
  return allInfo
    .filter(info => info.slug !== currentInfo.slug)
    .filter(info => info.category === currentInfo.category)
    .slice(0, limit);
}

// CommonJS exports
module.exports = {
  getAllPracticalInfo,
  getPracticalInfoBySlug,
  getPracticalInfoSlugs,
  getPracticalInfoStaticPaths,
  getPracticalInfoByCategory,
  generatePracticalInfoMetadata,
  generatePracticalInfoBreadcrumbs,
  getRelatedPracticalInfo,
  toAbsoluteImageUrl
};
