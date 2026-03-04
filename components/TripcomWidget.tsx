import { useEffect, useRef } from 'react';

interface TripcomWidgetProps {
  city: string;
  type: 'hotels' | 'flights' | 'searchbox' | 'bundle' | 'transfers' | 'car-rental';
  className?: string;
  customTitle?: string;
}

export default function TripcomWidget({ city, type, className = '', customTitle }: TripcomWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Trip.com widget script
    if (widgetRef.current) {
      const script = document.createElement('script');
      script.src = 'https://tpembd.com/content?trs=384595&shmarker=602467&lang=www&layout=S10391&powered_by=true&campaign_id=121&promo_id=4038';
      script.async = true;
      script.charset = 'utf-8';
      widgetRef.current.appendChild(script);

      return () => {
        // Cleanup
        if (widgetRef.current && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  // Affiliate links for different services
  const affiliateLinks = {
    main: 'https://trip.tpo.lv/TmObooZ5',
    bundle: 'https://trip.tpo.lv/iP1HSint',
    transfers: 'https://trip.tpo.lv/iP1HSint',
    'car-rental': 'https://trip.tpo.lv/fzIWyBhW'
  };

  const getServiceInfo = () => {
    switch (type) {
      case 'bundle':
        return {
          title: 'Hotel & Flight Bundle',
          description: 'Save more by booking hotel and flight together',
          link: affiliateLinks.bundle
        };
      case 'transfers':
        return {
          title: 'Airport Transfers',
          description: 'Book reliable airport transfers in advance',
          link: affiliateLinks.transfers
        };
      case 'car-rental':
        return {
          title: 'Car Rental',
          description: 'Rent a car for your trip around France',
          link: affiliateLinks['car-rental']
        };
      default:
        return {
          title: 'Search Hotels & Flights',
          description: `Find the best deals for ${city}`,
          link: affiliateLinks.main
        };
    }
  };

  const serviceInfo = getServiceInfo();

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Widget container */}
      <div ref={widgetRef} className="trip-com-widget overflow-x-auto"></div>

      {/* Fallback content and additional links */}
      <div className="p-4 sm:p-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {customTitle || serviceInfo.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {serviceInfo.description}
        </p>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          <a
            href={affiliateLinks.main}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-center px-3 py-2 bg-france-blue text-white rounded-lg hover:bg-france-blue-600 transition-colors text-xs sm:text-sm font-medium"
          >
            Hotels
          </a>
          <a
            href={affiliateLinks.bundle}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-center px-3 py-2 bg-france-blue text-white rounded-lg hover:bg-france-blue-600 transition-colors text-xs sm:text-sm font-medium"
          >
            Hotel + Flight
          </a>
          <a
            href={affiliateLinks.transfers}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-center px-3 py-2 bg-france-blue text-white rounded-lg hover:bg-france-blue-600 transition-colors text-xs sm:text-sm font-medium"
          >
            Transfers
          </a>
          <a
            href={affiliateLinks['car-rental']}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-center px-3 py-2 bg-france-blue text-white rounded-lg hover:bg-france-blue-600 transition-colors text-xs sm:text-sm font-medium"
          >
            Car Rental
          </a>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-xs text-gray-500 text-center">
            We earn a commission when you book through our links
          </p>
          <p className="text-xs text-center">
            <span className="text-gray-400">Powered by </span>
            <a
              href="https://www.travelpayouts.com/?marker=602467"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-france-blue hover:text-france-blue-600 underline transition-colors"
            >
              Travelpayouts
            </a>
            <span className="text-gray-400"> - Travel Affiliate Network</span>
          </p>
        </div>
      </div>
    </div>
  );
}
