import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { getAllPosts, getAllTags, getPostsByTag } from '../../../lib/blog';
import { siteConfig } from '../../../site.config';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: { name: string };
  category: string;
  tags: string[];
  image: string;
  readingTime?: number;
}

interface TagPageProps {
  posts: BlogPost[];
  tag: string;
  allTags: string[];
}

function formatTagName(tag: string): string {
  return tag
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function BlogTagPage({ posts, tag, allTags }: TagPageProps) {
  const displayTag = formatTagName(tag);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: `Tag: ${displayTag}`, href: `/blog/tag/${tag}/` },
  ];

  return (
    <>
      <SEOHead
        title={`${displayTag} Articles | France Travel Blog | ${siteConfig.name}`}
        description={`Browse all articles tagged "${displayTag}" on ${siteConfig.name}. France travel tips, guides, and stories.`}
      >
        <meta name="keywords" content={`France ${tag}, France travel, ${tag} articles, France blog`} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <div className="text-center">
              <span className="font-script text-france-gold text-lg">Blog Tag</span>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4 mt-2">
                <span className="text-france-gold">#</span> {displayTag}
              </h1>
              <p className="text-xl opacity-90">{posts.length} article{posts.length !== 1 ? 's' : ''} with this tag</p>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="container-custom py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Tag Cloud */}
        {allTags.length > 0 && (
          <section className="bg-white border-b">
            <div className="container-custom py-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {allTags.slice(0, 20).map((t) => (
                  <Link
                    key={t}
                    href={`/blog/tag/${t}/`}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      t === tag
                        ? 'bg-france-blue text-white'
                        : 'bg-surface-cream text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {formatTagName(t)}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Posts Grid */}
        <section className="section-padding">
          <div className="container-custom">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}/`} className="group">
                    <article className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                      {post.image && (
                        <div className="aspect-video bg-gray-100 relative overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          {post.category && (
                            <span className="text-xs font-medium text-france-blue bg-france-blue-50 px-2 py-1 rounded-full">
                              {formatTagName(post.category)}
                            </span>
                          )}
                          {post.readingTime && (
                            <span className="text-xs text-gray-500">{post.readingTime} min read</span>
                          )}
                        </div>
                        <h2 className="text-lg font-bold font-heading text-gray-900 mb-2 group-hover:text-france-blue transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{post.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{post.author?.name}</span>
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {post.tags.slice(0, 3).map((t) => (
                              <span key={t} className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">No posts with this tag yet</h2>
                <p className="text-gray-600 mb-8">Check back soon for articles tagged &quot;{displayTag}&quot;.</p>
                <Link href="/blog/" className="btn-primary">View All Blog Posts</Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = getAllTags();
  const paths = tags.map((tag: string) => ({
    params: { tag },
  }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params?.tag as string;
  const posts = getPostsByTag(tag);
  const allTags = getAllTags();

  if (posts.length === 0 && !allTags.includes(tag)) {
    return { notFound: true };
  }

  return {
    props: {
      posts,
      tag,
      allTags,
    },
  };
};
