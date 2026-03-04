import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';

export default function ESIMPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'France eSIM', href: '/esim' }
  ];

  return (
    <>
      <SEOHead
        title="Best eSIM for France 2026 | Compare Data Plans & Prices | Go2France"
        description="Compare eSIM providers for France from 4 EUR/week. Saily, Airalo & Holafly reviewed. EU roaming rules, coverage maps, and instant activation — no physical SIM needed."
      >
        <meta name="keywords" content="France eSIM, best eSIM France, France travel SIM, mobile data France, eSIM providers France, France internet, EU roaming" />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <p className="font-script text-france-gold mb-2">Stay Connected</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                Best eSIM for France
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Stay connected in France with affordable data plans — no physical SIM needed
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Instant Activation</div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">EU-Wide Coverage</div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">From 4 EUR/week</div>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumbs items={breadcrumbs} />
            <div className="bg-orange-50 border-0 rounded-2xl mt-4">
              <div className="px-4 py-3">
                <p className="text-sm text-center text-orange-800">
                  This page contains affiliate links. We may earn a commission at no extra cost to you when you purchase through our links.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why eSIM */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6 text-center">
                Why Use an eSIM in France?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-france-blue bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✈️</span>
                  </div>
                  <h3 className="font-semibold font-heading mb-2">Activate Before You Fly</h3>
                  <p className="text-gray-600 text-sm">Set up your eSIM at home and land in France with data ready to go. No need to find a SIM shop at the airport.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-france-gold bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="font-semibold font-heading mb-2">Save on Roaming</h3>
                  <p className="text-gray-600 text-sm">Avoid expensive international roaming charges. eSIM plans start from just 4 EUR per week with generous data allowances.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-france-red bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="font-semibold font-heading mb-2">Keep Your Number</h3>
                  <p className="text-gray-600 text-sm">Use data on your eSIM while keeping your home number active for calls and texts on your physical SIM.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EU Roaming Info */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h2 className="text-2xl font-bold font-heading text-blue-800 mb-3">EU Roaming: Important for EU Travelers</h2>
              <p className="text-blue-700 mb-3">
                If you have a mobile plan from an EU/EEA country, you can use your home data allowance in France at no extra charge under the "Roam Like at Home" regulation. This means UK travelers (post-Brexit) no longer benefit from free EU roaming and may face surcharges — making an eSIM an excellent alternative.
              </p>
              <p className="text-blue-700">
                For travelers from the USA, Canada, Australia, and other non-EU countries, an eSIM is almost always cheaper than international roaming from your home carrier. Most eSIM plans for France also include coverage across the entire EU, so you can use your data in neighboring countries like Spain, Italy, and Germany.
              </p>
            </div>
          </div>
        </section>

        {/* Provider Comparison */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              Recommended eSIM Provider
            </h2>

            {/* Saily - Primary Recommendation */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold font-heading text-gray-900 mb-2">Saily</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex text-france-gold">
                          <span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9734;</span>
                        </div>
                        <span className="text-sm text-gray-600">(4.4/5)</span>
                      </div>
                      <span className="inline-block bg-france-red text-white px-3 py-1 rounded-full text-sm font-medium">
                        By the makers of NordVPN
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">
                    Built by the team behind NordVPN, Saily offers reliable eSIM connectivity in 150+ countries including France and the entire EU. Affordable plans with easy app-based setup and trusted cybersecurity expertise. Excellent coverage on major French networks including Orange, SFR, and Bouygues Telecom.
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {['Built by NordVPN team', '150+ countries covered', 'Easy app-based setup', 'Trusted security brand', 'EU-wide coverage', '24/7 customer support'].map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <span className="text-green-500 mr-2">&#10003;</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Plans */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Popular Plans for France:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-surface-cream p-3 rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">7 days</span>
                          <span className="text-sm text-gray-600">1GB</span>
                        </div>
                        <span className="font-bold text-france-blue">$4</span>
                      </div>
                      <div className="flex items-center justify-between bg-surface-cream p-3 rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">15 days</span>
                          <span className="text-sm text-gray-600">3GB</span>
                        </div>
                        <span className="font-bold text-france-blue">$10</span>
                      </div>
                      <div className="flex items-center justify-between bg-surface-cream p-3 rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">30 days</span>
                          <span className="text-sm text-gray-600">5GB</span>
                        </div>
                        <span className="font-bold text-france-blue">$16</span>
                      </div>
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                      <ul className="text-sm space-y-1">
                        {['Backed by NordVPN security', 'Competitive pricing', 'Reliable connections', 'User-friendly app'].map((pro, i) => (
                          <li key={i} className="flex items-start"><span className="text-green-500 mr-2">+</span><span className="text-gray-600">{pro}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                      <ul className="text-sm space-y-1">
                        {['Newer provider', 'No unlimited plans yet'].map((con, i) => (
                          <li key={i} className="flex items-start"><span className="text-red-500 mr-2">-</span><span className="text-gray-600">{con}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <a
                    href={siteConfig.affiliateLinks.esim}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-france-blue text-white text-center py-3 rounded-xl font-semibold hover:bg-france-blue/90 transition-colors"
                  >
                    Get Saily eSIM for France &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Install */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                How to Install Your France eSIM
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { step: '1', title: 'Check Compatibility', desc: 'Ensure your phone supports eSIM (iPhone XS+, most new Android phones, Google Pixel 3+)' },
                  { step: '2', title: 'Purchase Plan', desc: 'Choose your data plan and complete purchase through the Saily app or website' },
                  { step: '3', title: 'Scan QR Code', desc: 'Scan the QR code from your email to install the eSIM profile on your device' },
                  { step: '4', title: 'Activate in France', desc: 'Turn on data roaming when you arrive in France and you are connected instantly' },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-16 h-16 bg-france-blue text-white rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                      {item.step}
                    </div>
                    <h3 className="font-semibold font-heading mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {[
                  { q: 'Do I need to remove my physical SIM?', a: 'No. eSIM works alongside your physical SIM. You can use your eSIM for data in France while keeping your home number active for calls and texts.' },
                  { q: 'Does my eSIM work in other EU countries?', a: 'Yes! Most France eSIM plans include coverage across the entire European Union. This means you can use your data in Spain, Italy, Germany, and other EU countries without extra charges.' },
                  { q: 'Which French networks do eSIMs use?', a: 'Most eSIMs connect to major French networks like Orange (the largest), SFR, or Bouygues Telecom. France has excellent 4G/5G coverage across the country, including rural areas.' },
                  { q: 'Can I top up my data if I run out?', a: 'Yes! Most providers allow you to top up through their app. Some eSIMs also support auto-renewal so you never lose connectivity during your trip.' },
                  { q: 'Is an eSIM better than buying a French SIM card?', a: 'For most travelers, yes. An eSIM is faster to set up (no shop visit needed), works immediately on arrival, and you keep your home number active. Physical SIM cards from Orange or SFR may offer slightly better rates for very long stays.' },
                ].map((faq, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="font-semibold font-heading text-lg mb-2">{faq.q}</h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface-dark text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-script text-france-gold mb-2">Explore More</p>
            <h2 className="text-3xl font-bold font-heading mb-6">Ready to Explore France?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Stay connected while discovering the finest destinations in France
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/city/" className="bg-france-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-france-red/90 transition-colors">
                Explore Cities
              </Link>
              <Link href="/food/" className="bg-white bg-opacity-20 text-white border-2 border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-france-blue transition-colors">
                French Food Guide
              </Link>
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
