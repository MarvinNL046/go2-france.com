const SITE_URL = 'https://go2-france.com';

// Ensure image path is an absolute URL
function toAbsoluteImageUrl(imgPath) {
  if (!imgPath) return `${SITE_URL}/og-default.webp`;
  if (imgPath.startsWith('http')) return imgPath;
  return `${SITE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
}

// Get all visas for static generation
function getAllVisas() {
  try {
    const visasIndex = require('../data/visas/index.json');
    return visasIndex;
  } catch (error) {
    console.error('Error loading visas index:', error.message);
    return [];
  }
}

// Get visa data by slug
function getVisaBySlug(slug) {
  try {
    const visaData = require(`../data/visas/${slug}.json`);
    return visaData;
  } catch (error) {
    console.error(`Error loading visa data for ${slug}:`, error.message);
  }
  return null;
}

// Get all visa slugs
function getVisaSlugs() {
  return getAllVisas().map(visa => visa.slug);
}

// Get static paths for Next.js
function getVisaStaticPaths() {
  const visas = getAllVisas();
  return visas.map(visa => ({
    params: { slug: visa.slug }
  }));
}

// Get visas by category (schengen, long-stay, student, work, etc.)
function getVisasByCategory(category) {
  const visas = getAllVisas();
  return visas.filter(visa =>
    visa.category && visa.category.toLowerCase() === category.toLowerCase()
  );
}

// Generate metadata for SEO
function generateVisaMetadata(visa) {
  if (!visa) return {};

  const title = visa.seo?.metaTitle?.en || visa.title?.en || visa.title || '';
  const desc = visa.seo?.metaDescription?.en || visa.description?.en || visa.description || '';

  return {
    title: `${title} | France Visa Guide`,
    description: desc.length > 155 ? desc.substring(0, 155) + '...' : desc,
    keywords: [title, 'France visa', 'Schengen visa', visa.category, 'travel requirements'].filter(Boolean).join(', '),
    openGraph: {
      title,
      description: desc,
      images: [
        {
          url: toAbsoluteImageUrl(visa.image),
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      type: 'website'
    }
  };
}

// Generate breadcrumbs for visa pages
function generateVisaBreadcrumbs(visa) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Visa Guide', href: '/visa/' }
  ];

  if (visa) {
    const title = visa.title?.en || visa.title || '';
    breadcrumbs.push({
      name: title,
      href: `/visa/${visa.slug}/`
    });
  }

  return breadcrumbs;
}

// Get related visa types
function getRelatedVisas(currentVisa, limit = 3) {
  const allVisas = getAllVisas();
  return allVisas
    .filter(visa => visa.slug !== currentVisa.slug)
    .slice(0, limit);
}

// CommonJS exports
module.exports = {
  getAllVisas,
  getVisaBySlug,
  getVisaSlugs,
  getVisaStaticPaths,
  getVisasByCategory,
  generateVisaMetadata,
  generateVisaBreadcrumbs,
  getRelatedVisas,
  toAbsoluteImageUrl
};
