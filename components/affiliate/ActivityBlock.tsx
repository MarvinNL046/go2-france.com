import BookNowButton from './BookNowButton';

interface ActivityBlockProps {
  destination: string;
  activities?: Array<{
    name: string;
    description: string;
    priceHint?: string;
  }>;
}

export default function ActivityBlock({ destination, activities }: ActivityBlockProps) {
  return (
    <div className="my-10">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Top Activities in {destination}</h3>
      <p className="text-gray-600 mb-5">Book tours and experiences from trusted partners</p>

      {activities && activities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
          {activities.map((activity) => (
            <div key={activity.name} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-gray-900 mb-1">{activity.name}</h4>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{activity.description}</p>
              {activity.priceHint && (
                <p className="text-sm font-semibold text-brand-primary mb-3">From {activity.priceHint}</p>
              )}
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <BookNowButton partner="klook" label="Find Activities on Klook" size="sm" />
        <BookNowButton partner="gyg" label="Browse on GetYourGuide" size="sm" />
        <BookNowButton partner="tripcom" label="Explore on Trip.com" size="sm" />
      </div>
      <p className="text-xs text-gray-400 mt-3">
        * Affiliate links. We may earn a commission.{' '}
        <a href="/affiliate-disclosure/" className="underline">Disclosure</a>
      </p>
    </div>
  );
}
