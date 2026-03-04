import Link from 'next/link';
import Image from 'next/image';

interface RelatedPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  readingTime: number;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
  locale?: string;
}

export default function RelatedPosts({ posts, locale = 'en' }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  const headingMap: Record<string, string> = {
    en: 'People Also Read',
    fr: 'A lire aussi',
    nl: 'Anderen lezen ook',
  };
  const heading = headingMap[locale] || headingMap.en;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
          {heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col sm:flex-row"
            >
              {/* Thumbnail */}
              <div className="relative w-full sm:w-40 h-48 sm:h-auto flex-shrink-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 160px"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <span className="inline-block bg-france-blue text-white text-xs font-medium px-2 py-0.5 rounded-full capitalize mb-2">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-gray-900 group-hover:text-france-blue transition-colors line-clamp-2 text-base leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {post.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-3">
                  <time dateTime={post.date}>{post.date}</time>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
