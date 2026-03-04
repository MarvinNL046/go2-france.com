import Link from 'next/link';
import Image from 'next/image';

interface DestinationCardProps {
  name: string;
  slug: string;
  image: string;
  category: string;
  region: string;
  description: string;
  duration?: string;
}

const categoryLabels: Record<string, string> = {
  'historical-site': 'Historical Site',
  'landmark': 'Landmark',
  'beach': 'Beach',
  'wine-region': 'Wine Region',
  'urban': 'Urban',
  'mountain': 'Mountain',
  'chateau': 'Chateau',
  'village': 'Village',
  'natural-park': 'Natural Park',
};

export default function DestinationCard({ name, slug, image, category, region, description, duration }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${slug}/`} className="group block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-brand-primary text-xs font-semibold px-3 py-1 rounded-full">
              {categoryLabels[category] || category}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-primary transition-colors mb-1">{name}</h3>
          <p className="text-sm text-gray-500 mb-2">{region} {duration ? `\u00B7 ${duration}` : ''}</p>
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  );
}
