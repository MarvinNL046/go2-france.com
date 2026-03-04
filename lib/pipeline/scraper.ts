const JINA_API_KEY = process.env.JINA_API_KEY;
const JINA_READER_URL = "https://r.jina.ai";
const JINA_SEARCH_URL = "https://s.jina.ai";

const BRIGHT_DATA_API_KEY = process.env.BRIGHT_DATA_API_KEY;
const BRIGHT_DATA_ZONE = process.env.BRIGHT_DATA_ZONE || "web_unlocker1";

const FETCH_TIMEOUT_MS = 15_000; // 15 seconds per fetch call

function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = FETCH_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
}

export interface ScrapedContent {
  url: string;
  content: string;
  title?: string;
}

export interface ScrapedArticle {
  title: string;
  summary: string;
  source: string;
  url: string;
  date?: string;
}

// France travel news sources
const TRAVEL_NEWS_SOURCES = [
  "https://www.france.fr/en",
  "https://www.lonelyplanet.com/france",
  "https://www.thelocal.fr/",
  "https://www.france24.com/en/france/",
  "https://www.connexionfrance.com/",
];

// Primary info source for France
const FRANCE_BLOG_URL = "https://www.france.fr/en";

// Bright Data fallback
async function scrapeWithBrightData(url: string): Promise<string> {
  if (!BRIGHT_DATA_API_KEY) {
    throw new Error("BRIGHT_DATA_API_KEY is not configured");
  }

  const response = await fetchWithTimeout("https://api.brightdata.com/request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BRIGHT_DATA_API_KEY}`,
    },
    body: JSON.stringify({
      zone: BRIGHT_DATA_ZONE,
      url,
      format: "raw",
    }),
  });

  if (!response.ok) {
    throw new Error(`Bright Data scrape failed for ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

// Direct fetch fallback
async function directFetch(url: string): Promise<string> {
  const response = await fetchWithTimeout(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; Go2FranceBot/1.0; +https://go2-france.com)",
    },
  });
  if (!response.ok) {
    throw new Error(`Direct fetch failed for ${url}: ${response.status}`);
  }
  const html = await response.text();
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return text.slice(0, 8000);
}

// Fetch a URL via Jina.ai Reader API (returns clean Markdown)
export async function scrapeUrl(url: string): Promise<string> {
  // Try Jina first
  try {
    const headers: Record<string, string> = {
      Accept: "text/markdown",
      "X-Return-Format": "markdown",
    };

    if (JINA_API_KEY && JINA_API_KEY !== "your_jina_api_key_here") {
      headers["Authorization"] = `Bearer ${JINA_API_KEY}`;
    }

    const response = await fetchWithTimeout(`${JINA_READER_URL}/${url}`, {
      method: "GET",
      headers,
    });

    if (response.ok) {
      const content = await response.text();
      if (content && content.length >= 100) {
        return content;
      }
    }
    console.warn(`[scraper] Jina failed for ${url}, trying Bright Data...`);
  } catch (e) {
    console.warn(`[scraper] Jina error for ${url}:`, e);
  }

  // Fallback: Bright Data
  try {
    const content = await scrapeWithBrightData(url);
    if (content && content.length >= 100) {
      return content;
    }
    console.warn(`[scraper] Bright Data returned insufficient content for ${url}, trying direct fetch...`);
  } catch (e) {
    console.warn(`[scraper] Bright Data error for ${url}:`, e);
  }

  // Last resort: direct fetch
  return directFetch(url);
}

// Scrape France-related travel news from multiple sources
export async function scrapeTravelNews(): Promise<ScrapedArticle[]> {
  const settled = await Promise.allSettled(
    TRAVEL_NEWS_SOURCES.map(async (sourceUrl) => {
      const content = await scrapeUrl(sourceUrl);
      const hostname = new URL(sourceUrl).hostname;
      return {
        title: `France Travel News from ${hostname}`,
        summary: content.slice(0, 2000),
        source: hostname,
        url: sourceUrl,
        date: new Date().toISOString(),
      };
    })
  );

  const results: ScrapedArticle[] = [];
  for (const r of settled) {
    if (r.status === "fulfilled") {
      results.push(r.value);
    } else {
      console.warn("Travel news scrape failed:", r.reason);
    }
  }

  return results;
}

// Scrape France official tourism site for latest info
export async function scrapeFranceBlog(): Promise<ScrapedContent> {
  const content = await scrapeUrl(FRANCE_BLOG_URL);

  const titleMatch = content.match(/^#\s+(.+)/m);
  const title = titleMatch?.[1] || "France.fr -- Latest Travel Info";

  return {
    url: FRANCE_BLOG_URL,
    content: content.slice(0, 6000),
    title,
  };
}

// Search for a specific topic using Jina Search API
export async function searchTopic(
  query: string
): Promise<Array<{ title: string; summary: string; url: string }>> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (JINA_API_KEY) {
    headers["Authorization"] = `Bearer ${JINA_API_KEY}`;
  }

  const encodedQuery = encodeURIComponent(query);
  const response = await fetchWithTimeout(`${JINA_SEARCH_URL}/${encodedQuery}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    console.warn(`[scraper] Jina search failed for "${query}": ${response.status}`);
    return [];
  }

  const data = await response.json();
  const items: Array<{ title: string; summary: string; url: string }> = [];

  const results = data.data || data.results || [];
  for (const item of results.slice(0, 6)) {
    items.push({
      title: item.title || "Untitled",
      summary: (item.description || item.content || "").slice(0, 400),
      url: item.url || "",
    });
  }

  return items;
}

// Scrape specific priority URLs
export async function scrapeSpecificUrls(urls: string[]): Promise<string> {
  const settled = await Promise.allSettled(
    urls.map(async (url) => {
      const content = await scrapeUrl(url);
      const hostname = new URL(url).hostname;
      return `## Source: ${hostname}\nURL: ${url}\n\n${content.slice(0, 3000)}`;
    })
  );

  const parts: string[] = [];
  for (const r of settled) {
    if (r.status === "fulfilled") {
      parts.push(r.value);
    }
  }
  return parts.join("\n\n---\n\n");
}

// Scrape context for a France travel topic
export async function scrapeTopicContext(topic: string, priorityUrls?: string[]): Promise<string> {
  const year = new Date().getFullYear();
  const parts: string[] = [];

  const priorityUrlsPromise = priorityUrls && priorityUrls.length > 0
    ? scrapeSpecificUrls(priorityUrls)
    : Promise.resolve(null);

  const [searchResults, detailedSearch, blogContent, newsContent, priorityData] = await Promise.allSettled([
    searchTopic(`${topic} France ${year} travel guide`),
    searchTopic(`${topic} France prices tips ${year}`),
    scrapeFranceBlog(),
    scrapeTravelNews().then((articles) => articles.slice(0, 3)),
    priorityUrlsPromise,
  ]);

  if (priorityData.status === "fulfilled" && priorityData.value) {
    parts.unshift(`PRIORITY REFERENCE DATA (from authoritative sources):\n${priorityData.value}`);
  } else if (priorityData.status === "rejected") {
    console.warn("[scraper] Priority URL scrape failed:", priorityData.reason);
  }

  if (searchResults.status === "fulfilled" && searchResults.value.length > 0) {
    const searchText = searchResults.value
      .map((r) => `## ${r.title}\n${r.summary}\nSource: ${r.url}`)
      .join("\n\n");
    parts.push(`SEARCH RESULTS (primary):\n${searchText}`);
  } else if (searchResults.status === "rejected") {
    console.warn("[scraper] Primary topic search failed:", searchResults.reason);
  }

  if (detailedSearch.status === "fulfilled" && detailedSearch.value.length > 0) {
    const detailedText = detailedSearch.value
      .map((r) => `## ${r.title}\n${r.summary}\nSource: ${r.url}`)
      .join("\n\n");
    parts.push(`SEARCH RESULTS (prices & details):\n${detailedText}`);
  }

  if (blogContent.status === "fulfilled") {
    parts.push(
      `FRANCE.FR (Official Tourism) -- Editorial source:\n${blogContent.value.content}`
    );
  } else {
    console.warn("[scraper] France blog scrape failed:", blogContent.reason);
  }

  if (newsContent.status === "fulfilled" && newsContent.value.length > 0) {
    const newsText = newsContent.value
      .map((a) => `- ${a.title} (${a.source}): ${a.summary.slice(0, 300)}`)
      .join("\n");
    parts.push(`RECENT FRANCE NEWS:\n${newsText}`);
  }

  const combined = parts.join("\n\n---\n\n");
  console.log(`[scraper] Total context gathered: ${combined.length} chars from ${parts.length} sources`);
  return combined;
}
