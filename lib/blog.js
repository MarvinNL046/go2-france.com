// PATCHED: reads both content/blog/ and content/blog/en/
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

const ROOT_DIR = path.join(process.cwd(), 'content', 'blog');
const EN_DIR = path.join(process.cwd(), 'content', 'blog', 'en');

function readBlogsFrom(dir) {
  if (!fs.existsSync(dir)) return [];
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.md'))
      .map(filename => ({ filename, dir }));
  } catch { return []; }
}

function loadAllFiles() {
  // /en/ first (takes priority on slug collision), then root.
  const bySlug = new Map();
  for (const ref of readBlogsFrom(EN_DIR)) {
    const slug = ref.filename.replace(/\.md$/, '');
    if (!bySlug.has(slug)) bySlug.set(slug, ref);
  }
  for (const ref of readBlogsFrom(ROOT_DIR)) {
    const slug = ref.filename.replace(/\.md$/, '');
    if (!bySlug.has(slug)) bySlug.set(slug, ref);
  }
  return [...bySlug.values()];
}

function getAllPosts(_locale) {
  try {
    return loadAllFiles().map(({ filename, dir }) => {
      const fileContent = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data } = matter(fileContent);
      const toStr = v => v instanceof Date ? v.toISOString() : (v || '');
      const image = data.image || data.heroImage || '/images/blog/default.webp';
      const date = toStr(data.date) || new Date().toISOString();
      const lastUpdated = toStr(data.lastUpdated) || toStr(data.updatedAt) || date;
      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title || 'Untitled',
        date,
        excerpt: data.excerpt || data.description || '',
        description: data.description || data.excerpt || '',
        category: data.category || 'general',
        image,
        heroImage: image,
        tags: data.tags || [],
        author: data.author || { name: 'Team' },
        readingTime: data.readingTime || 5,
        lastUpdated,
        updatedAt: lastUpdated,
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error.message);
    return [];
  }
}

async function getPostBySlug(slug, _locale) {
  try {
    // Try /en/ first, then root.
    const candidates = [
      path.join(EN_DIR, `${slug}.md`),
      path.join(ROOT_DIR, `${slug}.md`),
    ];
    const filePath = candidates.find(p => fs.existsSync(p));
    if (!filePath) return null;

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // remark-gfm adds GitHub-flavoured Markdown support: tables, strikethrough,
    // task lists, autolinks. Required because existing blog content uses pipe tables.
    const { remark } = await import('remark');
    const remarkHtml = (await import('remark-html')).default;
    let remarkGfm;
    try { remarkGfm = (await import('remark-gfm')).default; } catch { /* fall back if not installed */ }
    const pipeline = remark();
    if (remarkGfm) pipeline.use(remarkGfm);
    pipeline.use(remarkHtml);
    const processed = await pipeline.process(content);

    // Return EVERY field variant we've seen across sister sites so the loader
    // is compatible regardless of how the page component named the field.
    // Examples of the inconsistency:
    //   - content vs contentHtml (bali/india use content; others contentHtml)
    //   - faq vs faqItems (bali/india use faq; others faqItems)
    //   - description vs excerpt (some use one, some the other)
    //   - image vs heroImage (mexico uses heroImage)
    //   - lastUpdated vs updatedAt (mexico uses updatedAt)
    const html = processed.toString();
    const toStr = v => v instanceof Date ? v.toISOString() : (v || '');
    const image = data.image || data.heroImage || '/images/blog/default.webp';
    const date = toStr(data.date) || new Date().toISOString();
    const lastUpdated = toStr(data.lastUpdated) || toStr(data.updatedAt) || date;
    const faq = data.faq || data.faqItems || [];
    return {
      slug,
      title: data.title || 'Untitled',
      date,
      excerpt: data.excerpt || data.description || '',
      description: data.description || data.excerpt || '',
      category: data.category || 'general',
      image,
      heroImage: image,
      tags: data.tags || [],
      content: html,
      contentHtml: html,
      author: data.author || { name: 'Team' },
      readingTime: data.readingTime || 5,
      lastUpdated,
      updatedAt: lastUpdated,
      sources: data.sources || [],
      faq,
      faqItems: faq,
      toc: data.toc || [],
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error.message);
    return null;
  }
}

function getAllSlugs(_locale) {
  return loadAllFiles().map(({ filename }) => filename.replace(/\.md$/, ''));
}

// Alias for legacy callers (some pages import this name).
function getPostSlugs() { return getAllSlugs(); }

// Simple tag-overlap related-posts. Returns up to `limit` posts sorted by
// descending shared-tag count, excluding the current slug.
function getRelatedPosts(currentSlug, _locale, limit = 3) {
  const all = getAllPosts();
  const current = all.find(p => p.slug === currentSlug);
  if (!current) return all.filter(p => p.slug !== currentSlug).slice(0, limit);
  const currentTags = new Set((current.tags || []).map(t => String(t).toLowerCase()));
  const scored = all
    .filter(p => p.slug !== currentSlug)
    .map(p => {
      const tags = (p.tags || []).map(t => String(t).toLowerCase());
      const overlap = tags.filter(t => currentTags.has(t)).length;
      return { post: p, score: overlap };
    })
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime());
  return scored.slice(0, limit).map(s => s.post);
}


// --- Legacy helpers expected by existing pages (locale arg ignored, loader is locale-agnostic) ---
function slugifyTag(tag) {
  return String(tag || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function getAllCategories(_locale) {
  const s = new Set();
  for (const p of getAllPosts()) if (p.category) s.add(p.category);
  return Array.from(s);
}
function getAllTags(_locale) {
  const s = new Set();
  for (const p of getAllPosts()) if (Array.isArray(p.tags)) p.tags.forEach(t => s.add(slugifyTag(t)));
  return Array.from(s);
}
function getPostsByCategory(category, _locale) {
  return getAllPosts().filter(p => p.category === category);
}
function getPostsByTag(tag, _locale) {
  return getAllPosts().filter(p => Array.isArray(p.tags) && p.tags.some(t => slugifyTag(t) === tag));
}
function getFeaturedPosts(_locale) {
  return getAllPosts().filter(p => p.featured);
}
function getAdjacentPosts(currentSlug, _locale) {
  const posts = getAllPosts();
  const idx = posts.findIndex(p => p.slug === currentSlug);
  if (idx === -1) return { prevPost: null, nextPost: null };
  const pick = p => p ? { slug: p.slug, title: p.title, category: p.category } : null;
  return {
    prevPost: pick(idx > 0 ? posts[idx - 1] : null),
    nextPost: pick(idx < posts.length - 1 ? posts[idx + 1] : null),
  };
}
function getPostStaticPaths(_locale) {
  return getAllPosts().map(p => ({ params: { slug: p.slug } }));
}
function getCategoryStaticPaths(_locale) {
  return getAllCategories().map(category => ({ params: { category } }));
}
function getTagStaticPaths(_locale) {
  return getAllTags().map(tag => ({ params: { tag } }));
}

module.exports = {
  getAllPosts, getPostBySlug, getAllSlugs, getPostSlugs, getRelatedPosts,
  slugifyTag,
  getAllCategories,
  getAllTags,
  getPostsByCategory,
  getPostsByTag,
  getFeaturedPosts,
  getAdjacentPosts,
  getPostStaticPaths,
  getCategoryStaticPaths,
  getTagStaticPaths,
};
