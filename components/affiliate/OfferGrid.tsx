import { ReactNode } from 'react';

interface OfferGridProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  disclosure?: boolean;
  columns?: 2 | 3;
}

export default function OfferGrid({ title, subtitle, children, disclosure = true, columns = 3 }: OfferGridProps) {
  const gridCols = columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="my-10">
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>
      <div className={`grid grid-cols-1 ${gridCols} gap-4`}>
        {children}
      </div>
      {disclosure && (
        <p className="text-xs text-gray-400 mt-3">
          * Links may contain affiliate partnerships. We earn a small commission at no extra cost to you.{' '}
          <a href="/affiliate-disclosure/" className="underline hover:text-gray-600">Learn more</a>
        </p>
      )}
    </div>
  );
}
