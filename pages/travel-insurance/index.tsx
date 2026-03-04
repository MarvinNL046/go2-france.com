import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';

export default function TravelInsurancePage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Travel Insurance', href: '/travel-insurance' }
  ];

  return (
    <>
      <SEOHead
        title="Best Travel Insurance for France 2026 | Compare Coverage & Prices | Go2France"
        description="Find the best travel insurance for France. Compare medical coverage, trip cancellation, and adventure sports coverage. Schengen visa insurance requirements explained."
      >
        <meta name="keywords" content="France travel insurance, best travel insurance France, Schengen visa insurance, medical coverage France, travel protection Europe" />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <p className="font-script text-france-gold mb-2">Stay Protected</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">Travel Insurance for France</h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Protect your France adventure with comprehensive travel insurance
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Medical Coverage</div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Trip Cancellation</div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Schengen Visa Compliant</div>
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

        {/* Why Insurance */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Why You Need Travel Insurance for France</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="font-semibold font-heading mb-2">Medical Expenses</h3>
                <p className="text-gray-600 text-sm">
                  While France has excellent healthcare, non-EU visitors are not covered by the public system. A hospital visit can cost hundreds of euros, and emergency surgery can run into tens of thousands.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🇪🇺</div>
                <h3 className="font-semibold font-heading mb-2">Schengen Visa Requirement</h3>
                <p className="text-gray-600 text-sm">
                  If you need a Schengen visa to enter France, travel insurance with minimum 30,000 EUR medical coverage is mandatory. Your visa application will be rejected without it.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="font-semibold font-heading mb-2">Trip Disruptions</h3>
                <p className="text-gray-600 text-sm">
                  Flight cancellations, lost luggage, strikes (which happen regularly in France), and unexpected changes can derail your plans. Good insurance covers these disruptions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Provider */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Recommended Travel Insurance</h2>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold font-heading mb-1">SafetyWing</h3>
                      <p className="text-sm text-gray-600">Best for Digital Nomads & Long Stays</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        {[1,2,3,4].map(i => <span key={i} className="text-yellow-400">&#9733;</span>)}
                        <span className="text-gray-300">&#9733;</span>
                      </div>
                      <p className="text-sm text-gray-600">4.5/5</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">
                    Digital nomad-friendly travel medical insurance with flexible monthly subscriptions. Perfect for long-term travelers and remote workers visiting France and Europe. Cancel anytime with no lock-in contract.
                  </p>

                  <div className="bg-surface-cream rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-600 mb-1">Starting from</p>
                    <p className="text-3xl font-bold text-france-blue">$56<span className="text-base font-normal text-gray-600">/month</span></p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Coverage Includes:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2"><span className="text-green-500">&#10003;</span><span>Medical: $250,000</span></div>
                      <div className="flex items-center gap-2"><span className="text-green-500">&#10003;</span><span>Emergency Evacuation: $100,000</span></div>
                      <div className="flex items-center gap-2"><span className="text-green-500">&#10003;</span><span>Baggage: $3,000</span></div>
                      <div className="flex items-center gap-2"><span className="text-green-500">&#10003;</span><span>COVID-19 coverage</span></div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="text-sm space-y-1">
                      {['Monthly subscription (cancel anytime)', 'Coverage in 180+ countries', 'Covers COVID-19 like any illness', 'Adventure sports add-on available', 'Meets Schengen visa requirements'].map((f, i) => (
                        <li key={i} className="flex items-start"><span className="text-france-blue mr-2">&#8226;</span><span>{f}</span></li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="https://safetywing.com/?referenceID=go2france"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-france-blue text-white text-center py-3 rounded-xl font-semibold hover:bg-france-blue/90 transition-colors"
                  >
                    Get Quote from SafetyWing &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">France Travel Insurance Tips</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h3 className="font-semibold font-heading mb-2">Schengen Visa Insurance</h3>
                <p className="text-gray-700">If you require a Schengen visa, your travel insurance must provide minimum 30,000 EUR medical coverage, cover emergency repatriation, and be valid for all Schengen countries. Keep your insurance certificate with your visa application documents.</p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h3 className="font-semibold font-heading mb-2">French Strikes</h3>
                <p className="text-gray-700">France is known for transport strikes (greves), particularly by SNCF rail workers and Air France staff. Trip disruption coverage can protect you if strikes affect your travel plans. This is a genuine risk worth insuring against.</p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h3 className="font-semibold font-heading mb-2">European Health Insurance Card (EHIC)</h3>
                <p className="text-gray-700">EU citizens should carry their European Health Insurance Card (EHIC) or the new Global Health Insurance Card (GHIC) for UK citizens. This provides access to state-provided healthcare but does not cover private treatment, repatriation, or trip cancellation — so travel insurance is still recommended.</p>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                <h3 className="font-semibold font-heading mb-2">Winter Sports Coverage</h3>
                <p className="text-gray-700">If you plan to ski in the French Alps, ensure your policy covers winter sports. Standard policies often exclude skiing. Mountain rescue (secours en montagne) can be extremely expensive in France, and helicopter evacuations cost thousands of euros.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-Sell */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">More Travel Essentials</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">Complete your France travel preparation with these helpful resources.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/esim/" className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">📱</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">France eSIM</h3>
                <p className="text-gray-600 text-sm">Stay connected with affordable data plans throughout France and the EU.</p>
              </Link>
              <a href={siteConfig.affiliateLinks.tripcom} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">🏨</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Book Hotels</h3>
                <p className="text-gray-600 text-sm">Find the best hotel deals across France on Trip.com.</p>
              </a>
              <Link href="/transport/" className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">🚄</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Transport Guide</h3>
                <p className="text-gray-600 text-sm">TGV trains, Paris Metro, car rental and more.</p>
              </Link>
              <Link href="/visa/" className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">📋</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Visa Guide</h3>
                <p className="text-gray-600 text-sm">Schengen visa requirements and entry rules.</p>
              </Link>
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">Some links are affiliate links. We may earn a small commission at no extra cost to you.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                { q: 'Is travel insurance mandatory for France?', a: 'Travel insurance is mandatory if you need a Schengen visa to enter France (minimum 30,000 EUR medical coverage required). For visa-free travelers from the USA, UK, Canada, etc., it is not legally required but strongly recommended. Medical costs for non-EU citizens are not covered by the French healthcare system.' },
                { q: 'Does travel insurance cover strikes in France?', a: 'Many comprehensive travel insurance policies include trip disruption coverage that can protect against losses caused by transport strikes. Since strikes are relatively common in France (particularly rail and airline strikes), this is valuable coverage to have. Check your policy terms specifically.' },
                { q: 'Do I need insurance if I have an EHIC/GHIC card?', a: 'The EHIC (European Health Insurance Card) or GHIC (Global Health Insurance Card for UK citizens) provides access to state healthcare in France, but it does not cover private treatment, repatriation, trip cancellation, lost luggage, or mountain rescue. Additional travel insurance is still recommended for comprehensive protection.' },
              ].map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="font-semibold font-heading mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
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
