import { GetStaticProps } from 'next';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import Link from 'next/link';
import { siteConfig } from '../site.config';

export default function EditorialPolicy() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Editorial Policy', href: '/editorial-policy/' },
  ];

  return (
    <>
      <SEOHead
        title={`Editorial Policy | ${siteConfig.name}`}
        description={`Our editorial standards and content guidelines. Learn how ${siteConfig.name} creates accurate, trustworthy, and regularly updated travel content about France.`}
      />

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <div className="text-center max-w-4xl mx-auto">
              <span className="font-script text-france-gold text-lg mb-2 block">Our Standards</span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                Editorial Policy
              </h1>
              <p className="text-xl lg:text-2xl mb-4 opacity-90">
                How we create accurate, trustworthy travel content about France
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
                  At {siteConfig.name}, we are committed to providing accurate, helpful, and trustworthy travel information about France. This editorial policy outlines the standards and practices that guide everything we publish.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  We understand that travelers rely on our content to make real decisions -- from visa applications and train bookings to restaurant choices and hotel reservations. That responsibility shapes every aspect of how we create and maintain our content.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Content Standards</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-france-blue pl-6">
                    <h3 className="font-semibold font-heading text-gray-900 text-lg mb-2">Accuracy</h3>
                    <p className="text-gray-700">All factual information is verified against authoritative sources before publication. We cross-reference data from French government websites, official tourism boards (France.fr, Atout France), regional tourism offices, and established travel publications. Visa and entry requirements are sourced directly from the French Ministry of Foreign Affairs and Schengen Area official documentation.</p>
                  </div>
                  <div className="border-l-4 border-france-blue pl-6">
                    <h3 className="font-semibold font-heading text-gray-900 text-lg mb-2">Timeliness</h3>
                    <p className="text-gray-700">We regularly review and update our content to reflect current conditions, prices, visa requirements, and travel advisories. Time-sensitive content such as transport schedules, entry fees, and visa regulations is prioritized for updates. All articles include publication and last-updated dates so readers can assess information freshness.</p>
                  </div>
                  <div className="border-l-4 border-france-blue pl-6">
                    <h3 className="font-semibold font-heading text-gray-900 text-lg mb-2">Objectivity</h3>
                    <p className="text-gray-700">Our recommendations are based on genuine research, first-hand experience, and editorial evaluation. We do not accept payment in exchange for positive reviews or recommendations. Our editorial judgment is never for sale.</p>
                  </div>
                  <div className="border-l-4 border-france-blue pl-6">
                    <h3 className="font-semibold font-heading text-gray-900 text-lg mb-2">Transparency</h3>
                    <p className="text-gray-700">When we earn commissions through affiliate links, we clearly disclose this relationship. Affiliate partnerships never influence our editorial content or the recommendations we make. See our <Link href="/affiliate-disclosure/" className="text-france-blue hover:underline">affiliate disclosure</Link> for full details.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Research Methodology</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  We employ a multi-source research methodology to ensure the reliability of our content. Every guide, article, and data point goes through a structured verification process.
                </p>
                <div className="space-y-4">
                  <div className="bg-surface-cream rounded-xl p-5">
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">Primary Sources</h3>
                    <p className="text-gray-700">Official French government websites (france-visas.gouv.fr, diplomatie.gouv.fr), SNCF for rail data, regional tourism boards, and direct verification of prices and hours through official venue websites.</p>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-5">
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">On-the-Ground Experience</h3>
                    <p className="text-gray-700">Our editorial team includes residents and frequent visitors to France who verify information through personal experience. Local knowledge provides context that desk research alone cannot capture.</p>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-5">
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">Multi-Source Fact-Checking</h3>
                    <p className="text-gray-700">Key facts are verified against a minimum of two independent sources before publication. Where sources disagree, we note the discrepancy or defer to the most authoritative source (typically official government data).</p>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-5">
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">Regular Updates</h3>
                    <p className="text-gray-700">Content is reviewed on a rolling schedule. Visa regulations, transport prices, and seasonal information are audited quarterly. City and destination guides are reviewed at least annually. All updates are date-stamped.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">AI-Assisted Research with Human Oversight</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  We use AI-assisted research tools to help gather, organize, and structure data efficiently. This allows us to cover more destinations and topics comprehensively while maintaining consistent quality standards.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  However, AI is a research tool -- not a substitute for human editorial judgment. Every piece of AI-assisted content is reviewed, fact-checked, and refined by our human editorial team before publication. We verify all data points against primary sources, add local context and nuance that AI cannot provide, and ensure the final content meets our accuracy and quality standards.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  We believe this hybrid approach -- AI efficiency combined with human expertise -- produces more comprehensive, accurate, and genuinely useful travel content than either approach alone.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Content Creation Process</h2>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="w-8 h-8 bg-france-blue text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">1</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Research</h3>
                      <p className="text-gray-700">Topics are selected based on traveler needs and search demand. We research extensively using primary and secondary sources including official French government data, tourism board resources, and local expert consultation.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-8 h-8 bg-france-blue text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">2</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Writing</h3>
                      <p className="text-gray-700">Content is written with the reader in mind -- clear, practical, and actionable. We avoid jargon and assume readers may be unfamiliar with French customs, language, and administrative systems.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-8 h-8 bg-france-blue text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">3</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Review & Fact-Checking</h3>
                      <p className="text-gray-700">All content undergoes review for accuracy, readability, and completeness before publication. Key claims are verified against authoritative sources.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-8 h-8 bg-france-blue text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">4</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Publication & Monitoring</h3>
                      <p className="text-gray-700">Published content is monitored for accuracy and updated when conditions change. Reader feedback is incorporated promptly.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Affiliate Transparency</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {siteConfig.name} participates in affiliate programs to fund our operations. When you book through certain links on our site, we may earn a commission at no extra cost to you. This revenue allows us to keep all content free and accessible.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Our editorial content is created independently of our advertising and affiliate partnerships. Advertisers and partners have no influence over the content we publish or the recommendations we make. For complete details, see our <Link href="/affiliate-disclosure/" className="text-france-blue hover:underline">Affiliate Disclosure</Link>.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Corrections & Feedback</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  If you find inaccurate or outdated information on our site, please <Link href="/contact/" className="text-france-blue hover:underline">contact us</Link>. We take corrections seriously and will update our content promptly.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  France is a dynamic travel destination -- visa policies, transport schedules, museum hours, and restaurant offerings can change. We appreciate reader feedback to keep our content as current and accurate as possible.
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
