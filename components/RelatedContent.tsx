import Link from 'next/link';
import Image from 'next/image';
import { resolveI18n } from '../utils/i18n';

interface RelatedItem {
  slug: string;
  name: string;
  image: string;
  description?: string;
  type: 'city' | 'destination' | 'experience' | 'itinerary' | 'blog' | 'region';
}

interface RelatedContentProps {
  title: string;
  items: RelatedItem[];
}

const typeRoutes: Record<RelatedItem['type'], string> = {
  city: '/city/',
  destination: '/destinations/',
  experience: '/experiences/',
  itinerary: '/itineraries/',
  blog: '/blog/',
  region: '/region/',
};

export default function RelatedContent({ title, items }: RelatedContentProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-5">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.slice(0, 3).map((item) => (
          <Link
            key={item.slug}
            href={`${typeRoutes[item.type]}${item.slug}/`}
            className="group block bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all overflow-hidden"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={item.image}
                alt={resolveI18n(item.name)}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2">
                {resolveI18n(item.name)}
              </h4>
              {item.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{resolveI18n(item.description)}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
