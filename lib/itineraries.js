const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = 'https://go2-france.com';

// Markdown directory (still needs fs for reading .md files)
const mdDataDir = path.join(process.cwd(), 'content', 'itineraries', 'en');

// Ensure image path is an absolute URL
function toAbsoluteImageUrl(imgPath) {
  if (!imgPath) return `${SITE_URL}/og-default.webp`;
  if (imgPath.startsWith('http')) return imgPath;
  return `${SITE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
}

// Get all itineraries (JSON-based first, then Markdown fallback)
function getAllItineraries() {
  // Try JSON-based itineraries first
  try {
    const itinerariesIndex = require('../data/itineraries/index.json');
    return itinerariesIndex;
  } catch (error) {
    console.error('Error loading JSON itineraries index:', error.message);
  }

  // Fallback to Markdown-based itineraries
  try {
    if (!fs.existsSync(mdDataDir)) return [];
    const files = fs.readdirSync(mdDataDir).filter(f => f.endsWith('.md'));
    return files.map(filename => {
      const filePath = path.join(mdDataDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      return { ...data, slug: data.slug || filename.replace('.md', '') };
    }).sort((a, b) => (a.duration || 0) - (b.duration || 0));
  } catch (error) {
    console.error('Error loading markdown itineraries:', error.message);
    return [];
  }
}

// Get a specific itinerary by slug
function getItineraryBySlug(slug) {
  // Try JSON first
  try {
    const itineraryData = require(`../data/itineraries/${slug}.json`);
    return itineraryData;
  } catch (error) {
    console.error(`Error loading JSON itinerary ${slug}:`, error.message);
  }

  // Fallback: find in index
  const all = getAllItineraries();
  return all.find(i => i.slug === slug) || null;
}

// Get itinerary by slug with rendered HTML content (for markdown-based)
async function getItineraryBySlugWithContent(slug) {
  // Try markdown first (richer content)
  try {
    if (fs.existsSync(mdDataDir)) {
      const files = fs.readdirSync(mdDataDir).filter(f => f.endsWith('.md'));
      for (const filename of files) {
        const filePath = path.join(mdDataDir, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        if (data.slug === slug || filename.replace('.md', '') === slug) {
          const { remark } = await import('remark');
          const remarkGfm = (await import('remark-gfm')).default;
          const remarkHtml = (await import('remark-html')).default;

          const processedContent = await remark().use(remarkGfm).use(remarkHtml).process(content);
          return {
            ...data,
            slug: data.slug || filename.replace('.md', ''),
            content: processedContent.toString(),
          };
        }
      }
    }
  } catch (error) {
    console.error(`Error loading markdown itinerary ${slug}:`, error.message);
  }

  // Fallback to JSON
  return getItineraryBySlug(slug);
}

// Get all itinerary slugs
function getItinerarySlugs() {
  return getAllItineraries().map(i => i.slug);
}

// Get static paths for Next.js
function getItineraryStaticPaths() {
  const itineraries = getAllItineraries();
  return itineraries.map(itinerary => ({
    params: { slug: itinerary.slug }
  }));
}

// Filter itineraries by duration (in days)
function getItinerariesByDuration(days) {
  const itineraries = getAllItineraries();
  return itineraries.filter(itinerary => itinerary.duration === days);
}

// Filter itineraries by region
function getItinerariesByRegion(region) {
  const itineraries = getAllItineraries();
  return itineraries.filter(itinerary =>
    itinerary.region && itinerary.region.toLowerCase() === region.toLowerCase()
  );
}

// Get related itineraries
function getRelatedItineraries(currentSlug, limit = 3) {
  const itineraries = getAllItineraries();
  const current = itineraries.find(i => i.slug === currentSlug);
  if (!current) return itineraries.filter(i => i.slug !== currentSlug).slice(0, limit);

  const sameRegion = itineraries.filter(i =>
    i.slug !== currentSlug && i.region === current.region
  );
  const differentRegion = itineraries.filter(i =>
    i.slug !== currentSlug && i.region !== current.region
  );

  return [...sameRegion, ...differentRegion].slice(0, limit);
}

// Generate SEO metadata for an itinerary
function generateItineraryMetadata(itinerary) {
  if (!itinerary) return {};

  const title = itinerary.seo?.metaTitle ||
    `${itinerary.title} | Go2France`;
  const description = itinerary.seo?.metaDescription ||
    itinerary.description || '';

  return {
    title,
    description: description.length > 155 ? description.substring(0, 155) + '...' : description,
    keywords: [
      'France itinerary',
      `${itinerary.duration} days France`,
      itinerary.region,
      ...(itinerary.highlights || []),
      ...(itinerary.tags || [])
    ].filter(Boolean).join(', '),
    openGraph: {
      title,
      description,
      images: [
        {
          url: toAbsoluteImageUrl(itinerary.image),
          width: 1200,
          height: 630,
          alt: itinerary.title
        }
      ],
      type: 'website'
    }
  };
}

// Generate breadcrumbs for an itinerary
function generateItineraryBreadcrumbs(itinerary) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Itineraries', href: '/itineraries/' }
  ];

  if (itinerary) {
    breadcrumbs.push({
      name: itinerary.title,
      href: `/itineraries/${itinerary.slug}/`
    });
  }

  return breadcrumbs;
}

// CommonJS exports
module.exports = {
  getAllItineraries,
  getItineraryBySlug,
  getItineraryBySlugWithContent,
  getItinerarySlugs,
  getItineraryStaticPaths,
  getItinerariesByDuration,
  getItinerariesByRegion,
  getRelatedItineraries,
  generateItineraryMetadata,
  generateItineraryBreadcrumbs,
  toAbsoluteImageUrl
};
