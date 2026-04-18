const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// =============================================================================
// SITE CONFIGURATION
// =============================================================================
const SITE_URL = 'https://go2-france.com';
const DESTINATION_SLUG = 'france';
const LOCALES = ['en'];
const DEFAULT_LOCALE = 'en';

// =============================================================================
// Directory paths
// =============================================================================
const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const contentDir = path.join(rootDir, 'content');
const publicDir = path.join(rootDir, 'public');

// =============================================================================
// Static pages (priority 1.0 for home, 0.8 for info pages)
// =============================================================================
const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/about/', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact/', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy/', priority: '0.5', changefreq: 'yearly' },
  { path: '/terms/', priority: '0.5', changefreq: 'yearly' },
  { path: '/affiliate-disclosure/', priority: '0.5', changefreq: 'yearly' },
  { path: '/editorial-policy/', priority: '0.7', changefreq: 'yearly' },
  { path: '/how-we-research/', priority: '0.7', changefreq: 'yearly' },
];

// =============================================================================
// List/index pages (priority 0.9)
// =============================================================================
const LIST_PAGES = [
  '/city/',
  '/destinations/',
  '/experiences/',
  '/itineraries/',
  '/blog/',
  '/food/',
  '/drinks/',
  '/islands/',
  '/region/',
  '/visa/',
  '/transport/',
  '/weather/',
  '/esim/',
  '/travel-insurance/',
  '/practical-info/',
  '/eiffel-tower-tickets/',
  '/paris-city-pass/',
  '/seine-river-cruise/',
];

// =============================================================================
// Data directory to URL prefix mapping
// JSON-based content types: { dataDir name => URL prefix }
// =============================================================================
const JSON_CONTENT_TYPES = {
  cities:        '/city',
  destinations:  '/destinations',
  experiences:   '/experiences',
  drinks:        '/drinks',
  food:          '/food',
  islands:       '/islands',
  regions:       '/region',
  visas:         '/visa',
  'practical-info': '/practical-info',
};

// =============================================================================
// Markdown content types: { contentDir name => URL prefix }
// =============================================================================
const MD_CONTENT_TYPES = {
  blog:        '/blog',
  itineraries: '/itineraries',
};

// =============================================================================
// Helper: read slugs from a data/*/index.json file
// =============================================================================
function getSlugsFromIndex(type) {
  try {
    const indexPath = path.join(dataDir, type, 'index.json');
    if (!fs.existsSync(indexPath)) return [];
    const data = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    if (!Array.isArray(data)) return [];
    return data.map(item => ({
      slug: item.slug,
      lastmod: item.updatedAt || item.date || null,
    })).filter(item => item.slug);
  } catch (error) {
    console.warn(`  Warning: Could not read ${type}/index.json: ${error.message}`);
    return [];
  }
}

// =============================================================================
// Helper: read slugs from JSON files in a data directory (no index)
// =============================================================================
function getJsonSlugsFromDir(type) {
  try {
    const dir = path.join(dataDir, type);
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.json') && f !== 'index.json')
      .map(f => ({ slug: f.replace('.json', ''), lastmod: null }));
  } catch {
    return [];
  }
}

// =============================================================================
// Helper: read slugs from markdown files in content/*/en/*.md or content/*/*.md
// =============================================================================
function getSlugsFromMarkdown(type) {
  const slugs = [];
  const dirs = [
    path.join(contentDir, type, 'en'),
    path.join(contentDir, type),
  ];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      try {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter } = matter(content);
        const slug = frontmatter.slug || file.replace('.md', '');
        const lastmod = frontmatter.lastUpdated || frontmatter.updatedAt || frontmatter.date || null;
        slugs.push({ slug, lastmod });
      } catch (error) {
        console.warn(`  Warning: Could not parse ${type}/${file}: ${error.message}`);
      }
    }
    if (slugs.length > 0) break;
  }

  return slugs;
}

// =============================================================================
// Helper: get blog post slugs
// =============================================================================
function getBlogSlugs() {
  try {
    // Try content/blog/en/ first, then content/blog/
    const dirs = [
      path.join(contentDir, 'blog', 'en'),
      path.join(contentDir, 'blog'),
    ];
    for (const blogDir of dirs) {
      if (!fs.existsSync(blogDir)) continue;
      const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
      if (files.length > 0) {
        return files.map(f => f.replace('.md', ''));
      }
    }
    return [];
  } catch {
    return [];
  }
}

// =============================================================================
// Helper: get transport route slugs
// =============================================================================
function getTransportSlugs() {
  try {
    const routesPath = path.join(dataDir, 'transport-routes.json');
    if (!fs.existsSync(routesPath)) return [];
    const data = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
    if (data.routes && Array.isArray(data.routes)) {
      return data.routes.map(r => r.slug).filter(Boolean);
    }
    return [];
  } catch {
    return [];
  }
}

// =============================================================================
// Helper: scan for attractions per city
// =============================================================================
function getAttractions() {
  const results = [];
  try {
    const attractionsDir = path.join(dataDir, 'attractions');
    if (!fs.existsSync(attractionsDir)) return results;

    const cityDirs = fs.readdirSync(attractionsDir);
    cityDirs.forEach(citySlug => {
      const cityAttrDir = path.join(attractionsDir, citySlug);
      if (!fs.statSync(cityAttrDir).isDirectory()) return;

      const files = fs.readdirSync(cityAttrDir)
        .filter(f => f.endsWith('.json') && f !== 'index.json');

      files.forEach(file => {
        try {
          const data = JSON.parse(fs.readFileSync(path.join(cityAttrDir, file), 'utf8'));
          results.push({
            city: citySlug,
            slug: data.slug || file.replace('.json', ''),
          });
        } catch {
          // Skip malformed files
        }
      });
    });
  } catch {
    // No attractions directory
  }
  return results;
}

// =============================================================================
// Collect ALL URLs
// =============================================================================
function collectAllUrls() {
  const urls = [];
  const currentDate = new Date().toISOString().split('T')[0];

  // 1. Static pages
  for (const page of STATIC_PAGES) {
    urls.push({
      path: page.path,
      priority: page.priority,
      changefreq: page.changefreq,
      lastmod: currentDate,
    });
  }

  // 2. List/index pages
  for (const listPath of LIST_PAGES) {
    urls.push({
      path: listPath,
      priority: '0.9',
      changefreq: 'daily',
      lastmod: currentDate,
    });
  }

  // 3. JSON-based detail pages
  for (const [dataType, urlPrefix] of Object.entries(JSON_CONTENT_TYPES)) {
    const items = getSlugsFromIndex(dataType);
    for (const item of items) {
      urls.push({
        path: `${urlPrefix}/${item.slug}/`,
        priority: '0.8',
        changefreq: 'weekly',
        lastmod: item.lastmod || currentDate,
      });
    }
    if (items.length > 0) {
      console.log(`  ${dataType}: ${items.length} entries`);
    }
  }

  // 4. Markdown-based detail pages
  for (const [contentType, urlPrefix] of Object.entries(MD_CONTENT_TYPES)) {
    const items = getSlugsFromMarkdown(contentType);
    for (const item of items) {
      urls.push({
        path: `${urlPrefix}/${item.slug}/`,
        priority: '0.8',
        changefreq: 'weekly',
        lastmod: item.lastmod || currentDate,
      });
    }
    if (items.length > 0) {
      console.log(`  ${contentType}: ${items.length} entries`);
    }
  }

  // 5. City subpages
  const citySlugs = getSlugsFromIndex('cities');
  citySlugs.forEach(city => {
    ['food', 'hotels', 'attractions', 'weather'].forEach(subpage => {
      urls.push({
        path: `/city/${city.slug}/${subpage}/`,
        priority: '0.6',
        changefreq: 'monthly',
        lastmod: currentDate,
      });
    });
  });

  // 6. Attractions per city
  const attractions = getAttractions();
  attractions.forEach(attr => {
    urls.push({
      path: `/city/${attr.city}/attractions/${attr.slug}/`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: currentDate,
    });
  });

  // 7. Transport routes
  const transportSlugs = getTransportSlugs();
  transportSlugs.forEach(slug => {
    urls.push({
      path: `/transport/${slug}/`,
      priority: '0.7',
      changefreq: 'weekly',
      lastmod: currentDate,
    });
  });

  // 8. Weather monthly pages
  const months = ['january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'];
  months.forEach(month => {
    urls.push({
      path: `/${DESTINATION_SLUG}-in/${month}/`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: currentDate,
    });
  });

  // City weather per month
  citySlugs.forEach(city => {
    months.forEach(month => {
      urls.push({
        path: `/city/${city.slug}/weather/${month}/`,
        priority: '0.5',
        changefreq: 'monthly',
        lastmod: currentDate,
      });
    });
  });

  return urls;
}

// =============================================================================
// Generate sitemap.xml
// =============================================================================
function generateSitemapXML(urls, locale) {
  const currentDate = new Date().toISOString();

  const urlElements = urls.map(url => {
    const fullPath = locale === DEFAULT_LOCALE
      ? url.path
      : (url.path === '/' ? `/${locale}/` : `/${locale}${url.path}`);

    return `  <url>
    <loc>${SITE_URL}${fullPath}</loc>
    <lastmod>${url.lastmod || currentDate}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

// =============================================================================
// Generate sitemap index XML
// =============================================================================
function generateSitemapIndexXML(sitemaps) {
  const sitemapElements = sitemaps.map(sitemap => {
    return `  <sitemap>
    <loc>${SITE_URL}/${sitemap.filename}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>`;
}

// =============================================================================
// Generate robots.txt
// =============================================================================
function generateRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap-index.xml
`;
}

// =============================================================================
// Main generator
// =============================================================================
function generateSitemap() {
  console.log('=== Sitemap Generator ===');
  console.log(`Site: ${SITE_URL}`);
  console.log(`Locales: ${LOCALES.join(', ')}`);
  console.log('');

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Collect all URLs
  console.log('Scanning content...');
  const urls = collectAllUrls();
  console.log(`\nCollected ${urls.length} base URLs`);

  // Generate per-locale sitemaps
  const sitemapIndexes = [];
  let totalUrls = 0;

  LOCALES.forEach(locale => {
    const sitemapFilename = locale === DEFAULT_LOCALE ? 'sitemap.xml' : `sitemap-${locale}.xml`;
    const xml = generateSitemapXML(urls, locale);

    const sitemapPath = path.join(publicDir, sitemapFilename);
    fs.writeFileSync(sitemapPath, xml);

    sitemapIndexes.push({
      filename: sitemapFilename,
      lastmod: new Date().toISOString(),
      locale,
    });

    console.log(`  ${sitemapFilename}: ${urls.length} URLs (${locale.toUpperCase()})`);
    totalUrls += urls.length;
  });

  // Generate sitemap index
  const indexXml = generateSitemapIndexXML(sitemapIndexes);
  fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), indexXml);
  console.log(`  sitemap-index.xml: ${sitemapIndexes.length} sitemaps`);

  // Generate robots.txt
  const robotsTxt = generateRobotsTxt();
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  console.log('  robots.txt: generated');

  // Summary
  const staticCount = STATIC_PAGES.length;
  const listCount = LIST_PAGES.length;
  const detailCount = urls.length - staticCount - listCount;

  console.log('');
  console.log('=== Summary ===');
  console.log(`  Static pages:  ${staticCount}`);
  console.log(`  List pages:    ${listCount}`);
  console.log(`  Detail pages:  ${detailCount}`);
  console.log(`  Total URLs:    ${totalUrls}`);
  console.log('');
  console.log('Sitemap generation complete!');

  return totalUrls;
}

// CommonJS exports
module.exports = {
  generateSitemap,
  collectAllUrls,
  getSlugsFromIndex,
  getSlugsFromMarkdown,
  getJsonSlugsFromDir,
  JSON_CONTENT_TYPES,
  MD_CONTENT_TYPES
};

// Run if called directly: node lib/sitemap.js
if (require.main === module) {
  generateSitemap();
}
