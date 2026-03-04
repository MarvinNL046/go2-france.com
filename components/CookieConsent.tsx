import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      });
    }
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 animate-slide-up">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <svg className="w-6 h-6 text-brand-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                We use cookies
              </h3>
              <p className="text-sm text-gray-600">
                We use cookies to enhance your browsing experience and analyze site traffic.
                {!showDetails && (
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-brand-primary hover:underline ml-1"
                  >
                    Learn more
                  </button>
                )}
              </p>

              {showDetails && (
                <div className="mt-3 text-sm text-gray-600 space-y-2">
                  <p>
                    <strong>Necessary cookies:</strong> Required for the website to function properly (authentication, security, preferences).
                  </p>
                  <p>
                    <strong>Analytics cookies:</strong> Help us understand how visitors use our website through Google Analytics.
                  </p>
                  <p>
                    <strong>Marketing cookies:</strong> Used to show relevant ads and measure their effectiveness.
                  </p>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-brand-primary hover:underline"
                  >
                    Show less
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={acceptNecessary}
              className="w-full sm:w-auto"
            >
              Necessary only
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={acceptAll}
              className="w-full sm:w-auto"
            >
              Accept all
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CookieConsent;
