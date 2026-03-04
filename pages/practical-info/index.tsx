import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllPracticalInfo } from '../../lib/practical-info';
import { siteConfig } from '../../site.config';

interface PracticalInfoItem {
  id: number;
  slug: string;
  title: { en: string };
  icon: string;
}

interface PracticalInfoPageProps {
  items: PracticalInfoItem[];
}

export default function PracticalInfoIndexPage({ items }: PracticalInfoPageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Practical Info', href: '/practical-info/' }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "France Practical Travel Info",
    "description": "Essential practical information for traveling to France. Tipping, electricity, safety, currency, language and cultural etiquette.",
    "url": `${siteConfig.seo.siteUrl}/practical-info/`,
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
        title="France Travel Tips & Practical Info 2026 | Go2France"
        description="Essential France travel information for 2026. Tipping etiquette, electricity and plugs, safety tips, currency guide, French language basics, health and pharmacies, and cultural customs."
      >
        <meta name="keywords" content="France travel tips, France practical info, tipping France, electricity France, France safety, Euro currency, French etiquette" />
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
              <span className="font-script text-france-gold text-lg">Essential Knowledge</span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6 mt-2">
                Practical Travel Info
              </h1>
              <p className="text-xl lg:text-2xl mb-4 max-w-3xl mx-auto opacity-90">
                Everything you need to know before visiting France
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

        {/* Info Cards */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {items.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                  <Link
                    key={item.id}
                    href={`/practical-info/${item.slug}/`}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-8 group text-center"
                  >
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h2 className="text-xl font-bold font-heading text-gray-900 group-hover:text-france-blue transition-colors">
                      {item.title.en}
                    </h2>
                  </Link>
                ))}
              </div>
            ) : (
              /* Static content when no individual data files exist yet */
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: '💶', title: 'Tipping Etiquette', desc: 'Service is included in France (service compris). Tipping is appreciated but not expected — round up or leave 1-2 EUR for good service.' },
                  { icon: '🔌', title: 'Electricity & Plugs', desc: 'France uses Type C and Type E plugs at 230V/50Hz. UK and US travelers need an adapter.' },
                  { icon: '🛡️', title: 'Safety Tips', desc: 'France is generally safe. Watch for pickpockets in Paris tourist areas and on the Metro. Keep valuables secure.' },
                  { icon: '💰', title: 'Currency & Money', desc: 'France uses the Euro (EUR). Credit cards are widely accepted. ATMs (distributeurs) are everywhere. Contactless payments are standard.' },
                  { icon: '🗣️', title: 'French Language Basics', desc: 'Learning a few French phrases goes a long way. Start with bonjour (hello), merci (thank you), and s\'il vous plait (please).' },
                  { icon: '🏥', title: 'Health & Pharmacies', desc: 'French pharmacies (marked with a green cross) are excellent for minor health issues. Pharmacists can recommend treatments and some medications.' },
                  { icon: '🤝', title: 'French Etiquette', desc: 'Always greet with bonjour when entering a shop. The French value politeness, punctuality for meals, and proper table manners.' },
                  { icon: '🧳', title: 'Packing List', desc: 'Pack layers for variable weather, comfortable walking shoes, a light rain jacket, and smart-casual evening wear for restaurants.' },
                  { icon: '📅', title: 'Public Holidays', desc: 'France has 11 public holidays. Many shops close on Sundays and holidays. August is vacation month — some businesses close entirely.' },
                  { icon: '📶', title: 'WiFi & Connectivity', desc: 'Free WiFi is available in most hotels, cafes, and public spaces. Consider an eSIM for reliable mobile data throughout your trip.' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-md p-8 text-center">
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">{item.title}</h2>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">More Travel Resources</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/visa/" className="bg-surface-cream text-france-blue px-6 py-3 rounded-xl font-medium hover:bg-france-blue hover:text-white transition-colors">Visa Guide</Link>
              <Link href="/weather/" className="bg-surface-cream text-france-blue px-6 py-3 rounded-xl font-medium hover:bg-france-blue hover:text-white transition-colors">Weather Guide</Link>
              <Link href="/transport/" className="bg-surface-cream text-france-blue px-6 py-3 rounded-xl font-medium hover:bg-france-blue hover:text-white transition-colors">Transport</Link>
              <Link href="/esim/" className="bg-surface-cream text-france-blue px-6 py-3 rounded-xl font-medium hover:bg-france-blue hover:text-white transition-colors">eSIM</Link>
            </div>
          </div>
        </section>

        {/* Affiliate Banner */}
        <section className="bg-surface-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold font-heading mb-1">Plan Your France Trip</h2>
                <p className="opacity-90 text-sm">Book hotels, transport and activities</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={siteConfig.affiliateLinks.booking} target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-surface-cream transition-colors">Booking.com</a>
                <a href={siteConfig.affiliateLinks.tripcom} target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-surface-cream transition-colors">Trip.com</a>
                <Link href="/travel-insurance/" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-surface-cream transition-colors">Insurance</Link>
                <a href={siteConfig.affiliateLinks.esim} target="_blank" rel="noopener noreferrer" className="bg-white text-france-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-surface-cream transition-colors">eSIM</a>
              </div>
            </div>
            <p className="text-white/70 text-xs text-center mt-4">Some links are affiliate links. We may earn a commission at no extra cost to you.</p>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const items = getAllPracticalInfo();
  return {
    props: { items }
  };
};
