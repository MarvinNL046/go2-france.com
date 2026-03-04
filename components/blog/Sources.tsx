interface Source {
  name: string;
  url: string;
}

interface SourcesProps {
  sources: Source[];
  locale?: string;
}

export default function Sources({ sources, locale = 'en' }: SourcesProps) {
  if (!sources || sources.length === 0) return null;

  const lang = locale === 'fr' ? 'fr' : locale === 'nl' ? 'nl' : 'en';

  const titleMap: Record<string, string> = {
    en: 'Sources & References',
    fr: 'Sources & References',
    nl: 'Bronnen & Referenties',
  };
  const noteMap: Record<string, string> = {
    en: 'This article is based on first-hand experience and verified with the following official sources:',
    fr: 'Cet article est base sur une experience directe et verifie avec les sources officielles suivantes:',
    nl: 'Dit artikel is gebaseerd op eigen ervaring en geverifieerd met de volgende officiele bronnen:',
  };

  return (
    <div className="mt-8 pt-8 border-t">
      <h3 className="font-bold text-lg mb-2">{titleMap[lang]}</h3>
      <p className="text-sm text-gray-600 mb-3">{noteMap[lang]}</p>
      <ul className="space-y-1.5">
        {sources.map((source, i) => (
          <li key={i} className="text-sm">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-france-blue hover:underline"
            >
              {source.name}
            </a>
            <span className="text-gray-400 ml-1 text-xs">&#8599;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
