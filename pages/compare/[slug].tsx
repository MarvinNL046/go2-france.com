import { GetStaticPaths, GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllComparisons, getComparisonBySlug } from '../../lib/comparisons';
import { getCityBySlug } from '../../lib/cities';
import { siteConfig } from '../../site.config';

interface City {
  slug: string;
  name: { en: string };
  region: string;
  description?: { en: string };
  highlights?: string[] | Array<{ en: string }>;
  tags?: string[];
  budget_info?: { daily_budget?: { budget: string; mid: string; luxury: string } };
  best_time_to_visit?: { season?: string; weather?: string };
}

interface ComparisonData {
  slug: string;
  type: string;
  summary?: { en: string };
  verdict?: { en: string };
  categories?: Array<{
    name: string;
    winner: string;
    item1_score: number;
    item2_score: number;
    item1_text: { en: string };
    item2_text: { en: string };
  }>;
  faq?: Array<{ question: { en: string }; answer: { en: string } }>;
}

interface ComparisonPageProps {
  item1: City;
  item2: City;
  enrichedData: ComparisonData | null;
  slug: string;
  relatedComparisons: Array<{ slug: string; name1: { en: string }; name2: { en: string } }>;
}

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className={`h-2 rounded-full ${color}`} style={{ width: `${Math.min(100, Math.max(0, score * 10))}%` }} />
    </div>
  );
}

function TableRow({ label, val1, val2, numericCompare = false }: { label: string; val1: string; val2: string; numericCompare?: boolean }) {
  let item1Better = false;
  let item2Better = false;
  if (numericCompare) {
    const n1 = parseInt(val1, 10);
    const n2 = parseInt(val2, 10);
    if (!isNaN(n1) && !isNaN(n2)) {
      item1Better = n1 > n2;
      item2Better = n2 > n1;
    }
  }
  return (
    <div className="grid grid-cols-3 hover:bg-surface-cream transition-colors">
      <div className={`p-4 text-center text-sm font-medium ${item1Better ? 'bg-green-50 text-green-800' : 'text-gray-700'}`}>{val1}</div>
      <div className="p-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide bg-surface-cream border-x border-gray-100">{label}</div>
      <div className={`p-4 text-center text-sm font-medium ${item2Better ? 'bg-green-50 text-green-800' : 'text-gray-700'}`}>{val2}</div>
    </div>
  );
}

export default function ComparisonPage({ item1, item2, enrichedData, slug, relatedComparisons }: ComparisonPageProps) {
  const item1Name = item1.name.en;
  const item2Name = item2.name.en;

  const pageTitle = `${item1Name} vs ${item2Name} (2026) -- Which French City Is Better? | ${siteConfig.name}`;
  const metaDescription = enrichedData?.verdict?.en
    ? enrichedData.verdict.en.slice(0, 155) + (enrichedData.verdict.en.length > 155 ? '...' : '')
    : `Compare ${item1Name} and ${item2Name} side by side. Find out which French city suits your travel style, budget, and interests best.`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Compare', href: '/compare/' },
    { name: `${item1Name} vs ${item2Name}`, href: `/compare/${slug}/` },
  ];

  const getHighlightCount = (city: City) => {
    if (!city.highlights) return 0;
    return city.highlights.length;
  };

  const getTags = (city: City) => {
    if (!city.tags) return '-';
    return city.tags.slice(0, 3).join(', ');
  };

  const faqJsonLd = enrichedData?.faq && enrichedData.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: enrichedData.faq.map((item) => ({
          "@type": "Question",
          name: item.question.en,
          acceptedAnswer: { "@type": "Answer", text: item.answer.en },
        })),
      }
    : null;

  return (
    <>
      <SEOHead title={pageTitle} description={metaDescription}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: pageTitle,
              description: metaDescription,
              author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.seo.siteUrl },
              publisher: { "@type": "Organization", name: siteConfig.name },
              mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.seo.siteUrl}/compare/${slug}/` },
            }),
          }}
        />
        {faqJsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        )}
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white py-16">
          <div className="container-custom">
            <span className="font-script text-france-gold text-lg mb-4 block text-center">City Comparison</span>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
              <div className="flex-1">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm mb-3">{item1.region}</div>
                <h1 className="text-4xl lg:text-5xl font-bold font-heading">{item1Name}</h1>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-white text-france-blue text-3xl font-black w-16 h-16 rounded-full flex items-center justify-center shadow-lg">VS</div>
              </div>
              <div className="flex-1">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm mb-3">{item2.region}</div>
                <h2 className="text-4xl lg:text-5xl font-bold font-heading">{item2Name}</h2>
              </div>
            </div>
            <p className="text-center text-gray-300 mt-6 text-lg">Which French city should you choose in 2026?</p>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="container-custom py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        <div className="container-custom py-12">
          {/* Quick Verdict */}
          {enrichedData?.verdict && (
            <section className="mb-10">
              <div className="bg-white border-0 rounded-2xl p-6 shadow-md">
                <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">Our Verdict</h2>
                <p className="text-gray-700 leading-relaxed">{enrichedData.verdict.en}</p>
              </div>
            </section>
          )}

          {/* Summary */}
          {enrichedData?.summary && (
            <section className="mb-10">
              <p className="text-gray-700 text-lg leading-relaxed">{enrichedData.summary.en}</p>
            </section>
          )}

          {/* Comparison Table */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
              {item1Name} vs {item2Name}: Key Comparison
            </h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-3 bg-france-blue text-white">
                <div className="p-4 font-bold text-lg text-center">{item1Name}</div>
                <div className="p-4 font-semibold text-center text-blue-100 text-sm uppercase tracking-wide border-x border-blue-400">Category</div>
                <div className="p-4 font-bold text-lg text-center">{item2Name}</div>
              </div>
              <div className="divide-y divide-gray-100">
                <TableRow label="Region" val1={item1.region} val2={item2.region} />
                <TableRow label="Highlights" val1={String(getHighlightCount(item1))} val2={String(getHighlightCount(item2))} numericCompare />
                <TableRow label="Budget / day" val1={item1.budget_info?.daily_budget?.budget ?? '-'} val2={item2.budget_info?.daily_budget?.budget ?? '-'} />
                <TableRow label="Tags" val1={getTags(item1)} val2={getTags(item2)} />
              </div>
            </div>
          </section>

          {/* Category Scores */}
          {enrichedData?.categories && enrichedData.categories.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Category Breakdown</h2>
              <div className="space-y-6">
                {enrichedData.categories.map((cat, idx) => {
                  const item1Wins = cat.winner === item1.slug;
                  const item2Wins = cat.winner === item2.slug;
                  return (
                    <div key={idx} className="bg-white rounded-xl shadow-md p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-xl font-bold font-heading text-gray-900">{cat.name}</h3>
                        {(item1Wins || item2Wins) && (
                          <span className="ml-auto bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                            Winner: {item1Wins ? item1Name : item2Name}
                          </span>
                        )}
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className={`rounded-xl p-4 ${item1Wins ? 'bg-green-50 border border-green-200' : 'bg-surface-cream'}`}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-800">{item1Name}</span>
                            <span className="text-sm font-bold text-gray-600">{cat.item1_score}/10</span>
                          </div>
                          <ScoreBar score={cat.item1_score} color={item1Wins ? 'bg-green-500' : 'bg-blue-400'} />
                          <p className="text-sm text-gray-700 mt-3">{cat.item1_text.en}</p>
                        </div>
                        <div className={`rounded-xl p-4 ${item2Wins ? 'bg-green-50 border border-green-200' : 'bg-surface-cream'}`}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-800">{item2Name}</span>
                            <span className="text-sm font-bold text-gray-600">{cat.item2_score}/10</span>
                          </div>
                          <ScoreBar score={cat.item2_score} color={item2Wins ? 'bg-green-500' : 'bg-blue-400'} />
                          <p className="text-sm text-gray-700 mt-3">{cat.item2_text.en}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* FAQ */}
          {enrichedData?.faq && enrichedData.faq.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {enrichedData.faq.map((item, idx) => (
                  <details key={idx} className="bg-white rounded-xl shadow-md group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                      <h3 className="font-semibold text-gray-900 pr-4">{item.question.en}</h3>
                      <svg className="w-5 h-5 text-gray-500 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed">{item.answer.en}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related Comparisons */}
          {relatedComparisons.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">More Comparisons</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedComparisons.map((comp) => (
                  <Link
                    key={comp.slug}
                    href={`/compare/${comp.slug}/`}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-4 group"
                  >
                    <span className="text-sm font-medium text-gray-800 group-hover:text-france-blue transition-colors">
                      {comp.name1.en} vs {comp.name2.en}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Deep links to individual cities */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold font-heading text-gray-900 mb-4">Learn More</h2>
              <div className="flex flex-wrap gap-4">
                <Link href={`/city/${item1.slug}/`} className="inline-flex items-center gap-2 bg-france-blue text-white px-5 py-3 rounded-xl font-semibold hover:bg-france-blue-600 transition-colors">
                  Full Guide: {item1Name}
                </Link>
                <Link href={`/city/${item2.slug}/`} className="inline-flex items-center gap-2 bg-france-blue text-white px-5 py-3 rounded-xl font-semibold hover:bg-france-blue-600 transition-colors">
                  Full Guide: {item2Name}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = getAllComparisons();
  let comparisons: any[] = [];

  if (Array.isArray(data)) {
    comparisons = data;
  } else if (data && data.comparisons) {
    comparisons = data.comparisons;
  }

  const paths = comparisons.map((c: any) => ({ params: { slug: c.slug } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  // Parse slug: "paris-vs-lyon" -> item1="paris", item2="lyon"
  const parts = slug.split('-vs-');
  if (parts.length !== 2) {
    return { notFound: true };
  }

  const [item1Slug, item2Slug] = parts;

  const item1 = getCityBySlug(item1Slug);
  const item2 = getCityBySlug(item2Slug);

  if (!item1 || !item2) {
    return { notFound: true };
  }

  // Try to get enriched comparison data (wrapped in try-catch as the lib may fail if no individual file exists)
  let enrichedData = null;
  try {
    enrichedData = getComparisonBySlug(slug);
  } catch {
    // No enriched data available for this comparison
  }

  // Get related comparisons
  const allData = getAllComparisons();
  let allComparisons: any[] = [];
  if (Array.isArray(allData)) {
    allComparisons = allData;
  } else if (allData && allData.comparisons) {
    allComparisons = allData.comparisons;
  }

  const relatedComparisons = allComparisons
    .filter((c: any) => c.slug !== slug && (c.item1 === item1Slug || c.item2 === item1Slug || c.item1 === item2Slug || c.item2 === item2Slug))
    .slice(0, 8)
    .map((c: any) => ({ slug: c.slug, name1: c.name1, name2: c.name2 }));

  return {
    props: {
      item1,
      item2,
      enrichedData: enrichedData ?? null,
      slug,
      relatedComparisons,
    },
  };
};
