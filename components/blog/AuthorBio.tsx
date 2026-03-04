import Link from 'next/link';

interface AuthorBioProps {
  name: string;
  locale?: string;
}

const authorData: Record<string, { bio: Record<string, string>; credentials: Record<string, string> }> = {
  'Go2France Team': {
    bio: {
      en: 'We are a team of travel writers and France enthusiasts who explore the country year-round. Our guides are based on first-hand experience, local knowledge, and verified official sources.',
      fr: 'Nous sommes une equipe de redacteurs de voyage et de passionnes de la France qui explorent le pays toute l\'annee. Nos guides sont bases sur l\'experience directe, les connaissances locales et des sources officielles verifiees.',
      nl: 'Wij zijn een team van reisschrijvers en Frankrijk-liefhebbers die het land het hele jaar door verkennen. Onze gidsen zijn gebaseerd op eigen ervaring, lokale kennis en geverifieerde officiele bronnen.',
    },
    credentials: {
      en: 'Based in France since 2020 | All 13 regions visited | Updated monthly',
      fr: 'Base en France depuis 2020 | 13 regions visitees | Mis a jour mensuellement',
      nl: 'Gevestigd in Frankrijk sinds 2020 | Alle 13 regio\'s bezocht | Maandelijks bijgewerkt',
    },
  },
};

export default function AuthorBio({ name, locale = 'en' }: AuthorBioProps) {
  const lang = locale === 'fr' ? 'fr' : locale === 'nl' ? 'nl' : 'en';
  const author = authorData[name] || authorData['Go2France Team'];

  return (
    <div className="mt-12 pt-8 border-t" itemScope itemType="https://schema.org/Person">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-france-blue to-france-gold rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-2xl font-bold text-white" itemProp="name">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="font-bold text-lg" itemProp="name">{name}</h3>
          <p className="text-sm text-france-blue font-medium mt-0.5">
            {author.credentials[lang]}
          </p>
          <p className="text-gray-600 mt-2 text-sm" itemProp="description">
            {author.bio[lang]}
          </p>
          <Link
            href="/"
            className="text-france-blue text-sm hover:underline mt-2 inline-block"
          >
            {lang === 'fr' ? 'En savoir plus sur nous' : lang === 'nl' ? 'Meer over ons' : 'More about us'} &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
