import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface TranslatedContent {
  [key: string]: any;
}

export function useTranslatedContent(contentType: string, slug?: string) {
  const router = useRouter();
  const { locale = 'en' } = router;
  const [content, setContent] = useState<TranslatedContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      setError(null);

      try {
        let data;
        switch (contentType) {
          case 'city':
            data = await import(`../data/cities/${slug}.json`);
            break;
          case 'food':
            data = await import(`../data/food/${slug}.json`);
            break;
          case 'drink':
            data = await import(`../data/drinks/${slug}.json`);
            break;
          case 'region':
            data = await import(`../data/regions/${slug}.json`);
            break;
          default:
            throw new Error(`Unknown content type: ${contentType}`);
        }

        const rawData = data.default || data;
        const processed = extractLocale(rawData, locale);
        setContent(processed);
      } catch (err) {
        console.error('Error loading content:', err);
        setError(err instanceof Error ? err.message : 'Failed to load content');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadContent();
    }
  }, [contentType, slug, locale]);

  return { content, loading, error, locale };
}

function extractLocale(obj: any, locale: string): any {
  if (!obj || typeof obj !== 'object') return obj;

  if (obj[locale] !== undefined && (typeof obj[locale] === 'string' || typeof obj[locale] === 'number')) {
    return obj[locale];
  }
  if (obj.en !== undefined && typeof obj.en === 'string' && !obj.slug) {
    return obj[locale] || obj.en;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => extractLocale(item, locale));
  }

  const result: any = {};
  for (const key of Object.keys(obj)) {
    result[key] = extractLocale(obj[key], locale);
  }
  return result;
}
