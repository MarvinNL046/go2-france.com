import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';
import GoogleConsent from '../components/GoogleConsent';
import FeedbackRibbon from '../components/FeedbackRibbon';
import ExitIntentPopup from '../components/ExitIntentPopup';
import Hreflang from '../components/Hreflang';
import { ToastProvider } from '../components/Toast';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const isProduction = process.env.NODE_ENV === 'production';
  const router = useRouter();


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/go2france-favicon.webp" />
        <link rel="apple-touch-icon" href="/go2france-favicon.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Go2France.com",
              "url": "https://go2-france.com",
              "logo": "https://go2-france.com/go2france-favicon.webp",
              "description": "Your comprehensive guide to France travel",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "info@go2-france.com",
                "contactType": "customer service"
              }
            })
          }}
        />
      </Head>

      {/* Analytics and Ad Scripts - Only in production */}
      {isProduction && (
        <>
          {/* Google Tag Manager - Load with lazyOnload for better performance */}
          <Script
            id="gtm-script"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-XXXXXXX');
              `
            }}
          />
        </>
      )}

      <Hreflang />
      <GoogleConsent />
      <ToastProvider>
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          <Header />
          <main className="flex-grow overflow-x-hidden">
            <Component {...pageProps} />
          </main>
          <Footer />
          <CookieConsent />
          <FeedbackRibbon />
          <ExitIntentPopup />
        </div>
      </ToastProvider>
    </>
  );
}
