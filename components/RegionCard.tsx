import Link from 'next/link';
import Image from 'next/image';
import { resolveI18n } from '../utils/i18n';

interface Region {
  slug: string;
  name: string | { en: string; [key: string]: string };
  description: string | { en: string; [key: string]: string };
  image: string;
  cityCount?: number;
}

interface RegionCardProps {
  region: Region;
  className?: string;
}

export default function RegionCard({ region, className = '' }: RegionCardProps) {
  const regionName = resolveI18n(region.name);
  const regionDescription = resolveI18n(region.description);

  return (
    <Link href={`/region/${region.slug}/`} className={`group block ${className}`}>
      <div className="relative rounded-2xl overflow-hidden h-80 shadow-md hover:shadow-xl transition-all duration-300">
        <Image
          src={region.image}
          alt={regionName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-heading text-xl font-bold text-white mb-1">
            {regionName}
          </h3>
          <p className="text-white/80 text-sm mb-3 line-clamp-2">
            {regionDescription}
          </p>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-white text-sm font-medium group-hover:text-france-gold transition-colors">
              Explore Region
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            {region.cityCount && (
              <span className="text-white/60 text-xs">
                {region.cityCount} cities
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
