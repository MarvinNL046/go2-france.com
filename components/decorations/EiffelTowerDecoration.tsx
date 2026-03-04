interface Props {
  className?: string;
}

export default function EiffelTowerDecoration({ className = '' }: Props) {
  return (
    <svg className={className} viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 5L40 95" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 95L50 95" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M25 95L40 50L55 95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M32 70L48 70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 80L52 80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M35 50L45 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M33 30L40 15L47 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M35 40L45 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
