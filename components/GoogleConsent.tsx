import Script from 'next/script';

declare global {
  interface Window {
    gtag: any;
    dataLayer: any;
  }
}

const GoogleConsent = () => {
  return (
    <Script
      id="google-consent"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'functionality_storage': 'granted',
            'security_storage': 'granted'
          });

          const consent = localStorage.getItem('cookie-consent');
          if (consent === 'all') {
            gtag('consent', 'update', {
              'analytics_storage': 'granted',
              'ad_storage': 'granted',
              'ad_user_data': 'granted',
              'ad_personalization': 'granted'
            });
          }
        `,
      }}
    />
  );
};

export default GoogleConsent;
