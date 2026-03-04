import { buildAffiliateUrl } from '../../lib/affiliates';

const esimProviders = [
  {
    name: 'Airalo',
    partner: 'airalo' as const,
    tagline: 'Most popular eSIM provider worldwide',
    features: ['190+ countries', 'Instant activation', 'Affordable data plans'],
    highlight: 'Best Coverage',
  },
  {
    name: 'Saily',
    partner: 'saily' as const,
    tagline: 'Simple and reliable travel eSIM',
    features: ['Easy setup', 'Competitive pricing', 'By NordVPN makers'],
    highlight: 'Best Value',
  },
  {
    name: 'Yesim',
    partner: 'yesim' as const,
    tagline: 'Global eSIM with great European coverage',
    features: ['Wide coverage', 'Flexible plans', 'Multi-device support'],
    highlight: 'Most Flexible',
  },
];

export default function ESIMBlock() {
  return (
    <div className="my-10 bg-gradient-to-br from-brand-primary-50 to-white rounded-2xl border border-brand-primary-100 p-6 lg:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Stay Connected in France</h3>
        <p className="text-gray-600 mt-1">Compare eSIM providers for your trip</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {esimProviders.map((provider) => (
          <a
            key={provider.name}
            href={buildAffiliateUrl(provider.partner)}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="group bg-white rounded-xl border border-gray-100 hover:border-brand-primary-200 hover:shadow-md transition-all p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-gray-900">{provider.name}</span>
              <span className="text-xs font-semibold text-brand-primary bg-brand-primary-50 px-2 py-1 rounded-full">
                {provider.highlight}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{provider.tagline}</p>
            <ul className="space-y-1.5">
              {provider.features.map((feature) => (
                <li key={feature} className="text-sm text-gray-700 flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-4 text-sm font-semibold text-brand-primary group-hover:underline">
              Check Plans &rarr;
            </div>
          </a>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-4">
        * Affiliate links. We may earn a commission.{' '}
        <a href="/affiliate-disclosure/" className="underline">Disclosure</a>
      </p>
    </div>
  );
}
