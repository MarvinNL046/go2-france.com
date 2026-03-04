import { GetStaticProps } from 'next';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import Link from 'next/link';
import { siteConfig } from '../site.config';

export default function AffiliateDisclosure() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Affiliate Disclosure', href: '/affiliate-disclosure/' },
  ];

  return (
    <>
      <SEOHead
        title={`Affiliate Disclosure | ${siteConfig.name}`}
        description={`Transparency about how ${siteConfig.name} earns revenue through affiliate partnerships. How affiliate links work, who our partners are, and our commitment to honest recommendations.`}
      />

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <div className="text-center max-w-4xl mx-auto">
              <span className="font-script text-france-gold text-lg mb-2 block">Transparency</span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                Affiliate Disclosure
              </h1>
              <p className="text-xl lg:text-2xl mb-4 opacity-90">
                How we earn revenue and our commitment to honest recommendations
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="container-custom py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto space-y-8">

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {siteConfig.name} is committed to full transparency about how we earn revenue. This disclosure explains our use of affiliate links, identifies our affiliate partners, and clarifies how these relationships affect (and do not affect) our content.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  This disclosure is provided in accordance with the US Federal Trade Commission (FTC) guidelines on endorsements and the European Union's consumer protection directives.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">How We Earn Revenue</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {siteConfig.name} is a free resource. We do not charge readers for access to any of our content. To keep the site running, maintain quality content, and pay our editorial team, we participate in affiliate programs with trusted travel booking platforms.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  When you click on certain links on our site and make a purchase or booking, we may earn a small commission. This commission comes from the partner company -- <strong>you pay the same price</strong> whether you use our affiliate link or go directly to the partner's website.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Our Affiliate Partners</h2>
                <p className="text-gray-700 mb-6">
                  We work with the following affiliate programs:
                </p>
                <div className="space-y-4">
                  <div className="border border-gray-100 rounded-xl p-5 hover:border-france-blue-200 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold font-heading text-gray-900 text-lg">Booking.com</h3>
                      <a href={siteConfig.affiliateLinks.booking} target="_blank" rel="noopener noreferrer" className="text-sm text-france-blue hover:underline">Visit</a>
                    </div>
                    <p className="text-gray-600">Hotel and accommodation bookings across France. One of the world's largest hotel booking platforms with extensive coverage of French hotels, guesthouses, apartments, and bed-and-breakfasts.</p>
                  </div>

                  <div className="border border-gray-100 rounded-xl p-5 hover:border-france-blue-200 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold font-heading text-gray-900 text-lg">Trip.com</h3>
                      <a href={siteConfig.affiliateLinks.tripcom} target="_blank" rel="noopener noreferrer" className="text-sm text-france-blue hover:underline">Visit</a>
                    </div>
                    <p className="text-gray-600">Flights, hotels, and travel packages. A comprehensive travel booking platform offering competitive rates on flights to and within France, hotels, and bundled travel deals.</p>
                  </div>

                  <div className="border border-gray-100 rounded-xl p-5 hover:border-france-blue-200 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold font-heading text-gray-900 text-lg">Klook</h3>
                      <a href={siteConfig.affiliateLinks.klook} target="_blank" rel="noopener noreferrer" className="text-sm text-france-blue hover:underline">Visit</a>
                    </div>
                    <p className="text-gray-600">Activities, attractions, and transport passes. Book skip-the-line tickets for the Eiffel Tower, Louvre, Versailles, and other major French attractions, plus cooking classes and day tours.</p>
                  </div>

                  <div className="border border-gray-100 rounded-xl p-5 hover:border-france-blue-200 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold font-heading text-gray-900 text-lg">GetYourGuide</h3>
                      <a href={siteConfig.affiliateLinks.getYourGuide} target="_blank" rel="noopener noreferrer" className="text-sm text-france-blue hover:underline">Visit</a>
                    </div>
                    <p className="text-gray-600">Tours, activities, and experiences. Book guided tours of Paris, wine tasting excursions in Bordeaux and Burgundy, cooking classes, and cultural experiences across France.</p>
                  </div>

                  <div className="border border-gray-100 rounded-xl p-5 hover:border-france-blue-200 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold font-heading text-gray-900 text-lg">12Go</h3>
                      <a href={siteConfig.affiliateLinks.transport} target="_blank" rel="noopener noreferrer" className="text-sm text-france-blue hover:underline">Visit</a>
                    </div>
                    <p className="text-gray-600">Bus, train, and transport tickets. Compare and book transport options including TGV high-speed trains, regional rail services, and long-distance bus routes across France and to neighbouring countries.</p>
                  </div>

                  <div className="border border-gray-100 rounded-xl p-5 hover:border-france-blue-200 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold font-heading text-gray-900 text-lg">Saily</h3>
                      <a href={siteConfig.affiliateLinks.esim} target="_blank" rel="noopener noreferrer" className="text-sm text-france-blue hover:underline">Visit</a>
                    </div>
                    <p className="text-gray-600">eSIM and mobile data plans for France and Europe. Stay connected during your trip with affordable data plans that work across the EU, without needing a physical SIM card.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">How Affiliate Links Work</h2>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="w-8 h-8 bg-france-blue text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">1</span>
                    <p className="text-gray-700">You click an affiliate link on our site</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-8 h-8 bg-france-blue text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">2</span>
                    <p className="text-gray-700">You are taken to the partner's website (e.g., Booking.com, Klook)</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-8 h-8 bg-france-blue text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">3</span>
                    <p className="text-gray-700">If you make a purchase or booking, we receive a small commission from the partner</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-8 h-8 bg-france-blue text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">4</span>
                    <p className="text-gray-700"><strong>You pay the same price</strong> -- affiliate links do not increase costs for you in any way</p>
                  </li>
                </ol>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Our Commitment to Editorial Independence</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Affiliate relationships <strong>never</strong> influence our editorial content or recommendations. Specifically:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">We never recommend a product or service solely because it has an affiliate program</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">We do not accept payment for positive reviews or favourable coverage</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Our editorial content is created independently of our affiliate partnerships</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">We recommend many products, services, and experiences that we do not earn commissions from</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">If an affiliate product does not meet our quality standards, we will not recommend it regardless of the commission</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Identifying Affiliate Links</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Affiliate links on our site may be identified by:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex gap-3">
                    <span className="text-france-red font-bold">-</span>
                    <span className="text-gray-700">A disclosure note near the link or at the top/bottom of the article</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-france-red font-bold">-</span>
                    <span className="text-gray-700">URLs that redirect through tracking domains</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-france-red font-bold">-</span>
                    <span className="text-gray-700">Buttons or banners promoting booking services</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Supporting {siteConfig.name}</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  By using our affiliate links to book your France travel, you help support {siteConfig.name} at no extra cost to yourself. This support allows us to:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Keep all content free and accessible to every traveler</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Research and write new guides for more French destinations</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Update existing content with current prices, hours, and information</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Maintain and improve the website's design, speed, and functionality</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Questions?</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  If you have any questions about our affiliate relationships or how we earn revenue, please <Link href="/contact/" className="text-france-blue hover:underline">contact us</Link>. We are happy to provide more details. You can also read our <Link href="/editorial-policy/" className="text-france-blue hover:underline">Editorial Policy</Link> for more about our content standards.
                </p>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
