'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../hooks/useTranslation';
import { siteConfig } from '../site.config';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation('common');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinkClass = 'text-gray-700 hover:text-brand-primary font-heading text-sm font-medium px-3 py-2 transition-colors duration-200 relative group';
  const dropdownBtnClass = 'text-gray-700 hover:text-brand-primary font-heading text-sm font-medium px-3 py-2 transition-colors duration-200 relative group flex items-center gap-1';
  const dropdownPanelClass = 'absolute left-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50';
  const dropdownItemClass = 'flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-brand-primary-50 hover:text-brand-primary transition-colors duration-200';
  const mobileLinkClass = 'text-gray-800 hover:text-brand-primary block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 hover:bg-brand-primary-50';
  const mobileSubLinkClass = 'text-gray-600 hover:text-brand-primary block px-4 py-3 rounded-xl text-sm transition-colors duration-200 hover:bg-brand-primary-50 ml-4';

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/0'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <div className="h-24 w-24 relative transform transition-transform group-hover:scale-105">
                  <Image
                    src="/images/logo.webp"
                    alt={siteConfig.tagline}
                    height={96}
                    width={96}
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Nav (center) */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-1">
                {/* Home */}
                <Link href="/" className={navLinkClass}>
                  {t('nav.home')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
                </Link>

                {/* Cities */}
                <Link href="/city/" className={navLinkClass}>
                  {t('nav.cities')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
                </Link>

                {/* Regions Dropdown */}
                <div className="relative group">
                  <button className={dropdownBtnClass}>
                    <span>{t('nav.regions')}</span>
                    <svg className="w-4 h-4 transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
                  </button>
                  <div className={dropdownPanelClass}>
                    <div className="py-3">
                      <Link href="/region/ile-de-france/" className={dropdownItemClass}>
                        Ile-de-France
                      </Link>
                      <Link href="/region/provence/" className={dropdownItemClass}>
                        Provence
                      </Link>
                      <Link href="/region/cote-dazur/" className={dropdownItemClass}>
                        C&ocirc;te d&apos;Azur
                      </Link>
                      <Link href="/region/normandy/" className={dropdownItemClass}>
                        Normandy
                      </Link>
                      <Link href="/region/brittany/" className={dropdownItemClass}>
                        Brittany
                      </Link>
                      <Link href="/region/loire-valley/" className={dropdownItemClass}>
                        Loire Valley
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Food & Drinks Dropdown */}
                <div className="relative group">
                  <button className={dropdownBtnClass}>
                    <span>{t('nav.foodDrinks')}</span>
                    <svg className="w-4 h-4 transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
                  </button>
                  <div className={dropdownPanelClass}>
                    <div className="py-3">
                      <Link href="/food/" className={dropdownItemClass}>
                        {t('nav.food')}
                      </Link>
                      <Link href="/drinks/" className={dropdownItemClass}>
                        {t('nav.drinks')}
                      </Link>
                      <div className="border-t border-gray-100 my-2 mx-4" />
                      <Link href="/food/category/main-dish/" className={dropdownItemClass}>
                        Main Dishes
                      </Link>
                      <Link href="/food/category/pastry/" className={dropdownItemClass}>
                        Pastries &amp; Desserts
                      </Link>
                      <Link href="/drinks/category/wine/" className={dropdownItemClass}>
                        French Wines
                      </Link>
                      <Link href="/drinks/category/cocktail/" className={dropdownItemClass}>
                        Cocktails &amp; Spirits
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Travel Needs Dropdown */}
                <div className="relative group">
                  <button className={dropdownBtnClass}>
                    <span>{t('nav.travelNeeds')}</span>
                    <svg className="w-4 h-4 transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
                  </button>
                  <div className={dropdownPanelClass}>
                    <div className="py-3">
                      <Link href="/esim/" className={dropdownItemClass}>
                        {t('nav.esim')}
                      </Link>
                      <Link href="/travel-insurance/" className={dropdownItemClass}>
                        {t('nav.insurance')}
                      </Link>
                      <div className="border-t border-gray-100 my-2 mx-4" />
                      <Link href="/travel-security/" className={dropdownItemClass}>
                        {t('nav.vpnSecurity')}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Visa & Info Dropdown */}
                <div className="relative group">
                  <button className={dropdownBtnClass}>
                    <span>{t('nav.visaInfo')}</span>
                    <svg className="w-4 h-4 transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
                  </button>
                  <div className={dropdownPanelClass}>
                    <div className="py-3">
                      <Link href="/visa/" className={dropdownItemClass}>
                        {t('nav.visaGuide')}
                      </Link>
                      <Link href="/practical-info/" className={dropdownItemClass}>
                        {t('nav.practicalInfo')}
                      </Link>
                      <div className="border-t border-gray-100 my-2 mx-4" />
                      <Link href="/weather/" className={dropdownItemClass}>
                        {t('nav.weather')}
                      </Link>
                      <Link href="/transport/" className={dropdownItemClass}>
                        {t('nav.transport')}
                      </Link>
                      <Link href="/blog/" className={dropdownItemClass}>
                        {t('nav.blog')}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Plan Trip Dropdown */}
                <div className="relative group">
                  <button className={dropdownBtnClass}>
                    <span>{t('nav.planTrip')}</span>
                    <svg className="w-4 h-4 transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
                  </button>
                  <div className={dropdownPanelClass}>
                    <div className="py-3">
                      <Link href="/itineraries/" className={dropdownItemClass}>
                        Itineraries
                      </Link>
                      <Link href="/weather/" className={dropdownItemClass}>
                        {t('nav.weather')}
                      </Link>
                      <Link href="/transport/" className={dropdownItemClass}>
                        {t('nav.transport')}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Top 10 Dropdown */}
                <div className="relative group">
                  <button className={dropdownBtnClass}>
                    <span>{t('nav.top10')}</span>
                    <svg className="w-4 h-4 transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
                  </button>
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                    <div className="py-3">
                      <div className="px-5 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {t('nav.byCategory')}
                      </div>
                      <Link href="/top-10/restaurants/" className={dropdownItemClass}>
                        {t('nav.restaurantGuides')}
                      </Link>
                      <Link href="/top-10/hotels/" className={dropdownItemClass}>
                        {t('nav.hotelGuides')}
                      </Link>
                      <Link href="/top-10/attractions/" className={dropdownItemClass}>
                        {t('nav.attractionGuides')}
                      </Link>
                      <div className="border-t border-gray-100 my-2 mx-4" />
                      <div className="px-5 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {t('nav.popularCities')}
                      </div>
                      <Link href="/city/paris/top-10-restaurants/" className={dropdownItemClass}>
                        Paris Top 10 Restaurants
                      </Link>
                      <Link href="/city/nice/top-10-hotels/" className={dropdownItemClass}>
                        Nice Top 10 Hotels
                      </Link>
                      <Link href="/city/lyon/top-10-attractions/" className={dropdownItemClass}>
                        Lyon Top 10 Attractions
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA + Language (right) */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <Link
                href="/city/"
                className="bg-gradient-to-r from-brand-primary to-brand-primary-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:from-brand-primary-600 hover:to-brand-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('nav.exploreNow')}
              </Link>
              <LanguageSwitcher />
            </div>

            {/* Mobile hamburger */}
            <div className="lg:hidden flex items-center gap-3">
              <LanguageSwitcher />
              <button
                type="button"
                className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-700 hover:text-brand-primary hover:bg-brand-primary-50 transition-colors duration-200"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">{t('nav.openMainMenu')}</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[60] bg-white overflow-y-auto transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        id="mobile-menu"
      >
        {/* Mobile menu header */}
        <div className="flex items-center justify-between px-4 h-20 border-b border-gray-100">
          <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="h-16 w-16 relative">
              <Image
                src="/images/logo.webp"
                alt={siteConfig.name}
                height={64}
                width={64}
                className="object-contain"
              />
            </div>
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-700 hover:text-brand-primary hover:bg-brand-primary-50 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile menu links */}
        <div className="px-4 py-6 space-y-1">
          <Link href="/" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
            {t('nav.home')}
          </Link>
          <Link href="/city/" className={mobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
            {t('nav.cities')}
          </Link>

          {/* Regions section */}
          <div className="border-t border-gray-100 pt-3 mt-3">
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {t('nav.regions')}
            </div>
            <Link href="/region/ile-de-france/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Ile-de-France
            </Link>
            <Link href="/region/provence/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Provence
            </Link>
            <Link href="/region/cote-dazur/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              C&ocirc;te d&apos;Azur
            </Link>
            <Link href="/region/normandy/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Normandy
            </Link>
            <Link href="/region/brittany/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Brittany
            </Link>
            <Link href="/region/loire-valley/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Loire Valley
            </Link>
          </div>

          {/* Food & Drinks section */}
          <div className="border-t border-gray-100 pt-3 mt-3">
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {t('nav.foodDrinks')}
            </div>
            <Link href="/food/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.food')}
            </Link>
            <Link href="/drinks/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.drinks')}
            </Link>
            <Link href="/food/category/main-dish/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Main Dishes
            </Link>
            <Link href="/food/category/pastry/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Pastries &amp; Desserts
            </Link>
            <Link href="/drinks/category/wine/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              French Wines
            </Link>
            <Link href="/drinks/category/cocktail/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Cocktails &amp; Spirits
            </Link>
          </div>

          {/* Travel Needs section */}
          <div className="border-t border-gray-100 pt-3 mt-3">
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {t('nav.travelNeeds')}
            </div>
            <Link href="/esim/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.esim')}
            </Link>
            <Link href="/travel-insurance/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.insurance')}
            </Link>
            <Link href="/travel-security/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.vpnSecurity')}
            </Link>
          </div>

          {/* Visa & Info section */}
          <div className="border-t border-gray-100 pt-3 mt-3">
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {t('nav.visaInfo')}
            </div>
            <Link href="/visa/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.visaGuide')}
            </Link>
            <Link href="/practical-info/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.practicalInfo')}
            </Link>
            <Link href="/weather/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.weather')}
            </Link>
            <Link href="/transport/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.transport')}
            </Link>
            <Link href="/blog/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.blog')}
            </Link>
          </div>

          {/* Plan Trip section */}
          <div className="border-t border-gray-100 pt-3 mt-3">
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {t('nav.planTrip')}
            </div>
            <Link href="/itineraries/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Itineraries
            </Link>
            <Link href="/weather/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.weather')}
            </Link>
            <Link href="/transport/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.transport')}
            </Link>
          </div>

          {/* Top 10 section */}
          <div className="border-t border-gray-100 pt-3 mt-3">
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {t('nav.top10')}
            </div>
            <Link href="/top-10/restaurants/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.restaurantGuides')}
            </Link>
            <Link href="/top-10/hotels/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.hotelGuides')}
            </Link>
            <Link href="/top-10/attractions/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.attractionGuides')}
            </Link>
            <div className="border-t border-gray-50 my-1 mx-4" />
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {t('nav.popularCities')}
            </div>
            <Link href="/city/paris/top-10-restaurants/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Paris Top 10 Restaurants
            </Link>
            <Link href="/city/nice/top-10-hotels/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Nice Top 10 Hotels
            </Link>
            <Link href="/city/lyon/top-10-attractions/" className={mobileSubLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Lyon Top 10 Attractions
            </Link>
          </div>

          {/* Mobile CTA */}
          <div className="pt-6 mt-4 border-t border-gray-100">
            <Link
              href="/city/"
              className="bg-gradient-to-r from-brand-primary to-brand-primary-600 text-white block text-center px-6 py-3.5 rounded-xl text-base font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.exploreNow')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
