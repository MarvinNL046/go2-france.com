import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { getAllPosts, getAllCategories } from '../../../lib/blog';
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

interface CategoryPageProps {
  posts: BlogPost[];
  category: string;
  allCategories: string[];
}

function formatCategoryName(category: string): string {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function BlogCategoryPage({ posts, category, allCategories }: CategoryPageProps) {
  const displayCategory = formatCategoryName(category);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: displayCategory, href: `/blog/category/${category}/` },
  ];

  return (
    <>
      <SEOHead
        title={`${displayCategory} | France Travel Blog | ${siteConfig.name}`}
        description={`Browse all ${displayCategory.toLowerCase()} articles on ${siteConfig.name}. Tips, guides, and insights about France travel.`}
      >
        <meta name="keywords" content={`France ${category}, France travel blog, ${category} articles, France tips`} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <div className="text-center">
              <span className="font-script text-france-gold text-lg">Blog Category</span>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4 mt-2">{displayCategory}</h1>
              <p className="text-xl opacity-90">{posts.length} article{posts.length !== 1 ? 's' : ''} in this category</p>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="container-custom py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Category Navigation */}
        <section className="bg-white border-b">
          <div className="container-custom py-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              <Link
                href="/blog/"
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-surface-cream text-gray-700 hover:bg-gray-200 transition-colors"
              >
                All Posts
              </Link>
              {allCategories.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog/category/${cat}/`}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    cat === category
                      ? 'bg-france-blue text-white'
                      : 'bg-surface-cream text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {formatCategoryName(cat)}
                </Link>
              ))}
            </div>
          </div>
        </section>

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
                          <span className="text-xs font-medium text-france-blue bg-france-blue-50 px-2 py-1 rounded-full">
                            {formatCategoryName(post.category)}
                          </span>
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
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">No posts in this category yet</h2>
                <p className="text-gray-600 mb-8">Check back soon for new articles about {displayCategory.toLowerCase()}.</p>
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
  const categories = getAllCategories();
  const paths = categories.map((category: string) => ({
    params: { category },
  }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string;
  const allPosts = getAllPosts();
  const posts = allPosts.filter((post: any) => post.category === category);
  const allCategories = getAllCategories();

  if (posts.length === 0 && !allCategories.includes(category)) {
    return { notFound: true };
  }

  return {
    props: {
      posts,
      category,
      allCategories,
    },
  };
};
