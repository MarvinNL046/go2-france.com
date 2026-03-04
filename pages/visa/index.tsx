import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllVisas } from '../../lib/visas';
import { siteConfig } from '../../site.config';

interface Visa {
  id: number;
  slug: string;
  title: { en: string };
  icon: string;
  duration: string;
  cost: string;
  category: string;
}

interface VisaPageProps {
  visas: Visa[];
}

export default function VisaIndexPage({ visas }: VisaPageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Visa Guide', href: '/visa/' }
  ];

  const categories = [
    { key: 'schengen', label: 'Schengen Visa Types', icon: '🇪🇺' },
    { key: 'visa-free', label: 'Visa-Free Entry', icon: '✈️' },
    { key: 'long-stay', label: 'Long-Stay Visas', icon: '🏠' },
    { key: 'work', label: 'Work & Student Visas', icon: '💼' },
    { key: 'general', label: 'Processes & Info', icon: '📋' }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "France Visa Guide 2026",
    "description": "Complete guide to France visa requirements in 2026. Schengen visa, visa-free entry, long-stay visas, work permits and student visas.",
    "url": `${siteConfig.seo.siteUrl}/visa/`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `${siteConfig.seo.siteUrl}${crumb.href}`
      }))
    }
  };

  return (
    <>
      <SEOHead
        title="France Visa Guide 2026 | Schengen Requirements & Entry Rules | Go2France"
        description="Complete France visa guide 2026. Schengen visa requirements, visa-free entry for US/UK/Canada/Australia (90 days), long-stay visas, work permits & student visas. Step-by-step application process."
      >
        <meta name="keywords" content="France visa, Schengen visa, France visa requirements, visa-free France, long-stay visa France, France work permit, France student visa" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <p className="font-script text-france-gold mb-2">Visa Information</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                France Visa Guide 2026
              </h1>
              <p className="text-xl lg:text-2xl mb-4 max-w-3xl mx-auto opacity-90">
                Everything you need to know about visas and entry requirements for France
              </p>
              <p className="text-lg max-w-2xl mx-auto opacity-80">
                From Schengen visa-free entry to long-stay visas and work permits — find the right option for your trip
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Quick Summary */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-blue-50 border-0 rounded-2xl p-6">
              <h2 className="text-lg font-bold font-heading text-blue-800 mb-2">
                Good news for many travelers!
              </h2>
              <p className="text-blue-700">
                Citizens of the USA, Canada, Australia, UK, Japan, and 60+ other countries can enter France and the entire Schengen Area visa-free for up to 90 days within any 180-day period. Starting in 2026, the ETIAS (European Travel Information and Authorisation System) will be required for visa-exempt travelers — a simple online application costing 7 EUR.
              </p>
            </div>
          </div>
        </section>

        {/* Visa Categories */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {visas.length > 0 ? (
              categories.map(category => {
                const categoryVisas = visas.filter(v => v.category === category.key);
                if (categoryVisas.length === 0) return null;

                return (
                  <div key={category.key} className="mb-12">
                    <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                      {category.icon} {category.label}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryVisas.map(visa => (
                        <Link
                          key={visa.id}
                          href={`/visa/${visa.slug}/`}
                          className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-6 group"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <span className="text-3xl">{visa.icon}</span>
                            <span className="bg-france-blue/10 text-france-blue px-2 py-1 rounded-full text-xs font-medium">
                              {visa.cost}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-france-blue transition-colors mb-2">
                            {visa.title.en}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <span>Duration: {visa.duration}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              /* Static content when no visa data files exist yet */
              <div className="space-y-12">
                {/* Visa-Free Entry */}
                <div>
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                    Visa-Free Entry (Schengen Area)
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <span className="text-3xl mb-4 block">🇺🇸</span>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">USA, Canada, Australia</h3>
                      <p className="text-gray-600 text-sm mb-2">90 days visa-free within any 180-day period. Valid for tourism, business meetings, and short courses.</p>
                      <span className="text-xs text-france-blue font-medium">No visa fee</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <span className="text-3xl mb-4 block">🇬🇧</span>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">UK Citizens (Post-Brexit)</h3>
                      <p className="text-gray-600 text-sm mb-2">90 days visa-free in the Schengen Area per 180-day period. ETIAS required from 2026.</p>
                      <span className="text-xs text-france-blue font-medium">ETIAS: 7 EUR</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <span className="text-3xl mb-4 block">🇪🇺</span>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">EU/EEA Citizens</h3>
                      <p className="text-gray-600 text-sm mb-2">Unlimited stay and right to work. No visa or permit needed. Just bring a valid passport or national ID card.</p>
                      <span className="text-xs text-france-blue font-medium">Free movement</span>
                    </div>
                  </div>
                </div>

                {/* Long-Stay Visas */}
                <div>
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                    Long-Stay Visas (VLS-TS)
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <span className="text-3xl mb-4 block">🎓</span>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Student Visa</h3>
                      <p className="text-gray-600 text-sm mb-2">For studies lasting more than 90 days. Apply through Campus France in your home country. Allows part-time work (964 hours per year).</p>
                      <span className="text-xs text-france-blue font-medium">50 EUR application fee</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <span className="text-3xl mb-4 block">💼</span>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Work Visa (Talent Passport)</h3>
                      <p className="text-gray-600 text-sm mb-2">For skilled workers, researchers, artists, and startup founders. Valid up to 4 years with family reunification rights.</p>
                      <span className="text-xs text-france-blue font-medium">99 EUR application fee</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <span className="text-3xl mb-4 block">👨‍👩‍👧</span>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Family Reunion Visa</h3>
                      <p className="text-gray-600 text-sm mb-2">For spouses and dependents of French citizens or residents. Process through the French consulate in your home country.</p>
                      <span className="text-xs text-france-blue font-medium">99 EUR application fee</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <span className="text-3xl mb-4 block">🏖️</span>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Visitor Visa (Long Stay)</h3>
                      <p className="text-gray-600 text-sm mb-2">For stays over 90 days without working. Must demonstrate sufficient financial resources (approximately 1,500 EUR per month minimum).</p>
                      <span className="text-xs text-france-blue font-medium">99 EUR application fee</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <span className="text-3xl mb-4 block">🌍</span>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Working Holiday Visa</h3>
                      <p className="text-gray-600 text-sm mb-2">Available for citizens of Australia, Canada, Japan, South Korea, New Zealand, and other partner countries. Ages 18-30 (35 for some), valid 12 months.</p>
                      <span className="text-xs text-france-blue font-medium">Free for eligible countries</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <span className="text-3xl mb-4 block">🏡</span>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">Retirement Visa</h3>
                      <p className="text-gray-600 text-sm mb-2">Long-stay visitor visa for retirees. Requires proof of pension or passive income, health insurance, and accommodation in France.</p>
                      <span className="text-xs text-france-blue font-medium">99 EUR application fee</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">
              France Visa Overview 2026
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                France, as a member of the Schengen Area, follows the unified European visa policy that allows travelers to move freely between 27 European countries with a single visa. For most short-term visitors from the USA, Canada, Australia, UK, Japan, and many other countries, no visa is needed for stays up to 90 days within any 180-day period.
              </p>
              <p>
                The most significant change in 2026 is the introduction of ETIAS (European Travel Information and Authorisation System), which requires visa-exempt travelers to obtain a travel authorization online before entering the Schengen Area. The ETIAS costs 7 EUR, is valid for three years, and can be completed online in minutes. This is not a visa — it is a pre-travel screening similar to the US ESTA program.
              </p>
              <h3 className="font-heading">Key Points for 2026</h3>
              <ul>
                <li><strong>Schengen visa-free countries:</strong> 90 days within 180 days for 60+ nationalities</li>
                <li><strong>EU/EEA citizens:</strong> Unlimited stay with right to work — just bring a valid ID</li>
                <li><strong>UK citizens (post-Brexit):</strong> 90-day visa-free access, ETIAS required from 2026</li>
                <li><strong>ETIAS:</strong> New pre-travel authorization for visa-exempt travelers (7 EUR, valid 3 years)</li>
                <li><strong>Long-stay visas (VLS-TS):</strong> Required for stays over 90 days — study, work, family, or retirement</li>
                <li><strong>Talent Passport:</strong> Streamlined visa for skilled workers, researchers, and startup founders (up to 4 years)</li>
                <li><strong>Digital nomads:</strong> France does not yet have a dedicated digital nomad visa, but the Talent Passport or visitor visa may apply</li>
              </ul>
              <h3 className="font-heading">Schengen Visa Application Process</h3>
              <p>
                If you are from a country that requires a Schengen visa, you will need to apply at the French consulate or embassy in your home country (or through an external service provider like TLScontact or VFS Global). The short-stay Schengen visa (Type C) costs 80 EUR for adults and allows stays up to 90 days. Processing typically takes 15 calendar days but can take up to 45 days during peak periods.
              </p>
              <p>
                Required documents typically include a completed application form, passport-sized photos, travel insurance with minimum 30,000 EUR coverage, proof of accommodation, flight itinerary, proof of financial means, and a cover letter explaining the purpose of your visit.
              </p>
            </div>
          </div>
        </section>

        {/* Affiliate Banner */}
        <section className="bg-surface-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold font-heading mb-1">Plan Your France Trip</h2>
                <p className="opacity-90 text-sm">Book hotels, transport and more</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={siteConfig.affiliateLinks.booking} target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
                  Booking.com
                </a>
                <a href={siteConfig.affiliateLinks.tripcom} target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
                  Trip.com
                </a>
                <Link href="/travel-insurance/" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
                  Travel Insurance
                </Link>
                <a href={siteConfig.affiliateLinks.esim} target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
                  eSIM
                </a>
              </div>
            </div>
            <p className="text-white/70 text-xs text-center mt-4">
              Some links are affiliate links. We may earn a commission at no extra cost to you.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const visas = getAllVisas();

  return {
    props: {
      visas
    }
  };
};
