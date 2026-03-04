import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllPosts, getAllCategories } from '../../lib/blog';

interface BlogPost {
  slug: string; title: string; description: string; date: string;
  author: { name: string }; category: string; tags: string[];
  image: string; featured?: boolean; readingTime: number;
}

interface BlogPageProps { posts: BlogPost[]; categories: string[]; }

export default function BlogPage({ posts, categories }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { locale } = useRouter();

  const breadcrumbs = [{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog/' }];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts[0];

  const jsonLd = {
    "@context": "https://schema.org", "@type": "Blog",
    "name": "Go2France Travel Blog", "description": "France travel tips, guides, and stories",
    "url": "https://go2-france.com/blog/",
    "blogPost": posts.slice(0, 5).map(post => ({
      "@type": "BlogPosting", "headline": post.title, "description": post.description,
      "datePublished": post.date, "author": { "@type": "Person", "name": post.author.name },
      "url": `https://go2-france.com/blog/${post.slug}/`
    }))
  };

  return (
    <>
      <SEOHead title="France Travel Blog | Tips, Guides & Stories | Go2France" description="Explore France through our travel blog. Get insider tips, destination guides, food recommendations, and travel stories from la belle France.">
        <meta name="keywords" content="France travel blog, France tips, France guides, French culture, France stories" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <span className="font-script text-france-gold text-lg">Discover France</span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">France Travel Blog</h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">Stories, tips, and insights from la belle France</p>
            </div>
          </div>
        </section>

        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <Breadcrumbs items={breadcrumbs} />
              <div className="relative w-full md:w-96">
                <input type="text" placeholder="Search blog posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:border-france-blue" />
                <svg className="absolute right-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              <button onClick={() => setSelectedCategory('all')} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === 'all' ? 'bg-france-blue text-white' : 'bg-surface-cream text-gray-700 hover:bg-gray-200'}`}>All Posts</button>
              {categories.map(category => (
                <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors capitalize ${selectedCategory === category ? 'bg-france-blue text-white' : 'bg-surface-cream text-gray-700 hover:bg-gray-200'}`}>{category}</button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {featuredPost && selectedCategory === 'all' && !searchQuery && (
                  <article className="mb-12 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <Link href={`/blog/${featuredPost.slug}/`}>
                      <div className="relative h-96">
                        <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                        <div className="absolute top-4 left-4 bg-france-red text-white px-3 py-1 rounded-full text-sm font-medium">Featured</div>
                      </div>
                    </Link>
                    <div className="p-8">
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span>{featuredPost.author.name}</span><span>-</span><span>{featuredPost.date}</span><span>-</span><span>{featuredPost.readingTime} min read</span>
                      </div>
                      <h2 className="text-3xl font-bold font-heading mb-4">
                        <Link href={`/blog/${featuredPost.slug}/`} className="hover:text-france-blue transition-colors">{featuredPost.title}</Link>
                      </h2>
                      <p className="text-gray-700 mb-4 line-clamp-3">{featuredPost.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="bg-surface-cream text-gray-700 px-3 py-1 rounded-full text-sm capitalize">{featuredPost.category}</span>
                        <Link href={`/blog/${featuredPost.slug}/`} className="text-france-blue font-medium hover:underline">Read More &rarr;</Link>
                      </div>
                    </div>
                  </article>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.map(post => (
                    <article key={post.slug} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <Link href={`/blog/${post.slug}/`}>
                        <div className="relative h-48"><Image src={post.image} alt={post.title} fill className="object-cover hover:scale-105 transition-transform duration-300" /></div>
                      </Link>
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3"><span>{post.date}</span><span>-</span><span>{post.readingTime} min</span></div>
                        <h3 className="text-xl font-bold font-heading mb-3"><Link href={`/blog/${post.slug}/`} className="hover:text-france-blue transition-colors">{post.title}</Link></h3>
                        <p className="text-gray-700 mb-4 line-clamp-2">{post.description}</p>
                        <span className="bg-surface-cream text-gray-700 px-2 py-1 rounded-full text-xs capitalize">{post.category}</span>
                      </div>
                    </article>
                  ))}
                </div>
                {filteredPosts.length === 0 && (<div className="text-center py-12 bg-white rounded-2xl"><p className="text-gray-600 text-lg">No posts found matching your criteria.</p></div>)}
              </div>

              <aside>
                <div className="lg:sticky lg:top-16 space-y-8">
                  <div className="bg-surface-dark text-white rounded-2xl p-6">
                    <h3 className="text-xl font-bold font-heading mb-2">Stay Updated</h3>
                    <p className="mb-4 opacity-90">Get the latest France travel tips delivered to your inbox</p>
                    <form className="space-y-3" onSubmit={e => e.preventDefault()}>
                      <input type="email" placeholder="Your email address" className="w-full px-4 py-2 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white" />
                      <button className="w-full bg-france-red text-white font-medium py-2 rounded-xl hover:bg-france-red/90 transition-colors">Subscribe</button>
                    </form>
                  </div>
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-xl font-bold font-heading mb-4">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {['paris', 'food', 'wine', 'visa', 'museums', 'planning', 'budget', 'provence', 'riviera'].map(tag => (
                        <Link key={tag} href={`/blog/tag/${tag}/`} className="bg-surface-cream text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-france-blue hover:text-white transition-colors capitalize">{tag.replace('-', ' ')}</Link>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-xl font-bold font-heading mb-4">Explore More</h3>
                    <div className="space-y-2">
                      <Link href="/region/" className="block text-france-blue hover:underline">France Regions</Link>
                      <Link href="/visa/" className="block text-france-blue hover:underline">Visa Guide</Link>
                      <Link href="/food/" className="block text-france-blue hover:underline">French Food Guide</Link>
                      <Link href="/practical-info/" className="block text-france-blue hover:underline">Practical Info</Link>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-xl font-bold font-heading mb-3">Book Hotels</h3>
                    <div className="space-y-3">
                      <a href="https://booking.tpo.lv/2PT1kR82" target="_blank" rel="noopener noreferrer" className="block bg-france-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-france-blue/90 transition-colors text-sm">Booking.com</a>
                      <a href="https://trip.tpo.lv/TmObooZ5" target="_blank" rel="noopener noreferrer" className="block bg-france-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-france-blue/90 transition-colors text-sm">Trip.com</a>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-surface-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold font-heading mb-1">Plan Your France Trip</h2>
                <p className="opacity-90 text-sm">Book hotels, transport, activities, and get connected with an eSIM</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="https://booking.tpo.lv/2PT1kR82" target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Booking.com</a>
                <a href="https://trip.tpo.lv/TmObooZ5" target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Trip.com</a>
                <a href="https://klook.tpo.lv/7Dt6WApj" target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Activities</a>
                <a href="https://12go.tpo.lv/tNA80urD" target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Transport</a>
                <a href="https://saily.tpo.lv/rf9lidnE" target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">eSIM</a>
              </div>
            </div>
            <p className="text-white/70 text-xs text-center mt-4">Some links are affiliate links. We may earn a commission at no extra cost to you.</p>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const lang = locale === 'nl' ? 'nl' : 'en';
  const posts = getAllPosts(lang);
  const categories = getAllCategories(lang);
  return { props: { posts, categories }, revalidate: 60 };
};
