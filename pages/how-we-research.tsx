import { GetStaticProps } from 'next';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import Link from 'next/link';
import { siteConfig } from '../site.config';

export default function HowWeResearch() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'How We Research', href: '/how-we-research/' },
  ];

  return (
    <>
      <SEOHead
        title={`How We Research | ${siteConfig.name}`}
        description={`Our research methodology explained. Learn how ${siteConfig.name} creates reliable, well-researched travel content about France through on-the-ground experience, local experts, and government sources.`}
      />

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <div className="text-center max-w-4xl mx-auto">
              <span className="font-script text-france-gold text-lg mb-2 block">Our Process</span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                How We Research Our Content
              </h1>
              <p className="text-xl lg:text-2xl mb-4 opacity-90">
                A transparent look at how we create reliable travel guides for France
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
                  We take the accuracy and reliability of our travel content seriously. France is one of the world's most popular travel destinations, and travelers deserve information they can trust when planning their trip. Here is a transparent look at how we research, write, and maintain the information on {siteConfig.name}.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">On-the-Ground Experience</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Our editorial team includes people who live in France and contributors who travel there frequently. This on-the-ground presence is irreplaceable -- it allows us to verify information first-hand, discover changes before they appear in official sources, and provide the kind of practical, street-level advice that makes the difference between a good trip and a great one.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  We have team members based in Paris, Lyon, and the south of France. They regularly visit restaurants, test transport routes, check museum hours and prices, and explore neighborhoods to ensure our content reflects the current reality on the ground.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  That said, we are transparent about the fact that no team can personally visit every venue and verify every detail in a country as rich and varied as France. Where we have not personally verified something, we rely on the most authoritative available sources and clearly indicate when information may be subject to change.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Local Expert Consultation</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  For specialized topics, we consult local experts who bring deep knowledge in their respective fields:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700"><strong>Gastronomy:</strong> Chefs, sommeliers, and food writers who understand French culinary traditions, regional specialties, and the current dining scene from Michelin-starred restaurants to neighbourhood bistros.</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700"><strong>Wine regions:</strong> Local guides and wine professionals in Bordeaux, Burgundy, Champagne, the Loire Valley, and other wine-producing regions.</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700"><strong>Art and architecture:</strong> Art historians and cultural guides who provide context on France's extraordinary museum collections, Gothic cathedrals, and architectural heritage.</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700"><strong>Outdoor activities:</strong> Hiking guides, cycling experts, and adventure travel specialists familiar with the Alps, Pyrenees, Corsica, and France's long-distance trails (GR paths).</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Government & Official Sources</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  For visa, entry requirements, and practical travel information, we rely on official government sources:
                </p>
                <div className="space-y-4">
                  <div className="bg-surface-cream rounded-xl p-5">
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">Visa & Entry Requirements</h3>
                    <p className="text-gray-700">Sourced from the French Ministry for Europe and Foreign Affairs (france-visas.gouv.fr), the European Commission's Schengen Area documentation, and individual French consulate websites. We track ETIAS implementation timelines and Schengen visa policy changes.</p>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-5">
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">Transport Data</h3>
                    <p className="text-gray-700">Rail information comes from SNCF (sncf-connect.com), including TGV schedules, regional train networks, and pricing structures. Paris Metro and bus data is sourced from RATP. Airport information comes from Aeroports de Paris and regional airport authorities.</p>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-5">
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">Tourism Data</h3>
                    <p className="text-gray-700">Official statistics and destination information from Atout France (the national tourism development agency), France.fr, and regional tourism boards (CRT) across all 13 metropolitan regions.</p>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-5">
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">Weather & Climate</h3>
                    <p className="text-gray-700">Climate data is based on historical records from Meteo-France, the national meteorological service, supplemented by long-term averages from international weather databases.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Content Types & Their Research</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold font-heading text-gray-900 mb-3">City & Destination Guides</h3>
                    <p className="text-gray-700 leading-relaxed">Our destination guides combine official tourism information with practical traveler insights. We research attractions (including current admission fees and hours), accommodation options across budget ranges, dining recommendations from local knowledge, and local transport to provide comprehensive guides. Each city guide is structured to help both first-time and returning visitors.</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold font-heading text-gray-900 mb-3">Visa & Practical Information</h3>
                    <p className="text-gray-700 leading-relaxed">All visa and entry requirement information is sourced from official French government and EU websites. We update these guides whenever policy changes are announced. The Schengen visa process, ETIAS requirements, and specific documentation needs are checked regularly against the most current official guidance.</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold font-heading text-gray-900 mb-3">Food & Drink Guides</h3>
                    <p className="text-gray-700 leading-relaxed">Our food and wine content draws from France's extraordinary culinary traditions, regional specialty research, and established gastronomy publications. We describe dishes accurately, provide cultural and regional context, note typical price ranges, and highlight regional variations. Wine region guides are developed with input from local industry professionals.</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold font-heading text-gray-900 mb-3">Transport & Weather</h3>
                    <p className="text-gray-700 leading-relaxed">Transport information is sourced from official carrier websites (SNCF, RATP, regional networks) and verified through current schedules and pricing. We cover TGV high-speed routes, regional trains, buses, and domestic flights with practical booking advice. Weather data is based on historical climate records from Meteo-France.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Price Verification</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Prices mentioned in our guides (admission fees, transport costs, restaurant price ranges, accommodation rates) are verified against official sources at the time of writing and reviewed periodically. We note the date of last verification and indicate when prices are approximate or subject to seasonal variation.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  All prices are typically given in euros. We always recommend checking current prices directly with venues and service providers before your trip, as prices in France can change without notice, particularly for museum admissions and transport fares.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Annual Content Audits</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  In addition to ongoing updates, we conduct annual comprehensive content audits. During these audits, we:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Review all visa and entry requirement pages against current government sources</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Verify prices and opening hours for major attractions and museums</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Update transport schedules, routes, and pricing</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Check that restaurant and hotel recommendations are still current (open, maintaining quality)</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Refresh weather and seasonal information with the latest climate data</span>
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-6 h-6 text-france-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Incorporate reader feedback and corrections received during the year</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Limitations</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  While we strive for accuracy, travel information changes frequently. France has 13 metropolitan regions, 96 departments, and thousands of municipalities, each with their own local regulations and offerings. Prices, visa policies, transport schedules, and operating hours can change without notice.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  We always recommend verifying critical details -- especially visa requirements, entry regulations, and safety advisories -- with official French government sources and your own country's foreign affairs ministry before traveling.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Report an Issue</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Found something inaccurate or outdated? Please <Link href="/contact/" className="text-france-blue hover:underline">contact us</Link> with the specific page and issue. We appreciate all corrections and typically update content within 48 hours.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Learn more about our full editorial standards on our <Link href="/editorial-policy/" className="text-france-blue hover:underline">Editorial Policy</Link> page.
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
