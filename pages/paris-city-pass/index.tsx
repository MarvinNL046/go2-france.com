import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { siteConfig } from '../../site.config';

const whyPassCards = [
  {
    emoji: '🎟️',
    title: 'Stack Multiple Attractions',
    body: 'Louvre plus Orsay plus Arc de Triomphe plus Versailles adds up fast. You typically break even on a 2-day pass after just 3 or 4 sites.',
  },
  {
    emoji: '⏱️',
    title: 'Skip Some Lines',
    body: 'Priority entry at select sites trims 30 to 90 minute queues on the Louvre, Orsay, Sainte-Chapelle and Arc de Triomphe. It is not a universal fast-track, but it helps.',
  },
  {
    emoji: '🚇',
    title: 'All-in-One Transport + Sights',
    body: 'Some passes bundle Metro, bus and RER travel, a hop-on-hop-off bus and a Seine cruise. Convenient if you hate buying individual tickets on your phone every day.',
  },
];

interface PassRow {
  name: string;
  pricing: string;
  covers: string;
  notIncluded: string;
  bestFor: string;
}

const passComparison: PassRow[] = [
  {
    name: 'Paris Museum Pass',
    pricing: '2 days €65 / 4 days €80 / 6 days €100',
    covers: '50+ museums and monuments including the Louvre, Musee d\'Orsay, Arc de Triomphe, Sainte-Chapelle, Versailles palace, Orangerie, Centre Pompidou, Rodin Museum.',
    notIncluded: 'Eiffel Tower, public transport, hop-on-hop-off bus, Seine cruise, Disneyland Paris.',
    bestFor: 'Museum-heavy trips where you already know how to use the Metro.',
  },
  {
    name: 'Paris City Pass (Go City Paris)',
    pricing: '2 days €99 / 3 days €129 / 4 days €154 / 5 days €174 / 6 days €194',
    covers: 'Museum Pass attractions plus public transport (Metro, bus, RER zones 1-3), hop-on-hop-off bus, Seine cruise and optional Eiffel Tower upgrade.',
    notIncluded: 'Disneyland Paris, airport transfers, some premium guided tours. Eiffel summit is a paid add-on.',
    bestFor: 'First-timers and families who want one QR code for everything.',
  },
  {
    name: 'Paris Pass (The Paris Pass)',
    pricing: '2 days €129 / 3 days €174 / 4 days €194 / 6 days €244',
    covers: 'Hop-on-hop-off bus, 80+ attractions including Louvre, Orsay, Versailles, Montparnasse Tower, Seine cruise, wine tasting, select day trips.',
    notIncluded: 'Eiffel Tower summit, Disneyland, Metro tickets (sold separately as a Travelcard add-on).',
    bestFor: 'Travelers who want the widest attraction menu and do not mind paying for it.',
  },
  {
    name: 'Navigo + Individual Tickets',
    pricing: '€30.75 Navigo weekly + €22 Louvre + €16 Orsay + €14 Sainte-Chapelle etc.',
    covers: 'Exactly what you book, nothing you do not. Pay-as-you-go flexibility.',
    notIncluded: 'Priority-entry benefits at most sites, bundled Seine cruise, hop-on-hop-off bus.',
    bestFor: 'Slow travelers, backpackers, and anyone visiting just 1 to 2 paid sights.',
  },
];

const providers = [
  {
    name: 'GetYourGuide',
    tagline: 'Best Cancellation Terms',
    href: siteConfig.affiliateLinks.getYourGuide,
    color: 'bg-france-blue',
    features: [
      '24 hour free cancellation on most passes',
      'Verified traveler reviews for every operator',
      'Instant mobile QR delivery to your phone',
      'Customer support in 20+ languages',
    ],
  },
  {
    name: 'Go City Official',
    tagline: 'Widest Coverage',
    href: 'https://gocity.com/paris',
    color: 'bg-gray-700',
    features: [
      'Official seller of the Go City Paris Pass',
      '2 to 6 day options with transport bundled',
      'Optional Eiffel Tower summit upgrade',
      'All-in-one mobile wallet for 90+ attractions',
    ],
  },
  {
    name: 'Klook',
    tagline: 'Popular With Asian Travelers',
    href: siteConfig.affiliateLinks.klook,
    color: 'bg-orange-500',
    features: [
      'Instant mobile confirmation with QR code',
      'Frequent promo codes and flash sales',
      'Customer support friendly to Asian travelers',
      'Multi-language vouchers and receipts',
    ],
  },
];

interface BreakEven {
  title: string;
  verdict: string;
  math: string[];
  outcome: string;
  color: string;
}

const breakEvenMath: BreakEven[] = [
  {
    title: 'Museum-heavy 2-day trip',
    verdict: 'Pass wins',
    math: [
      'Louvre €22',
      'Musee d\'Orsay €16',
      'Sainte-Chapelle €14',
      'Orangerie €12.50',
      'Arc de Triomphe €16',
      'Pay-as-you-go total: ~€76',
      'Paris Museum Pass 2-day: €65 / ~$70',
    ],
    outcome: 'Save about €11 plus priority entry at the Louvre and Orsay. Worth it.',
    color: 'border-green-500',
  },
  {
    title: 'All-in tourist 3-day trip',
    verdict: 'Break-even',
    math: [
      'Museum Pass 4-day: €80',
      'Metro weekly (Navigo): €30.75',
      'Eiffel Tower summit: €35',
      'Seine cruise: €18',
      'Pay-as-you-go bundle: ~€163.75',
      'Paris City Pass 3-day €129 / ~$140 + Eiffel summit €35 = ~€164',
    ],
    outcome: 'Basically identical price. Buy the Paris City Pass for the convenience of one QR code and skip-some-lines perks.',
    color: 'border-yellow-500',
  },
  {
    title: 'Chill 4-day trip, 2 to 3 sights per day',
    verdict: 'Skip the pass',
    math: [
      '4 museums at ~€22 each: €88',
      'Sainte-Chapelle: €14',
      'Seine cruise: €18',
      'Navigo weekly: €30.75',
      'Pay-as-you-go total: ~€150',
      'Paris Pass 4-day: €194',
    ],
    outcome: 'You would lose ~€44 on the Paris Pass. Book individual tickets and enjoy a slower pace.',
    color: 'border-red-500',
  },
];

const whichOneForYou = [
  {
    emoji: '🗼',
    persona: 'First-time 3-day Paris',
    pick: 'Paris Museum Pass 4-day + Navigo weekly',
    reason: 'Cheapest way to hit the classics (Louvre, Orsay, Arc, Sainte-Chapelle, Versailles) with unlimited Metro. Buy Eiffel Tower tickets separately from the official site.',
  },
  {
    emoji: '👨‍👩‍👧',
    persona: 'Family with kids, 4+ days',
    pick: 'Paris City Pass 4-day (Go City)',
    reason: 'Hop-on-hop-off bus saves tired legs, Seine cruise is kid-friendly, kids under 18 enter national museums free anyway so adult-only passes are enough.',
  },
  {
    emoji: '🎒',
    persona: 'Budget solo backpacker',
    pick: 'No pass. Individual Sainte-Chapelle + Orsay only.',
    reason: 'Most Paris highlights (Notre-Dame exterior, Montmartre, Luxembourg Gardens, Marais, Seine walks) are free. A pass rarely pays off under 3 paid sites.',
  },
  {
    emoji: '🖼️',
    persona: 'Museum lovers, 5+ days',
    pick: 'Paris Museum Pass 6-day + Navigo weekly',
    reason: 'At €100 / ~$108 for 6 days you unlock 50+ sites. Add €30.75 Navigo and you have unlimited transport. Absurdly good value for culture-focused trips.',
  },
];

const commonMistakes = [
  'Activating your pass on Day 1 then staying in your hotel half of Day 2. The clock runs whether you use it or not. Do not activate until you walk out the door on your first real sightseeing day.',
  'Buying the Paris Pass assuming the Eiffel Tower is included. The summit is not included in any major pass. Budget €35 extra for the summit ticket from the official site.',
  'Skipping museum pre-reservation. Even with a pass, sites like the Louvre and Sainte-Chapelle require a free timed-entry slot booked separately. Pass + reservation are both mandatory.',
  'Not checking closure days. The Louvre closes Tuesdays, the Musee d\'Orsay closes Mondays, Versailles closes Mondays. Burning a pass day on a closed museum hurts.',
  'Buying a Costco or third-party Paris Pass without verifying the validity dates. Many discount passes have hidden expiration windows and cannot be rebooked.',
  'Picking a 6-day pass for a 4-day trip because the per-day price looks cheaper. You pay for days you never use.',
];

const faqItems = [
  {
    q: 'Is the Paris Museum Pass worth it in 2026?',
    a: 'For most 2 to 6 day museum-focused trips, yes. You break even at roughly 3 to 4 paid sites. At €65 for 2 days and €100 for 6 days it pays for itself quickly if you visit the Louvre, Orsay, Sainte-Chapelle, Arc de Triomphe or Versailles. It does not include the Eiffel Tower, transport, or a Seine cruise.',
  },
  {
    q: 'What\'s the difference between the Paris Museum Pass and the Paris City Pass?',
    a: 'The Paris Museum Pass covers 50+ museums and monuments only. The Paris City Pass (Go City) includes the Museum Pass, adds public transport, a hop-on-hop-off bus, a Seine cruise and an optional Eiffel Tower upgrade. The City Pass costs more but bundles everything.',
  },
  {
    q: 'Does the Paris Pass include the Eiffel Tower?',
    a: 'No major pass includes the Eiffel Tower summit. The Paris City Pass offers it as a paid upgrade, the Paris Pass and Museum Pass do not cover it. Book the summit separately on the official Eiffel Tower website to avoid third-party markups.',
  },
  {
    q: 'Can I buy a Paris City Pass at Costco?',
    a: 'Costco and other warehouse resellers occasionally list Paris Pass bundles. They are usually legitimate but have rigid activation windows and cannot be rebooked. Buying direct from Go City, GetYourGuide or the Paris Museum Pass official site gives you better cancellation terms.',
  },
  {
    q: 'How far in advance should I buy my Paris pass?',
    a: 'You can buy most Paris passes 1 to 7 days before travel with no price difference. However, you should reserve mandatory timed-entry slots for the Louvre and Sainte-Chapelle as soon as you have the pass, because slots for popular days book out 2 to 4 weeks in advance in peak season.',
  },
  {
    q: 'Is the Paris Museum Pass valid for Versailles?',
    a: 'Yes. The Paris Museum Pass covers entry to the Palace of Versailles including the state apartments and the Hall of Mirrors. It does not cover the Musical Fountains Show, the Musical Gardens, nor special exhibitions. The train to Versailles is also not included in the Museum Pass.',
  },
  {
    q: 'Do I still need metro tickets with a Paris City Pass?',
    a: 'No. The Paris City Pass (Go City) and The Paris Pass (as an add-on Travelcard) both include unlimited Metro, bus and RER zones 1-3 for the duration of the pass. The Paris Museum Pass by itself does NOT include transport, so with that one you still need a Navigo weekly or t+ tickets.',
  },
  {
    q: 'What\'s the best pass for a 3-day Paris trip?',
    a: 'For most 3-day first-timers, the Paris Museum Pass 4-day (€80) plus a Navigo weekly (€30.75) is the best value at about €110 total. If you prefer one-QR-code convenience and the hop-on-hop-off bus, the Paris City Pass 3-day (€129) is almost the same price and includes a Seine cruise.',
  },
];

const canonicalUrl = `${siteConfig.seo.siteUrl}/paris-city-pass/`;

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Paris City Pass 2026: Museum Pass vs City Pass vs Paris Pass Compared',
  description:
    'Which Paris pass is actually worth it in 2026? Real break-even math for the Paris Museum Pass, Go City Paris, and Paris Pass, plus when to skip all of them.',
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
  mainEntity: faqItems.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
};

export default function ParisCityPassPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Paris City Pass', href: '/paris-city-pass/' },
  ];

  return (
    <>
      <SEOHead
        title="Paris City Pass 2026: Museum Pass vs City Pass vs Paris Pass Compared | Go2France"
        description="Which Paris pass is actually worth it in 2026? Real break-even math for the Paris Museum Pass, Go City Paris, and Paris Pass, plus when to skip all of them."
      >
        <meta
          name="keywords"
          content="Paris city pass, Paris museum pass, Go City Paris, Paris Pass 2026, Paris pass worth it, Paris museum pass vs city pass, best Paris pass"
        />
        <link rel="canonical" href={canonicalUrl} />
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
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <p className="font-script text-france-gold mb-2">Save On Paris Sights</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                Paris City Pass 2026: Which One Is Actually Worth It?
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                We compared the Museum Pass, the Go City Paris Pass and The Paris Pass with real 2026 prices and break-even math so you can pick the right one (or skip them entirely).
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Museum Pass</div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">City Pass</div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Paris Pass</div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">Compared</div>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs + affiliate disclaimer */}
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

        {/* Why buy a pass at all */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Why Buy a Paris Pass At All?</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-4">
              {whyPassCards.map((card) => (
                <div key={card.title} className="text-center">
                  <div className="text-4xl mb-4">{card.emoji}</div>
                  <h3 className="font-semibold font-heading mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm">{card.body}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 max-w-3xl mx-auto">
              A Paris pass is not a universal win. If you are only visiting 1 or 2 paid attractions, you almost always save money by booking individually. Read the math below before you buy.
            </p>
          </div>
        </section>

        {/* 4 main passes compared */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-2">The 4 Main Paris Passes Compared</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              2026 retail prices, what each pass covers, and the traveler type it suits best.
            </p>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-surface-dark text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-heading">Pass</th>
                      <th className="px-4 py-3 text-left font-heading">2026 Pricing</th>
                      <th className="px-4 py-3 text-left font-heading">What It Covers</th>
                      <th className="px-4 py-3 text-left font-heading">Not Included</th>
                      <th className="px-4 py-3 text-left font-heading">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {passComparison.map((row, i) => (
                      <tr key={row.name} className={i % 2 === 0 ? 'bg-white' : 'bg-surface-cream'}>
                        <td className="px-4 py-3 font-semibold align-top">{row.name}</td>
                        <td className="px-4 py-3 align-top">{row.pricing}</td>
                        <td className="px-4 py-3 align-top text-gray-700">{row.covers}</td>
                        <td className="px-4 py-3 align-top text-gray-700">{row.notIncluded}</td>
                        <td className="px-4 py-3 align-top text-gray-700">{row.bestFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Prices reflect official 2026 retail. Promo codes and flash sales on GetYourGuide and Klook can shave 5 to 15% off.
            </p>
          </div>
        </section>

        {/* Break-even math 3 scenarios */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-2">Break-Even Math: 3 Real Scenarios</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Plug your trip into the closest profile below and see if a pass actually pays off.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {breakEvenMath.map((s) => (
                <div key={s.title} className={`bg-white rounded-2xl shadow-md border-t-4 ${s.color} p-6`}>
                  <div className="text-xs uppercase tracking-wide font-semibold text-gray-500 mb-2">{s.verdict}</div>
                  <h3 className="font-heading font-bold text-xl mb-3">{s.title}</h3>
                  <ul className="text-sm text-gray-700 space-y-1 mb-4">
                    {s.math.map((line, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-france-blue mr-2">&#8226;</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium text-gray-900 bg-surface-cream rounded-xl p-3">{s.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Which pass for you */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Which Pass Is Right For You?</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {whichOneForYou.map((p) => (
                <div key={p.persona} className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{p.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-lg mb-1">{p.persona}</h3>
                      <p className="text-france-blue font-semibold text-sm mb-2">Pick: {p.pick}</p>
                      <p className="text-gray-700 text-sm">{p.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Where to book */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-2">Where To Book Your Paris Pass</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Three trusted platforms that sell legitimate Paris passes with instant mobile delivery.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {providers.map((p) => (
                <div key={p.name} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                  <div className={`${p.color} text-white p-6`}>
                    <h3 className="text-2xl font-bold font-heading mb-1">{p.name}</h3>
                    <p className="text-sm opacity-90">{p.tagline}</p>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <ul className="text-sm space-y-2 mb-6 flex-1">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-2">&#10003;</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className={`block w-full ${p.color} text-white text-center py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity`}
                    >
                      Check Paris Pass on {p.name} &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What is NOT included */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">What Is NOT Included In Any Paris Pass</h2>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
              <ol className="list-decimal list-inside space-y-3 text-gray-800">
                <li>
                  <span className="font-semibold">Eiffel Tower summit.</span> No major pass covers the summit level. Budget €35 and book direct on the official Eiffel Tower site.
                </li>
                <li>
                  <span className="font-semibold">Notre-Dame tower climb.</span> The cathedral exterior is free but the tower access ticket is separate and tightly limited.
                </li>
                <li>
                  <span className="font-semibold">Disneyland Paris.</span> Never included in any standard Paris pass. Book 1-day or Park Hopper tickets directly.
                </li>
                <li>
                  <span className="font-semibold">Some temporary exhibitions.</span> The Louvre, Orsay and Centre Pompidou host paid blockbusters that require an extra surcharge even with a pass.
                </li>
                <li>
                  <span className="font-semibold">Some guided tours.</span> Hosted group tours of the Catacombs, Opera Garnier VIP access and evening wine tastings are usually extra.
                </li>
                <li>
                  <span className="font-semibold">Airport transfers.</span> RoissyBus, Orlyval and taxis to CDG or ORY are never bundled. Plan those separately.
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Activation tips & gotchas */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Activation Tips &amp; Common Mistakes</h2>
            <div className="max-w-3xl mx-auto bg-orange-50 border border-orange-200 rounded-2xl p-6">
              <ol className="list-decimal list-inside space-y-3 text-orange-900">
                {commonMistakes.map((m, i) => (
                  <li key={i} className="leading-relaxed">{m}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Reservations still required */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-2">Reservations Are Still Required, Even With a Pass</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              This is the single biggest source of confusion for Paris pass holders. Many top sites now require a free timed-entry slot on top of your pass.
            </p>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
                <h3 className="font-semibold font-heading mb-2">Louvre Museum</h3>
                <p className="text-gray-700">Mandatory free timed-entry slot. Book on the official louvre.fr site after you receive your pass. Slots in peak season disappear 3 to 4 weeks out.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
                <h3 className="font-semibold font-heading mb-2">Sainte-Chapelle</h3>
                <p className="text-gray-700">Same setup as the Louvre. Free online reservation required on top of your Museum Pass or City Pass. Morning slots go first.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
                <h3 className="font-semibold font-heading mb-2">Palace of Versailles</h3>
                <p className="text-gray-700">Free timed-entry reservation required for the Palace, book via chateauversailles.fr. Closed on Mondays. The train (RER C) is not included in any pass.</p>
              </div>
            </div>
          </div>
        </section>

        {/* When to skip entirely */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">When To Skip the Pass Entirely</h2>
            <div className="max-w-3xl mx-auto text-center text-gray-700 space-y-3">
              <p>
                If your trip is 1 to 2 days and you only plan to visit 1 or 2 paid attractions, skip every pass. Buy individual tickets on GetYourGuide or direct, use a Navigo Easy with daily t+ tickets, and enjoy Paris the slow way.
              </p>
              <p>
                You will also skip the pass if you are traveling with kids under 18: most national museums (Louvre, Orsay, Versailles) are already free for minors, so only the adults need any ticket at all.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Paris Pass FAQ</h2>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqItems.map((f, i) => (
                <details key={i} className="bg-white rounded-2xl shadow-md p-6 group">
                  <summary className="font-semibold font-heading cursor-pointer list-none flex justify-between items-center">
                    <span>{f.q}</span>
                    <span className="text-france-blue ml-4 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                  </summary>
                  <p className="text-gray-700 mt-3 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-links 2 cards */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Related Paris Pillars</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Link
                href="/eiffel-tower-tickets/"
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all block"
              >
                <div className="text-4xl mb-3">🗼</div>
                <h3 className="font-heading font-bold text-xl mb-2">Eiffel Tower Tickets</h3>
                <p className="text-gray-600 text-sm">
                  The summit is not included in any Paris pass. See 2026 ticket options, summit vs second floor pricing and how to avoid scalpers.
                </p>
              </Link>
              <Link
                href="/seine-river-cruise/"
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all block"
              >
                <div className="text-4xl mb-3">⛵</div>
                <h3 className="font-heading font-bold text-xl mb-2">Seine River Cruise Guide</h3>
                <p className="text-gray-600 text-sm">
                  Bateaux Mouches vs Vedettes du Pont Neuf vs Bateaux Parisiens. Day, sunset and dinner options compared.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Related reading 4 cards */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Related Paris Reading</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Plan the rest of your Paris trip with these in-depth guides.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/blog/paris-in-3-days-itinerary/"
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all block border border-gray-100"
              >
                <div className="text-3xl mb-3">🗓️</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Paris in 3 Days Itinerary</h3>
                <p className="text-gray-600 text-sm">Day-by-day plan with Metro stops, reservation timings and dinner picks.</p>
              </Link>
              <Link
                href="/blog/paris-first-time-guide/"
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all block border border-gray-100"
              >
                <div className="text-3xl mb-3">🧳</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Paris First-Time Guide</h3>
                <p className="text-gray-600 text-sm">Everything rookie visitors wish they knew before landing at CDG.</p>
              </Link>
              <Link
                href="/blog/paris-museums-guide/"
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all block border border-gray-100"
              >
                <div className="text-3xl mb-3">🖼️</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Paris Museums Guide</h3>
                <p className="text-gray-600 text-sm">Louvre, Orsay, Orangerie, Pompidou and hidden gems ranked by wait time.</p>
              </Link>
              <Link
                href="/blog/is-paris-expensive-2026/"
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all block border border-gray-100"
              >
                <div className="text-3xl mb-3">💶</div>
                <h3 className="font-semibold font-heading text-gray-900 mb-2">Is Paris Expensive in 2026?</h3>
                <p className="text-gray-600 text-sm">Real daily budgets for backpacker, mid-range and luxury travelers.</p>
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
