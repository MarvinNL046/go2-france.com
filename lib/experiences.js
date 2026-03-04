const SITE_URL = 'https://go2-france.com';

// Ensure image path is an absolute URL
function toAbsoluteImageUrl(imgPath) {
  if (!imgPath) return `${SITE_URL}/og-default.webp`;
  if (imgPath.startsWith('http')) return imgPath;
  return `${SITE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
}

// Get all experiences
function getAllExperiences() {
  try {
    const experiencesIndex = require('../data/experiences/index.json');
    return experiencesIndex;
  } catch (error) {
    console.error('Error loading experiences index:', error.message);
    return [];
  }
}

// Get experience by slug
function getExperienceBySlug(slug) {
  // Try individual file first
  try {
    const expData = require(`../data/experiences/${slug}.json`);
    return expData;
  } catch {}

  // Fallback to finding in index
  return getAllExperiences().find(exp => exp.slug === slug) || null;
}

// Get all experience slugs
function getExperienceSlugs() {
  return getAllExperiences().map(exp => exp.slug);
}

// Get static paths for Next.js
function getExperienceStaticPaths() {
  return getAllExperiences().map(exp => ({
    params: { slug: exp.slug }
  }));
}

// Get experiences by region
function getExperiencesByRegion(region) {
  return getAllExperiences().filter(exp => exp.region === region);
}

// Get experiences by city
function getExperiencesByCity(citySlug) {
  return getAllExperiences().filter(exp => exp.city === citySlug);
}

// Get experiences by category
function getExperiencesByCategory(category) {
  return getAllExperiences().filter(exp => exp.category === category);
}

// Get related experiences
function getRelatedExperiences(currentExp, limit = 3) {
  const all = getAllExperiences();
  return all
    .filter(exp => exp.slug !== currentExp.slug)
    .filter(exp => exp.region === currentExp.region || exp.category === currentExp.category)
    .slice(0, limit);
}

// Generate experience metadata
function generateExperienceMetadata(experience) {
  if (!experience) return {};

  const name = experience.name?.en || experience.name || experience.title || '';
  const desc = experience.description?.en || experience.description || '';

  const title = `${name}: French Experience Guide | Go2France`;
  const description = desc.length > 155 ? desc.substring(0, 155) + '...' : desc;

  return {
    title,
    description,
    keywords: [name, 'France', experience.region, experience.category, 'experience', 'travel'].filter(Boolean).join(', '),
    openGraph: {
      title,
      description,
      images: [
        {
          url: toAbsoluteImageUrl(experience.image),
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
function generateExperienceBreadcrumbs(experience) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Experiences', href: '/experiences/' }
  ];

  if (experience) {
    const name = experience.name?.en || experience.name || experience.title || '';
    breadcrumbs.push({
      name,
      href: `/experiences/${experience.slug}/`
    });
  }

  return breadcrumbs;
}

// Get experiences by type
function getExperiencesByType(type) {
  return getAllExperiences().filter(exp =>
    exp.type && exp.type.toLowerCase() === type.toLowerCase()
  );
}

// CommonJS exports
module.exports = {
  getAllExperiences,
  getExperienceBySlug,
  getExperienceSlugs,
  getExperienceStaticPaths,
  getExperiencesByRegion,
  getExperiencesByCity,
  getExperiencesByCategory,
  getExperiencesByType,
  getRelatedExperiences,
  generateExperienceMetadata,
  generateExperienceBreadcrumbs,
  toAbsoluteImageUrl
};
