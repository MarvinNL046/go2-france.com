import { buildAffiliateUrl } from '../../lib/affiliates';

export default function SecurityBlock() {
  return (
    <div className="my-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 lg:p-8 text-white">
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Protect Your Digital Life While Traveling</h3>
        <p className="text-gray-300 mt-1">Essential security tools for your France trip</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href={buildAffiliateUrl('nordvpn')}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="group bg-white/10 hover:bg-white/15 rounded-xl p-5 transition-all border border-white/10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
              VPN
            </div>
            <div>
              <span className="font-bold text-white">NordVPN</span>
              <p className="text-xs text-gray-400">Secure browsing anywhere</p>
            </div>
          </div>
          <ul className="space-y-1.5 mb-4">
            <li className="text-sm text-gray-300 flex items-center">
              <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Protect on public WiFi
            </li>
            <li className="text-sm text-gray-300 flex items-center">
              <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Access your home content
            </li>
            <li className="text-sm text-gray-300 flex items-center">
              <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              5,000+ servers worldwide
            </li>
          </ul>
          <span className="text-sm font-semibold text-blue-400 group-hover:underline">Get NordVPN &rarr;</span>
        </a>

        <a
          href={buildAffiliateUrl('nordpass')}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="group bg-white/10 hover:bg-white/15 rounded-xl p-5 transition-all border border-white/10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-sm">
              PW
            </div>
            <div>
              <span className="font-bold text-white">NordPass</span>
              <p className="text-xs text-gray-400">Password manager</p>
            </div>
          </div>
          <ul className="space-y-1.5 mb-4">
            <li className="text-sm text-gray-300 flex items-center">
              <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Secure all your passwords
            </li>
            <li className="text-sm text-gray-300 flex items-center">
              <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Auto-fill on any device
            </li>
            <li className="text-sm text-gray-300 flex items-center">
              <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Data breach scanner
            </li>
          </ul>
          <span className="text-sm font-semibold text-green-400 group-hover:underline">Get NordPass &rarr;</span>
        </a>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        * Affiliate links. We may earn a commission.{' '}
        <a href="/affiliate-disclosure/" className="underline text-gray-400">Disclosure</a>
      </p>
    </div>
  );
}
