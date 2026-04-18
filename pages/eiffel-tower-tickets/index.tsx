import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';

const whyAdvanceBooking = [
  {
    icon: '🎫',
    title: 'Sold Out Every Summer',
    description:
      'Eiffel Tower tickets can be fully unavailable 2 to 4 weeks ahead in peak season. Official slots are released 60 days out and evening sunset windows vanish within hours.',
  },
  {
    icon: '⏳',
    title: 'Skip Hours of Line',
    description:
      'Standby queues at the Pilier Nord can stretch 90 to 180 minutes in June, July and August. A timed ticket or skip-the-line tour cuts that to a 10-15 minute security check.',
  },
  {
    icon: '🌇',
    title: 'Lock in Sunset Slots',
    description:
      'The best views (and best photos) happen during the golden hour just before sunset. These slots are the first to sell out, so book 30 or more days ahead whenever possible.',
  },
];

const ticketTypes = [
  {
    type: 'Lift to 2nd Floor',
    adult: '€28.30',
    youth: '€14.10',
    child: '€7.10',
    note: 'Most popular. Lift from ground to level 2. Panoramic Paris view.',
  },
  {
    type: 'Lift to Top (Summit)',
    adult: '€36.70',
    youth: '€18.40',
    child: '€9.20',
    note: 'Ground lift to level 2, then second lift to the 276m summit.',
  },
  {
    type: 'Stairs to 2nd Floor',
    adult: '€14.80',
    youth: '€7.40',
    child: '€3.80',
    note: 'Cheapest option. 674 steps. Smaller crowd, separate queue.',
  },
  {
    type: 'Stairs + Lift to Top',
    adult: '€22.70',
    youth: '€11.40',
    child: '€5.70',
    note: 'Climb to level 2 then lift to the summit. Budget summit access.',
  },
  {
    type: 'Guided Tour (Skip-the-line)',
    adult: '€55-90',
    youth: '€55-90',
    child: 'Varies',
    note: 'Via GetYourGuide or Viator. Includes guide, priority entry and often extras.',
  },
];

const providers = [
  {
    name: 'GetYourGuide',
    tagline: 'Most Flexible',
    color: 'bg-france-blue',
    link: siteConfig.affiliateLinks.getYourGuide,
    external: true,
    description:
      'Verified traveller reviews, free cancellation up to 24 hours before start, and instant mobile tickets. Expect €51 to €78 for a skip-the-line plus English-speaking guide package.',
    features: [
      'Free cancellation up to 24 hours',
      'Verified reviews and star ratings',
      'Instant mobile ticket, no printing',
      '€51-78 skip-the-line with guide',
    ],
  },
  {
    name: 'Viator',
    tagline: 'Widest Selection',
    color: 'bg-france-red',
    link: siteConfig.affiliateLinks.viator,
    external: true,
    description:
      'Owned by TripAdvisor with the largest network of Paris operators. Strong for combo packages such as Eiffel Tower plus Seine river cruise or Louvre skip-the-line add-ons.',
    features: [
      'Largest operator network in Paris',
      'TripAdvisor-ranked reviews',
      'Combo packages (Eiffel + Seine cruise)',
      'Group and private tour options',
    ],
  },
  {
    name: 'Official Eiffel Tower Site',
    tagline: 'Best Price No Guide',
    color: 'bg-gray-700',
    link: 'https://www.toureiffel.paris/en/rates-opening-times',
    external: true,
    description:
      'Cheapest route at the official rates shown above. No guide is included. Slots are released roughly 60 days before the visit date and the best time windows sell out fast.',
    features: [
      'Official rates, lowest price',
      'Direct operator, no markup',
      'Releases 60 days in advance',
      'Best for independent visitors',
    ],
  },
  {
    name: 'Klook',
    tagline: 'Mobile-First Booking',
    color: 'bg-orange-500',
    link: siteConfig.affiliateLinks.klook,
    external: true,
    description:
      'Popular with travellers from Asia and Australia. Clean app, instant confirmation, and frequent promo codes. Good alternative if GetYourGuide or Viator show sold out.',
    features: [
      'Instant mobile confirmation',
      'Frequent promo codes',
      'Popular with Asian travellers',
      'Multi-attraction Paris bundles',
    ],
  },
];

const commonMistakes = [
  'Buying a lift-only ticket when you actually wanted the summit. The summit is a separate upgrade and you cannot add it on at the tower if the day is sold out.',
  'Arriving 10 minutes before your slot. Security, bag check and the lift queue eat real time. Plan on being at the base 30 minutes before your window.',
  'Booking a Sacré-Coeur or Louvre tour the same morning as your Eiffel slot. Paris transit is slower than it looks on a map and most visitors run late.',
  'Assuming the Madame Brasserie restaurant ticket includes tower access. It does include level 1 access, but the restaurant itself needs a separate reservation made 3 or more months ahead.',
  'Booking August without checking July-August maintenance windows. The stair routes sometimes close in summer for painting and inspections.',
  'Buying from third-party scalper sites that list prices far above the official toureiffel.paris rates. If it costs much more than €36.70 without a guide, you are being overcharged.',
];

const faqItems = [
  {
    q: 'How much do Eiffel Tower tickets cost in 2026?',
    a: 'Official 2026 prices range from €14.80 for an adult stairs ticket to level 2, up to €36.70 for an adult lift ticket to the summit. Youth (12-24) and child (4-11) tickets are roughly half price. Guided skip-the-line tours on GetYourGuide and Viator typically run €55 to €90 per adult.',
  },
  {
    q: 'Where is the best place to buy Eiffel Tower tickets?',
    a: 'The official toureiffel.paris site is cheapest and releases slots about 60 days before the visit date. If those are sold out, GetYourGuide and Viator resell through licensed operators and add skip-the-line plus an English-speaking guide. Klook is a good backup if the others are full.',
  },
  {
    q: 'Do I need to book Eiffel Tower tickets in advance?',
    a: 'Yes, especially from April to October and during Christmas week. In peak summer the tower routinely sells out 2 to 4 weeks ahead and sunset slots go first. Booking 30 or more days out gives you full choice of times.',
  },
  {
    q: 'Can I buy Eiffel Tower tickets on the day?',
    a: 'Sometimes. Walk-up tickets for the stairs to level 2 are usually available even in summer because that queue moves fast. Lift tickets on the day are rare in June, July and August. Off-season (December to February) you can usually walk up for any ticket type.',
  },
  {
    q: 'What is the difference between 2nd floor and summit tickets?',
    a: 'The 2nd floor is 115 metres up and has the best wide panoramic view of Paris, with glass floor sections and restaurants. The summit is 276 metres, reached by a second lift from level 2, and gives a top-down view but a much tighter observation deck. Most visitors find level 2 the better photo spot.',
  },
  {
    q: 'Is it worth paying for a guided tour of the Eiffel Tower?',
    a: 'A guided tour is worth it if you want the history, want guaranteed skip-the-line access at a peak time, or prefer an English-speaking guide to lead the way. If you just want the view and plan to take photos at your own pace, the official direct ticket is better value.',
  },
  {
    q: 'Are stairs cheaper than lift tickets for the Eiffel Tower?',
    a: 'Yes. Stairs to level 2 are €14.80 for adults versus €28.30 for the lift, a saving of almost half. The stairs entrance also has a separate, smaller queue. You cannot take stairs beyond level 2, only a lift goes to the summit.',
  },
  {
    q: 'What happens if the Eiffel Tower sells out for my dates?',
    a: 'Try GetYourGuide, Viator and Klook in that order. Licensed tour operators hold ticket allocations separate from the official site and often still have inventory when toureiffel.paris shows sold out. Stairs tickets are the last to go and can usually be walked up.',
  },
];

export default function EiffelTowerTicketsPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Eiffel Tower Tickets', href: '/eiffel-tower-tickets' },
  ];

  const canonicalUrl = `${siteConfig.seo.siteUrl}/eiffel-tower-tickets/`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Eiffel Tower Tickets 2026: Prices, Options & Where to Buy',
    description:
      'Real 2026 Eiffel Tower prices (€14.80-€36.70), best places to book skip-the-line tickets, how far ahead to reserve, and which floor is worth your money.',
    image: `${siteConfig.seo.siteUrl}${siteConfig.seo.ogImage}`,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.seo.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.seo.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.seo.siteUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    datePublished: '2026-04-18',
    dateModified: '2026-04-18',
  };

  const faqSchema = {
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
        title="Eiffel Tower Tickets 2026: Prices, Options & Where to Buy | Go2France"
        description="Real 2026 Eiffel Tower prices (€14.80-€36.70), best places to book skip-the-line tickets, how far ahead to reserve, and which floor is worth your money."
      >
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content="eiffel tower tickets, eiffel tower tickets 2026, skip the line eiffel tower, eiffel tower summit, eiffel tower prices, book eiffel tower tickets" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <p className="font-script text-france-gold mb-2">Book With Confidence</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                Eiffel Tower Tickets 2026: Prices, Options & Where to Buy
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Real 2026 rates, trusted booking platforms, and the tactics locals use to skip the line.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Skip-The-Line</div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Sunset Slots</div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Official Prices</div>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs + Affiliate Disclaimer */}
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

        {/* Why Book in Advance */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Why Book Eiffel Tower Tickets in Advance</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-4">
              {whyAdvanceBooking.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold font-heading mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2026 Prices & Ticket Types */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">2026 Prices & Ticket Types</h2>
            <div className="max-w-5xl mx-auto overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
                <thead className="bg-france-blue text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-heading">Ticket Type</th>
                    <th className="text-left px-4 py-3 font-heading">Adult</th>
                    <th className="text-left px-4 py-3 font-heading">Youth 12-24</th>
                    <th className="text-left px-4 py-3 font-heading">Child 4-11</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketTypes.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-surface-cream'}>
                      <td className="px-4 py-3">
                        <div className="font-semibold">{row.type}</div>
                        <div className="text-xs text-gray-600 mt-1">{row.note}</div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-france-blue">{row.adult}</td>
                      <td className="px-4 py-3">{row.youth}</td>
                      <td className="px-4 py-3">{row.child}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-500 text-center mt-4">
                Prices per toureiffel.paris April 2026. Children under 4 enter free. Tickets are non-refundable but rescheduling is allowed.
              </p>
            </div>
          </div>
        </section>

        {/* Where to Book (4 Providers) */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Where to Book Your Eiffel Tower Tickets</h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Four trusted platforms. Each fits a different traveller. Compare price, flexibility and what is included.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {providers.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col border border-gray-100">
                  <div className={`${p.color} text-white px-6 py-4`}>
                    <h3 className="text-xl font-bold font-heading">{p.name}</h3>
                    <p className="text-sm opacity-90">{p.tagline}</p>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-gray-700 text-sm mb-4">{p.description}</p>
                    <ul className="text-sm space-y-1 mb-6">
                      {p.features.map((f, j) => (
                        <li key={j} className="flex items-start">
                          <span className="text-green-500 mr-2">&#10003;</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className={`mt-auto block w-full ${p.color} text-white text-center py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity`}
                    >
                      Check {p.name} &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skip-the-line Tactics */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Skip-The-Line Tactics That Actually Work</h2>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-france-blue mr-3 text-lg">&#8226;</span>
                  <div>
                    <strong className="font-heading">Guided tour with SOS jump-queue.</strong>
                    <span className="text-gray-700"> Licensed operators have their own entry lane. You walk past the standby queue and go straight into security.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-france-blue mr-3 text-lg">&#8226;</span>
                  <div>
                    <strong className="font-heading">Stairs entry bypasses the elevator queue.</strong>
                    <span className="text-gray-700"> The stairs line at Pilier Sud is almost always shorter than the lift lines. You are walking, but you are walking while lift visitors wait.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-france-blue mr-3 text-lg">&#8226;</span>
                  <div>
                    <strong className="font-heading">Book the first slot of the day (9:00 AM).</strong>
                    <span className="text-gray-700"> Security is empty, staff are fresh, and the Champ de Mars photos have clean morning light.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-france-blue mr-3 text-lg">&#8226;</span>
                  <div>
                    <strong className="font-heading">Book the 9:30 PM last lift.</strong>
                    <span className="text-gray-700"> Usually available when earlier slots are sold out. You catch the hourly sparkle light show from the summit.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Which Floor? */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Which Floor Should You Go To?</h2>
            <div className="max-w-5xl mx-auto overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                <thead className="bg-surface-dark text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-heading">Floor</th>
                    <th className="text-left px-4 py-3 font-heading">View</th>
                    <th className="text-left px-4 py-3 font-heading">Cost (Adult)</th>
                    <th className="text-left px-4 py-3 font-heading">Typical Queue</th>
                    <th className="text-left px-4 py-3 font-heading">Worth It For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-semibold">2nd Floor (115m)</td>
                    <td className="px-4 py-3">Widest panorama, best for photos</td>
                    <td className="px-4 py-3">€28.30 lift</td>
                    <td className="px-4 py-3">30-90 min peak</td>
                    <td className="px-4 py-3">Most visitors, photographers, families</td>
                  </tr>
                  <tr className="bg-surface-cream">
                    <td className="px-4 py-3 font-semibold">Summit (276m)</td>
                    <td className="px-4 py-3">Top-down, full horizon</td>
                    <td className="px-4 py-3">€36.70 lift</td>
                    <td className="px-4 py-3">60-120 min peak</td>
                    <td className="px-4 py-3">First-time visitors, clear-weather days</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-semibold">Stairs to 2nd</td>
                    <td className="px-4 py-3">Same 2nd floor view, slower arrival</td>
                    <td className="px-4 py-3">€14.80</td>
                    <td className="px-4 py-3">15-30 min</td>
                    <td className="px-4 py-3">Budget travellers, queue-haters, fit visitors</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* When to Go */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">When to Visit the Eiffel Tower</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-r-xl">
                <h3 className="font-semibold font-heading mb-2">Best Hours</h3>
                <p className="text-gray-700 text-sm">
                  The 9:00 AM first slot is the calmest. In summer, 6:00 PM hits the sweet spot before the evening rush, and the 9:00 PM summer sunset slot is magical but books up weeks ahead. The 9:30 PM last lift often still has availability.
                </p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-r-xl">
                <h3 className="font-semibold font-heading mb-2">By Season</h3>
                <p className="text-gray-700 text-sm">
                  June to September is the busiest, with frequent sell-outs. December to February has the shortest lines and some of the best cold-air visibility, although the summit can be windy. April, May and October strike the best balance.
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 p-5 rounded-r-xl">
                <h3 className="font-semibold font-heading mb-2">Sunset Windows</h3>
                <p className="text-gray-700 text-sm">
                  Book the slot about 45 minutes before sunset so you arrive at level 2 for golden hour. In April to October, sunset is roughly 8:00 to 9:30 PM. These time slots sell out first, often 30 days ahead.
                </p>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-400 p-5 rounded-r-xl">
                <h3 className="font-semibold font-heading mb-2">Weekday vs Weekend</h3>
                <p className="text-gray-700 text-sm">
                  Tuesday and Wednesday mornings are noticeably quieter. Weekends fill with Paris weekend-breakers from across Europe. School holiday weeks (French vacations scolaires) can feel as busy as summer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Common Eiffel Tower Booking Mistakes</h2>
            <div className="max-w-3xl mx-auto bg-orange-50 border-0 rounded-2xl p-6">
              <ol className="space-y-4 list-decimal list-inside">
                {commonMistakes.map((m, i) => (
                  <li key={i} className="text-gray-800 marker:font-bold marker:text-france-red">
                    <span className="ml-2">{m}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Accessibility at the Eiffel Tower</h2>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">&#10003;</span>
                  <span>Elevators provide wheelchair access to the 1st and 2nd floors.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">&#10007;</span>
                  <span>The summit is not wheelchair accessible. The lift from level 2 to the summit cannot accommodate wheelchairs.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">&#10003;</span>
                  <span>Visitors with disabilities receive a 50% discount, and a companion ticket is also 50% off. Bring official proof at the gate.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">&#10003;</span>
                  <span>Service dogs are allowed throughout the tower.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">&#10003;</span>
                  <span>Accessible toilets are available on level 1 and in the esplanade area.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* What to Bring / Forbidden */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">What to Bring and What is Forbidden</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <h3 className="font-semibold font-heading mb-4 text-green-800">Bring</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Phone charged with your mobile ticket QR code ready.</li>
                  <li>Photo ID for youth and child tickets (proof of age).</li>
                  <li>A light jacket. The summit is 10 to 15 degrees colder and very windy.</li>
                  <li>A refillable water bottle. Fountains are on levels 1 and 2.</li>
                  <li>Small backpack only. Large bags slow security considerably.</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <h3 className="font-semibold font-heading mb-4 text-red-800">Forbidden at Security</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Glass bottles and containers of any kind.</li>
                  <li>Knives, multi-tools, scissors, any sharp object.</li>
                  <li>Outside alcohol. Alcohol is sold inside the tower.</li>
                  <li>Large luggage and suitcases. No cloakroom is available.</li>
                  <li>Drones, tripods over 1m, selfie sticks over 1m, and professional filming gear without a permit.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((item, i) => (
                <details key={i} className="bg-white rounded-2xl shadow-md group">
                  <summary className="cursor-pointer list-none p-6 flex items-start justify-between gap-4">
                    <h3 className="font-semibold font-heading text-lg">{item.q}</h3>
                    <span className="text-france-blue text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-700">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Plan the Rest of Your Paris Trip</h2>
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
              <Link
                href="/paris-city-pass/"
                className="bg-gradient-to-br from-france-blue to-france-blue-700 text-white rounded-2xl shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition-all block"
              >
                <div className="text-4xl mb-3">🎟️</div>
                <h3 className="text-2xl font-bold font-heading mb-2">Paris City Pass</h3>
                <p className="opacity-90">
                  One pass, dozens of attractions. Compare Paris Pass, Paris Museum Pass and Go City to find the best deal for your trip.
                </p>
              </Link>
              <Link
                href="/seine-river-cruise/"
                className="bg-gradient-to-br from-france-red to-france-red-700 text-white rounded-2xl shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition-all block"
              >
                <div className="text-4xl mb-3">🚤</div>
                <h3 className="text-2xl font-bold font-heading mb-2">Seine River Cruise</h3>
                <p className="opacity-90">
                  Bateaux Mouches vs Bateaux Parisiens vs Vedettes de Paris. Day, sunset and dinner cruises compared side by side.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Reading */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Related Reading</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">Keep planning your Paris visit with these guides.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/blog/paris-in-3-days-itinerary/" className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">🗓️</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Paris in 3 Days</h3>
                <p className="text-gray-600 text-sm">A paced itinerary covering the Eiffel Tower, Louvre, Montmartre and more.</p>
              </Link>
              <Link href="/blog/paris-first-time-guide/" className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">🧭</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">First-Time Paris Guide</h3>
                <p className="text-gray-600 text-sm">Arrondissements, metro basics, tipping, and what to skip on a first visit.</p>
              </Link>
              <Link href="/blog/paris-museums-guide/" className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">🖼️</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Paris Museums Guide</h3>
                <p className="text-gray-600 text-sm">Louvre, Orsay, Orangerie, Rodin, Pompidou. Pick the right museums for your trip.</p>
              </Link>
              <Link href="/blog/paris-neighborhoods-guide/" className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all block">
                <div className="text-4xl mb-3">🏘️</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Paris Neighborhoods</h3>
                <p className="text-gray-600 text-sm">Where to stay, from Le Marais to Saint-Germain, and which arrondissement fits you.</p>
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
