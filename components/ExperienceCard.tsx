import Image from 'next/image';
import Link from 'next/link';

interface ExperienceCardProps {
  name: string;
  slug: string;
  image: string;
  category?: string;
  city?: string | null;
  priceRange?: { min: number; max: number; currency: string };
  duration?: string;
  bestFor?: string[];
  description?: string;
}

const categoryLabels: Record<string, string> = {
  adventure: 'Adventure',
  entertainment: 'Entertainment',
  culture: 'Culture',
  'food-drink': 'Food & Drink',
  nature: 'Nature',
  nightlife: 'Nightlife',
  wine: 'Wine',
  art: 'Art',
};

const categoryColors: Record<string, string> = {
  adventure: 'bg-orange-100 text-orange-700',
  entertainment: 'bg-purple-100 text-purple-700',
  culture: 'bg-blue-100 text-blue-700',
  'food-drink': 'bg-green-100 text-green-700',
  nature: 'bg-emerald-100 text-emerald-700',
  nightlife: 'bg-pink-100 text-pink-700',
  wine: 'bg-red-100 text-red-700',
  art: 'bg-indigo-100 text-indigo-700',
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  name,
  slug,
  image,
  category,
  city,
  priceRange,
  duration,
  bestFor,
  description,
}) => {
  const formatPrice = (range: { min: number; max: number; currency: string }) => {
    const symbol = range.currency === 'EUR' ? '\u20AC' : '$';
    if (range.min === 0) return `Free - ${symbol}${range.max}`;
    return `${symbol}${range.min} - ${symbol}${range.max}`;
  };

  const formatCity = (citySlug: string) => {
    return citySlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
      <Link href={`/experiences/${slug}/`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {category && (
            <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[category] || 'bg-gray-100 text-gray-700'}`}>
              {categoryLabels[category] || category}
            </span>
          )}
        </div>
      </Link>
      <div className="p-5">
        <h3 className="text-lg font-bold text-brand-secondary mb-1">{name}</h3>

        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
          {city && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {formatCity(city)}
            </span>
          )}
          {duration && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {duration}
            </span>
          )}
          {priceRange && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatPrice(priceRange)}
            </span>
          )}
        </div>

        {description && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{description}</p>
        )}

        {bestFor && bestFor.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {bestFor.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
