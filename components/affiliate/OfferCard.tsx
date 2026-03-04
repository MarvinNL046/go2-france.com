import { AffiliatePartner, getPartnerConfig, buildAffiliateUrl } from '../../lib/affiliates';

interface OfferCardProps {
  partner: AffiliatePartner;
  title: string;
  description: string;
  priceHint?: string;
  params?: Record<string, string>;
}

export default function OfferCard({ partner, title, description, priceHint, params }: OfferCardProps) {
  const config = getPartnerConfig(partner);
  const url = buildAffiliateUrl(partner, params);

  return (
    <a
      href={url}
      target="_blank"
      rel="nofollow sponsored noopener"
      className="group block bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      <div className="h-1" style={{ backgroundColor: config.color }} />
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            {config.displayName}
          </span>
          {priceHint && (
            <span className="text-sm font-bold text-brand-primary">{priceHint}</span>
          )}
        </div>
        <h4 className="font-bold text-gray-900 group-hover:text-brand-primary transition-colors mb-1.5">
          {title}
        </h4>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>
        <span
          className="inline-flex items-center text-sm font-semibold text-white px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
          style={{ backgroundColor: config.color }}
        >
          View Deal
          <svg className="ml-1.5 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </a>
  );
}
