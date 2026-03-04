import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '../hooks/useTranslation';
import { siteConfig, getOtherSisterSites } from '../site.config';
import { useToast } from './Toast';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation('common');
  const toast = useToast();
  const sisterSites = getOtherSisterSites();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setEmail('');
      toast.success("You're subscribed! Check your inbox.");
    } catch {
      setStatus('error');
      toast.error('Subscription failed. Please try again.');
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block mb-4">
              <span className="font-heading text-2xl font-bold text-white">
                Go2<span className="text-brand-accent">{siteConfig.destination}</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t('footer.aboutText')}
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <svg className="w-4 h-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>info@{siteConfig.domain}</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-5">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              <li><Link href="/city/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">{t('nav.cities')}</Link></li>
              <li><Link href="/region/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">{t('nav.regions')}</Link></li>
              <li><Link href="/transport/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">{t('nav.transport')}</Link></li>
              <li><Link href="/blog/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">{t('nav.blog')}</Link></li>
            </ul>
          </div>

          {/* Popular Cities & Top 10 Column */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-5">
              {t('footer.popularCities')}
            </h3>
            <ul className="space-y-3">
              <li><Link href="/city/paris/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">Paris</Link></li>
              <li><Link href="/city/nice/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">Nice</Link></li>
              <li><Link href="/city/lyon/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">Lyon</Link></li>
              <li><Link href="/city/marseille/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">Marseille</Link></li>
              <li><Link href="/city/bordeaux/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">Bordeaux</Link></li>
            </ul>
            <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-4 mt-8">
              {t('footer.top10Guides')}
            </h3>
            <ul className="space-y-3">
              <li><Link href="/top-10/restaurants/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">{t('nav.restaurantGuides')}</Link></li>
              <li><Link href="/top-10/hotels/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">{t('nav.hotelGuides')}</Link></li>
              <li><Link href="/top-10/attractions/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">{t('nav.attractionGuides')}</Link></li>
            </ul>
          </div>

          {/* Travel Resources Column */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-5">
              {t('footer.travelResources')}
            </h3>
            <ul className="space-y-3">
              <li><Link href="/esim/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">{t('nav.esim')}</Link></li>
              <li><Link href="/travel-insurance/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">{t('nav.insurance')}</Link></li>
              <li><Link href="/weather/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">{t('nav.weather')}</Link></li>
              <li><Link href="/visa/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">{t('nav.visaGuide')}</Link></li>
              <li><Link href="/food/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">{t('nav.food')}</Link></li>
              <li><Link href="/travel-security/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">{t('nav.vpnSecurity')}</Link></li>
            </ul>

            {/* Sister Sites */}
            <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-4 mt-8">
              Go2 Travel Network
            </h3>
            <ul className="space-y-3">
              {sisterSites.slice(0, 4).map((site) => (
                <li key={site.domain}>
                  <a href={`https://${site.domain}`} className="text-gray-400 hover:text-brand-accent text-sm transition-colors" target="_blank" rel="noopener">
                    {site.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-5">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest France travel tips and guides delivered to your inbox.
            </p>
            {status === 'success' ? (
              <p className="text-green-400 text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                You&apos;re subscribed! Check your inbox.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-4 py-2.5 bg-brand-accent text-white rounded-xl text-sm font-medium hover:bg-brand-accent-600 transition-colors flex items-center gap-1 disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : 'Subscribe'}
                  {status !== 'loading' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>
            )}

            {/* Popular Transport Routes */}
            <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-4 mt-8">
              Popular Routes
            </h3>
            <ul className="space-y-3">
              <li><Link href="/transport/paris-to-lyon/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">Paris to Lyon</Link></li>
              <li><Link href="/transport/paris-to-nice/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">Paris to Nice</Link></li>
              <li><Link href="/transport/paris-to-marseille/" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">Paris to Marseille</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Large Decorative Brand Text */}
      <div className="overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="font-heading text-6xl lg:text-8xl font-bold text-white/[0.03] select-none whitespace-nowrap tracking-wider">
            {siteConfig.name}
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} {siteConfig.domain}. {t('footer.rights')}.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
                {t('footer.terms')}
              </Link>
              <Link href="/affiliate-disclosure/" className="text-gray-500 hover:text-white transition-colors">
                Affiliate Disclosure
              </Link>
            </div>
          </div>
          <p className="text-gray-600 text-xs mt-3 text-center md:text-left">
            {t('footer.travelDisclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
