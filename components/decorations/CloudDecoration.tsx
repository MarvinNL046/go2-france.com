interface Props {
  className?: string;
}

export default function CloudDecoration({ className = '' }: Props) {
  return (
    <svg className={className} viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 45C10 45 5 38 8 30C3 25 5 15 15 13C18 5 30 2 40 8C50 2 65 5 68 15C78 12 88 18 85 28C95 30 95 42 85 45Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
