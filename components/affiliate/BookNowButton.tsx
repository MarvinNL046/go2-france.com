import { buildAffiliateUrl, AffiliatePartner, getPartnerConfig } from '../../lib/affiliates';

interface BookNowButtonProps {
  partner: AffiliatePartner;
  label?: string;
  params?: Record<string, string>;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg',
};

export default function BookNowButton({ partner, label, params, className = '', size = 'md' }: BookNowButtonProps) {
  const config = getPartnerConfig(partner);
  const url = buildAffiliateUrl(partner, params);

  return (
    <a
      href={url}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={`inline-flex items-center justify-center font-semibold rounded-lg text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg ${sizes[size]} ${className}`}
      style={{ backgroundColor: config.color }}
    >
      {label || `Book on ${config.displayName}`}
      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}
