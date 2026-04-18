import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';

// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------

const whyCruiseCards: Array<{ icon: string; title: string; body: string }> = [
  {
    icon: '🗼',
    title: 'See 7 Monuments in 60 Minutes',
    body: 'In one hour on the water you glide past the Eiffel Tower, the Louvre, the Musee d\'Orsay, the Notre-Dame area, Pont Neuf, Place de la Concorde and the gold-tipped Pont Alexandre III bridge. No metro, no walking, no crowds.',
  },
  {
    icon: '😌',
    title: 'Rest Your Feet',
    body: 'A typical Paris sightseeing day is 3 to 4 hours on your feet. A Seine cruise is the perfect evening wind-down: you sit, watch the city roll by, and still tick off the main sights.',
  },
  {
    icon: '🌅',
    title: 'Best Sunset View in Paris',
    body: 'Twenty minutes of magic hour light over the Seine beats any rooftop bar. The low sun lights up the Louvre facades and the Eiffel Tower in gold before the evening illumination kicks in.',
  },
];

const operators: Array<{
  name: string;
  pier: string;
  duration: string;
  priceDay: string;
  priceDinner: string;
  vibe: string;
}> = [
  {
    name: 'Bateaux Mouches',
    pier: 'Pont de l\'Alma',
    duration: '1h10',
    priceDay: '€15 to €20 (~$16 to $22)',
    priceDinner: '€90 to €180 (~$96 to $193)',
    vibe: 'Oldest operator (1949), largest boats (up to 1,000 passengers). Most touristy and most commercial narration. Easy boarding, great for families.',
  },
  {
    name: 'Vedettes du Pont Neuf',
    pier: 'Pont Neuf (Ile de la Cite)',
    duration: '1h',
    priceDay: '€14 to €16 (~$15 to $17)',
    priceDinner: 'Not offered',
    vibe: 'Smaller boats (around 150 passengers), more intimate feel. Live audio guide in French and English. Best value day cruise.',
  },
  {
    name: 'Bateaux Parisiens',
    pier: 'Pont d\'Iena (next to Eiffel)',
    duration: '1h',
    priceDay: '€18 to €22 (~$19 to $24)',
    priceDinner: '€90 to €200 (~$96 to $215)',
    vibe: 'Glass-roof boats, headphones in multiple languages. Strong lunch and dinner cruise program. Best for first-time visitors.',
  },
  {
    name: 'Vedettes de Paris',
    pier: 'Pont d\'Iena (next to Eiffel)',
    duration: '1h',
    priceDay: '€16 to €20 (~$17 to $22)',
    priceDinner: 'Champagne cruise only',
    vibe: 'Glass-top, headphone commentary in 14 languages. Friendly crew, family-friendly. Good middle-of-the-road choice.',
  },
  {
    name: 'Bateau-Mouche Paris En Scene',
    pier: 'Various (small piers)',
    duration: '1h to 1h30',
    priceDay: 'N/A',
    priceDinner: '€35 to €60 (~$38 to $64)',
    vibe: 'Boutique option with smaller boats and themed cruises: jazz, champagne, live music. Romantic and less mass-tourism.',
  },
];

const providers: Array<{
  name: string;
  tagline: string;
  url: string;
  color: string;
  bullets: string[];
}> = [
  {
    name: 'GetYourGuide',
    tagline: 'Most Flexible Booking',
    url: siteConfig.affiliateLinks.getYourGuide,
    color: 'bg-blue-600',
    bullets: [
      '24-hour free cancellation on most tours',
      'Mobile QR ticket, no printing needed',
      'Seine cruise tours start from €15 (~$16)',
      'Huge choice of day, sunset and dinner cruises',
    ],
  },
  {
    name: 'Viator',
    tagline: 'Best Combo Deals',
    url: siteConfig.affiliateLinks.viator,
    color: 'bg-red-600',
    bullets: [
      'Eiffel Tower + Seine cruise combo tickets',
      'Dinner cruises with champagne and live music',
      'Highly reviewed, Tripadvisor-backed',
      'Good pick for romance and special occasions',
    ],
  },
  {
    name: 'Klook',
    tagline: 'Instant Mobile Confirmation',
    url: siteConfig.affiliateLinks.klook,
    color: 'bg-orange-500',
    bullets: [
      'Instant mobile ticket confirmation',
      'Popular with travelers from Asia',
      'Wide selection of Seine cruise operators',
      'Frequent app-only discounts',
    ],
  },
];

const cruiseTypes: Array<{
  type: string;
  duration: string;
  price: string;
  highlight: string;
}> = [
  {
    type: 'Sightseeing day cruise',
    duration: '1h',
    price: '€14 to €22 (~$15 to $24)',
    highlight: 'Hop on any time of day, classic sightseeing loop.',
  },
  {
    type: 'Sunset cruise',
    duration: '1h',
    price: '€18 to €28 (~$19 to $30)',
    highlight: 'Magic hour light, then the monuments start to illuminate.',
  },
  {
    type: 'Evening illuminated cruise',
    duration: '1h',
    price: '€16 to €22 (~$17 to $24)',
    highlight: 'Eiffel Tower twinkle show every hour 9pm to 1am.',
  },
  {
    type: 'Dinner cruise',
    duration: '2h to 2h30',
    price: '€90 to €200 (~$96 to $215)',
    highlight: 'Multi-course French menu, live music, formal dress code.',
  },
  {
    type: 'Champagne / boutique cruise',
    duration: '1h to 1h30',
    price: '€30 to €60 (~$32 to $64)',
    highlight: 'Premium drinks, small boat, more intimate atmosphere.',
  },
];

const whichOneForYou: Array<{
  persona: string;
  pick: string;
  price: string;
  body: string;
}> = [
  {
    persona: 'Budget backpacker',
    pick: 'Vedettes du Pont Neuf day cruise',
    price: '€14 (~$15)',
    body: 'The cheapest way to see the Seine classics. Smaller boats, less commentary fluff, perfect if you just want the view without the tourist-trap feel.',
  },
  {
    persona: 'First-time couple',
    pick: 'Bateaux Parisiens sunset cruise',
    price: '€22 (~$24)',
    body: 'Glass roof, multi-language headphones, boards near the Eiffel Tower. Time it so you are on the water when the Eiffel light show starts and you get the full postcard moment.',
  },
  {
    persona: 'Romance or anniversary',
    pick: 'Dinner cruise, Bateaux Parisiens or Bateaux Mouches',
    price: '€120 to €180 (~$129 to $193)',
    body: 'Multi-course French menu, live music, table service. The food is tourist-grade not Michelin, but the setting is unmatched. Book a window seat in advance.',
  },
  {
    persona: 'Family with kids',
    pick: 'Bateaux Mouches day cruise',
    price: '€15 to €20 (~$16 to $22)',
    body: 'Biggest boats, easiest boarding, most space for restless kids to move around. Daytime cruise avoids late bedtimes and the food on dinner cruises is a tough sell for children.',
  },
];

const commonMistakes: string[] = [
  'Booking a dinner cruise expecting fine dining. It is tourist-grade French food in a beautiful setting, not a €120-worth meal. Book it for the atmosphere, not the kitchen.',
  'Missing sunset timing by 20 minutes because you did not check the season. Sunset in June is nearly five hours later than in December in Paris.',
  'Choosing Bateaux Mouches hoping for an intimate ride. These are the largest boats on the river and feel more like a floating bus. Go to Vedettes du Pont Neuf or Paris En Scene for intimacy.',
  'Booking direct at the pier with cash. You lose the skip-line advantage, and prices are not cheaper than GetYourGuide, Viator or Klook.',
  'Paying extra for a "skip-the-line" Seine cruise add-on. Lines are almost never long outside peak August weekends. Do not pay the premium.',
  'Missing the Eiffel Tower hourly light show because your cruise ends at 8:45pm in June. Check the actual illumination start time for the month you are visiting and adjust your boarding time.',
];

const faqItems: Array<{ q: string; a: string }> = [
  {
    q: 'How much does a Seine River cruise cost?',
    a: 'A standard 1-hour daytime sightseeing Seine cruise costs €14 to €22 (~$15 to $24) per adult in 2026. Sunset cruises are €18 to €28. Dinner cruises run €90 to €200 depending on the menu and drinks included. Champagne or boutique cruises sit between €30 and €60.',
  },
  {
    q: 'What is the best Seine cruise in Paris?',
    a: 'For first-time visitors, Bateaux Parisiens at Pont d\'Iena offers the best overall experience: glass roof, headphones in multiple languages, and it boards right next to the Eiffel Tower. For budget travelers, Vedettes du Pont Neuf gives you the same river for around €14. For romance, go boutique with Paris En Scene or book a Bateaux Parisiens dinner cruise.',
  },
  {
    q: 'Is a Seine River cruise worth it for first-time visitors?',
    a: 'Yes. You cover seven major Paris monuments in one hour, sitting down, for under €25. For anyone doing Paris in 3 to 4 days it is one of the highest-value activities available. The views from the water are completely different from street level.',
  },
  {
    q: 'Should I take the Seine cruise at night or day?',
    a: 'If you can only pick one, take the sunset or evening illuminated cruise. You see the monuments in daylight during boarding, in golden hour during the ride, and lit up at the end. The Eiffel Tower sparkle show every hour after dark is a bonus you miss during the day.',
  },
  {
    q: 'Do Seine cruises run in winter?',
    a: 'Yes. All five major operators run year-round. Winter cruises use heated glass-roofed boats and are actually great because the sun sets very early (around 4:40pm in December) so you get the illumination show at a reasonable hour. Dress warmly, especially if you plan to stand on the open upper deck.',
  },
  {
    q: 'Is the Seine dinner cruise worth the money?',
    a: 'The dinner cruise is worth it for the atmosphere, the setting and a special occasion, but not for the food itself. At €120 to €180 per person you are paying mostly for the views, live music and service. If fine dining is the goal, eat at a proper Paris restaurant and do a €20 sunset cruise instead.',
  },
  {
    q: 'How far in advance should I book a Seine cruise?',
    a: 'Day cruises can almost always be booked same-day online. Sunset cruises in summer (June to August) sell out 1 to 3 days ahead. Dinner cruises on weekends, Valentine\'s Day and December holidays should be booked 2 to 4 weeks ahead, especially if you want a window table.',
  },
  {
    q: 'Can I do the Seine cruise with the Eiffel Tower light show?',
    a: 'Yes, and it is one of the best Paris moments. The Eiffel Tower sparkles for 5 minutes at the top of every hour from sunset until 1am. Book an evening cruise that boards 30 to 45 minutes before the hour so you are on the water when the show starts. Cruises departing from Pont d\'Iena pass the tower almost immediately.',
  },
];

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default function SeineRiverCruisePage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Seine River Cruise', href: '/seine-river-cruise' },
  ];

  const canonical = `${siteConfig.seo.siteUrl}/seine-river-cruise/`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Seine River Cruise Paris 2026: Best Operators, Times & Where to Book',
    description:
      'Real 2026 Seine cruise prices (€14-200), the 5 major operators compared, sunset timing by month, and when a dinner cruise is actually worth it.',
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.seo.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.seo.siteUrl,
    },
    datePublished: '2026-04-18',
    dateModified: '2026-04-18',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    image: `${siteConfig.seo.siteUrl}${siteConfig.seo.ogImage}`,
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <SEOHead
        title="Seine River Cruise Paris 2026: Best Operators, Times & Where to Book | Go2France"
        description="Real 2026 Seine cruise prices (€14-200), the 5 major operators compared, sunset timing by month, and when a dinner cruise is actually worth it."
      >
        <link rel="canonical" href={canonical} />
        <meta
          name="keywords"
          content="paris seine river cruise, seine cruise paris, bateaux mouches, bateaux parisiens, paris dinner cruise, seine sunset cruise, paris river boat tour"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <p className="font-script text-france-gold mb-2">Paris From The Water</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                Seine River Cruise 2026: Which Boat, What Time, Where to Book
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                The 5 major operators, real prices, sunset timing by month, and when a dinner cruise is actually worth it.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Sightseeing</div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Sunset</div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Dinner</div>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs + disclaimer */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumbs items={breadcrumbs} />
            <div className="bg-orange-50 border-0 rounded-2xl mt-4">
              <div className="px-4 py-3">
                <p className="text-sm text-center text-orange-800">
                  This page contains affiliate links. We may earn a commission at no extra cost to you when you purchase through our links.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why do a Seine cruise */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Why Do a Seine Cruise?</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-4">
              {whyCruiseCards.map((card, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="font-semibold font-heading mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 main operators */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">The 5 Main Seine Cruise Operators Compared</h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Almost every Seine cruise sold online runs on one of these five operators. Pick the boat first, then pick the booking platform.
            </p>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
              <table className="w-full text-sm">
                <thead className="bg-surface-cream">
                  <tr>
                    <th className="text-left px-4 py-3 font-heading font-semibold">Operator</th>
                    <th className="text-left px-4 py-3 font-heading font-semibold">Pier</th>
                    <th className="text-left px-4 py-3 font-heading font-semibold">Duration</th>
                    <th className="text-left px-4 py-3 font-heading font-semibold">Day cruise</th>
                    <th className="text-left px-4 py-3 font-heading font-semibold">Dinner</th>
                    <th className="text-left px-4 py-3 font-heading font-semibold">Vibe</th>
                  </tr>
                </thead>
                <tbody>
                  {operators.map((op, i) => (
                    <tr key={i} className="border-t border-gray-100 align-top">
                      <td className="px-4 py-3 font-semibold text-france-blue">{op.name}</td>
                      <td className="px-4 py-3 text-gray-700">{op.pier}</td>
                      <td className="px-4 py-3 text-gray-700">{op.duration}</td>
                      <td className="px-4 py-3 text-gray-700">{op.priceDay}</td>
                      <td className="px-4 py-3 text-gray-700">{op.priceDinner}</td>
                      <td className="px-4 py-3 text-gray-600">{op.vibe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Types of cruises */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Types of Seine Cruises</h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Same river, five very different experiences. Here is how to decide.
            </p>
            <div className="overflow-x-auto bg-surface-cream rounded-2xl">
              <table className="w-full text-sm">
                <thead className="bg-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-heading font-semibold">Type</th>
                    <th className="text-left px-4 py-3 font-heading font-semibold">Duration</th>
                    <th className="text-left px-4 py-3 font-heading font-semibold">Price</th>
                    <th className="text-left px-4 py-3 font-heading font-semibold">What makes it special</th>
                  </tr>
                </thead>
                <tbody>
                  {cruiseTypes.map((c, i) => (
                    <tr key={i} className="border-t border-gray-200 align-top">
                      <td className="px-4 py-3 font-semibold text-france-blue">{c.type}</td>
                      <td className="px-4 py-3 text-gray-700">{c.duration}</td>
                      <td className="px-4 py-3 text-gray-700">{c.price}</td>
                      <td className="px-4 py-3 text-gray-600">{c.highlight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Which one for you */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Which Cruise Is Right for You?</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {whichOneForYou.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md p-6">
                  <p className="text-sm uppercase tracking-wide text-france-blue font-semibold mb-1">{p.persona}</p>
                  <h3 className="text-xl font-bold font-heading mb-1">{p.pick}</h3>
                  <p className="text-lg font-semibold text-france-blue mb-3">{p.price}</p>
                  <p className="text-gray-700 text-sm">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Where to book */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Where to Book Your Seine Cruise</h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Prices are almost identical across these three platforms. Pick the one with the best cancellation terms for your trip.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {providers.map((prov, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                  <div className={`${prov.color} text-white px-6 py-5`}>
                    <h3 className="text-2xl font-bold font-heading mb-1">{prov.name}</h3>
                    <p className="text-sm opacity-90">{prov.tagline}</p>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <ul className="text-sm space-y-2 mb-6 flex-1">
                      {prov.bullets.map((b, j) => (
                        <li key={j} className="flex items-start">
                          <span className="text-green-500 mr-2">&#10003;</span>
                          <span className="text-gray-700">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={prov.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className={`block w-full ${prov.color} text-white text-center py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity`}
                    >
                      Check {prov.name} &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center mt-6">
              Affiliate links. We may earn a commission at no extra cost to you.
            </p>
          </div>
        </section>

        {/* Best timing */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Best Timing for a Seine Cruise</h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Timing is everything with a Seine cruise. The same boat at 3pm versus 9pm is a completely different experience.
            </p>

            <div className="max-w-4xl mx-auto space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-r-xl">
                <h3 className="font-semibold font-heading mb-2">Weekday vs weekend</h3>
                <p className="text-gray-700">
                  Weekday cruises are 40 to 60 percent less crowded than Saturday and Sunday cruises. If you have any flexibility, go Tuesday, Wednesday or Thursday. Friday evening is the worst for dinner cruises.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-r-xl">
                <h3 className="font-semibold font-heading mb-3">Sunset hour in Paris, 2026</h3>
                <div className="overflow-x-auto bg-white rounded-xl">
                  <table className="w-full text-sm">
                    <thead className="bg-surface-cream">
                      <tr>
                        <th className="text-left px-4 py-2 font-heading font-semibold">Month</th>
                        <th className="text-left px-4 py-2 font-heading font-semibold">Sunset (approx.)</th>
                        <th className="text-left px-4 py-2 font-heading font-semibold">Recommended boarding</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-100">
                        <td className="px-4 py-2 text-gray-700">March</td>
                        <td className="px-4 py-2 text-gray-700">6:00pm</td>
                        <td className="px-4 py-2 text-gray-700">5:15pm</td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="px-4 py-2 text-gray-700">June</td>
                        <td className="px-4 py-2 text-gray-700">9:40pm</td>
                        <td className="px-4 py-2 text-gray-700">9:00pm</td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="px-4 py-2 text-gray-700">September</td>
                        <td className="px-4 py-2 text-gray-700">7:30pm</td>
                        <td className="px-4 py-2 text-gray-700">6:45pm</td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="px-4 py-2 text-gray-700">December</td>
                        <td className="px-4 py-2 text-gray-700">4:40pm</td>
                        <td className="px-4 py-2 text-gray-700">4:00pm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-5 rounded-r-xl">
                <h3 className="font-semibold font-heading mb-2">Eiffel Tower illumination</h3>
                <p className="text-gray-700">
                  The Eiffel Tower sparkles for 5 minutes at the top of every hour from sunset until 1am. If catching it from the water is the goal, board your cruise 30 to 45 minutes before the hour so you pass the tower just as it lights up.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-5 rounded-r-xl">
                <h3 className="font-semibold font-heading mb-2">Rain plan</h3>
                <p className="text-gray-700">
                  All five major operators run glass-roofed boats. Light rain is fine, you just lose the open-deck option. Heavy rain reduces visibility through the glass but cruises still run. Thunderstorms occasionally cause short delays, refundable through GetYourGuide and Viator.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">6 Common Seine Cruise Mistakes to Avoid</h2>
            <div className="max-w-3xl mx-auto bg-orange-50 rounded-2xl p-6 border border-orange-100">
              <ol className="space-y-4">
                {commonMistakes.map((m, i) => (
                  <li key={i} className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-200 text-orange-900 font-bold flex items-center justify-center mr-3">
                      {i + 1}
                    </span>
                    <span className="text-gray-800 pt-1">{m}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* What is included */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">What Is Included in a Standard Seine Cruise</h2>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-lg">&#10003;</span>
                  <span><strong>Live commentary or headphones</strong> in multiple languages (typically English, French, Spanish, German, Italian, Chinese, Japanese on Bateaux Parisiens and Vedettes de Paris).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-lg">&#10003;</span>
                  <span><strong>Glass-roofed boat</strong> with open upper deck on most operators, usable in light rain.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-lg">&#10003;</span>
                  <span><strong>WC on board</strong> on all five major operators.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 text-lg">&#10007;</span>
                  <span><strong>Water and soft drinks are usually not included</strong> on day cruises. Expect to pay €3 to €5 for a bottle of water on board. Bring your own if you want to save.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-lg">&#10003;</span>
                  <span><strong>Dinner cruises include</strong> a multi-course French menu (usually 3 courses), bread, a welcome drink, and often a half-bottle of wine. Champagne is typically an upsell.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Accessibility</h2>
            <div className="max-w-3xl mx-auto bg-blue-50 border-l-4 border-blue-400 p-5 rounded-r-xl">
              <p className="text-gray-700">
                Most Seine cruise boats are wheelchair accessible at the two main piers, Pont d&apos;Iena (Bateaux Parisiens, Vedettes de Paris) and Pont de l&apos;Alma (Bateaux Mouches). Boarding ramps are in place and there is dedicated wheelchair space on the main deck.
              </p>
              <p className="text-gray-700 mt-3">
                Advance notice is strongly recommended, at least 24 hours before boarding. Upper decks are reached by stairs only on most boats. Dinner cruises often have accessible restrooms on board; confirm at booking. Guide dogs are accepted on all five major operators.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((faq, i) => (
                <details key={i} className="bg-white rounded-2xl p-6 shadow-md group">
                  <summary className="font-semibold font-heading cursor-pointer list-none flex justify-between items-center">
                    <span>{faq.q}</span>
                    <span className="text-france-blue text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-gray-700 mt-4">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-links 2 cards */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Bundle Your Paris Tickets</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              A Seine cruise pairs beautifully with these two Paris essentials.
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Link
                href="/eiffel-tower-tickets/"
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all block"
              >
                <div className="text-4xl mb-3">🗼</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2 text-lg">Eiffel Tower Tickets</h3>
                <p className="text-gray-600 text-sm">
                  Skip-the-line, summit access and the best ticket combo for pairing with an evening Seine cruise.
                </p>
              </Link>
              <Link
                href="/paris-city-pass/"
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all block"
              >
                <div className="text-4xl mb-3">🎫</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2 text-lg">Paris City Pass</h3>
                <p className="text-gray-600 text-sm">
                  Compare Paris Pass, Paris Museum Pass and Go City. Most include a Seine cruise at no extra cost.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Related reading */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Related Reading</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              More Paris planning to pair with your Seine cruise.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/blog/paris-in-3-days-itinerary/"
                className="bg-surface-cream rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all block"
              >
                <div className="text-3xl mb-3">📅</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Paris in 3 Days</h3>
                <p className="text-gray-600 text-sm">A day-by-day itinerary that includes the best time to slot in a Seine cruise.</p>
              </Link>
              <Link
                href="/blog/paris-first-time-guide/"
                className="bg-surface-cream rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all block"
              >
                <div className="text-3xl mb-3">🧭</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">First-Time Paris Guide</h3>
                <p className="text-gray-600 text-sm">Everything a first-time visitor to Paris needs to know before landing.</p>
              </Link>
              <Link
                href="/blog/paris-with-kids-2026/"
                className="bg-surface-cream rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all block"
              >
                <div className="text-3xl mb-3">👨‍👩‍👧</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Paris with Kids 2026</h3>
                <p className="text-gray-600 text-sm">Family-friendly Paris, including which Seine cruise works best with children.</p>
              </Link>
              <Link
                href="/blog/is-paris-expensive-2026/"
                className="bg-surface-cream rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all block"
              >
                <div className="text-3xl mb-3">💶</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Is Paris Expensive in 2026?</h3>
                <p className="text-gray-600 text-sm">Real 2026 prices for attractions, food and transport, including Seine cruises.</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
