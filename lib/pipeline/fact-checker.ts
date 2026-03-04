// -------------------------------------------------------------------
// Fact-checker -- regex-based claim extraction + cross-reference
// against scraped source data. No AI calls, pure string matching.
// -------------------------------------------------------------------

export interface FactClaim {
  type: "date" | "price" | "statistic" | "time";
  value: string;
  context: string; // surrounding ~60 chars
}

export interface FactCheckResult {
  totalClaims: number;
  verifiedClaims: number;
  unverifiedClaims: FactClaim[];
  riskLevel: "low" | "medium" | "high";
}

// -------------------------------------------------------------------
// Claim extraction patterns
// -------------------------------------------------------------------

const DATE_PATTERNS = [
  /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:\s*\((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\))?(?:,?\s*\d{4})?\b/gi,
  /\b20\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])\b/g,
  /\b\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+20\d{2}\b/gi,
];

const PRICE_PATTERNS = [
  // EUR prices: "10 EUR", "500 EUR", "1,500 euros"
  /\b[\d,]+\s*(?:EUR|euros?)\b/gi,
  // Euro symbol: "50", "120"
  /€[\d,]+(?:\.\d{2})?\b/g,
  // USD: "$85 USD", "$50"
  /\$[\d,]+(?:\s*USD)?\b/g,
  // Ranges: "300-500 EUR", "50-120 EUR"
  /\b[\d,]+\s*[–\-]\s*[\d,]+\s*(?:EUR|euros?)\b/gi,
  // Euro ranges: "€30-€50"
  /€[\d,]+\s*[–\-]\s*€[\d,]+/g,
];

const STATISTIC_PATTERNS = [
  /\b[\d,]+\+?\s*(?:Mbps|visitors|people|tourists|travelers|km|kilometers|metres|meters|hectares|chateaux|churches|cathedrals|vineyards|museums|rooms|beds|seats|stalls|shops|restaurants|bars|cafes)\b/gi,
  /\b\d+(?:\.\d+)?%/g,
  /\b\d+(?:\.\d+)?\s*percent\b/gi,
  /\b\d+(?:\.\d+)?\s*(?:million|billion)\b/gi,
];

const TIME_PATTERNS = [
  /\b\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm|a\.m\.|p\.m\.)\b/g,
  /\b\d{1,2}h\d{2}\b/g, // French 24-hour format: 14h30
  /\b(?:open|opens|closes|closing|ouvert|ferme)\s+(?:at\s+)?\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)?[^.]*?(?:\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm))?\b/gi,
];

// -------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------

function extractContext(content: string, match: string, index: number): string {
  const start = Math.max(0, index - 30);
  const end = Math.min(content.length, index + match.length + 30);
  return content.slice(start, end).replace(/\n/g, " ").trim();
}

function normalizeForComparison(text: string): string {
  return text
    .toLowerCase()
    .replace(/[,\s]+/g, " ")
    .replace(/[–—-]/g, "-")
    .replace(/\$/g, "")
    .replace(/€/g, "")
    .trim();
}

function stripFrontmatter(content: string): string {
  const fmMatch = content.match(/^---\s*\n[\s\S]*?\n---\s*\n/);
  return fmMatch ? content.slice(fmMatch[0].length) : content;
}

function isInScrapeData(claimValue: string, scrapeData: string): boolean {
  const normalizedClaim = normalizeForComparison(claimValue);
  const normalizedScrape = normalizeForComparison(scrapeData);

  // Exact match
  if (normalizedScrape.includes(normalizedClaim)) return true;

  // For dates: also check without day-of-week parenthetical
  const withoutDay = normalizedClaim.replace(/\s*\((?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)\)/i, "");
  if (withoutDay !== normalizedClaim && normalizedScrape.includes(withoutDay)) return true;

  // For prices: extract just the number and check if it appears near currency in scrape data
  const numMatch = claimValue.match(/[\d,]+/);
  if (numMatch) {
    const num = numMatch[0].replace(/,/g, "");
    const numPattern = new RegExp(
      `(?:EUR|euros?|€|\\$).{0,10}${num}|${num}.{0,10}(?:EUR|euros?|€|\\$)`,
      "i"
    );
    if (numPattern.test(scrapeData)) return true;
  }

  return false;
}

// -------------------------------------------------------------------
// Main export
// -------------------------------------------------------------------

export function factCheckPost(
  content: string,
  scrapeData: string | null
): FactCheckResult {
  const body = stripFrontmatter(content);
  const allClaims: FactClaim[] = [];
  const seen = new Set<string>();

  const patternGroups: Array<{ type: FactClaim["type"]; patterns: RegExp[] }> = [
    { type: "date", patterns: DATE_PATTERNS },
    { type: "price", patterns: PRICE_PATTERNS },
    { type: "statistic", patterns: STATISTIC_PATTERNS },
    { type: "time", patterns: TIME_PATTERNS },
  ];

  for (const { type, patterns } of patternGroups) {
    for (const pattern of patterns) {
      pattern.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = pattern.exec(body)) !== null) {
        const value = match[0].trim();
        if (!seen.has(value)) {
          seen.add(value);
          allClaims.push({
            type,
            value,
            context: extractContext(body, value, match.index),
          });
        }
      }
    }
  }

  // Cross-reference against scrape data
  let verified = 0;
  const unverified: FactClaim[] = [];

  for (const claim of allClaims) {
    if (scrapeData && isInScrapeData(claim.value, scrapeData)) {
      verified++;
    } else {
      unverified.push(claim);
    }
  }

  // Risk level
  const unverifiedCount = unverified.length;
  let riskLevel: FactCheckResult["riskLevel"];
  if (unverifiedCount <= 2) riskLevel = "low";
  else if (unverifiedCount <= 5) riskLevel = "medium";
  else riskLevel = "high";

  return {
    totalClaims: allClaims.length,
    verifiedClaims: verified,
    unverifiedClaims: unverified,
    riskLevel,
  };
}
