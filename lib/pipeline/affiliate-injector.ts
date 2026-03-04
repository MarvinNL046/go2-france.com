// -------------------------------------------------------------------
// Affiliate link injection for go2-france.com blog posts
// -------------------------------------------------------------------
// Partners and their tracking URLs:
//   Booking.com   -> https://booking.tpo.lv/2PT1kR82
//   Klook         -> https://klook.tpo.lv/7Dt6WApj
//   GetYourGuide  -> https://getyourguide.tpo.lv/6HngJ5FC
//   12Go          -> https://12go.tpo.lv/tNA80urD
//   Saily eSIM    -> https://saily.tpo.lv/rf9lidnE
//   Trip.com      -> https://trip.tpo.lv/TmObooZ5
//   Viator        -> https://viator.tpo.lv/TUcQTS5u
//   NordVPN       -> https://nordvpn.tpo.lv/ekHF1i55
//   NordPass      -> https://nordvpn.tpo.lv/tp12zNjC
// -------------------------------------------------------------------

export const AFFILIATE_LINKS = {
  booking: "https://booking.tpo.lv/2PT1kR82",
  klook: "https://klook.tpo.lv/7Dt6WApj",
  getyourguide: "https://getyourguide.tpo.lv/6HngJ5FC",
  "12go": "https://12go.tpo.lv/tNA80urD",
  saily: "https://saily.tpo.lv/rf9lidnE",
  trip: "https://trip.tpo.lv/TmObooZ5",
  viator: "https://viator.tpo.lv/TUcQTS5u",
  nordvpn: "https://nordvpn.tpo.lv/ekHF1i55",
  nordpass: "https://nordvpn.tpo.lv/tp12zNjC",
} as const;

export type AffiliatePartner = keyof typeof AFFILIATE_LINKS;

// Specific deep links
export const SPECIFIC_AFFILIATE_LINKS = {
  "booking-deals": "https://booking.tpo.lv/pDNjHJA1",
  "booking-flights": "https://booking.tpo.lv/LUkugxWF",
  "booking-car-rental": "https://booking.tpo.lv/Nmm5XgwI",
  "trip-trains": "https://trip.tpo.lv/gNIdNBmi",
  "trip-bundles": "https://trip.tpo.lv/L83mcBdE",
  "trip-airport-transfers": "https://trip.tpo.lv/hY8hOUey",
  "trip-car-rental": "https://trip.tpo.lv/zGKhdcce",
} as const;

// -------------------------------------------------------------------
// Keyword -> affiliate mapping
// -------------------------------------------------------------------

interface AffiliateRule {
  pattern: RegExp;
  partner: AffiliatePartner;
  linkText: string;
  overrideUrl?: string;
}

const AFFILIATE_RULES: AffiliateRule[] = [
  // Specific deep-link rules first
  {
    pattern: /\b(car rental|rent a car|hire a car|rental car|location de voiture)\b/i,
    partner: "booking" as AffiliatePartner,
    linkText: "Rent a Car on Booking.com",
    overrideUrl: "https://booking.tpo.lv/Nmm5XgwI",
  },
  {
    pattern: /\b(airport transfer|airport shuttle|airport taxi|navette)\b/i,
    partner: "trip" as AffiliatePartner,
    linkText: "Book Airport Transfer",
    overrideUrl: "https://trip.tpo.lv/hY8hOUey",
  },
  {
    pattern: /\b(TGV|SNCF|train to|train from|Gare du Nord|Gare de Lyon|train route|railway)\b/i,
    partner: "trip" as AffiliatePartner,
    linkText: "Book Train on Trip.com",
    overrideUrl: "https://trip.tpo.lv/gNIdNBmi",
  },
  {
    pattern: /\b(hotel.*deal|travel deal|best deal|discount hotel|cheap hotel)\b/i,
    partner: "booking" as AffiliatePartner,
    linkText: "See Deals on Booking.com",
    overrideUrl: "https://booking.tpo.lv/pDNjHJA1",
  },
  // eSIM / SIM Card -> Saily
  {
    pattern: /\b(eSIM|e-SIM|SIM card|data SIM|travel SIM|mobile data|internet connection|stay connected)\b/i,
    partner: "saily",
    linkText: "Get Saily eSIM",
  },
  // Transport -> 12Go
  {
    pattern: /\b(bus ticket|bus ride|minivan|ferry|ferry ride|boat ticket|train ticket|book.*transport|book.*transfer)\b/i,
    partner: "12go",
    linkText: "Book on 12Go",
  },
  // Flights -> Trip.com
  {
    pattern: /\b(flight|flights|book.*flight|search.*flight|airline|cheap flight|domestic flight|fly to)\b/i,
    partner: "trip",
    linkText: "Search on Trip.com",
  },
  // Activities -> Klook
  {
    pattern: /\b(cooking class|wine tasting|day trip|cycling tour|ski pass|Klook|boat tour|river cruise|walking tour)\b/i,
    partner: "klook",
    linkText: "Book on Klook",
  },
  // Activities -> GetYourGuide
  {
    pattern: /\b(guided tour|food tour|group tour|tour operator|activities|excursion|experience|GetYourGuide|museum tour|art tour)\b/i,
    partner: "getyourguide",
    linkText: "Book on GetYourGuide",
  },
  // Hotels -> Booking.com
  {
    pattern: /\b(hotel|hotels|hostel|resort|guesthouse|guest house|villa|chateau|chambre d'hote|accommodation|where to stay|book.*stay|Booking\.com|place to stay|lodging)\b/i,
    partner: "booking",
    linkText: "Book on Booking.com",
  },
];

// -------------------------------------------------------------------
// CTA box templates
// -------------------------------------------------------------------

interface CtaBox {
  partner: AffiliatePartner;
  emoji: string;
  heading: string;
  body: string;
  cta: string;
  overrideUrl?: string;
}

const CTA_BOXES: CtaBox[] = [
  {
    partner: "booking",
    emoji: "🏨",
    heading: "Book Your Stay",
    body: "Compare hotels, boutique stays, and chateaux across France with free cancellation on most bookings.",
    cta: "Search Hotels on Booking.com",
  },
  {
    partner: "klook",
    emoji: "🎒",
    heading: "Book Tours & Activities",
    body: "Skip the hassle -- book France day trips, wine tastings, and experiences in advance with instant confirmation.",
    cta: "Browse Activities on Klook",
  },
  {
    partner: "12go",
    emoji: "🚌",
    heading: "Book Transport in France",
    body: "Book buses, trains, and transfers between French cities easily online. Compare routes and prices.",
    cta: "Book Transport on 12Go",
  },
  {
    partner: "saily",
    emoji: "📱",
    heading: "Stay Connected in France",
    body: "Get a France eSIM before you land. No physical SIM needed -- activate instantly on your phone.",
    cta: "Get Saily eSIM for France",
  },
  {
    partner: "getyourguide",
    emoji: "🗺️",
    heading: "Explore France with a Guide",
    body: "Discover the best guided tours and activities in Paris, Lyon, Provence and beyond.",
    cta: "Browse Tours on GetYourGuide",
  },
  {
    partner: "trip",
    emoji: "✈️",
    heading: "Find Flights to France",
    body: "Search and compare flights to Paris, Nice, Lyon and Marseille at the best prices.",
    cta: "Search Flights on Trip.com",
  },
  {
    partner: "viator",
    emoji: "🏛️",
    heading: "Popular Tours by Viator",
    body: "Browse top-rated France tours and experiences curated by Tripadvisor's Viator.",
    cta: "Explore Tours on Viator",
  },
  {
    partner: "nordvpn",
    emoji: "🔒",
    heading: "Stay Secure Online While Traveling",
    body: "Protect your connection on public WiFi in France. NordVPN keeps your data private wherever you are.",
    cta: "Get NordVPN",
  },
];

// -------------------------------------------------------------------
// Inline link injection
// -------------------------------------------------------------------

export function injectInlineLinks(content: string): string {
  const injected = new Set<AffiliatePartner>();
  const { frontmatter, body } = splitFrontmatter(content);

  let processedBody = body;

  for (const rule of AFFILIATE_RULES) {
    if (injected.has(rule.partner)) continue;

    const url = rule.overrideUrl || AFFILIATE_LINKS[rule.partner];
    const match = rule.pattern.exec(processedBody);
    if (!match) continue;

    const matchIndex = match.index;
    if (isInsideLink(processedBody, matchIndex)) continue;
    if (isInsideCodeBlock(processedBody, matchIndex)) continue;

    const originalText = match[0];
    const linkedText = `[${originalText}](${url})`;
    processedBody =
      processedBody.slice(0, matchIndex) +
      linkedText +
      processedBody.slice(matchIndex + originalText.length);

    injected.add(rule.partner);
  }

  return frontmatter + processedBody;
}

// -------------------------------------------------------------------
// CTA box injection
// -------------------------------------------------------------------

export function injectCtaBoxes(content: string, count: number = 3): string {
  const { frontmatter, body } = splitFrontmatter(content);
  const selectedBoxes = selectRelevantCtaBoxes(body, count);
  if (selectedBoxes.length === 0) return content;

  const h2Positions = findH2Positions(body);
  if (h2Positions.length < 2) {
    const ctaMarkdown = selectedBoxes.map(renderCtaBox).join("\n\n");
    return frontmatter + body.trimEnd() + "\n\n" + ctaMarkdown + "\n";
  }

  const insertPositions = pickInsertPositions(h2Positions, selectedBoxes.length);
  let processedBody = body;
  for (let i = insertPositions.length - 1; i >= 0; i--) {
    const pos = insertPositions[i];
    const box = renderCtaBox(selectedBoxes[i]);
    processedBody =
      processedBody.slice(0, pos) + "\n\n" + box + "\n\n" + processedBody.slice(pos);
  }

  return frontmatter + processedBody;
}

// -------------------------------------------------------------------
// Main entry point
// -------------------------------------------------------------------

export interface InjectionOptions {
  inlineLinks?: boolean;
  ctaBoxes?: boolean;
  ctaCount?: number;
  processWidgets?: boolean;
}

export function injectAffiliateLinks(
  content: string,
  options: InjectionOptions = {}
): string {
  const {
    inlineLinks = true,
    ctaBoxes = true,
    ctaCount = 2,
    processWidgets = true,
  } = options;

  let result = content;

  if (processWidgets) {
    result = processWidgetPlaceholders(result);
  }
  if (inlineLinks) {
    result = injectInlineLinks(result);
  }
  if (ctaBoxes) {
    result = injectCtaBoxes(result, ctaCount);
  }

  return result;
}

// -------------------------------------------------------------------
// Widget placeholder processing
// -------------------------------------------------------------------

export function processWidgetPlaceholders(content: string): string {
  const { frontmatter, body } = splitFrontmatter(content);
  let processedBody = body;

  // Normalize various widget formats
  processedBody = processedBody.replace(/^[-*]\s*WIDGET:(\w+)\s*$/gm, '<!-- WIDGET:$1 -->');
  processedBody = processedBody.replace(/^WIDGET:(\w+)\s*$/gm, '<!-- WIDGET:$1 -->');
  processedBody = processedBody.replace(/^[-*]\s*WIDGET:\[.*?\]\(.*?\)\s*$/gm, '');
  processedBody = processedBody.replace(/^[-*]\s*WIDGET:tip:(.+)$/gm, '<!-- WIDGET:tip:$1 -->');

  for (const box of CTA_BOXES) {
    const placeholder = `<!-- WIDGET:${box.partner} -->`;
    if (processedBody.includes(placeholder)) {
      const fallbackHtml = renderCtaBox(box);
      const widgetHtml = `<div data-widget="${box.partner}" style="margin:32px 0;">${fallbackHtml}</div>`;
      processedBody = processedBody.replace(placeholder, widgetHtml);
    }
  }

  // Tip widgets
  processedBody = processedBody.replace(
    /<!-- WIDGET:tip:(.+?) -->/g,
    (_, tipText) => {
      return `<div style="background:#FEF3C7;border-left:4px solid #F59E0B;border-radius:12px;padding:20px 24px;margin:32px 0;">
  <div style="display:flex;align-items:flex-start;gap:12px;">
    <span style="font-size:28px;line-height:1;">💡</span>
    <div style="flex:1;">
      <strong style="font-size:18px;color:#92400E;display:block;margin-bottom:6px;">Pro Tip</strong>
      <p style="color:#78350F;margin:0;font-size:15px;line-height:1.5;">${tipText}</p>
    </div>
  </div>
</div>`;
    }
  );

  return frontmatter + processedBody;
}

// -------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------

function renderCtaBox(box: CtaBox): string {
  const url = box.overrideUrl || AFFILIATE_LINKS[box.partner];

  const colors: Record<AffiliatePartner, { bg: string; border: string; btn: string }> = {
    booking: { bg: '#EFF6FF', border: '#3B82F6', btn: '#2563EB' },
    klook: { bg: '#F0FDF4', border: '#22C55E', btn: '#16A34A' },
    getyourguide: { bg: '#FFF7ED', border: '#F97316', btn: '#EA580C' },
    '12go': { bg: '#FFFBEB', border: '#F59E0B', btn: '#D97706' },
    saily: { bg: '#FAF5FF', border: '#A855F7', btn: '#9333EA' },
    trip: { bg: '#F0F9FF', border: '#0EA5E9', btn: '#0284C7' },
    viator: { bg: '#F0FDF4', border: '#059669', btn: '#047857' },
    nordvpn: { bg: '#EFF6FF', border: '#4338CA', btn: '#4338CA' },
    nordpass: { bg: '#FDF2F8', border: '#DB2777', btn: '#BE185D' },
  };

  const c = colors[box.partner];

  return `<div data-widget-fallback style="background:${c.bg};border-left:4px solid ${c.border};border-radius:12px;padding:20px 24px;margin:32px 0;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
  <div style="display:flex;align-items:flex-start;gap:16px;">
    <div style="flex:1;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <span style="font-size:28px;line-height:1;">${box.emoji}</span>
        <strong style="font-size:18px;color:#1F2937;">${box.heading}</strong>
      </div>
      <p style="color:#4B5563;margin:0 0 12px 0;font-size:15px;line-height:1.5;">${box.body}</p>
      <a href="${url}" target="_blank" rel="noopener noreferrer sponsored" style="display:inline-block;background:${c.btn};color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">${box.cta}</a>
    </div>
  </div>
</div>`;
}

function selectRelevantCtaBoxes(body: string, count: number): CtaBox[] {
  const lower = body.toLowerCase();
  const scored = CTA_BOXES.map((box) => {
    let score = 0;
    if (box.partner === "booking" && (lower.includes("hotel") || lower.includes("stay") || lower.includes("accommodation") || lower.includes("chateau"))) score += 3;
    if (box.partner === "klook" && (lower.includes("tour") || lower.includes("activity") || lower.includes("wine tasting") || lower.includes("cooking class"))) score += 3;
    if (box.partner === "12go" && (lower.includes("bus") || lower.includes("train") || lower.includes("tgv") || lower.includes("transport"))) score += 3;
    if (box.partner === "saily" && (lower.includes("esim") || lower.includes("sim") || lower.includes("data") || lower.includes("connected"))) score += 3;
    if (box.partner === "getyourguide" && (lower.includes("tour") || lower.includes("guide") || lower.includes("excursion"))) score += 2;
    if (box.partner === "trip" && (lower.includes("flight") || lower.includes("airport") || lower.includes("fly"))) score += 3;
    if (box.partner === "booking") score += 1;
    if (box.partner === "klook") score += 1;
    return { box, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.box);
}

function findH2Positions(body: string): number[] {
  const positions: number[] = [];
  const lines = body.split("\n");
  let charPos = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    charPos += line.length + 1;
    if (line.match(/^## /)) {
      let endPos = charPos;
      for (let j = i + 1; j < lines.length && j < i + 20; j++) {
        const nextLine = lines[j];
        endPos += nextLine.length + 1;
        if (nextLine.match(/^#{1,3} /) && j > i + 3) break;
      }
      positions.push(endPos);
    }
  }

  return positions;
}

function pickInsertPositions(positions: number[], count: number): number[] {
  if (positions.length <= count) return positions.slice(1);
  const step = Math.floor(positions.length / (count + 1));
  return Array.from({ length: count }, (_, i) => positions[(i + 1) * step]);
}

function isInsideLink(text: string, pos: number): boolean {
  const before = text.slice(Math.max(0, pos - 200), pos);
  const after = text.slice(pos, Math.min(text.length, pos + 200));
  const openBracket = before.lastIndexOf("[");
  const closeBracket = after.indexOf("](");
  return openBracket !== -1 && closeBracket !== -1 && openBracket > before.lastIndexOf("]");
}

function isInsideCodeBlock(text: string, pos: number): boolean {
  const before = text.slice(0, pos);
  const codeBlockCount = (before.match(/```/g) || []).length;
  return codeBlockCount % 2 === 1;
}

function splitFrontmatter(content: string): { frontmatter: string; body: string } {
  const match = content.match(/^(---[\s\S]*?---\n?)([\s\S]*)$/);
  if (match) {
    return { frontmatter: match[1], body: match[2] };
  }
  return { frontmatter: "", body: content };
}
