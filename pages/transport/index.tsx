import React from 'react';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';

const TransportIndex: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Transport Guide', href: '/transport' }
  ];

  const transportModes = [
    {
      name: 'TGV High-Speed Trains',
      icon: '🚄',
      description: 'France operates one of the world\'s best high-speed rail networks. The TGV (Train a Grande Vitesse) connects major cities at speeds up to 320 km/h. Paris to Lyon takes just 2 hours, Paris to Marseille 3 hours, and Paris to Bordeaux 2 hours. Book through SNCF Connect for the best fares — tickets open 4 months in advance.',
      tips: ['Book 3-4 months ahead for Prem\'s fares (from 10 EUR)', 'Use SNCF Connect app for mobile tickets', 'First class includes power outlets and wider seats', 'Ouigo is the budget TGV option with fares from 10 EUR'],
      priceRange: '10-120 EUR depending on route and booking time'
    },
    {
      name: 'Regional Trains (TER)',
      icon: '🚆',
      description: 'TER (Transport Express Regional) trains connect smaller cities and towns within each French region. They are slower than the TGV but significantly cheaper and often do not require reservations. Ideal for day trips and exploring the countryside around major cities.',
      tips: ['No reservation needed on most TER services', 'Buy tickets at the station or on the SNCF Connect app', 'Validate paper tickets before boarding (compostez votre billet)', 'Regional passes offer great value for multi-day exploration'],
      priceRange: '5-40 EUR per journey'
    },
    {
      name: 'Paris Metro & RER',
      icon: '🚇',
      description: 'The Paris Metro is one of the world\'s densest subway networks with 16 lines and 308 stations. The RER (Reseau Express Regional) connects Paris to suburbs and airports. A single t+ ticket costs 2.15 EUR and is valid for metro, bus, and tram within central Paris. The Navigo Easy card or Navigo Decouverte pass simplifies travel.',
      tips: ['Buy a carnet of 10 t+ tickets for savings', 'Navigo Decouverte weekly pass (30.75 EUR) covers all zones', 'Metro runs from 5:30 AM to 1:00 AM (2:00 AM on Friday and Saturday)', 'RER B connects to both CDG and Orly airports'],
      priceRange: '2.15 EUR single ticket, 30.75 EUR weekly pass'
    },
    {
      name: 'Long-Distance Buses',
      icon: '🚌',
      description: 'FlixBus and BlaBlaCar Bus operate extensive intercity routes across France at budget prices. While slower than the TGV, bus travel is often the cheapest option and covers routes that trains miss. Most buses have WiFi, power outlets, and comfortable seating.',
      tips: ['Book early for fares from 5 EUR', 'FlixBus and BlaBlaCar Bus are the main operators', 'Buses often depart from stations outside city centers', 'Good option for routes not well served by trains'],
      priceRange: '5-40 EUR for most routes'
    },
    {
      name: 'Car Rental & Driving',
      icon: '🚗',
      description: 'Renting a car is the best way to explore rural France — the lavender fields of Provence, wine routes of Burgundy, Loire Valley chateaux, and the villages of Alsace. France has excellent autoroutes (motorways) but most charge tolls. Most rental cars are manual transmission; request automatic specifically if needed.',
      tips: ['Autoroute tolls add up: Paris to Lyon costs approximately 35 EUR in tolls', 'Fuel averages 1.80-2.00 EUR per liter', 'International Driving Permit recommended for non-EU licenses', 'City center driving is stressful — park at the edge and use public transport', 'Speed cameras are everywhere — obey limits strictly'],
      priceRange: '25-60 EUR per day for a compact car'
    },
    {
      name: 'Domestic Flights',
      icon: '✈️',
      description: 'Domestic flights connect Paris to distant cities like Nice, Marseille, Toulouse, and Bordeaux. However, France banned short-haul flights on routes where a train journey of under 2.5 hours exists. For longer routes, Air France, Transavia, and easyJet offer competitive fares when booked ahead.',
      tips: ['Short-haul flight ban: train must be used for routes under 2.5 hours', 'Paris-Nice and Paris-Toulouse remain popular flight routes', 'Charles de Gaulle (CDG) and Orly (ORY) are the main Paris airports', 'Book 4-6 weeks ahead for best fares'],
      priceRange: '40-150 EUR one-way'
    },
    {
      name: 'Cycling',
      icon: '🚲',
      description: 'France is a cycling paradise with over 21,000 km of dedicated cycling routes (voies vertes and EuroVelo routes). Many cities have excellent bike-sharing systems — Velib in Paris, Velo\'v in Lyon, and Le Velo in Marseille. The Loire Valley, Canal du Midi, and Provence are world-class cycling destinations.',
      tips: ['Velib (Paris) costs 3.10 EUR for a day pass', 'Many TER trains allow bikes for free', 'The Loire a Velo route is 900 km of flat, scenic cycling', 'Electric bikes are increasingly available for rental', 'Always lock bikes securely — theft is common in cities'],
      priceRange: '3-25 EUR for city bike share; 15-40 EUR for day rentals'
    }
  ];

  return (
    <div className="min-h-screen bg-surface-cream">
      <SEOHead
        title="France Transport Guide 2026 | TGV, Metro, Buses & Car Rental | Go2France"
        description="Complete guide to traveling in France. TGV high-speed trains, Paris Metro, regional trains, buses, car rental, cycling and domestic flights. Prices, tips and booking advice."
      >
        <meta name="keywords" content="France transport, TGV trains, SNCF, Paris Metro, France buses, car rental France, cycling France, getting around France" />
      </SEOHead>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <p className="font-script text-france-gold mb-2">Getting Around</p>
        <h1 className="text-4xl font-bold font-heading text-gray-900 mb-4">France Transport Guide 2026</h1>
        <p className="text-xl text-gray-600 mb-8">
          France has one of the best transport networks in Europe. From the world-famous TGV to the Paris Metro, here is everything you need to know about getting around.
        </p>

        {/* 12Go Search Widget Placeholder */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold font-heading mb-4">Book Trains, Buses & Transfers</h2>
          <p className="text-gray-600 mb-4">Search and compare transport options across France and Europe.</p>
          <div className="flex flex-wrap gap-4">
            <a
              href={siteConfig.affiliateLinks.transport}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-france-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-france-blue/90 transition-colors"
            >
              Search Routes on 12Go
            </a>
            <a
              href="https://www.sncf-connect.com/en-en/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-france-blue border-2 border-france-blue px-6 py-3 rounded-xl font-semibold hover:bg-france-blue hover:text-white transition-colors"
            >
              Book on SNCF Connect
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-2">Some links are affiliate links — we earn a commission at no extra cost to you</p>
        </section>

        {/* Transport Modes */}
        <section className="space-y-8 mb-12">
          {transportModes.map((mode) => (
            <div key={mode.name} className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl">{mode.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold font-heading text-gray-900">{mode.name}</h2>
                  <p className="text-sm text-france-blue font-medium">{mode.priceRange}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{mode.description}</p>
              <div className="bg-surface-cream rounded-xl p-4">
                <h3 className="font-semibold font-heading mb-2">Tips:</h3>
                <ul className="space-y-1">
                  {mode.tips.map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <span className="text-france-red mr-2 flex-shrink-0">&#8226;</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* Transport Tips */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold font-heading mb-4">France Transport Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold font-heading mb-2">Best Transport by Distance</h3>
              <ul className="space-y-2 text-gray-700">
                <li>&#8226; <strong>Under 100 km:</strong> TER regional train or bus</li>
                <li>&#8226; <strong>100-500 km:</strong> TGV high-speed train (fastest value)</li>
                <li>&#8226; <strong>Over 500 km:</strong> TGV or flight (compare both)</li>
                <li>&#8226; <strong>Rural areas:</strong> Car rental is essential</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold font-heading mb-2">Money-Saving Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>&#8226; Book TGV tickets 4 months in advance for Prem's fares</li>
                <li>&#8226; Ouigo offers TGV-speed travel from 10 EUR</li>
                <li>&#8226; Carte Avantage (49 EUR/year) gives 30% off SNCF fares</li>
                <li>&#8226; BlaBlaCar ridesharing is popular and very affordable</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold font-heading mb-2">Rail Passes</h3>
              <ul className="space-y-2 text-gray-700">
                <li>&#8226; <strong>Eurail France Pass:</strong> 3-8 travel days within 1 month</li>
                <li>&#8226; <strong>Navigo Decouverte:</strong> Weekly unlimited Paris transport</li>
                <li>&#8226; <strong>Regional passes:</strong> Check TER offers per region</li>
                <li>&#8226; <strong>Youth discount:</strong> Under 27 gets significant reductions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold font-heading mb-2">Important Notes</h3>
              <ul className="space-y-2 text-gray-700">
                <li>&#8226; Validate paper tickets before boarding TER trains</li>
                <li>&#8226; Strikes (greves) can disrupt services — check SNCF alerts</li>
                <li>&#8226; Download the SNCF Connect app for real-time schedules</li>
                <li>&#8226; Keep your ticket until you exit the station</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="mb-12">
          <div className="bg-surface-dark rounded-2xl shadow-md p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold font-heading mb-4">Book France Transport Online</h2>
              <p className="text-lg mb-6 opacity-90">
                Compare and book trains, buses, and transfers across France and Europe.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">TGV & Regional Trains</div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">Intercity Buses</div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">Airport Transfers</div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">Car Rental</div>
              </div>
              <a
                href={siteConfig.affiliateLinks.transport}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-france-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-france-red/90 transition-colors shadow-md"
              >
                Search Routes on 12Go
              </a>
              <p className="text-xs mt-4 opacity-75">
                We earn a commission when you book through our links at no extra cost to you
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  };
};

export default TransportIndex;
