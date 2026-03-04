import Image from 'next/image';
import Link from 'next/link';

interface ItineraryCardProps {
  title: string;
  slug: string;
  heroImage: string;
  duration: number;
  difficulty: string;
  budget: string;
  bestFor: string[];
  description: string;
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-100 text-green-800',
  moderate: 'bg-yellow-100 text-yellow-800',
  challenging: 'bg-red-100 text-red-800',
};

const budgetLabels: Record<string, string> = {
  'budget-friendly': 'Budget',
  'mid-range': 'Mid-Range',
  'luxury': 'Luxury',
};

const ItineraryCard: React.FC<ItineraryCardProps> = ({
  title,
  slug,
  heroImage,
  duration,
  difficulty,
  budget,
  bestFor = [],
  description,
}) => {
  const visibleTags = bestFor.slice(0, 2);
  const moreCount = bestFor.length - 2;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
      <Link href={`/itineraries/${slug}/`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full">
            {duration} {duration === 1 ? 'Day' : 'Days'}
          </span>
          <div className="absolute top-3 right-3 flex gap-1.5">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColors[difficulty] || 'bg-gray-100 text-gray-700'}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-bold text-brand-secondary mb-1 line-clamp-2">{title}</h3>
        {description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        )}
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">
            {budgetLabels[budget] || budget}
          </span>
          {visibleTags.map((tag, i) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {tag.replace(/-/g, ' ')}
            </span>
          ))}
          {moreCount > 0 && (
            <span className="text-xs bg-brand-primary-50 text-brand-primary px-2 py-1 rounded-full">
              +{moreCount} more
            </span>
          )}
        </div>
        <Link
          href={`/itineraries/${slug}/`}
          className="block text-center bg-gradient-to-r from-brand-primary to-brand-primary-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-brand-primary-600 hover:to-brand-primary-700 transition-all duration-300"
        >
          View Itinerary
        </Link>
      </div>
    </div>
  );
};

export default ItineraryCard;
