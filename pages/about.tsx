import Image from 'next/image';
import { GetStaticProps } from 'next';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import Link from 'next/link';
import { siteConfig } from '../site.config';

export default function About() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about/' },
  ];

  return (
    <>
      <SEOHead
        title={`About Us | ${siteConfig.name} - Your France Travel Guide`}
        description={`Learn about ${siteConfig.name}, a comprehensive travel resource dedicated to helping travelers discover the best of France. Meet our team, our mission, and our commitment to quality travel content.`}
      />

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <div className="text-center max-w-4xl mx-auto">
              <span className="font-script text-france-gold text-lg mb-2 block">Who We Are</span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                About {siteConfig.name}
              </h1>
              <p className="text-xl lg:text-2xl mb-4 opacity-90">
                Your comprehensive travel resource dedicated to helping travelers discover the best of France
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
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {siteConfig.name} is a comprehensive travel resource dedicated to helping travelers discover the best of France. Whether you are planning your first visit to Paris, exploring the lavender fields of Provence, tasting your way through Lyon's bouchons, or hiking the trails of the French Alps, we provide the detailed, practical information you need to plan a memorable trip.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  We believe every traveler deserves access to reliable, up-to-date, and genuinely useful travel information. Our mission is to make traveling in France accessible, enjoyable, and enriching for everyone -- from first-time visitors navigating the Schengen visa process to seasoned Francophiles seeking off-the-beaten-path villages in Alsace or the Dordogne.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  France is one of the most visited countries in the world for good reason. Its unparalleled blend of history, art, gastronomy, and natural beauty rewards travelers who take the time to go beyond the obvious. That is what {siteConfig.name} is here to help you do.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Our Team</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Our editorial team combines expat residents, frequent visitors, and French culture specialists who bring first-hand knowledge and genuine passion for France to every piece of content we create.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  We have team members based in Paris, Lyon, and the south of France, as well as contributors across Europe and North America who travel to France regularly. This geographic spread ensures our content reflects the diverse experiences of travelers from different backgrounds and starting points.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Our writers hold expertise in areas including French gastronomy and wine, European rail travel, Schengen visa regulations, French history and architecture, and outdoor adventures in the Alps, Pyrenees, and along the Atlantic coast.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">What We Cover</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-france-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-france-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold font-heading text-gray-900 mb-1">City Guides</h3>
                      <p className="text-gray-600">Detailed guides to France's most captivating cities, from Paris and Lyon to Bordeaux, Nice, Strasbourg, Marseille, and beyond.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-france-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-france-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold font-heading text-gray-900 mb-1">Food & Drink</h3>
                      <p className="text-gray-600">Explore French cuisine -- from croissants and coq au vin to regional specialties, Michelin-starred dining, and the world's finest wine regions.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-france-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-france-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold font-heading text-gray-900 mb-1">Practical Information</h3>
                      <p className="text-gray-600">Schengen visa requirements, transport options (TGV, Metro, regional trains), weather guides, tipping etiquette, and essential travel tips.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-france-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-france-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold font-heading text-gray-900 mb-1">Regional Guides</h3>
                      <p className="text-gray-600">Discover France's diverse regions -- Provence, Brittany, Normandy, the French Riviera, Alsace, the Loire Valley, and more.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-france-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-france-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold font-heading text-gray-900 mb-1">Travel Blog</h3>
                      <p className="text-gray-600">Regular articles covering travel trends, hidden gems, seasonal guides, and in-depth cultural insights about French life and travel.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meet the Founder */}
              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12 mb-8">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Meet the Founder</h2>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/team/marvin.webp"
                      alt="Marvin — Founder of Go2France"
                      width={180}
                      height={180}
                      className="rounded-2xl object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Marvin</h3>
                    <p className="text-sm text-france-blue font-medium mb-3">Founder &amp; Developer</p>
                    <p className="text-gray-700 mb-3">
                      Marvin is a Dutch travel technology specialist and the creator of the Go2 Travel Network — a growing
                      family of independent destination guides. With a passion for exploring France and a background in
                      web development, he builds data-driven, practical travel guides that help travelers plan better trips.
                    </p>
                    <p className="text-gray-700">
                      The Go2 network now spans multiple destinations across Asia, Europe, and the Americas, with each site
                      offering in-depth city guides, local food recommendations, transport routes, and honest travel advice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">How We Create Our Content</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Every piece of content on {siteConfig.name} goes through a rigorous creation and review process. We combine on-the-ground experience with extensive desk research from authoritative sources including French government tourism resources (France.fr, Atout France), regional tourism boards, SNCF for transport data, and established travel publications.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  We use AI-assisted research tools to help gather and organize data efficiently, but all content is reviewed, fact-checked, and refined by our human editorial team before publication. AI helps us scale our coverage; human expertise ensures accuracy, nuance, and genuine traveler insight.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Prices, opening hours, visa requirements, and transport schedules are verified against official sources and updated regularly. We clearly date-stamp our content so you always know how current the information is. Learn more about our process on our{' '}
                  <Link href="/how-we-research/" className="text-france-blue hover:underline">How We Research</Link> and{' '}
                  <Link href="/editorial-policy/" className="text-france-blue hover:underline">Editorial Policy</Link> pages.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Affiliate Transparency</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {siteConfig.name} is a free resource. To keep it running and maintain the quality of our content, we participate in affiliate programs with trusted travel booking platforms. When you click certain links on our site and make a purchase or booking, we may earn a small commission at no extra cost to you.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Affiliate relationships never influence our editorial content or recommendations. We only recommend services we genuinely believe will help travelers in France. For full details, see our{' '}
                  <Link href="/affiliate-disclosure/" className="text-france-blue hover:underline">Affiliate Disclosure</Link>.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12 mb-8">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Part of the Go2 Travel Network</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {siteConfig.name} is part of the Go2 Travel Network, a collection of destination-specific travel guides. Each site in our network is dedicated to helping travelers explore a specific country or region with the same commitment to quality, accuracy, and genuine usefulness.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Our network covers destinations including Thailand, Vietnam, Japan, Morocco, Spain, India, Mexico, Bali, China, and the USA -- each with its own dedicated team and in-depth content.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Have questions, feedback, or suggestions? We would love to hear from you. Visit our{' '}
                  <Link href="/contact/" className="text-france-blue hover:underline">contact page</Link> to get in touch.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Found outdated or incorrect information? Please let us know -- we take corrections seriously and update our content promptly.
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
