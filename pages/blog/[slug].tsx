import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import TripcomWidget from '../../components/TripcomWidget';
import AuthorBio from '../../components/blog/AuthorBio';
import Sources from '../../components/blog/Sources';
import LastUpdated from '../../components/blog/LastUpdated';
import RelatedPosts from '../../components/blog/RelatedPosts';
import ShareButtons from '../../components/ShareButtons';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '../../lib/blog';
import { useGsapBlogHero } from '../../components/animations/useGsapBlogHero';
import { useGsapScrollReveal } from '../../components/animations/useGsapScrollReveal';

interface BlogPost {
  slug: string; title: string; description: string; date: string; lastUpdated?: string;
  author: { name: string }; category: string; tags: string[]; image: string;
  featured?: boolean; readingTime: number; contentHtml?: string;
  sources?: Array<{ name: string; url: string }>; faqItems?: Array<{ question: string; answer: string }>;
}

interface BlogPostPageProps { post: BlogPost; relatedPosts: BlogPost[]; }

const WIDGET_SCRIPTS: Record<string, string> = {
  booking: '', klook: '', getyourguide: '', viator: '', '12go': '', trip: '', saily: '', nordvpn: '', nordpass: '',
};

export default function BlogPostPage({ post, relatedPosts }: BlogPostPageProps) {

  // GSAP entrance animations — respects prefers-reduced-motion automatically
  const heroRef = useGsapBlogHero<HTMLElement>();
  useGsapScrollReveal('[data-blog-content]');
  const { locale } = useRouter();

  useEffect(() => {
    const contentEl = document.querySelector('[data-blog-content]');
    if (!contentEl) return;
    const widgetDivs = contentEl.querySelectorAll<HTMLElement>('[data-widget]');
    widgetDivs.forEach((div) => {
      const widgetType = div.getAttribute('data-widget');
      if (!widgetType || !(widgetType in WIDGET_SCRIPTS)) return;
      const scriptSrc = WIDGET_SCRIPTS[widgetType];
      if (!scriptSrc) return;
      const scriptContainer = document.createElement('div');
      const script = document.createElement('script');
      script.src = scriptSrc; script.async = true; script.charset = 'utf-8';
      script.onload = () => { const fallback = div.querySelector('[data-widget-fallback]'); if (fallback) (fallback as HTMLElement).style.display = 'none'; };
      scriptContainer.appendChild(script); div.insertBefore(scriptContainer, div.firstChild);
    });
  }, []);

  const breadcrumbs = [{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog/' }, { name: post.title, href: `/blog/${post.slug}/` }];
  const articleJsonLd = {
    "@context": "https://schema.org", "@type": "Article", "headline": post.title, "description": post.description,
    "image": `https://go2-france.com${post.image}`, "datePublished": post.date, "dateModified": post.lastUpdated || post.date,
    "author": { "@type": "Person", "name": post.author.name },
    "publisher": { "@type": "Organization", "name": "Go2France", "url": "https://go2-france.com", "logo": { "@type": "ImageObject", "url": "https://go2-france.com/logo/go2france-logo.webp" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://go2-france.com/blog/${post.slug}/` }
  };
  const shareUrl = `https://go2-france.com/blog/${post.slug}/`;
  const shareImage = `https://go2-france.com${post.image}`;

  return (
    <>
      <SEOHead title={`${post.title} | Go2France`} description={post.description} ogImage={`https://go2-france.com${post.image}`}>
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author.name} />
        {post.tags.map(tag => (<meta key={tag} property="article:tag" content={tag} />))}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      </SEOHead>

      <article className="bg-surface-cream min-h-screen">
        <section className="relative h-[400px] lg:h-[500px]" ref={heroRef}>
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="max-w-4xl">
                <div className="flex gap-2 mb-4">
                  <Link href={`/blog/category/${post.category}/`} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-colors capitalize">{post.category}</Link>
                </div>
                <h1 className="text-3xl lg:text-5xl font-bold font-heading mb-6">{post.title}</h1>
                <div className="flex items-center gap-6 text-lg"><span>{post.author.name}</span><span>-</span><span>{post.date}</span><span>-</span><span>{post.readingTime} min read</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <Breadcrumbs items={breadcrumbs} />
              <LastUpdated date={post.lastUpdated || post.date} locale={locale} />
            </div>
          </div>
        </section>

        <section className="py-12 pb-20 sm:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                  <div className="mb-8 pb-6 border-b border-gray-100">
                    <ShareButtons url={shareUrl} title={post.title} description={post.description} image={shareImage} />
                  </div>
                  {post.contentHtml ? (
                    <div data-blog-content className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-france-blue prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                  ) : (<p className="text-gray-700">{post.description}</p>)}
                  {post.sources && post.sources.length > 0 && <Sources sources={post.sources} locale={locale} />}
                  <AuthorBio name={post.author.name} locale={locale} />
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="font-bold font-heading mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => { const tagSlug = tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); return (<Link key={tag} href={`/blog/tag/${tagSlug}/`} className="bg-surface-cream text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-france-blue hover:text-white transition-colors">#{tag}</Link>); })}
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="font-bold font-heading mb-4">Share this article</h3>
                    <ShareButtons url={shareUrl} title={post.title} description={post.description} image={shareImage} />
                  </div>
                </div>
              </div>
              <aside className="lg:col-span-4 lg:self-start">
                <div className="lg:sticky lg:top-4 space-y-6">
                  <div className="bg-surface-dark text-white rounded-2xl p-6">
                    <h3 className="text-xl font-bold font-heading mb-2">Get France Updates</h3>
                    <p className="mb-4 text-sm opacity-90">Weekly travel tips and guides</p>
                    <input type="email" placeholder="Your email" className="w-full px-4 py-2 rounded-xl text-gray-900 mb-3" />
                    <button className="w-full bg-france-red text-white font-medium py-2 rounded-xl hover:bg-france-red/90">Subscribe</button>
                  </div>
                  {relatedPosts.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <h3 className="font-bold font-heading text-lg mb-4">Related Articles</h3>
                      <div className="space-y-4">{relatedPosts.map(rp => (<article key={rp.slug}><Link href={`/blog/${rp.slug}/`} className="group"><h4 className="font-medium group-hover:text-france-blue transition-colors line-clamp-2">{rp.title}</h4><p className="text-sm text-gray-600 mt-1">{rp.readingTime} min read</p></Link></article>))}</div>
                    </div>
                  )}
                  <TripcomWidget city="France" type="searchbox" customTitle="Find France Hotels" />
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
        <RelatedPosts posts={relatedPosts} locale={locale} />
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts('en');
  const paths = posts.map(post => ({ params: { slug: post.slug } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const lang = locale === 'nl' ? 'nl' : 'en';
  const post = await getPostBySlug(slug, lang);
  if (!post) {
    const fallbackPost = await getPostBySlug(slug, 'en');
    if (!fallbackPost) return { notFound: true };
    const relatedPosts = getRelatedPosts(slug, 'en', 4);
    return { props: { post: fallbackPost, relatedPosts }, revalidate: 86400 };
  }
  const relatedPosts = getRelatedPosts(slug, lang, 4);
  return { props: { post, relatedPosts }, revalidate: 86400 };
};
