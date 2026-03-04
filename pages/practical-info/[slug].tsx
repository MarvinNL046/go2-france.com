import { GetStaticPaths, GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllPracticalInfo, getPracticalInfoBySlug, generatePracticalInfoBreadcrumbs } from '../../lib/practical-info';
import { siteConfig } from '../../site.config';

interface SectionItem {
  name: { en: string };
  description: { en: string };
  how_to_avoid?: { en: string };
}

interface Section {
  title: { en: string };
  items: SectionItem[];
}

interface FAQ {
  question: { en: string };
  answer: { en: string };
}

interface PracticalInfo {
  slug: string;
  title: { en: string };
  icon: string;
  description: { en: string };
  sections: Section[];
  faqs: FAQ[];
  tips: Array<{ en: string }>;
  last_updated: string;
  seo: {
    metaTitle: { en: string };
    metaDescription: { en: string };
  };
}

interface PracticalInfoPageProps {
  info: PracticalInfo;
}

export default function PracticalInfoDetailPage({ info }: PracticalInfoPageProps) {
  const breadcrumbs = generatePracticalInfoBreadcrumbs(info);

  // Resolve description: data may have 'description' or 'content' field
  const infoDescription = info.description?.en || (info as any).content?.en || '';

  // Resolve SEO fields: may be {en: "..."} objects or plain strings
  const seoTitle = (typeof info.seo?.metaTitle === 'object' ? (info.seo.metaTitle as any).en : info.seo?.metaTitle) || `${info.title.en} | Go2France`;
  const seoDescription = (typeof info.seo?.metaDescription === 'object' ? (info.seo.metaDescription as any).en : info.seo?.metaDescription) || infoDescription;

  const faqJsonLd = info.faqs && info.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": info.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question.en,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.en
      }
    }))
  } : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${siteConfig.seo.siteUrl}${crumb.href}`
    }))
  };

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
      >
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{info.icon}</span>
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold font-heading">{info.title.en}</h1>
                <p className="text-lg opacity-90 mt-2">{infoDescription}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Content Sections (structured format) */}
              {info.sections && info.sections.map((section, sIndex) => (
                <section key={sIndex}>
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                    {section.title.en}
                  </h2>
                  <div className="space-y-4">
                    {section.items.map((item, iIndex) => (
                      <div key={iIndex} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-6">
                        <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">{item.name.en}</h3>
                        <p className="text-gray-700 mb-3">{item.description.en}</p>
                        {item.how_to_avoid && (
                          <div className="bg-green-50 rounded-xl p-3">
                            <span className="font-medium text-green-800">How to avoid: </span>
                            <span className="text-green-700">{item.how_to_avoid.en}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {/* Fallback: render content field if no structured sections exist */}
              {!info.sections && infoDescription && (
                <section>
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
                      {infoDescription}
                    </div>
                  </div>
                </section>
              )}

              {/* FAQs */}
              {info.faqs && info.faqs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {info.faqs.map((faq, index) => (
                      <details key={index} className="bg-white rounded-2xl shadow-md group">
                        <summary className="p-6 cursor-pointer font-bold text-gray-900 flex justify-between items-center">
                          {faq.question.en}
                          <svg className="w-5 h-5 transform transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="px-6 pb-6 text-gray-700">{faq.answer.en}</div>
                      </details>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              <div className="lg:sticky lg:top-4 space-y-6">
                {/* Tips */}
                {info.tips && info.tips.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-xl font-bold font-heading mb-4">Quick Tips</h3>
                    <ul className="space-y-3">
                      {info.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-yellow-500">&#9733;</span>
                          <span className="text-sm text-gray-700">{tip.en}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Pages */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading mb-4">Related</h3>
                  <div className="space-y-2">
                    <Link href="/visa/" className="block text-france-blue hover:underline text-sm">Visa Guide</Link>
                    <Link href="/weather/" className="block text-france-blue hover:underline text-sm">Weather Guide</Link>
                    <Link href="/transport/" className="block text-france-blue hover:underline text-sm">Transport</Link>
                    <Link href="/practical-info/" className="block text-france-blue hover:underline text-sm">&larr; All practical info</Link>
                  </div>
                </div>

                {/* eSIM */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading mb-2">France eSIM</h3>
                  <p className="text-sm text-gray-600 mb-4">Stay connected in France. Order your eSIM before you go.</p>
                  <a href={siteConfig.affiliateLinks.esim} target="_blank" rel="noopener noreferrer" className="block bg-france-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-france-red transition-colors mb-2">
                    Saily eSIM
                  </a>
                  <Link href="/esim/" className="block text-france-blue text-center text-sm hover:underline">More eSIM options &rarr;</Link>
                </div>

                {/* Book Hotels */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading mb-3">Book Hotels</h3>
                  <div className="space-y-3">
                    <a href={siteConfig.affiliateLinks.booking} target="_blank" rel="noopener noreferrer" className="block bg-france-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-france-red transition-colors text-sm">
                      Booking.com
                    </a>
                    <a href={siteConfig.affiliateLinks.tripcom} target="_blank" rel="noopener noreferrer" className="block bg-france-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-france-red transition-colors text-sm">
                      Trip.com
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const items = getAllPracticalInfo();
  const paths = items.map((item: { slug: string }) => ({
    params: { slug: item.slug }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const info = getPracticalInfoBySlug(slug);

  if (!info) {
    return { notFound: true };
  }

  return {
    props: { info },
    revalidate: 86400
  };
};
