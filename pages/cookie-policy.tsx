import { GetStaticProps } from 'next';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import Link from 'next/link';
import { siteConfig } from '../site.config';

export default function CookiePolicy() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Cookie Policy', href: '/cookie-policy/' },
  ];

  return (
    <>
      <SEOHead
        title={`Cookie Policy | ${siteConfig.name}`}
        description={`Cookie policy for ${siteConfig.domain}. Learn how we use cookies and similar technologies on our France travel guide.`}
      >
        <meta name="robots" content="noindex, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: `Cookie Policy - ${siteConfig.name}`,
              description: `Cookie policy for ${siteConfig.domain}. Learn how we use cookies and similar technologies.`,
              url: `https://${siteConfig.domain}/cookie-policy/`,
              publisher: {
                '@type': 'Organization',
                name: siteConfig.name,
                url: `https://${siteConfig.domain}`,
              },
            }),
          }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <div className="text-center max-w-4xl mx-auto">
              <span className="font-script text-france-gold text-lg mb-2 block">Legal</span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                Cookie Policy
              </h1>
              <p className="text-xl lg:text-2xl mb-4 opacity-90">
                How we use cookies and similar technologies
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
                <p className="text-sm text-gray-500 mb-6">Last updated: January 1, 2025</p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  This cookie policy explains how {siteConfig.name} ({siteConfig.domain}) uses cookies and similar technologies when you visit our website. We are committed to being transparent about the technologies we use.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">What Are Cookies</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">How We Use Cookies</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-france-blue pl-6">
                    <h3 className="font-semibold font-heading text-gray-900 text-lg mb-2">Essential Cookies</h3>
                    <p className="text-gray-700">These cookies are necessary for the website to function properly. They enable core functionality such as page navigation and access to secure areas of the website. The website cannot function properly without these cookies.</p>
                  </div>
                  <div className="border-l-4 border-france-blue pl-6">
                    <h3 className="font-semibold font-heading text-gray-900 text-lg mb-2">Analytics Cookies</h3>
                    <p className="text-gray-700">We use Google Analytics to understand how visitors interact with our website. These cookies collect information about how you use our site, such as which pages you visit most often and whether you receive error messages. All information these cookies collect is aggregated and anonymous.</p>
                  </div>
                  <div className="border-l-4 border-france-blue pl-6">
                    <h3 className="font-semibold font-heading text-gray-900 text-lg mb-2">Affiliate Cookies</h3>
                    <p className="text-gray-700">Our website contains affiliate links to third-party travel services and products. When you click on these links, third-party cookies may be set by our affiliate partners (such as booking platforms, travel insurance providers, and eSIM services). These cookies are used to track referrals so that we may earn a commission at no extra cost to you.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Third-Party Cookies</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may be set when you interact with embedded content or external services linked from our site. These third-party cookies are governed by the respective privacy policies of those services.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Managing Cookies</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or to alert you when cookies are being sent. Please note that if you disable cookies, some features of our website may not function properly.
                </p>
                <div className="space-y-3">
                  <div className="bg-surface-cream rounded-xl p-4">
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-france-blue hover:underline font-semibold">Google Chrome</a>
                    <p className="text-gray-600 text-sm mt-1">Manage cookies in Chrome browser settings</p>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-4">
                    <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-france-blue hover:underline font-semibold">Mozilla Firefox</a>
                    <p className="text-gray-600 text-sm mt-1">Manage cookies in Firefox browser settings</p>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-4">
                    <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-france-blue hover:underline font-semibold">Apple Safari</a>
                    <p className="text-gray-600 text-sm mt-1">Manage cookies in Safari browser settings</p>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-4">
                    <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-france-blue hover:underline font-semibold">Microsoft Edge</a>
                    <p className="text-gray-600 text-sm mt-1">Manage cookies in Edge browser settings</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Google Analytics Opt-Out</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  You can opt out of Google Analytics tracking by installing the{' '}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-france-blue hover:underline">
                    Google Analytics Opt-out Browser Add-on
                  </a>.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Changes to This Policy</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  We may update this cookie policy from time to time to reflect changes in technology, legislation, or our data practices. When we make changes, we will update the &quot;Last updated&quot; date at the top of this page.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  If you have questions about our use of cookies, please <Link href="/contact/" className="text-france-blue hover:underline">contact us</Link> or email us at{' '}
                  <a href={`mailto:hello@${siteConfig.domain}`} className="text-france-blue hover:underline">
                    hello@{siteConfig.domain}
                  </a>.
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
