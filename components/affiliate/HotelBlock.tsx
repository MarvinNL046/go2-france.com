import { buildAffiliateUrl } from '../../lib/affiliates';

interface HotelBlockProps {
  destination: string;
}

export default function HotelBlock({ destination }: HotelBlockProps) {
  return (
    <div className="my-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6 lg:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Where to Stay in {destination}</h3>
          <p className="text-gray-600 mt-1">
            Find the best hotels, boutique stays, and vacation rentals
          </p>
        </div>
        <a
          href={buildAffiliateUrl('booking')}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="inline-flex items-center px-6 py-3 bg-[#003580] text-white font-semibold rounded-lg hover:bg-[#00264D] transition-colors shadow-md"
        >
          Search on Booking.com
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      <p className="text-xs text-gray-400 mt-4">
        * Affiliate link. We may earn a commission at no extra cost to you.
      </p>
    </div>
  );
}
