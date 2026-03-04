interface Props {
  className?: string;
}

export default function AirplaneDecoration({ className = '' }: Props) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M45 15L70 35L45 30L50 55L40 35L10 45L35 30L30 5L45 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="42" cy="28" r="2" fill="currentColor"/>
    </svg>
  );
}
